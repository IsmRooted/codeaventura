// Motor: estado lógico, estado visual, vidas, exámenes, render.

const TILE = 64;

const game = {
  canvas: null,
  ctx: null,
  level: null,
  simState: null,
  vizState: null,
  cmdQueue: [],
  playing: false,
  cmdLimit: 2000,
  onWin: null,
  onGameOver: null,

  // Salida de print del último Run
  lastRunOutput: [],
  // Si el último Run tuvo error de Python
  lastRunHadError: false,

  // Estado de sesión (vidas, pociones)
  session: null,
};

// ====== Sesión: vidas, pociones, checkpoint ======

function initSession() {
  game.session = {
    lives: 3,
    maxLives: 3,
    potions: 0,
    checkpointLevelId: 1,
    medals: [],            // ids de niveles examen completados
  };
}

// Calcula el max esperado para el nivel actual
function computeMaxLivesFor(levelId) {
  return 3 + Math.floor(levelId / 5);
}

function loseLife() {
  if (!game.session) return;
  // Sistema de vidas desactivado: no descontar
  if (typeof isLivesEnabled === 'function' && !isLivesEnabled()) return;
  game.session.lives = Math.max(0, game.session.lives - 1);
  if (typeof saveSession === 'function') saveSession();
}

function fullHealAndUpgrade() {
  if (!game.session) return;
  game.session.maxLives += 1;
  game.session.lives = game.session.maxLives;
  if (typeof saveSession === 'function') saveSession();
}

function addPotion() {
  if (!game.session) return;
  game.session.potions += 1;
  if (typeof saveSession === 'function') saveSession();
}

function usePotion() {
  if (!game.session) return false;
  if (game.session.potions <= 0) return false;
  if (game.session.lives >= game.session.maxLives) return false;
  game.session.potions -= 1;
  game.session.lives = Math.min(game.session.maxLives, game.session.lives + 1);
  if (typeof saveSession === 'function') saveSession();
  return true;
}

function setCheckpoint(levelId) {
  if (!game.session) return;
  game.session.checkpointLevelId = levelId;
  if (typeof saveSession === 'function') saveSession();
}

function awardMedal(levelId) {
  if (!game.session) return;
  if (!game.session.medals.includes(levelId)) {
    game.session.medals.push(levelId);
  }
}

// ====== Inicialización ======

function initGame(canvas) {
  game.canvas = canvas;
  game.ctx = canvas.getContext('2d');
  game.ctx.imageSmoothingEnabled = false;
  initSession();
}

function freshState(lvl) {
  return {
    hero: { x: lvl.hero.x, y: lvl.hero.y, facing: 'right', bubble: null, bubbleEndsAt: 0 },
    enemies: lvl.enemies.map(e => ({
      name: e.name, type: e.type || 'ogre',
      x: e.x, y: e.y,
      hp: e.hp, hpMax: e.hp, alive: true, flash: 0,
    })),
    gems: lvl.gems.map(g => ({ x: g.x, y: g.y, collected: false })),
    exit: { x: lvl.exit.x, y: lvl.exit.y },
    map: lvl.map,
  };
}

function loadLevel(lvl) {
  game.level = lvl;
  game.simState = freshState(lvl);
  game.vizState = freshState(lvl);
  game.cmdQueue = [];
  game.lastRunOutput = [];
  game.lastRunHadError = false;
  render();
}

// ====== Sim API expuesta a Python ======

function checkLimit() {
  if (game.cmdQueue.length >= game.cmdLimit) {
    throw new Error("Demasiados comandos (¿bucle infinito sin break?)");
  }
}

function simMove(dx, dy) {
  checkLimit();
  const h = game.simState.hero;
  const nx = h.x + dx, ny = h.y + dy;
  const cell = (game.simState.map[ny] || '')[nx];
  const blocked = !cell || cell === 'W';
  const enemyAt = game.simState.enemies.find(e => e.alive && e.x === nx && e.y === ny);

  if (blocked || enemyAt) {
    game.cmdQueue.push({ type: 'bump', dx, dy, reason: enemyAt ? 'enemy' : 'wall' });
    return;
  }
  for (const g of game.simState.gems) {
    if (!g.collected && g.x === nx && g.y === ny) g.collected = true;
  }
  h.x = nx; h.y = ny;
  if (dx > 0) h.facing = 'right';
  if (dx < 0) h.facing = 'left';
  game.cmdQueue.push({ type: 'move', dx, dy });
}

