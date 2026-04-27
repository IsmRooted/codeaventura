// Carga Pyodide y ejecuta el código del jugador.
// stdout → consola + bocadillo; stderr → consola.

let pyodide = null;
let heroProxy = null;

const HERO_INIT = `
import js

class Hero:
    def move_right(self): js.simMove(1, 0)
    def move_left(self):  js.simMove(-1, 0)
    def move_up(self):    js.simMove(0, -1)
    def move_down(self):  js.simMove(0, 1)
    def move_to(self, x, y):
        js.simMoveTo(int(x), int(y))
    def attack(self, name):
        js.simAttack(str(name))
    def find_nearest_enemy(self):
        r = js.simFindNearestEnemy()
        return r if r else None
    def is_at_exit(self):
        return bool(js.simIsAtExit())

hero = Hero()
`;

async function initPyodide() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/",
  });

  // stdout: consola + bocadillo + registro
  pyodide.setStdout({ batched: msg => {
    const text = msg.replace(/\n+$/, '');
    if (!text) return;
    // Una entrada por línea (separar saltos internos)
    text.split('\n').forEach(line => {
      const t = line.trim();
      if (!t) return;
      log(t, 'log');
      if (typeof simSay === 'function') simSay(t);
    });
  }});

  // stderr: rojo en consola
  pyodide.setStderr({ batched: msg => {
    const trimmed = msg.replace(/\n+$/, '');
    if (trimmed) log(trimmed, 'err');
  }});

  await pyodide.runPythonAsync(HERO_INIT);
  heroProxy = pyodide.globals.get("hero");
}

async function runUserCode(code) {
  // Reset estado lógico antes de ejecutar
  game.simState = freshState(game.level);
  game.cmdQueue = [];
  game.lastRunOutput = [];
  game.lastRunHadError = false;

  const ns = pyodide.globals.get("dict")();
  ns.set("hero", heroProxy);
  ns.set("__builtins__", pyodide.globals.get("__builtins__"));

  try {
    await pyodide.runPythonAsync(code, { globals: ns });
    return { ok: true };
  } catch (err) {
    game.lastRunHadError = true;
    const msg = (err && err.message) ? err.message : String(err);
    return { ok: false, error: simplifyPyError(msg) };
  } finally {
    ns.destroy();
  }
}

function simplifyPyError(msg) {
  const lines = msg.split('\n').filter(l => l.trim());
  for (let i = lines.length - 1; i >= 0; i--) {
    if (/^[A-Z][A-Za-z]*Error:/.test(lines[i]) || /^[A-Z][A-Za-z]*Exception/.test(lines[i])) {
      let context = '';
      for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
        if (/line \d+/.test(lines[j])) { context = lines[j].trim() + ' — '; break; }
      }
      return context + lines[i];
    }
  }
  return lines.slice(-3).join(' | ');
}
