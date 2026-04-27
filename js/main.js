// Inicialización: pantallas, menú, navegación, vidas, exámenes, persistencia.

let cm = null;
let currentLevel = 0;

const STORAGE = {
  // ---- Estado de la AVENTURA actual (se borra al empezar nueva aventura)
  lastLevel: 'codeaventura_level',
  maxLevel: 'codeaventura_max_level',
  code: id => `codeaventura_code_${id}`,
  session: 'codeaventura_session',
  // ---- PERMANENTES (cross-aventura)
  medals: 'codeaventura_medals',
  adventures: 'codeaventura_adventures',
  theoryEnabled: 'codeaventura_theory_enabled',
  livesEnabled: 'codeaventura_lives_enabled',
};

window.addEventListener('DOMContentLoaded', async () => {
  // Editor
  cm = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'python',
    theme: 'dracula',
    lineNumbers: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    extraKeys: { 'Tab': cm => cm.replaceSelection('    ', 'end') },
  });

  initGame(document.getElementById('game-canvas'));
  game.onWin = onLevelWin;

  // Cargar medallas y sesión persistentes
  loadMedalsFromStorage();
  loadSession();
  updateTheoryButton();
  updateLivesButton();

  buildTutorialUI();
  buildHowToUI();
  buildStoryUI();
  buildLevelSelectUI();
  buildDiaryUI();
  updateMenuProgress();
  updateMenuMedals();

  // Botones del menú principal
  document.getElementById('btn-play').addEventListener('click', onMenuPlay);
  document.getElementById('btn-tutorial').addEventListener('click', () => setScreen('screen-tutorial'));
  document.getElementById('btn-howto').addEventListener('click', () => setScreen('screen-howto'));
  document.getElementById('btn-levelselect').addEventListener('click', () => {
    buildLevelSelectUI();
    setScreen('screen-levelselect');
  });
  document.getElementById('btn-diary').addEventListener('click', () => {
    buildDiaryUI();
    setScreen('screen-diary');
  });
  document.getElementById('btn-story').addEventListener('click', () => setScreen('screen-story'));
  document.getElementById('btn-new-adventure').addEventListener('click', startNewAdventure);

  // Volver al menú
  document.querySelectorAll('[data-back]').forEach(b => {
    b.addEventListener('click', () => setScreen('screen-menu'));
  });

  // Juego
  document.getElementById('game-menu-btn').addEventListener('click', () => {
    if (game.playing) return;
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('run-btn').addEventListener('click', onRun);
  document.getElementById('reset-btn').addEventListener('click', onReset);
  document.getElementById('potion-btn').addEventListener('click', onUsePotion);
  document.getElementById('theory-toggle-btn').addEventListener('click', toggleTheoryPref);
  document.getElementById('theory-disable-checkbox').addEventListener('change', (ev) => {
    setTheoryEnabled(!ev.target.checked);
  });
  document.getElementById('lives-toggle-btn').addEventListener('click', toggleLivesPref);
  document.getElementById('solution-toggle').addEventListener('click', () => {
    const btn = document.getElementById('solution-toggle');
    btn.classList.toggle('expanded');
    btn.querySelector('span:last-child').textContent =
      btn.classList.contains('expanded') ? 'Ocultar solución' : 'Ver solución de referencia';
  });
  document.getElementById('prev-level').addEventListener('click', () => {
    if (game.playing) return;
    if (currentLevel > 0) loadLevelByIndex(currentLevel - 1, false);
  });
  document.getElementById('next-level').addEventListener('click', () => {
    if (game.playing) return;
    if (currentLevel >= LEVELS.length - 1) return;
    const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
    const nextLvl = LEVELS[currentLevel + 1];
    // Bloqueado si el siguiente nivel está por encima del progreso del jugador
    if (nextLvl.id > max + 1) {
      log('Esa operación está bloqueada — completa la actual primero.', 'err');
      return;
    }
    loadLevelByIndex(currentLevel + 1, false);
  });
  document.getElementById('hint-toggle').addEventListener('click', () => {
    const h = document.getElementById('hint-text');
    const btn = document.getElementById('hint-toggle');
    h.classList.toggle('hidden');
    btn.textContent = h.classList.contains('hidden') ? '💡 código' : '💡 ocultar';
  });
  document.getElementById('theory-hint-btn').addEventListener('click', () => {
    const t = document.getElementById('theory-hint-text');
    const btn = document.getElementById('theory-hint-btn');
    t.classList.toggle('hidden');
    btn.textContent = t.classList.contains('hidden') ? '📖 teoría' : '📖 ocultar';
  });

  // Atajos
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey && ev.key === 'Enter') {
      ev.preventDefault();
      if (document.getElementById('screen-game').classList.contains('active')) {
        onRun();
      }
      return;
    }
    if (ev.key === 'Escape') {
      hideAllOverlays();
      return;
    }
    // Enter en overlays con botón primario → equivale a clicar el botón
    // (se prioriza overlays sobre el editor: cuando hay overlay visible,
    // Enter avanza incluso si el foco está dentro del CodeMirror)
    if (ev.key === 'Enter' && !ev.ctrlKey && !ev.shiftKey && !ev.altKey) {
      const overlays = [
        { id: 'overlay-complete',    primary: 'complete-next' },
        { id: 'overlay-intro',       primary: 'intro-start' },
        { id: 'overlay-exam-intro',  primary: 'exam-start' },
        { id: 'overlay-gameover',    primary: 'gameover-continue' },
        { id: 'overlay-victory',     primary: 'victory-restart' },
      ];
      for (const o of overlays) {
        const el = document.getElementById(o.id);
        if (el && !el.classList.contains('hidden')) {
          // No interceptar si el foco está en el checkbox de teoría dentro del overlay
          if (ev.target && ev.target.id === 'theory-disable-checkbox') return;
          ev.preventDefault();
          document.getElementById(o.primary).click();
          return;
        }
      }
    }
  });

  // Overlays
  document.getElementById('intro-start').addEventListener('click', () => {
    document.getElementById('overlay-intro').classList.add('hidden');
    setStatus('Listo. Ctrl+Enter o ▶ para ejecutar.');
    refreshEditor();
  });
  document.getElementById('exam-start').addEventListener('click', () => {
    document.getElementById('overlay-exam-intro').classList.add('hidden');
    setStatus('Examen en marcha. Sin pista. Suerte.');
    refreshEditor();
  });
  document.getElementById('complete-replay').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    onReset();
  });
  document.getElementById('complete-menu').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('complete-next').addEventListener('click', () => {
    document.getElementById('overlay-complete').classList.add('hidden');
    if (currentLevel < LEVELS.length - 1) {
      loadLevelByIndex(currentLevel + 1, true);
    } else {
      document.getElementById('overlay-victory').classList.remove('hidden');
    }
  });
  document.getElementById('victory-menu').addEventListener('click', () => {
    document.getElementById('overlay-victory').classList.add('hidden');
    setScreen('screen-menu');
    updateMenuProgress();
    updateMenuMedals();
  });
  document.getElementById('victory-restart').addEventListener('click', () => {
    document.getElementById('overlay-victory').classList.add('hidden');
    setScreen('screen-menu');
    startNewAdventure(true);  // skip confirm — el jugador ya eligió
  });
  document.getElementById('gameover-continue').addEventListener('click', () => {
    document.getElementById('overlay-gameover').classList.add('hidden');
    // Volver al checkpoint con vidas a tope (sin tocar el máximo conquistado)
    const cpId = game.session.checkpointLevelId || 1;
    game.session.lives = game.session.maxLives;
    const cpIdx = LEVELS.findIndex(l => l.id === cpId);
    loadLevelByIndex(Math.max(0, cpIdx), false);
    log(`Vuelves al checkpoint (Nivel ${cpId}). Vidas restauradas a ${game.session.maxLives}.`, 'info');
  });

  // Pyodide
  setMenuStatus('Cargando Python (Pyodide)... 5-15s la primera vez.');
  try {
    await initPyodide();
    setMenuStatus('✓ Listo para jugar.');
    document.getElementById('run-btn').disabled = false;
    setStatus('Listo. Ctrl+Enter o ▶ para ejecutar.');
  } catch (err) {
    setMenuStatus('Error cargando Pyodide: ' + (err.message || err));
  }
});