function simMoveTo(tx, ty) {
  let safety = 50;
  while (game.simState.hero.x !== tx && safety-- > 0) {
    const dx = Math.sign(tx - game.simState.hero.x);
    const before = game.simState.hero.x;
    simMove(dx, 0);
    if (game.simState.hero.x === before) break;
  }
  safety = 50;
  while (game.simState.hero.y !== ty && safety-- > 0) {
    const dy = Math.sign(ty - game.simState.hero.y);
    const before = game.simState.hero.y;
    simMove(0, dy);
    if (game.simState.hero.y === before) break;
  }
}

function simAttack(name) {
  checkLimit();
  const target = String(name);
  const e = game.simState.enemies.find(x => x.name === target && x.alive);
  if (!e) {
    game.cmdQueue.push({ type: 'whiff', target });
    return;
  }
  e.hp -= 1;
  const kills = e.hp <= 0;
  if (kills) e.alive = false;
  game.cmdQueue.push({ type: 'attack', target, kills });
}

function simFindNearestEnemy() {
  const h = game.simState.hero;
  const alive = game.simState.enemies.filter(e => e.alive);
  if (alive.length === 0) return null;
  alive.sort((a, b) =>
    (Math.abs(a.x - h.x) + Math.abs(a.y - h.y)) -
    (Math.abs(b.x - h.x) + Math.abs(b.y - h.y))
  );
  return alive[0].name;
}

function simIsAtExit() {
  const h = game.simState.hero;
  const e = game.simState.exit;
  return h.x === e.x && h.y === e.y;
}

// Llamado desde el captador de stdout: encola un bocadillo + registra output.
function simSay(text) {
  if (!text) return;
  game.lastRunOutput.push(String(text));
  // Comando de bocadillo encolado para playback
  if (game.cmdQueue.length < game.cmdLimit) {
    game.cmdQueue.push({ type: 'say', text: String(text) });
  }
}

window.simMove = simMove;
window.simMoveTo = simMoveTo;
window.simAttack = simAttack;
window.simFindNearestEnemy = simFindNearestEnemy;
window.simIsAtExit = simIsAtExit;
window.simSay = simSay;

// ====== Restricciones (niveles examen) ======

function stripCommentsAndBlanks(code) {
  return code.split('\n').filter(line => {
    const stripped = line.trim();
    if (!stripped) return false;
    if (stripped.startsWith('#')) return false;
    return true;
  });
}

// Quita comentarios "#..." (respetando # dentro de strings) para validar
// requirements sin que un comentario engañe a la regex.
function stripCodeComments(code) {
  return code.split('\n').map(line => {
    let inSingle = false, inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      const prev = i > 0 ? line[i - 1] : '';
      if (c === "'" && !inDouble && prev !== '\\') inSingle = !inSingle;
      else if (c === '"' && !inSingle && prev !== '\\') inDouble = !inDouble;
      else if (c === '#' && !inSingle && !inDouble) return line.slice(0, i);
    }
    return line;
  }).join('\n');
}

function checkRestrictions(code, restrictions) {
  if (!restrictions || restrictions.length === 0) return { ok: true };
  for (const r of restrictions) {
    if (r.type === 'maxLines') {
      const count = stripCommentsAndBlanks(code).length;
      if (count > r.value) {
        return { ok: false, message: `${r.message} (tienes ${count}).` };
      }
    } else if (r.type === 'mustContain') {
      if (!r.regex.test(code)) {
        return { ok: false, message: r.message };
      }
    } else if (r.type === 'mustNotContain') {
      if (r.regex.test(code)) {
        return { ok: false, message: r.message };
      }
    } else if (r.type === 'maxOccurrences') {
      const matches = code.match(r.regex);
      const count = matches ? matches.length : 0;
      if (count > r.max) {
        return { ok: false, message: `${r.message} (tienes ${count}).` };
      }
    }
  }
  return { ok: true };
}

// ====== Playback ======

