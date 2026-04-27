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
  // ============================================================
  // API DEL HÉROE
  // ============================================================
  api: [
    {
      id: "hero-move_right",
      title: "hero.move_right()",
      subtitle: "→ avanza 1 casilla a la derecha",
      body: `
        <p>Mueve al héroe una casilla hacia la derecha en el grid.</p>
        <pre>hero.move_right()
hero.move_right()
hero.move_right()  <span class="com"># 3 pasos</span></pre>
        <p>Si choca contra una pared, no avanza.</p>
      `,
    },
    {
      id: "hero-move_to",
      title: "hero.move_to(x, y)",
      subtitle: "→ va a coordenadas (x, y)",
      body: `
        <p>El héroe camina hasta la casilla (x, y), evitando paredes con un
        pathfinding básico.</p>
        <pre>hero.move_to(8, 4)   <span class="com"># columna 8, fila 4</span></pre>
        <p>El grid es 12 columnas × 8 filas. Origen (0, 0) arriba a la izquierda.</p>
      `,
    },
    {
      id: "hero-attack",
      title: "hero.attack(nombre)",
      subtitle: "→ ataca al enemigo con ese nombre",
      body: `
        <pre>hero.attack(<span class="str">"Grogol"</span>)</pre>
        <p>El nombre del enemigo aparece en el briefing del nivel. Si el
        enemigo no existe en el mapa, no pasa nada (no es error).</p>
        <p>Mejor: usa <code>find_nearest_enemy()</code> para no hardcodear.</p>
      `,
    },
    {
      id: "hero-find_nearest_enemy",
      title: "hero.find_nearest_enemy()",
      subtitle: "→ Enemy | None",
      body: `
        <p>Devuelve el enemigo más cercano al héroe, o <code>None</code> si
        no queda ninguno en el mapa.</p>
        <pre>enemigo = hero.find_nearest_enemy()
<span class="kw">if</span> enemigo <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"camino libre"</span>)
<span class="kw">else</span>:
    hero.attack(enemigo.name)</pre>
        <p>El objeto Enemy tiene atributos <code>.name</code>, <code>.x</code>,
        <code>.y</code>, <code>.hp</code>.</p>
      `,
    },
    {
      id: "hero-is_at_exit",
      title: "hero.is_at_exit()",
      subtitle: "→ True / False",
      body: `
        <p>Devuelve <code>True</code> si el héroe está pisando la casilla de
        salida del nivel. Útil con <code>while</code>:</p>
        <pre><span class="kw">while not</span> hero.is_at_exit():
    hero.move_right()</pre>
      `,
    },
    {
      id: "hero-attrs",
      title: "hero.x, hero.y, hero.hp, hero.name",
      subtitle: "→ atributos de lectura",
      body: `
        <ul>
          <li><code>hero.x</code>, <code>hero.y</code> — posición actual.</li>
          <li><code>hero.hp</code> — puntos de vida en este nivel.</li>
          <li><code>hero.name</code> — nombre del personaje (apprentice / initiate / mage).</li>
        </ul>
        <p>Útiles para tomar decisiones:</p>
        <pre><span class="kw">if</span> hero.hp &lt; <span class="num">3</span>:
    hero.move_to(<span class="num">1</span>, <span class="num">1</span>)  <span class="com"># a casa</span></pre>
      `,
    },
  ],

  // ============================================================
  // SINTAXIS PYTHON
  // ============================================================
  syntax: [
    {
      id: "print",
      title: "print(...)",
      subtitle: "Escribe en la consola",
      body: `
        <pre><span class="fn">print</span>(<span class="str">"Hola"</span>)
<span class="fn">print</span>(<span class="str">"x ="</span>, x)              <span class="com"># varios args, separados por espacio</span>
<span class="fn">print</span>(<span class="str">f"x vale </span>{x}<span class="str">"</span>)         <span class="com"># f-string</span></pre>
      `,
    },
    {
      id: "variables",
      title: "Variables y asignación",
      subtitle: "nombre = valor",
      body: `
        <pre>edad = <span class="num">25</span>
nombre = <span class="str">"Aldric"</span>
abierto = <span class="kw">True</span></pre>
        <p>Reglas: solo letras, números y _. No empezar por número. Distingue
        mayúsculas. <code>=</code> ASIGNA, <code>==</code> COMPARA.</p>
      `,
    },
    {
      id: "fstrings",
      title: "f-strings",
      subtitle: 'f"texto {var}"',
      body: `
        <pre>nombre = <span class="str">"Aldric"</span>
edad = <span class="num">25</span>
<span class="fn">print</span>(<span class="str">f"</span>{nombre}<span class="str">, </span>{edad}<span class="str"> años"</span>)</pre>
        <p>Cualquier expresión cabe entre llaves: <code>f"el doble = {x*2}"</code>.</p>
      `,
    },
    {
      id: "lists",
      title: "Listas",
      subtitle: "[v1, v2, v3]",
      body: `
        <pre>puertos = [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]
puertos[<span class="num">0</span>]            <span class="com"># 22 (índice 0)</span>
puertos[-<span class="num">1</span>]           <span class="com"># 443 (último)</span>
<span class="fn">len</span>(puertos)         <span class="com"># 3</span>
puertos.<span class="fn">append</span>(<span class="num">8080</span>) <span class="com"># añade al final</span>
<span class="num">22</span> <span class="kw">in</span> puertos       <span class="com"># True</span></pre>
      `,
    },
    {
      id: "for-loops",
      title: "for x in lista",
      subtitle: "Recorrer una colección",
      body: `
        <pre><span class="kw">for</span> p <span class="kw">in</span> puertos:
    <span class="fn">print</span>(p)</pre>
        <p>Para iterar números, usa <code>range</code>:</p>
        <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):       <span class="com"># 0,1,2,3,4</span>
    <span class="fn">print</span>(i)
<span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>, <span class="num">7</span>):    <span class="com"># 2,3,4,5,6</span>
    <span class="fn">print</span>(i)</pre>
        <p>El segundo argumento NO se incluye.</p>
      `,
    },
    {
      id: "if-elif-else",
      title: "if / elif / else",
      subtitle: "Decisiones",
      body: `
        <pre><span class="kw">if</span> hp &gt; <span class="num">5</span>:
    <span class="fn">print</span>(<span class="str">"sano"</span>)
<span class="kw">elif</span> hp &gt; <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">"herido"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"muerto"</span>)</pre>
        <p>Solo se ejecuta UN bloque, el primero cuya condición sea True.
        La indentación (4 espacios) marca qué pertenece a qué.</p>
      `,
    },
    {
      id: "comparators",
      title: "Comparadores y operadores lógicos",
      subtitle: "==, !=, <, >, and, or, not",
      body: `
        <table style="font-size:12.5px;">
          <tr><td><code>==</code></td><td>iguales</td></tr>
          <tr><td><code>!=</code></td><td>distintos</td></tr>
          <tr><td><code>&lt; &gt; &lt;= &gt;=</code></td><td>orden</td></tr>
          <tr><td><code>and</code></td><td>True si AMBOS son True</td></tr>
          <tr><td><code>or</code></td><td>True si AL MENOS UNO es True</td></tr>
          <tr><td><code>not</code></td><td>invierte True/False</td></tr>
        </table>
        <pre><span class="kw">if</span> vivo <span class="kw">and not</span> envenenado:
    ...</pre>
      `,
    },
    {
      id: "while",
      title: "while — bucle con condición",
      subtitle: "while cond:",
      body: `
        <pre><span class="kw">while not</span> hero.is_at_exit():
    hero.move_right()</pre>
        <p>Repite mientras la condición sea True. Si nunca pasa a False, el
        bucle es infinito. Usa <code>break</code> para salir antes:</p>
        <pre><span class="kw">while True</span>:
    enemigo = hero.find_nearest_enemy()
    <span class="kw">if</span> enemigo <span class="kw">is None</span>:
        <span class="kw">break</span>
    hero.attack(enemigo.name)</pre>
      `,
    },
    {
      id: "dicts",
      title: "Diccionarios",
      subtitle: "{clave: valor}",
      body: `
        <pre>edades = {<span class="str">"Iris"</span>: <span class="num">35</span>, <span class="str">"Aldric"</span>: <span class="num">18</span>}
edades[<span class="str">"Iris"</span>]              <span class="com"># 35</span>
edades[<span class="str">"Marco"</span>] = <span class="num">42</span>      <span class="com"># añade entrada nueva</span>
<span class="str">"Iris"</span> <span class="kw">in</span> edades         <span class="com"># True</span>

<span class="kw">for</span> nombre, edad <span class="kw">in</span> edades.<span class="fn">items</span>():
    <span class="fn">print</span>(nombre, edad)</pre>
      `,
    },
    {
      id: "functions",
      title: "Funciones (def y return)",
      subtitle: "def nombre(args): return valor",
      body: `
        <pre><span class="kw">def</span> <span class="fn">doble</span>(x):
    <span class="kw">return</span> x * <span class="num">2</span>

resultado = <span class="fn">doble</span>(<span class="num">5</span>)   <span class="com"># 10</span></pre>
        <p>Sin <code>return</code>, la función devuelve <code>None</code>.
        <code>return</code> también termina la función — el código posterior
        dentro de la función no se ejecuta.</p>
      `,
    },
  ],

  // ============================================================
  // ERRORES COMUNES
  // ============================================================
  errors: [
    {
      id: "syntax-error",
      title: "SyntaxError",
      subtitle: "Python no entiende lo que has escrito",
      body: `
        <p>Causas habituales:</p>
        <ul>
          <li>Olvidaste los <code>:</code> al final del <code>if</code>,
          <code>for</code>, <code>def</code>, <code>while</code>.</li>
          <li>Paréntesis sin cerrar.</li>
          <li>Comillas mal puestas (mezclar <code>"</code> con <code>'</code>
          en la misma string).</li>
        </ul>
        <pre><span class="kw">if</span> x &gt; <span class="num">0</span>      <span class="com"># SyntaxError — falta el :</span>
    <span class="fn">print</span>(x)</pre>
      `,
    },
    {
      id: "name-error",
      title: "NameError: name 'X' is not defined",
      subtitle: "Variable no existe",
      body: `
        <p>Estás usando una variable que no has creado, o su nombre está mal escrito.</p>
        <pre>nombre = <span class="str">"Aldric"</span>
<span class="fn">print</span>(neombre)   <span class="com"># NameError — typo</span></pre>
        <p>Solución: revisa la ortografía exacta. Python distingue mayúsculas.</p>
      `,
    },
    {
      id: "indentation-error",
      title: "IndentationError",
      subtitle: "La sangría es incorrecta",
      body: `
        <p>Python usa la sangría (4 espacios) como sintaxis. Si te pasas o te
        quedas corto, peta.</p>
        <pre><span class="kw">if</span> x &gt; <span class="num">0</span>:
<span class="fn">print</span>(x)        <span class="com"># IndentationError — falta indentar</span></pre>
        <p>Solución: 4 espacios al inicio de cada línea dentro del bloque.
        No mezcles tabs y espacios.</p>
      `,
    },
    {
      id: "type-error",
      title: "TypeError",
      subtitle: "Tipos incompatibles",
      body: `
        <p>Estás haciendo una operación con tipos que no encajan.</p>
        <pre><span class="str">"edad: "</span> + <span class="num">25</span>   <span class="com"># TypeError — no puedes sumar str + int</span></pre>
        <p>Solución: convierte explícitamente con <code>str()</code> o usa
        f-string:</p>
        <pre><span class="str">"edad: "</span> + <span class="fn">str</span>(<span class="num">25</span>)
<span class="str">f"edad: </span>{<span class="num">25</span>}<span class="str">"</span>      <span class="com"># más limpio</span></pre>
      `,
    },
    {
      id: "index-error",
      title: "IndexError",
      subtitle: "Índice fuera de rango",
      body: `
        <p>Estás pidiendo un elemento que no existe en la lista.</p>
        <pre>lista = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]
lista[<span class="num">5</span>]     <span class="com"># IndexError — solo hay 3 elementos</span></pre>
        <p>Comprueba antes con <code>len(lista)</code> o usa
        <code>if x in lista</code>.</p>
      `,
    },
    {
      id: "key-error",
      title: "KeyError",
      subtitle: "La clave no existe en el dict",
      body: `
        <pre>d = {<span class="str">"a"</span>: <span class="num">1</span>}
d[<span class="str">"b"</span>]     <span class="com"># KeyError: 'b'</span></pre>
        <p>Soluciones:</p>
        <ul>
          <li><code>d.get("b", default)</code> — devuelve default si no existe.</li>
          <li><code>if "b" in d:</code> — comprobar antes.</li>
        </ul>
      `,
    },
    {
      id: "infinite-loop",
      title: "Bucle infinito (no es excepción, pero rompe el juego)",
      subtitle: "while que nunca acaba",
      body: `
        <pre><span class="kw">while</span> hero.hp &gt; <span class="num">0</span>:
    <span class="fn">print</span>(<span class="str">"vivo"</span>)   <span class="com"># nunca cambia hero.hp → infinito</span></pre>
        <p>El motor del juego limita el número de iteraciones para protegerte,
        pero perderás tiempo. Asegúrate de que algo dentro del while modifica
        la condición.</p>
      `,
    },
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