// === Pantallas ===
function setScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'screen-game') {
    refreshEditor();
  }
}

function refreshEditor() {
  if (!cm) return;
  // CodeMirror necesita refresh cuando su contenedor cambia de tamaño/visibilidad
  setTimeout(() => cm.refresh(), 60);
}

function hideAllOverlays() {
  document.querySelectorAll('.overlay').forEach(o => o.classList.add('hidden'));
}

// === Sesión: vidas/pociones/medallas ===

function loadMedalsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE.medals);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      game.session.medals = parsed;
    }
  } catch (e) { /* ignore */ }
}

function saveMedalsToStorage() {
  localStorage.setItem(STORAGE.medals, JSON.stringify(game.session.medals));
}

function saveSession() {
  if (!game.session) return;
  try {
    localStorage.setItem(STORAGE.session, JSON.stringify({
      lives: game.session.lives,
      maxLives: game.session.maxLives,
      potions: game.session.potions,
      checkpointLevelId: game.session.checkpointLevelId,
    }));
  } catch (e) { /* ignore */ }
}

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE.session);
    if (!raw) return;
    const s = JSON.parse(raw);
    if (typeof s.lives === 'number') game.session.lives = s.lives;
    if (typeof s.maxLives === 'number') game.session.maxLives = s.maxLives;
    if (typeof s.potions === 'number') game.session.potions = s.potions;
    if (typeof s.checkpointLevelId === 'number') game.session.checkpointLevelId = s.checkpointLevelId;
  } catch (e) { /* ignore */ }
}

