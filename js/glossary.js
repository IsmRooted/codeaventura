// CodeAventura — Glosario de términos.
// Una fuente, dos consumos: tooltips inline en briefings + página completa.

const GLOSSARY = {
  // [TODO Fase 2] ~30 términos básicos: variable, lista, bucle, dict, función,
  // parámetro, return, condicional, comparador, etc.
};

// ----------------------------------------------------------------

let _glossaryRegex = null;
function _buildGlossaryRegex() {
  const terms = Object.keys(GLOSSARY);
  if (terms.length === 0) { _glossaryRegex = null; return; }
  terms.sort((a, b) => b.length - a.length);
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  _glossaryRegex = new RegExp('(?<![\\w-])(' + escaped.join('|') + ')(?![\\w-])', 'gi');
}
_buildGlossaryRegex();

function decorateGlossaryTerms(input) {
  if (!input || !_glossaryRegex) return input;
  if (/<[a-z][\s\S]*>/i.test(input)) return _decorateHtmlString(input);
  return input.replace(_glossaryRegex, (match) => {
    const canonical = _findCanonicalKey(match);
    return `<span class="glossary-term" data-term="${escAttrG(canonical)}">${escHtmlG(match)}</span>`;
  });
}

function _decorateHtmlString(html) {
  const parts = html.split(/(<[^>]+>)/g);
  let inSkip = 0;
  const SKIP_OPEN = /^<(pre|code|script|style)\b/i;
  const SKIP_CLOSE = /^<\/(pre|code|script|style)>/i;
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (p.startsWith('<')) {
      if (SKIP_OPEN.test(p)) inSkip++;
      else if (SKIP_CLOSE.test(p)) inSkip = Math.max(0, inSkip - 1);
      continue;
    }
    if (inSkip > 0) continue;
    parts[i] = p.replace(_glossaryRegex, (match) => {
      const canonical = _findCanonicalKey(match);
      return `<span class="glossary-term" data-term="${escAttrG(canonical)}">${escHtmlG(match)}</span>`;
    });
  }
  return parts.join('');
}

function _findCanonicalKey(match) {
  const low = match.toLowerCase();
  for (const k of Object.keys(GLOSSARY)) {
    if (k.toLowerCase() === low) return k;
  }
  return match;
}

function getGlossaryEntry(term) {
  return GLOSSARY[term] || GLOSSARY[_findCanonicalKey(term)] || null;
}

function renderGlossaryPage(filter = '') {
  const terms = Object.keys(GLOSSARY).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()));
  if (terms.length === 0) {
    return `<p><em>El glosario se rellenará en Fase 2 del plan. Mientras tanto,
      cada nivel introduce su propio concepto en la teoría (📖 Teoría desde
      el panel de ayuda dentro del juego).</em></p>`;
  }
  const f = filter.trim().toLowerCase();
  const filtered = f
    ? terms.filter(t =>
        t.toLowerCase().includes(f) ||
        (GLOSSARY[t].short || '').toLowerCase().includes(f))
    : terms;
  if (filtered.length === 0) {
    return `<p>Sin resultados para "<code>${escHtmlG(filter)}</code>".</p>`;
  }
  const groups = {};
  filtered.forEach(t => {
    const ini = t[0].toUpperCase();
    (groups[ini] = groups[ini] || []).push(t);
  });
  return Object.keys(groups).sort().map(letter => `
    <section class="glossary-group">
      <h3 class="glossary-letter">${letter}</h3>
      ${groups[letter].map(t => {
        const e = GLOSSARY[t];
        return `<article class="glossary-entry" id="gl-${escAttrG(t)}">
          <h4 class="glossary-term-title">${escHtmlG(t)}</h4>
          <p class="glossary-short">${e.short || ''}</p>
          ${e.long ? `<div class="glossary-long">${e.long}</div>` : ''}
          ${e.related && e.related.length ? `
            <p class="glossary-related">Relacionado:
              ${e.related.map(r => `<a href="#gl-${escAttrG(r)}">${escHtmlG(r)}</a>`).join(', ')}
            </p>` : ''}
          ${e.seeAlso ? `<p class="glossary-seealso">
            Profundiza en Cap ${e.seeAlso.chapter}${e.seeAlso.level ? ` · Nivel ${e.seeAlso.level}` : ''}.
          </p>` : ''}
        </article>`;
      }).join('')}
    </section>
  `).join('');
}

function getGlossaryStats() { return { total: Object.keys(GLOSSARY).length }; }

function escHtmlG(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escAttrG(s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, '_'); }

window.GLOSSARY = GLOSSARY;
window.decorateGlossaryTerms = decorateGlossaryTerms;
window.getGlossaryEntry = getGlossaryEntry;
window.renderGlossaryPage = renderGlossaryPage;
window.getGlossaryStats = getGlossaryStats;
window.rebuildGlossaryRegex = _buildGlossaryRegex;
