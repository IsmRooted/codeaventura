// CodeAventura — Glosario de términos.
// Una fuente, dos consumos: tooltips inline en briefings + página completa.

const GLOSSARY = {
  // ============================================================
  // FUNDAMENTOS
  // ============================================================
  "variable": {
    short: "Un nombre que guarda un valor para usarlo después.",
    long: `<p>Crear una variable es asignar un valor a un nombre con el operador
    <code>=</code>:</p>
    <pre>edad = 25
nombre = "Aldric"</pre>
    <p>Después puedes usar el nombre en lugar del valor. Reglas: solo letras,
    números y guion bajo (_); no empezar por número; mayúsculas y minúsculas
    son distintas (<code>nombre</code> no es lo mismo que <code>Nombre</code>).</p>`,
    related: ["asignación", "string", "entero"],
    seeAlso: { chapter: 1, level: 3 },
  },
  "asignación": {
    short: "Dar un valor a una variable usando =.",
    long: `<p>El operador <code>=</code> ASIGNA: pone el valor a la derecha
    dentro del nombre de la izquierda. NO confundir con <code>==</code> que
    compara.</p>
    <pre>x = 5      # asigna
x == 5     # compara, devuelve True/False</pre>`,
    related: ["variable", "comparador"],
  },
  "string": {
    short: "Texto entre comillas: \"hola\" o 'hola'.",
    long: `<p>Cadena de caracteres. Se escribe entre comillas dobles o
    simples — son equivalentes.</p>
    <pre>nombre = "Aldric"
saludo = 'Hola'</pre>
    <p>Para mezclar texto y variables, usa una <code>f-string</code>:
    <code>f"Hola {nombre}"</code>.</p>`,
    related: ["f-string", "comillas"],
  },
  "f-string": {
    short: "String que mezcla texto y variables: f\"Hola {nombre}\".",
    long: `<p>Empieza con <code>f"</code>. Las variables van entre llaves:</p>
    <pre>nombre = "Aldric"
edad = 25
print(f"Soy {nombre} y tengo {edad} años")</pre>
    <p>Cualquier expresión cabe entre las llaves: <code>f"doble = {2 * x}"</code>.</p>`,
    related: ["string", "variable"],
    seeAlso: { chapter: 2, level: 6 },
  },
  "entero": {
    short: "Número sin decimales: 1, 42, -7.",
    long: `<p>Tipo numérico básico de Python. Sin comillas. Puedes hacer
    aritmética: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>,
    <code>%</code> (módulo, resto de la división).</p>`,
    related: ["operador"],
  },
  "comentario": {
    short: "Línea que empieza por # — Python la ignora.",
    long: `<p>Los comentarios sirven para explicar qué hace tu código. Python
    no los lee.</p>
    <pre># Esto es un comentario
print("Hola")  # Esto también, después del código</pre>`,
  },

  // ============================================================
  // ESTRUCTURAS DE DATOS
  // ============================================================
  "lista": {
    short: "Colección ordenada de valores entre corchetes: [1, 2, 3].",
    long: `<p>Estructura para guardar varios valores. Sintaxis:
    <code>[val, val, val]</code>.</p>
    <pre>puertos = [22, 80, 443]
puertos[0]         # 22 (índice empieza en 0)
puertos[-1]        # 443 (último)
len(puertos)       # 3
puertos.append(8080)   # añade al final</pre>`,
    related: ["índice", "for"],
    seeAlso: { chapter: 2, level: 7 },
  },
  "índice": {
    short: "Posición de un elemento en una lista (empieza en 0).",
    long: `<p>El primer elemento es <code>lista[0]</code>, el segundo
    <code>lista[1]</code>, etc. <code>lista[-1]</code> es el último.</p>
    <p>Si pides un índice fuera de rango → IndexError.</p>`,
    related: ["lista"],
  },
  "diccionario": {
    short: "Estructura clave→valor: {\"a\": 1, \"b\": 2}.",
    long: `<p>Cada entrada tiene una <em>clave</em> (a la izquierda del :) y
    un <em>valor</em> (a la derecha). Búsqueda en O(1).</p>
    <pre>edades = {"Iris": 35, "Aldric": 18}
edades["Iris"]            # 35
edades["Marco"] = 42     # añade entrada nueva
"Iris" in edades         # True</pre>`,
    related: ["lista", "clave"],
    seeAlso: { chapter: 5, level: 21 },
  },
  "clave": {
    short: "El identificador de una entrada en un diccionario.",
    long: `<p>En un dict <code>{"Iris": 35}</code>, la clave es
    <code>"Iris"</code> y el valor es <code>35</code>. Las claves son únicas
    dentro del dict.</p>`,
    related: ["diccionario"],
  },

  // ============================================================
  // CONTROL DE FLUJO
  // ============================================================
  "bucle": {
    short: "Estructura que repite un bloque de código varias veces.",
    long: `<p>Python tiene dos tipos:</p>
    <ul>
      <li><code>for x in lista:</code> — recorre cada elemento.</li>
      <li><code>while condición:</code> — repite mientras la condición sea
      True.</li>
    </ul>`,
    related: ["for", "while", "range"],
  },
  "for": {
    short: "Bucle que recorre cada elemento de una lista o secuencia.",
    long: `<pre>for puerto in [22, 80, 443]:
    print(puerto)</pre>
    <p>La variable <code>puerto</code> toma cada valor de la lista, una
    vez por iteración. La línea indentada es el cuerpo del bucle.</p>`,
    related: ["lista", "range", "bucle"],
    seeAlso: { chapter: 2, level: 8 },
  },
  "range": {
    short: "Genera una secuencia de números: range(5) = 0,1,2,3,4.",
    long: `<p>Útil cuando quieres iterar números, no una lista predefinida.</p>
    <pre>for i in range(5):       # 0, 1, 2, 3, 4
    print(i)
for i in range(2, 7):    # 2, 3, 4, 5, 6
    print(i)</pre>
    <p>El segundo argumento NO se incluye.</p>`,
    related: ["for", "bucle"],
    seeAlso: { chapter: 2, level: 9 },
  },
  "while": {
    short: "Bucle que repite mientras una condición sea True.",
    long: `<pre>n = 0
while n &lt; 5:
    print(n)
    n = n + 1</pre>
    <p>CUIDADO: si la condición nunca pasa a False, el bucle es infinito.
    Asegúrate de que algo dentro del bucle modifica la condición.</p>
    <p><code>break</code> sale del bucle inmediatamente.</p>`,
    related: ["for", "bucle", "break"],
    seeAlso: { chapter: 4, level: 18 },
  },
  "break": {
    short: "Sale del bucle inmediatamente.",
    long: `<pre>while True:
    if hero.is_at_exit():
        break</pre>
    <p>Sin break, ese while sería infinito.</p>`,
    related: ["while"],
  },
  "condicional": {
    short: "Estructura if/elif/else que decide entre caminos.",
    long: `<pre>if vida &gt; 0:
    print("vivo")
elif vida == 0:
    print("muerto")
else:
    print("???")</pre>
    <p>Solo se ejecuta UN bloque, el primero cuya condición sea True.</p>`,
    related: ["if", "comparador", "operador lógico"],
  },
  "if": {
    short: "Ejecuta un bloque si la condición es True.",
    long: `<pre>if x &gt; 10:
    print("grande")</pre>
    <p>Después puede venir <code>elif</code> (si no, prueba otra condición)
    y <code>else</code> (si nada anterior se cumplió).</p>`,
    related: ["condicional", "comparador"],
    seeAlso: { chapter: 3, level: 13 },
  },
  "comparador": {
    short: "Operador que compara y devuelve True/False: ==, !=, <, >, <=, >=.",
    long: `<table style="font-size:12.5px;">
      <tr><td><code>==</code></td><td>iguales</td></tr>
      <tr><td><code>!=</code></td><td>distintos</td></tr>
      <tr><td><code>&lt;</code> / <code>&gt;</code></td><td>menor / mayor</td></tr>
      <tr><td><code>&lt;=</code> / <code>&gt;=</code></td><td>menor o igual / mayor o igual</td></tr>
    </table>
    <p>OJO: <code>=</code> ASIGNA. <code>==</code> COMPARA.</p>`,
    related: ["asignación", "operador lógico"],
    seeAlso: { chapter: 3, level: 14 },
  },
  "operador lógico": {
    short: "and / or / not — combinan True/False.",
    long: `<pre>vivo and tiene_arma     # True solo si AMBOS son True
vivo or tiene_pocion    # True si AL MENOS UNO es True
not vivo                # True si vivo es False</pre>`,
    related: ["comparador", "if"],
    seeAlso: { chapter: 4, level: 17 },
  },
  "None": {
    short: "Valor especial que significa \"nada\" / \"no hay\".",
    long: `<p>Lo devuelven las funciones que no encuentran resultado o que
    no devuelven nada. Se compara con <code>is</code> o <code>==</code>.</p>
    <pre>enemigo = hero.find_nearest_enemy()
if enemigo is None:
    print("No hay enemigos")</pre>`,
    related: ["return"],
    seeAlso: { chapter: 3, level: 13 },
  },

  // ============================================================
  // FUNCIONES
  // ============================================================
  "función": {
    short: "Bloque de código reutilizable definido con def.",
    long: `<pre>def saludar(nombre):
    print(f"Hola {nombre}")

saludar("Aldric")    # llamada</pre>
    <p>Define una vez, llama tantas veces como quieras con argumentos
    distintos.</p>`,
    related: ["argumento", "return", "parámetro"],
    seeAlso: { chapter: 5, level: 22 },
  },
  "argumento": {
    short: "Valor que pasas a una función al llamarla: print(\"hola\").",
    long: `<p>Lo que va entre paréntesis al LLAMAR una función. Distinto de
    <em>parámetro</em> (lo que pones al DEFINIR la función).</p>
    <pre>def saludar(nombre):       # nombre es PARÁMETRO
    print(f"Hola {nombre}")
saludar("Aldric")          # "Aldric" es ARGUMENTO</pre>`,
    related: ["parámetro", "función"],
  },
  "parámetro": {
    short: "Variable que recibe un valor en la definición de una función.",
    long: `<p>Va dentro de los paréntesis cuando defines la función con
    <code>def</code>. Cuando llamas la función, los argumentos pasan a los
    parámetros en orden.</p>`,
    related: ["argumento", "función"],
  },
  "return": {
    short: "Hace que una función devuelva un valor.",
    long: `<pre>def doble(x):
    return x * 2

resultado = doble(5)   # resultado = 10</pre>
    <p>Sin <code>return</code>, la función devuelve <code>None</code>.</p>
    <p><code>return</code> también termina la función — lo que venga
    después no se ejecuta.</p>`,
    related: ["función", "None"],
    seeAlso: { chapter: 5, level: 24 },
  },

  // ============================================================
  // ERRORES Y DEPURACIÓN
  // ============================================================
  "indentación": {
    short: "Sangría al inicio de la línea — en Python ES sintaxis, no estilo.",
    long: `<p>Python usa la indentación (4 espacios) para saber qué líneas
    pertenecen a qué bloque. Si te pasas o te quedas corto → IndentationError.</p>
    <pre>if x &gt; 0:
    print("positivo")    # 4 espacios = dentro del if
print("siempre")         # 0 espacios = fuera del if</pre>`,
    related: ["IndentationError"],
  },
  "SyntaxError": {
    short: "Error: Python no entiende lo que has escrito.",
    long: `<p>Suele ser por: paréntesis sin cerrar, dos puntos olvidados al
    final de un if/for/def, comillas mal puestas. Lee el mensaje del
    error: te dice la línea.</p>`,
    related: ["IndentationError"],
  },
  "NameError": {
    short: "Error: usas una variable que no has definido (o está mal escrita).",
    long: `<pre>print(neombre)     # NameError: name 'neombre' is not defined</pre>
    <p>Causa más común: typo. Comprueba ortografía y mayúsculas.</p>`,
    related: ["variable"],
  },
  "TypeError": {
    short: "Error: estás usando un tipo incompatible (ej: sumar string + número).",
    long: `<pre>"edad: " + 25       # TypeError: can only concatenate str to str</pre>
    <p>Solución: convierte explícitamente con <code>str(25)</code> o usa
    una f-string.</p>`,
    related: ["entero", "string"],
  },
  "IndentationError": {
    short: "Error: la sangría es incorrecta.",
    long: `<p>Probable causa: mezclaste tabs y espacios, o no indentaste el
    cuerpo de un if/for/def. Usa siempre 4 espacios.</p>`,
    related: ["indentación"],
  },

  // ============================================================
  // META
  // ============================================================
  "héroe": {
    short: "El personaje que controlas con el código (apprentice/initiate/mage).",
    long: `<p>Tu interfaz con el grid del nivel. Sus métodos:</p>
    <ul>
      <li><code>hero.move_right()</code> — avanza 1 casilla a la derecha.</li>
      <li><code>hero.move_to(x, y)</code> — va a coordenadas (x, y).</li>
      <li><code>hero.attack(nombre)</code> — ataca al enemigo con ese nombre.</li>
      <li><code>hero.find_nearest_enemy()</code> — devuelve el enemigo más
      cercano o <code>None</code>.</li>
      <li><code>hero.is_at_exit()</code> — True si está sobre la salida.</li>
    </ul>`,
    related: ["método", "argumento"],
  },
  "método": {
    short: "Función asociada a un objeto: hero.attack() es un método de hero.",
    long: `<p>Se llama con la sintaxis <code>objeto.metodo(args)</code>. Como
    una función pero "perteneciente a" ese objeto.</p>`,
    related: ["función", "héroe"],
  },
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