function getAdventuresCount() {
  return parseInt(localStorage.getItem(STORAGE.adventures) || '0', 10) || 0;
}
function incrementAdventures() {
  localStorage.setItem(STORAGE.adventures, String(getAdventuresCount() + 1));
}

// === Teoría: preferencia ON/OFF ===
function isTheoryEnabled() {
  const raw = localStorage.getItem(STORAGE.theoryEnabled);
  if (raw === null) return true;  // por defecto activada
  return raw === '1';
}
function setTheoryEnabled(on) {
  localStorage.setItem(STORAGE.theoryEnabled, on ? '1' : '0');
  updateTheoryButton();
}
function toggleTheoryPref() {
  setTheoryEnabled(!isTheoryEnabled());
  log(`Teoría tras nivel: ${isTheoryEnabled() ? 'ACTIVADA' : 'desactivada'}.`, 'info');
}
function updateTheoryButton() {
  const btn = document.getElementById('theory-toggle-btn');
  const state = document.getElementById('theory-state');
  if (!btn || !state) return;
  const on = isTheoryEnabled();
  btn.classList.toggle('off', !on);
  state.textContent = on ? 'ON' : 'OFF';
  btn.title = on
    ? 'Teoría tras nivel ACTIVADA — pulsa para desactivar'
    : 'Teoría tras nivel desactivada — pulsa para activar';
}

// === Vidas: preferencia ON/OFF ===
function isLivesEnabled() {
  const raw = localStorage.getItem(STORAGE.livesEnabled);
  if (raw === null) return true;  // por defecto activado
  return raw === '1';
}
function setLivesEnabled(on) {
  localStorage.setItem(STORAGE.livesEnabled, on ? '1' : '0');
  // Si reactivas vidas y estabas a 0 o algo raro, rellena al máximo de tu nivel actual
  if (on && game.session) {
    if (game.session.lives <= 0) game.session.lives = game.session.maxLives;
    saveSession();
  }
  updateLivesButton();
  updateLivesUI();
}
function toggleLivesPref() {
  setLivesEnabled(!isLivesEnabled());
  log(`Sistema de vidas: ${isLivesEnabled() ? 'ACTIVADO' : 'desactivado'}.`, 'info');
}
function updateLivesButton() {
  const btn = document.getElementById('lives-toggle-btn');
  const state = document.getElementById('lives-state');
  if (!btn || !state) return;
  const on = isLivesEnabled();
  btn.classList.toggle('off', !on);
  state.textContent = on ? 'ON' : 'OFF';
  btn.title = on
    ? 'Sistema de vidas ACTIVADO — pulsa para desactivar'
    : 'Sistema de vidas desactivado — pulsa para activar';
}