function tween(duration, fn) {
  return new Promise(resolve => {
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      fn(t);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    }
    requestAnimationFrame(step);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function startPlayback() {
  game.playing = true;
  game.vizState = freshState(game.level);
  render();
  await sleep(150);

  for (const cmd of game.cmdQueue) {
    await applyVizCommand(cmd);
  }

  game.playing = false;
  checkWinCondition();
}

async function applyVizCommand(cmd) {
  const s = game.vizState;
  if (cmd.type === 'move') {
    const h = s.hero;
    const sx = h.x, sy = h.y;
    const ex = sx + cmd.dx, ey = sy + cmd.dy;
    if (cmd.dx > 0) h.facing = 'right';
    if (cmd.dx < 0) h.facing = 'left';
    await tween(220, t => {
      h.x = sx + (ex - sx) * t;
      h.y = sy + (ey - sy) * t;
      render();
    });
    h.x = ex; h.y = ey;
    for (const g of s.gems) {
      if (!g.collected && g.x === ex && g.y === ey) {
        g.collected = true;
        log("¡Has recogido una gema!", "info");
      }
    }
    render();
  } else if (cmd.type === 'attack') {
    const e = s.enemies.find(x => x.name === cmd.target && x.alive);
    if (!e) return;
    e.hp -= 1;
    e.flash = 1;
    log(`Atacas a ${cmd.target} (${Math.max(0, e.hp)}/${e.hpMax} HP).`, "log");
    await tween(260, t => { e.flash = 1 - t; render(); });
    e.flash = 0;
    if (e.hp <= 0) {
      e.alive = false;
      log(`¡Has derrotado a ${cmd.target}!`, "ok");
    }
    render();
    await sleep(60);
  } else if (cmd.type === 'bump') {
    if (cmd.reason === 'enemy') {
      log("Hay un enemigo bloqueando el paso. ¡Atácalo primero!", "err");
    } else {
      log("Pared. No puedes ir por ahí.", "err");
    }
    await sleep(180);
  } else if (cmd.type === 'whiff') {
    log(`No hay enemigo "${cmd.target}" (¿está muerto o no existe?).`, "err");
    await sleep(140);
  } else if (cmd.type === 'say') {
    // Bocadillo encima del héroe + ya logueado a consola
    s.hero.bubble = cmd.text;
    s.hero.bubbleEndsAt = performance.now() + 850;
    render();
    await sleep(850);
    s.hero.bubble = null;
    render();
  }
}

// ====== Win check ======

function checkWinCondition() {
  const lvl = game.level;
  const s = game.vizState;
  const reachedExit = Math.round(s.hero.x) === s.exit.x && Math.round(s.hero.y) === s.exit.y;
  const allGems = s.gems.every(g => g.collected);
  const allDead = s.enemies.every(e => !e.alive);
  const w = lvl.win || {};

  const fails = [];
  if (w.mustReachExit && !reachedExit) fails.push("falta llegar a la puerta");
  if (w.mustCollectAllGems && !allGems) fails.push("falta recoger gemas");
  if (w.mustKillAll && !allDead) fails.push("quedan enemigos vivos");
  if (w.mustPrint && game.lastRunOutput.length === 0) {
    fails.push("debes imprimir algo con print()");
  }
  if (w.mustPrintMin && game.lastRunOutput.length < w.mustPrintMin) {
    fails.push(`faltan prints (necesarias ${w.mustPrintMin}, tienes ${game.lastRunOutput.length})`);
  }

  // Requisitos de código: el nivel exige usar un concepto concreto.
  // Distinto de las restricciones del examen — aquí la misión NO se da por
  // superada si no se usa el concepto, pero NO cuesta vida (es feedback).
  if (lvl.requires && lvl.requires.length && game.lastCode) {
    const cleanCode = stripCodeComments(game.lastCode);
    for (const r of lvl.requires) {
      let pass = true;
      if (r.type === 'mustContain') pass = r.regex.test(cleanCode);
      else if (r.type === 'mustNotContain') pass = !r.regex.test(cleanCode);
      if (!pass) fails.push(r.message);
    }
  }

  if (fails.length === 0) {
    log("✓ ¡Nivel completado!", "ok");
    if (game.onWin) game.onWin(lvl);
  } else {
    log("Casi: " + fails.join(", ") + ".", "err");
  }
}

// ====== Render ======

function render() {
  const ctx = game.ctx;
  ctx.imageSmoothingEnabled = false;

  const isExam = game.level && game.level.is_exam;

  // Fondo: niveles normales negro, exámenes con efecto holográfico
  if (isExam) {
    const grad = ctx.createRadialGradient(
      game.canvas.width / 2, game.canvas.height / 2, 0,
      game.canvas.width / 2, game.canvas.height / 2, game.canvas.width * 0.7
    );
    grad.addColorStop(0, '#1a0d2a');
    grad.addColorStop(1, '#05030a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  } else {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  }

  const s = game.vizState;
  if (!s) return;

  // Suelo y muros
  for (let y = 0; y < GRID_H; y++) {
    for (let x = 0; x < GRID_W; x++) {
      const c = s.map[y][x];
      if (c === 'W') drawSprite(ctx, 'wall', x * TILE, y * TILE, TILE);
      else drawSprite(ctx, 'floor', x * TILE, y * TILE, TILE);
    }
  }

  // Tinte holográfico encima del suelo en exámenes
  if (isExam) {
    ctx.fillStyle = 'rgba(184, 134, 255, 0.12)';
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
    // Líneas de circuito tenues
    ctx.strokeStyle = 'rgba(184, 134, 255, 0.18)';
    ctx.lineWidth = 1;
    for (let i = 0; i < game.canvas.width; i += TILE) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, game.canvas.height); ctx.stroke();
    }
    for (let i = 0; i < game.canvas.height; i += TILE) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(game.canvas.width, i); ctx.stroke();
    }
  }

  // Puerta
  drawSprite(ctx, 'door', s.exit.x * TILE, s.exit.y * TILE, TILE);

  // Gemas
  for (const g of s.gems) {
    if (!g.collected) drawSprite(ctx, 'gem', g.x * TILE, g.y * TILE, TILE);
  }

  // Enemigos
  for (const e of s.enemies) {
    if (!e.alive) continue;
    const palette = ENEMY_PALETTES[e.type] || PALETTE;
    const spriteName = e.type === 'boss' ? 'boss' : 'ogre';
    drawSprite(ctx, spriteName, e.x * TILE, e.y * TILE, TILE, palette);

    const barW = TILE * 0.7;
    const barX = e.x * TILE + (TILE - barW) / 2;
    const barY = e.y * TILE + 4;
    ctx.fillStyle = '#000';
    ctx.fillRect(barX - 1, barY - 1, barW + 2, 7);
    ctx.fillStyle = '#3a1010';
    ctx.fillRect(barX, barY, barW, 5);
    ctx.fillStyle = '#e85b5b';
    ctx.fillRect(barX, barY, barW * Math.max(0, e.hp / e.hpMax), 5);

    drawText(ctx, e.name, e.x * TILE + 4, e.y * TILE + TILE - 4, '#f5d04a', 11);

    if (e.flash > 0) {
      ctx.fillStyle = `rgba(255,255,255,${e.flash * 0.6})`;
      ctx.fillRect(e.x * TILE, e.y * TILE, TILE, TILE);
    }
  }

  // Spotlight en exámenes (encima del héroe)
  if (isExam) {
    const hx = s.hero.x * TILE + TILE / 2;
    const hy = s.hero.y * TILE + TILE / 2;
    const spot = ctx.createRadialGradient(hx, hy, TILE * 0.5, hx, hy, TILE * 4);
    spot.addColorStop(0, 'rgba(0, 0, 0, 0)');
    spot.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
    ctx.fillStyle = spot;
    ctx.fillRect(0, 0, game.canvas.width, game.canvas.height);
  }

  // Héroe
  const h = s.hero;
  const sprite = h.facing === 'left' ? 'hero_left' : 'hero';
  const chapter = (game.level && CHAPTERS.find(c => c.id === game.level.chapter)) || null;
  const heroKey = chapter ? chapter.hero : 'apprentice';
  const heroPal = HERO_PALETTES[heroKey] || PALETTE;
  drawSprite(ctx, sprite, h.x * TILE, h.y * TILE, TILE, heroPal);

  // Bocadillo del héroe
  if (h.bubble && performance.now() < h.bubbleEndsAt) {
    drawSpeechBubble(ctx, h.bubble, h.x * TILE + TILE / 2, h.y * TILE);
  } else {
    h.bubble = null;
  }
}

// ====== Speech bubble ======

function drawSpeechBubble(ctx, text, anchorX, anchorY) {
  const maxText = text.length > 36 ? text.slice(0, 33) + '…' : text;
  ctx.font = 'bold 14px "Trebuchet MS", sans-serif';
  const metrics = ctx.measureText(maxText);
  const padX = 10, padY = 7;
  const w = Math.max(40, metrics.width + padX * 2);
  const h = 14 + padY * 2;
  let bx = anchorX - w / 2;
  const by = anchorY - h - 14;

  // Mantener dentro del canvas
  const canvasW = game.canvas.width;
  if (bx < 4) bx = 4;
  if (bx + w > canvasW - 4) bx = canvasW - 4 - w;

  // Sombra
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  roundRect(ctx, bx + 2, by + 2, w, h, 8); ctx.fill();

  // Cuerpo
  ctx.fillStyle = '#fef9e7';
  ctx.strokeStyle = '#3a3024';
  ctx.lineWidth = 2;
  roundRect(ctx, bx, by, w, h, 8);
  ctx.fill(); ctx.stroke();

  // Punta del bocadillo
  ctx.beginPath();
  ctx.moveTo(anchorX - 6, by + h);
  ctx.lineTo(anchorX, by + h + 8);
  ctx.lineTo(anchorX + 6, by + h);
  ctx.closePath();
  ctx.fillStyle = '#fef9e7';
  ctx.fill();
  ctx.strokeStyle = '#3a3024';
  ctx.beginPath();
  ctx.moveTo(anchorX - 6, by + h);
  ctx.lineTo(anchorX, by + h + 8);
  ctx.lineTo(anchorX + 6, by + h);
  ctx.stroke();

  // Texto
  ctx.fillStyle = '#1a1a24';
  ctx.textBaseline = 'middle';
  ctx.fillText(maxText, bx + padX, by + h / 2);
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
