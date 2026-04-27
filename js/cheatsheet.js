// CodeAventura — Cheatsheet de referencia rápida.
//
// Tres pestañas:
//   - api    : APIs del juego (hero.move_right, hero.attack, etc.)
//   - syntax : Sintaxis Python esencial (print, f-strings, listas, for, if, ...)
//   - errors : Errores comunes y cómo identificarlos
//
// FORMATO DE ENTRADA:
//   { id, title, subtitle?, body (HTML), tags? }

const CHEATSHEET = {
  api: [
    // [TODO Fase 2] hero.move_right, move_to, attack, find_nearest_enemy,
    // is_at_exit, etc. Con firma + ejemplo.
  ],
  syntax: [
    // [TODO Fase 2] print, comentarios, variables, f-strings, listas, for,
    // range, if/elif/else, comparadores, while, dicts, def, return.
  ],
  errors: [
    // [TODO Fase 2] SyntaxError, NameError, IndentationError, TypeError,
    // IndexError, KeyError. Con ejemplo y solución.
  ],
};

// ----------------------------------------------------------------
// Render
// ----------------------------------------------------------------

function renderCheatsheetTab(tabName) {
  const entries = CHEATSHEET[tabName] || [];
  if (entries.length === 0) {
    return `<div class="cheat-empty">
      <p><em>(En desarrollo — esta pestaña se rellenará en Fase 2 del plan.)</em></p>
      <p>Mientras tanto, consulta la teoría del nivel (📖 Teoría) o el manual
      "📜 Aprender Python" desde el menú principal.</p>
    </div>`;
  }
  return entries.map(e => `
    <article class="cheat-entry" id="cheat-${escAttr(e.id)}">
      <header class="cheat-entry-header">
        <h4 class="cheat-entry-title">${escHtml(e.title)}</h4>
        ${e.subtitle ? `<code class="cheat-entry-sub">${escHtml(e.subtitle)}</code>` : ''}
      </header>
      <div class="cheat-entry-body">${e.body || ''}</div>
    </article>
  `).join('');
}

function findCheatsheetEntry(id) {
  for (const tab of Object.keys(CHEATSHEET)) {
    const found = (CHEATSHEET[tab] || []).find(e => e.id === id);
    if (found) return { tab, entry: found };
  }
  return null;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escAttr(s) {
  return String(s).replace(/[^a-zA-Z0-9_-]/g, '-');
}

window.CHEATSHEET = CHEATSHEET;
window.renderCheatsheetTab = renderCheatsheetTab;
window.findCheatsheetEntry = findCheatsheetEntry;