function startNewAdventure(skipConfirm = false) {
  if (!skipConfirm) {
    const msg = '¿Empezar una NUEVA AVENTURA desde el Nivel 1?\n\n' +
      '• Se RESETEAN: vidas, nivel desbloqueado y código de cada nivel.\n' +
      '• Se CONSERVAN: medallas y aventuras completadas.';
    if (!confirm(msg)) return;
  }

  // Borrar estado de aventura
  localStorage.removeItem(STORAGE.lastLevel);
  localStorage.removeItem(STORAGE.maxLevel);
  localStorage.removeItem(STORAGE.session);
  for (const lvl of LEVELS) {
    localStorage.removeItem(STORAGE.code(lvl.id));
  }

  // Reset session pero conservar medallas
  const savedMedals = (game.session && game.session.medals) ? [...game.session.medals] : [];
  initSession();
  game.session.medals = savedMedals;

  // Refrescar UI
  buildLevelSelectUI();
  buildDiaryUI();
  updateMenuProgress();
  updateMenuMedals();
  setMenuStatus('Nueva aventura iniciada. Pulsa Empezar.');
}

function updateLivesUI() {
  const root = document.getElementById('lives-display');
  if (!root) return;
  const s = game.session;
  const enabled = isLivesEnabled();
  if (!enabled) {
    root.innerHTML = '<span class="lives-off">∞</span>';
    root.title = 'Sistema de vidas desactivado';
    const potionBtn = document.getElementById('potion-btn');
    const potionCount = document.getElementById('potion-count');
    if (potionCount) potionCount.textContent = String(s.potions);
    if (potionBtn) potionBtn.disabled = true;
    return;
  }
  let html = '';
  for (let i = 0; i < s.maxLives; i++) {
    if (i < s.lives) html += '<span class="heart-full">♥</span>';
    else html += '<span class="heart-empty">♡</span>';
  }
  root.innerHTML = html;
  root.title = `${s.lives} / ${s.maxLives} vidas`;

  const potionBtn = document.getElementById('potion-btn');
  const potionCount = document.getElementById('potion-count');
  potionCount.textContent = String(s.potions);
  potionBtn.disabled = (s.potions === 0 || s.lives >= s.maxLives);
}

function onUsePotion() {
  if (usePotion()) {
    log('Has usado una poción. +1 vida.', 'ok');
    updateLivesUI();
  } else {
    log('No puedes usar poción ahora (sin pociones o ya estás al máximo).', 'err');
  }
}

function showGameOver() {
  const cpId = game.session.checkpointLevelId || 1;
  document.getElementById('gameover-checkpoint').textContent =
    `Volverás al Nivel ${cpId} con vidas a tope.`;
  document.getElementById('overlay-gameover').classList.remove('hidden');
}

// === Menú principal ===
function onMenuPlay() {
  const savedIdx = parseInt(localStorage.getItem(STORAGE.lastLevel) || '0', 10);
  loadLevelByIndex(Math.max(0, Math.min(savedIdx, LEVELS.length - 1)), true);
}

function updateMenuProgress() {
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  document.getElementById('menu-progress-text').textContent = `${max} / ${LEVELS.length}`;
  const last = parseInt(localStorage.getItem(STORAGE.lastLevel) || '0', 10);
  document.getElementById('play-label').textContent =
    (max > 0 || last > 0) ? `Continuar (Nivel ${last + 1})` : 'Empezar aventura';
  // Aventuras completadas (cross-aventura)
  const adv = getAdventuresCount();
  const advEl = document.getElementById('menu-adventures');
  if (advEl) {
    advEl.textContent = adv > 0 ? `· Aventuras completadas: ${adv}` : '';
  }
}

function updateMenuMedals() {
  const root = document.getElementById('menu-medals');
  if (!root) return;
  const examLevels = LEVELS.filter(l => l.is_exam).map(l => l.id);
  let html = '';
  examLevels.forEach(id => {
    const earned = game.session.medals.includes(id);
    html += `<span class="${earned ? 'medal-earned' : 'medal-locked'}" title="Examen del Nivel ${id}">${earned ? '🏅' : '🔒'}</span>`;
  });
  root.innerHTML = html;
}

function setMenuStatus(msg) {
  document.getElementById('menu-status-msg').textContent = msg;
}

// === Tutorial ===
function buildTutorialUI() {
  const toc = document.getElementById('tutorial-toc');
  const content = document.getElementById('tutorial-content');
  toc.innerHTML = '';
  TUTORIAL.forEach((topic, i) => {
    const btn = document.createElement('button');
    btn.className = 'toc-item';
    btn.textContent = topic.title;
    btn.addEventListener('click', () => {
      toc.querySelectorAll('.toc-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      content.innerHTML = topic.body;
      content.scrollTop = 0;
    });
    if (i === 0) btn.classList.add('active');
    toc.appendChild(btn);
  });
  content.innerHTML = TUTORIAL[0].body;
}

function buildHowToUI() {
  document.getElementById('howto-content').innerHTML = HOWTO_CONTENT;
}

function buildStoryUI() {
  document.getElementById('story-content').innerHTML = STORY_CONTENT;
}

// === Selector de nivel ===
function buildLevelSelectUI() {
  const grid = document.getElementById('levelselect-grid');
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  grid.innerHTML = '';

  CHAPTERS.forEach(ch => {
    const chapterLevels = LEVELS.filter(l => l.chapter === ch.id);
    if (chapterLevels.length === 0) return;
    const completedInCh = chapterLevels.filter(l => l.id <= max).length;

    const section = document.createElement('div');
    section.className = 'chapter-section';
    section.innerHTML = `
      <div class="chapter-header">
        <div class="chapter-num">CAPÍTULO ${ch.id}</div>
        <div class="chapter-title">${escapeHtml(ch.title)}</div>
        <div class="chapter-sub">${escapeHtml(ch.subtitle)}</div>
        <div class="chapter-progress">${completedInCh} / ${chapterLevels.length}</div>
      </div>
      <div class="chapter-cards"></div>
    `;
    const cards = section.querySelector('.chapter-cards');

    chapterLevels.forEach(lvl => {
      const idx = LEVELS.indexOf(lvl);
      const completed = lvl.id <= max;
      const locked = idx > 0 && idx > max;
      const isExam = lvl.is_exam;
      const card = document.createElement('div');
      card.className = 'level-card' + (locked ? ' locked' : '') + (completed ? ' completed' : '') + (isExam ? ' exam' : '');
      card.innerHTML = `
        ${completed ? '<span class="check">✓</span>' : ''}
        <div class="num">${isExam ? '⚠ EXAMEN ' : 'NIVEL '}${lvl.id}</div>
        <div class="title">${escapeHtml(lvl.title)}</div>
        <div class="loc">${escapeHtml(lvl.location)}</div>
        <span class="concept">${escapeHtml(lvl.concept)}</span>
      `;
      if (!locked) {
        card.addEventListener('click', () => loadLevelByIndex(idx, true));
      }
      cards.appendChild(card);
    });

    grid.appendChild(section);
  });
}

// === Diario ===
function buildDiaryUI() {
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  const root = document.getElementById('diary-content');
  if (max === 0) {
    root.innerHTML = `
      <p style="text-align:center; color: var(--text-dim); margin-top: 60px; font-style: italic;">
        El diario está vacío. Completa tu primer nivel para empezar a llenarlo.
      </p>`;
    return;
  }
  let html = `
    <p style="font-style:italic; color:var(--text-dim); margin-bottom:20px;">
      Páginas escritas por Aldric, aprendiz de la Orden Rúnica. Solo aparecen las
      entradas de los niveles que has completado.
    </p>`;
  CHAPTERS.forEach(ch => {
    const entries = LEVELS.filter(l => l.chapter === ch.id && l.id <= max && l.diary);
    if (entries.length === 0) return;
    html += `<h3>Capítulo ${ch.id} — ${escapeHtml(ch.title)}</h3>`;
    entries.forEach(lvl => {
      html += `
        <div class="diary-entry">
          <div class="diary-meta">Nivel ${lvl.id} · ${escapeHtml(lvl.location)}</div>
          <div class="diary-text">${escapeHtml(lvl.diary)}</div>
        </div>`;
    });
  });
  root.innerHTML = html;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

// === Navegación entre niveles ===
function loadLevelByIndex(idx, showIntro = false) {
  currentLevel = idx;
  const lvl = LEVELS[idx];

  // Establecer el checkpoint al último <= este nivel (para que al saltar via
  // level-select, el game over te devuelva al lugar correcto).
  const cpsBefore = LEVELS.filter(l => l.is_checkpoint && l.id <= lvl.id);
  if (cpsBefore.length > 0) {
    setCheckpoint(cpsBefore[cpsBefore.length - 1].id);
  }
  // El máximo de vidas se gana SOLO al completar exámenes en esta aventura.
  // Si saltas a un nivel alto via level-select sin haber aprobado los exámenes
  // anteriores, juegas con el max que tengas — eso es parte del reto.

  document.getElementById('level-num').textContent = lvl.id;
  document.getElementById('level-title').textContent = lvl.title;
  document.getElementById('level-location').textContent = '— ' + lvl.location;
  document.getElementById('mission-text').textContent = lvl.mission;
  document.getElementById('hint-text').textContent = lvl.hint;
  document.getElementById('hint-text').classList.add('hidden');
  document.getElementById('hint-toggle').textContent = '💡 código';

  // Pista nivel 1: teoría (explicación sin código) usando THEORIES[lvl.id]
  const theoryHintEl = document.getElementById('theory-hint-text');
  const theoryHintBtn = document.getElementById('theory-hint-btn');
  const t = (typeof THEORIES !== 'undefined') ? THEORIES[lvl.id] : null;
  theoryHintEl.innerHTML = t ? t.body : '';
  theoryHintEl.classList.add('hidden');
  theoryHintBtn.textContent = '📖 teoría';

  // En exámenes, ambos niveles de ayuda bloqueados
  const hintToggle = document.getElementById('hint-toggle');
  if (lvl.is_exam) {
    hintToggle.textContent = '🔒 bloqueada';
    hintToggle.disabled = true;
    theoryHintBtn.textContent = '🔒 bloqueada';
    theoryHintBtn.disabled = true;
  } else {
    hintToggle.disabled = false;
    theoryHintBtn.disabled = !t;  // si no hay teoría definida, bloquea solo el de teoría
  }

  // Restricciones del examen
  const restPanel = document.getElementById('restrictions-panel');
  const restList = document.getElementById('restrictions-list');
  if (lvl.is_exam && lvl.restrictions && lvl.restrictions.length) {
    restPanel.classList.remove('hidden');
    restList.innerHTML = lvl.restrictions.map(r => `<li>${escapeHtml(r.message)}</li>`).join('');
  } else {
    restPanel.classList.add('hidden');
    restList.innerHTML = '';
  }

  document.getElementById('concept-pill').textContent = lvl.concept;

  // Cargar código (guardado o starter)
  const savedCode = localStorage.getItem(STORAGE.code(lvl.id));
  cm.setValue(savedCode !== null ? savedCode : lvl.starterCode);

  loadLevel(lvl);
  clearConsole();
  log(`Nivel ${lvl.id}: ${lvl.title}`, 'info');
  log(`Lugar: ${lvl.location}`, 'log');

  const maxCompleted = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  const nextLvl = LEVELS[idx + 1];
  document.getElementById('prev-level').disabled = (idx === 0);
  document.getElementById('next-level').disabled =
    (idx === LEVELS.length - 1) || (nextLvl && nextLvl.id > maxCompleted + 1);
  document.getElementById('next-level').title =
    (nextLvl && nextLvl.id > maxCompleted + 1)
      ? 'Bloqueada — completa esta operación primero'
      : 'Operación siguiente';

  localStorage.setItem(STORAGE.lastLevel, String(idx));

  setScreen('screen-game');
  updateLivesUI();

  if (showIntro) {
    if (lvl.is_exam) showExamIntro(lvl);
    else showLevelIntro(lvl);
  }
}

function showLevelIntro(lvl) {
  document.getElementById('intro-location').textContent = lvl.location;
  document.getElementById('intro-title').textContent = `Nivel ${lvl.id} — ${lvl.title}`;
  document.getElementById('intro-story').textContent = lvl.intro;
  document.getElementById('intro-mission').textContent = lvl.mission.split('\n')[0];
  document.getElementById('intro-concept').textContent = lvl.concept;
  document.getElementById('overlay-intro').classList.remove('hidden');
}

function showExamIntro(lvl) {
  document.getElementById('exam-title').textContent = `Examen — ${lvl.title}`;
  document.getElementById('exam-story').textContent = lvl.intro;
  const list = document.getElementById('exam-rules-list');
  list.innerHTML = '';
  // Misión como primera "regla"
  const missionFirstLine = lvl.mission.split('\n')[0];
  const liMission = document.createElement('li');
  liMission.innerHTML = `<strong>Objetivo:</strong> ${escapeHtml(missionFirstLine)}`;
  list.appendChild(liMission);
  // Restricciones
  if (lvl.restrictions) {
    lvl.restrictions.forEach(r => {
      const li = document.createElement('li');
      li.textContent = r.message;
      list.appendChild(li);
    });
  }
  document.getElementById('overlay-exam-intro').classList.remove('hidden');
}

// === Run ===
async function onRun() {
  if (game.playing) return;
  if (!pyodide) { log('Python aún cargando, espera un momento...', 'err'); return; }

  const lvl = game.level;
  const code = cm.getValue();
  localStorage.setItem(STORAGE.code(lvl.id), code);
  game.lastCode = code;

  clearConsole();
  log('Ejecutando...', 'info');
  setRunEnabled(false);

  game.vizState = freshState(lvl);
  render();

  // Validar restricciones ANTES de ejecutar (más rápido para exámenes)
  if (lvl.is_exam && lvl.restrictions) {
    const check = checkRestrictions(code, lvl.restrictions);
    if (!check.ok) {
      log(`✗ Restricción violada: ${check.message}`, 'err');
      if (isLivesEnabled()) log('Pierdes una vida.', 'err');
      loseLife();
      updateLivesUI();
      checkLifeStatus();
      setRunEnabled(true);
      refreshEditor();
      return;
    }
  }

  const result = await runUserCode(code);
  if (!result.ok) {
    log(result.error, 'err');
    if (isLivesEnabled()) log('Error de Python: pierdes una vida.', 'err');
    loseLife();
    updateLivesUI();
    checkLifeStatus();
    setRunEnabled(true);
    refreshEditor();
    return;
  }
  if (game.cmdQueue.length === 0) {
    log('Tu código no hizo nada visible. ¿Te falta llamar algún método del héroe o un print?', 'err');
    setRunEnabled(true);
    refreshEditor();
    return;
  }

  await startPlayback();
  setRunEnabled(true);
  refreshEditor();
}

function checkLifeStatus() {
  if (!isLivesEnabled()) return;  // sin sistema de vidas, sin game over
  if (game.session.lives <= 0) {
    setTimeout(() => showGameOver(), 600);
  }
}

function onReset() {
  if (game.playing) return;
  const lvl = LEVELS[currentLevel];
  if (!confirm('¿Volver al template inicial? Se perderá el código que tienes ahora.')) return;
  cm.setValue(lvl.starterCode);
  localStorage.removeItem(STORAGE.code(lvl.id));
  loadLevel(lvl);
  clearConsole();
  log('Código y nivel reseteados.', 'info');
  refreshEditor();
}

function onLevelWin(lvl) {
  // Persistencia: max nivel desbloqueado
  const max = parseInt(localStorage.getItem(STORAGE.maxLevel) || '0', 10);
  if (lvl.id > max) {
    localStorage.setItem(STORAGE.maxLevel, String(lvl.id));
  }

  // Drop de poción
  if (lvl.gives_potion) {
    addPotion();
    log('🧪 ¡Has encontrado una poción! La verás en tu inventario.', 'ok');
  }

  // Examen: medalla + full heal + max +1
  if (lvl.is_exam) {
    awardMedal(lvl.id);
    saveMedalsToStorage();
    fullHealAndUpgrade();
    log(`🏅 Medalla obtenida. Vidas a tope. Máximo ahora: ${game.session.maxLives}`, 'ok');
  }

  // Aventura completada (boss final): incrementar contador permanente
  if (lvl.is_final) {
    incrementAdventures();
    log(`🏆 Aventura completada. Total: ${getAdventuresCount()}.`, 'ok');
  }

  updateLivesUI();
  updateMenuMedals();

  // Overlay de completado
  setTimeout(() => {
    document.getElementById('complete-title').textContent =
      lvl.is_final ? '🏆 ¡Has derrotado a Vorthak!' : '✓ ¡Nivel completado!';
    document.getElementById('complete-story').textContent = lvl.outro;
    document.getElementById('complete-concept').textContent = lvl.concept;
    document.getElementById('complete-next').textContent =
      lvl.is_final ? 'Ver final ▶' : 'Siguiente nivel ▶';
    populateTheoryBlock(lvl);
    populateSolutionBlock(lvl);
    document.getElementById('overlay-complete').classList.remove('hidden');
    // Focar el botón primario para que Enter funcione y se vea resaltado
    const nextBtn = document.getElementById('complete-next');
    if (nextBtn) {
      // Sacar el foco del editor primero
      if (cm) cm.getInputField().blur();
      setTimeout(() => nextBtn.focus(), 50);
    }
  }, 350);
}

function populateTheoryBlock(lvl) {
  const block = document.getElementById('complete-theory');
  const titleEl = document.getElementById('theory-title');
  const bodyEl = document.getElementById('theory-body');
  const checkbox = document.getElementById('theory-disable-checkbox');

  const t = (typeof THEORIES !== 'undefined') ? THEORIES[lvl.id] : null;
  const enabled = isTheoryEnabled();

  if (!t || !enabled) {
    block.classList.add('hidden');
    return;
  }
  block.classList.remove('hidden');
  titleEl.textContent = t.title || lvl.concept;
  bodyEl.innerHTML = t.body || '';
  checkbox.checked = false;  // siempre desmarcado al abrir
}

function populateSolutionBlock(lvl) {
  const block = document.getElementById('complete-solution');
  const codeEl = document.getElementById('solution-code');
  const toggle = document.getElementById('solution-toggle');
  const code = lvl.solution || lvl.hint || '';
  if (!code || code === 'Examen sin pista.' || code === 'EXAMEN FINAL — sin pista.') {
    block.classList.add('hidden');
    return;
  }
  block.classList.remove('hidden');
  codeEl.innerHTML = highlightPython(code);
  // Empezar siempre colapsado
  toggle.classList.remove('expanded');
  toggle.querySelector('span:last-child').textContent = 'Ver solución de referencia';
}

// Resaltador de sintaxis Python muy básico (suficiente para mostrar soluciones)
function highlightPython(code) {
  const KW = ['def','return','if','elif','else','for','while','in','not','and','or','is','None','True','False','break','continue','pass','import','from','as','lambda','print'];
  const FN = ['print','range','len','str','int','float','list','dict'];
  // Escapar HTML primero
  let html = code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
  // Comentarios
  html = html.replace(/(#[^\n]*)/g, '<span class="com">$1</span>');
  // Strings (simple/doble, no multilínea)
  html = html.replace(/(f?"[^"\n]*"|f?'[^'\n]*')/g, '<span class="str">$1</span>');
  // Números
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="num">$1</span>');
  // Funciones builtin
  const fnRe = new RegExp('\\b(' + FN.join('|') + ')(?=\\s*\\()', 'g');
  html = html.replace(fnRe, '<span class="fn">$1</span>');
  // Palabras clave
  const kwRe = new RegExp('\\b(' + KW.join('|') + ')\\b', 'g');
  html = html.replace(kwRe, '<span class="kw">$1</span>');
  return html;
}

function setRunEnabled(on) {
  document.getElementById('run-btn').disabled = !on;
}

// === Helpers UI ===
function log(msg, type = 'log') {
  const out = document.getElementById('console-output');
  const div = document.createElement('div');
  div.className = type;
  div.textContent = msg;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}
function clearConsole() {
  document.getElementById('console-output').innerHTML = '';
}
function setStatus(msg) {
  document.getElementById('status-msg').textContent = msg;
}
