// Tutorial de fundamentos de Python en español, con ejemplos.

const TUTORIAL = [
  {
    id: 'intro',
    title: '0. Antes de empezar',
    body: `
      <h3>0. Antes de empezar</h3>
      <p>Python es un lenguaje de programación. Tú escribes <em>instrucciones</em>
      y la máquina las ejecuta de arriba a abajo, una por una.</p>
      <p>En este juego, escribes Python real. Cada vez que pulsas
      <strong>▶ Ejecutar</strong>, tu código corre y mueve al héroe.</p>
      <p>Esta sección cubre los fundamentos que necesitas para los 25 niveles
      de la aventura. Léela del tirón o consúltala cuando te atasques —
      también la tienes a mano dentro del juego en el botón
      <strong>📚 CHEAT</strong> (o <code>Ctrl+K</code>).</p>
      <h4>Reglas de oro</h4>
      <ul>
        <li>Python distingue mayúsculas: <code>Hero</code> y <code>hero</code> son distintos.</li>
        <li>La <strong>indentación</strong> (sangría) importa: usa 4 espacios.</li>
        <li>Los comentarios empiezan con <code>#</code> y Python los ignora.</li>
      </ul>
    `,
  },

  {
    id: 'metodos',
    title: '1. Llamar a un método',
    body: `
      <h3>1. Llamar a un método</h3>
      <p>Tu héroe tiene <em>métodos</em> — acciones que sabe hacer. Para
      llamarlos escribes el nombre y dos paréntesis:</p>
      <pre><span class="com"># mover una casilla a la derecha</span>
hero.move_right()</pre>
      <p>Si la acción necesita información extra, va dentro de los paréntesis.
      Eso es un <strong>argumento</strong>:</p>
      <pre><span class="com"># atacar a un enemigo llamado "Krug"</span>
hero.attack(<span class="str">"Krug"</span>)</pre>
      <h4>Métodos del héroe (referencia)</h4>
      <ul>
        <li><code>hero.move_right()</code> / <code>move_left()</code> / <code>move_up()</code> / <code>move_down()</code> — una casilla</li>
        <li><code>hero.move_to(x, y)</code> — camina hasta esa casilla</li>
        <li><code>hero.attack("Nombre")</code> — golpea a un enemigo</li>
        <li><code>hero.find_nearest_enemy()</code> — devuelve el nombre del enemigo más cercano (o <code>None</code>)</li>
        <li><code>hero.is_at_exit()</code> — devuelve <code>True</code> si estás en la puerta</li>
      </ul>
    `,
  },

  {
    id: 'variables',
    title: '2. Variables',
    body: `
      <h3>2. Variables</h3>
      <p>Una <strong>variable</strong> es un nombre al que asocias un valor.
      Se crea con <code>=</code>:</p>
      <pre><span class="num">vida</span> = <span class="num">10</span>
<span class="num">nombre</span> = <span class="str">"Aldric"</span>
<span class="num">vivo</span> = <span class="kw">True</span></pre>
      <p>Después puedes <em>usar</em> el nombre en lugar del valor:</p>
      <pre>enemigo = hero.find_nearest_enemy()
hero.attack(enemigo)
hero.attack(enemigo)  <span class="com"># más legible que repetir el string</span></pre>
      <p>Reglas para los nombres de variables:</p>
      <ul>
        <li>Solo letras, números y guiones bajos: <code>vida_actual</code> ✓</li>
        <li>No pueden empezar por número: <code>1vida</code> ✗</li>
        <li>Mejor descriptivos: <code>n</code> es peor que <code>num_enemigos</code></li>
      </ul>
    `,
  },

  {
    id: 'tipos',
    title: '3. Tipos básicos',
    body: `
      <h3>3. Tipos básicos</h3>
      <p>Cada valor en Python tiene un <em>tipo</em>:</p>
      <ul>
        <li><strong>int</strong> — números enteros: <code>1</code>, <code>42</code>, <code>-5</code></li>
        <li><strong>float</strong> — decimales: <code>3.14</code>, <code>0.5</code></li>
        <li><strong>str</strong> — texto, entre comillas: <code>"hola"</code> o <code>'hola'</code></li>
        <li><strong>bool</strong> — verdadero/falso: <code>True</code> o <code>False</code></li>
        <li><strong>None</strong> — "nada" / vacío: <code>None</code></li>
      </ul>
      <pre>edad = <span class="num">25</span>          <span class="com"># int</span>
pi = <span class="num">3.14</span>          <span class="com"># float</span>
nombre = <span class="str">"Aldric"</span>  <span class="com"># str</span>
vivo = <span class="kw">True</span>         <span class="com"># bool</span>
arma = <span class="kw">None</span>         <span class="com"># sin arma todavía</span></pre>
    `,
  },

  {
    id: 'operadores',
    title: '4. Operadores',
    body: `
      <h3>4. Operadores</h3>
      <h4>Aritméticos</h4>
      <pre>2 + 3    <span class="com"># 5</span>
10 - 4   <span class="com"># 6</span>
3 * 4    <span class="com"># 12</span>
10 / 3   <span class="com"># 3.333…  división normal</span>
10 // 3  <span class="com"># 3       división entera</span>
10 % 3   <span class="com"># 1       resto</span>
2 ** 8   <span class="com"># 256     potencia</span></pre>
      <h4>Comparaciones (devuelven True / False)</h4>
      <pre>5 == 5   <span class="com"># True   igual</span>
5 != 3   <span class="com"># True   distinto</span>
5 &lt; 10   <span class="com"># True</span>
5 &gt; 10   <span class="com"># False</span>
5 &lt;= 5   <span class="com"># True</span>
5 &gt;= 6   <span class="com"># False</span></pre>
      <h4>Lógicos</h4>
      <pre><span class="kw">True</span> <span class="kw">and</span> <span class="kw">True</span>    <span class="com"># True   ambos</span>
<span class="kw">True</span> <span class="kw">or</span> <span class="kw">False</span>    <span class="com"># True   al menos uno</span>
<span class="kw">not</span> <span class="kw">True</span>         <span class="com"># False  lo opuesto</span></pre>
    `,
  },

  {
    id: 'condicionales',
    title: '5. Condicionales (if)',
    body: `
      <h3>5. Condicionales: if / elif / else</h3>
      <p>Las decisiones en código se escriben con <code>if</code>. La línea
      acaba en <code>:</code> y lo que pasa "si se cumple" va indentado.</p>
      <pre><span class="kw">if</span> vida &lt; <span class="num">5</span>:
    <span class="fn">print</span>(<span class="str">"¡Cuidado!"</span>)
<span class="kw">elif</span> vida &lt; <span class="num">10</span>:
    <span class="fn">print</span>(<span class="str">"Algo herido"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">"Perfecto"</span>)</pre>
      <p>En el juego se usa así:</p>
      <pre>e = hero.find_nearest_enemy()
<span class="kw">if</span> e == <span class="str">"Throg"</span>:
    <span class="com"># troll: 3 golpes</span>
    hero.attack(e)
    hero.attack(e)
    hero.attack(e)
<span class="kw">else</span>:
    hero.attack(e)</pre>
      <p>Comprobaciones útiles:</p>
      <ul>
        <li><code>if e is None:</code> — el valor es "nada"</li>
        <li><code>if e:</code> — el valor existe y no es vacío/falso</li>
        <li><code>if not e:</code> — el valor es vacío/falso/None</li>
      </ul>
    `,
  },

  {
    id: 'while',
    title: '6. Bucle while',
    body: `
      <h3>6. Bucle while</h3>
      <p>Repite un bloque <em>mientras</em> una condición sea verdadera.</p>
      <pre>contador = <span class="num">0</span>
<span class="kw">while</span> contador &lt; <span class="num">5</span>:
    <span class="fn">print</span>(contador)
    contador = contador + <span class="num">1</span>
<span class="com"># imprime 0, 1, 2, 3, 4</span></pre>
      <h4>while True + break</h4>
      <p>Un patrón muy común: bucle infinito que sale con <code>break</code>
      cuando se cumple cierta condición:</p>
      <pre><span class="kw">while</span> <span class="kw">True</span>:
    e = hero.find_nearest_enemy()
    <span class="kw">if</span> e <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">break</span>            <span class="com"># sale del while</span>
    hero.attack(e)</pre>
      <p>Otras palabras útiles:</p>
      <ul>
        <li><code>break</code> — sale del bucle</li>
        <li><code>continue</code> — salta al siguiente ciclo del bucle</li>
      </ul>
      <p><strong>Cuidado</strong> con bucles que nunca terminan. CodeAventura
      corta tras 2000 acciones.</p>
    `,
  },

  {
    id: 'for',
    title: '7. Bucle for + range',
    body: `
      <h3>7. Bucle for + range()</h3>
      <p>Cuando sabes <em>cuántas veces</em> quieres repetir, usa
      <code>for</code> con <code>range(N)</code>:</p>
      <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">9</span>):
    hero.move_right()
<span class="com"># equivale a 9 hero.move_right() seguidos</span></pre>
      <p><code>range(N)</code> genera los números <code>0, 1, …, N-1</code>.
      La variable <code>i</code> toma cada uno de esos valores en cada vuelta.</p>
      <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
    <span class="fn">print</span>(i)
<span class="com"># 0
# 1
# 2</span></pre>
      <p>Variantes útiles:</p>
      <ul>
        <li><code>range(2, 7)</code> — del 2 al 6</li>
        <li><code>range(0, 10, 2)</code> — 0, 2, 4, 6, 8</li>
      </ul>
    `,
  },

  {
    id: 'listas',
    title: '8. Listas',
    body: `
      <h3>8. Listas</h3>
      <p>Una lista guarda varios valores en orden, entre corchetes:</p>
      <pre>inventario = [<span class="str">"espada"</span>, <span class="str">"poción"</span>, <span class="str">"oro"</span>]
numeros = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">5</span>, <span class="num">8</span>]</pre>
      <p>Acceder por <em>índice</em> (empezando en 0):</p>
      <pre>inventario[<span class="num">0</span>]   <span class="com"># "espada"</span>
inventario[-<span class="num">1</span>]  <span class="com"># "oro"  (último)</span></pre>
      <p>Operaciones:</p>
      <pre><span class="fn">len</span>(inventario)              <span class="com"># 3 (cuántos hay)</span>
inventario.<span class="fn">append</span>(<span class="str">"escudo"</span>)  <span class="com"># añade al final</span>
<span class="str">"poción"</span> <span class="kw">in</span> inventario     <span class="com"># True</span></pre>
      <p>Recorrer una lista con for:</p>
      <pre><span class="kw">for</span> objeto <span class="kw">in</span> inventario:
    <span class="fn">print</span>(objeto)</pre>
      <p>Listas de pares (tuplas) — útiles para coordenadas:</p>
      <pre>ruta = [(<span class="num">3</span>, <span class="num">2</span>), (<span class="num">8</span>, <span class="num">2</span>), (<span class="num">8</span>, <span class="num">5</span>)]
<span class="kw">for</span> x, y <span class="kw">in</span> ruta:
    hero.move_to(x, y)</pre>
    `,
  },

  {
    id: 'strings',
    title: '9. Strings',
    body: `
      <h3>9. Strings (texto)</h3>
      <p>Texto entre comillas dobles o simples. Las dos formas son equivalentes:</p>
      <pre>a = <span class="str">"hola"</span>
b = <span class="str">'hola'</span></pre>
      <p>Sumar (concatenar) strings con <code>+</code>:</p>
      <pre>nombre = <span class="str">"Aldric"</span>
saludo = <span class="str">"Hola, "</span> + nombre + <span class="str">"!"</span>
<span class="com"># "Hola, Aldric!"</span></pre>
      <p>F-strings: meter variables dentro del texto con <code>f"…{var}…"</code>:</p>
      <pre>vida = <span class="num">7</span>
msg = <span class="str">f"Te quedan </span>{vida}<span class="str"> puntos de vida"</span>
<span class="com"># "Te quedan 7 puntos de vida"</span></pre>
    `,
  },

  {
    id: 'funciones',
    title: '10. Funciones (def)',
    body: `
      <h3>10. Funciones — tus propios hechizos</h3>
      <p>Una función agrupa varias instrucciones bajo un nombre. Se define
      con <code>def</code>, y se llama luego como cualquier método.</p>
      <pre><span class="kw">def</span> <span class="fn">saludar</span>(nombre):
    <span class="fn">print</span>(<span class="str">"Hola, "</span> + nombre)

<span class="fn">saludar</span>(<span class="str">"Aldric"</span>)
<span class="fn">saludar</span>(<span class="str">"Krug"</span>)</pre>
      <p>Pueden recibir varios argumentos y devolver un valor con
      <code>return</code>:</p>
      <pre><span class="kw">def</span> <span class="fn">sumar</span>(a, b):
    <span class="kw">return</span> a + b

resultado = <span class="fn">sumar</span>(<span class="num">3</span>, <span class="num">4</span>)  <span class="com"># 7</span></pre>
      <p>En el juego, una función te ahorra repetir patrones:</p>
      <pre><span class="kw">def</span> <span class="fn">conjuro_doble</span>(enemigo):
    hero.attack(enemigo)
    hero.attack(enemigo)

<span class="kw">while</span> <span class="kw">True</span>:
    e = hero.find_nearest_enemy()
    <span class="kw">if</span> e <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">break</span>
    <span class="fn">conjuro_doble</span>(e)</pre>
    `,
  },

  {
    id: 'errores',
    title: '11. Errores comunes',
    body: `
      <h3>11. Errores comunes (y cómo leerlos)</h3>
      <p>Cuando algo falla, Python te da un error. Aprende a leer la última línea:</p>
      <h4>SyntaxError</h4>
      <pre><span class="kw">if</span> vida &lt; <span class="num">5</span>      <span class="com"># falta el ":"</span>
    <span class="fn">print</span>(<span class="str">"oh"</span>)</pre>
      <p>→ <code>SyntaxError: expected ':'</code> — error de escritura. Suele ser
      un signo olvidado.</p>
      <h4>IndentationError</h4>
      <pre><span class="kw">if</span> vida &lt; <span class="num">5</span>:
<span class="fn">print</span>(<span class="str">"oh"</span>)        <span class="com"># falta indentar</span></pre>
      <p>→ El bloque dentro de <code>if</code> debe tener 4 espacios.</p>
      <h4>NameError</h4>
      <pre>hero.attack(enimigo)  <span class="com"># typo: enimigo no existe</span></pre>
      <p>→ <code>NameError: name 'enimigo' is not defined</code>. Revisa la
      ortografía de tus variables.</p>
      <h4>TypeError</h4>
      <pre>hero.attack()</pre>
      <p>→ Falta argumento. <code>attack</code> necesita un nombre dentro de
      los paréntesis.</p>
    `,
  },
];

const HOWTO_CONTENT = `
  <h3>Conceptos básicos</h3>
  <p>Eres <strong>Aldric</strong>, un héroe controlado por código Python. Cada
  nivel es una mazmorra. Tu objetivo es llegar a la puerta (y a veces, recoger
  gemas o derrotar enemigos por el camino).</p>

  <h3>El editor</h3>
  <p>A la izquierda hay un editor de código. Ahí escribes Python. Pulsa
  <strong>▶ Ejecutar</strong> (o <code>Ctrl+Enter</code>) y tu código corre:
  el héroe ejecuta las acciones en orden y verás el resultado en el canvas.</p>

  <h3>El héroe entiende estos comandos</h3>
  <ul>
    <li><code>hero.move_right()</code> — una casilla a la derecha</li>
    <li><code>hero.move_left()</code> — una casilla a la izquierda</li>
    <li><code>hero.move_up()</code> — una casilla arriba</li>
    <li><code>hero.move_down()</code> — una casilla abajo</li>
    <li><code>hero.move_to(x, y)</code> — camina hasta la casilla (x, y)</li>
    <li><code>hero.attack("Nombre")</code> — golpea a un enemigo (a cualquier distancia)</li>
    <li><code>hero.find_nearest_enemy()</code> — devuelve el nombre del enemigo más cercano, o <code>None</code></li>
    <li><code>hero.is_at_exit()</code> — <code>True</code> si estás sobre la puerta</li>
  </ul>

  <h3>Reglas del mundo</h3>
  <ul>
    <li>Las paredes y los enemigos vivos bloquean el paso.</li>
    <li>Los ataques funcionan a cualquier distancia (es magia, no una espada).</li>
    <li>Caminar sobre una gema la recoge automáticamente.</li>
    <li>De momento los enemigos no atacan: están quietos esperando.</li>
    <li>Si tu código entra en un bucle infinito, se corta tras 2000 acciones.</li>
  </ul>

  <h3>Vidas, pociones y exámenes</h3>
  <ul>
    <li>Empiezas la aventura con <code>♥♥♥</code> 3 vidas. Cada error de Python cuesta UNA vida.</li>
    <li>Cada 5 niveles aumenta tu máximo (4, 5, 6…) hasta 8 en el boss final.</li>
    <li>Algunos niveles te dan una <code>🧪 poción</code>. Aparece en el header del juego: pulsa para usarla y recuperar 1 vida (no se acumula con el máximo).</li>
    <li>Los <strong>niveles examen</strong> (5, 10, 15, 20, 25) tienen reglas extra (por ejemplo: máximo de líneas, o usar un bucle concreto). Sin pista. Romper una regla cuesta una vida.</li>
    <li>Si te quedas sin vidas, vuelves al último checkpoint con vidas a tope.</li>
  </ul>
  <p>¿No quieres stakes? Puedes <strong>desactivar el sistema de vidas</strong>:</p>
  <ul>
    <li>Botón <code>❤ ON/OFF</code> en el header del juego (al lado del toggle de teoría).</li>
    <li>Con vidas OFF: los errores no descuentan vidas, no hay game over, las pociones se desactivan. Aparece <code>∞</code> en lugar de los corazones.</li>
    <li>Puedes activarlo o desactivarlo en cualquier momento. La preferencia se guarda.</li>
  </ul>

  <h3>Aldric habla</h3>
  <p>Cuando usas <code>print(...)</code>, Aldric muestra un bocadillo encima de su
  cabeza con el mensaje. También aparece en la consola de abajo. Útil para saber
  si tu código realmente está llegando a esa línea.</p>

  <h3>Teoría tras cada nivel</h3>
  <p>Al completar un nivel verás una explicación de la teoría nueva que has usado
  (qué hace, por qué importa, cuidado con qué). Es BREVE y solo lo nuevo del
  nivel — no un listado interminable.</p>
  <p>Si te molesta, puedes desactivarla:</p>
  <ul>
    <li><strong>Botón <code>📖 ON/OFF</code></strong> en el header del juego (siempre visible).</li>
    <li><strong>Casilla "No mostrar teoría"</strong> dentro del propio overlay de nivel completado.</li>
  </ul>
  <p>Para reactivarla, vuelve a pulsar el botón del header. La preferencia se guarda
  entre sesiones.</p>

  <h3>Atajos de teclado</h3>
  <table style="font-size:13px;">
    <tr><td><code>Ctrl + Enter</code></td><td>Ejecutar el código</td></tr>
    <tr><td><code>Ctrl + K</code></td><td>Abrir el cheatsheet (referencia rápida)</td></tr>
    <tr><td><code>Esc</code></td><td>Cerrar el overlay activo</td></tr>
    <tr><td><code>Tab</code> en el editor</td><td>Indentar (4 espacios)</td></tr>
  </table>

  <h3>¿Atascado? — Sistema de pista en 4 capas</h3>
  <p>En cada nivel verás 4 botones bajo "Ayuda". Se desbloquean en orden — el
  siguiente solo se activa cuando consultas el anterior. Empieza siempre por
  la capa más baja que necesites:</p>
  <ol>
    <li><strong>📖 Teoría</strong> — concepto Python explicado a fondo.</li>
    <li><strong>🧭 Estrategia</strong> — pseudocódigo paso a paso (sin sintaxis Python).</li>
    <li><strong>🪜 Esqueleto</strong> — código con huecos <code>[TODO: ...]</code> para rellenar.</li>
    <li><strong>💡 Solución</strong> — código completo comentado (último recurso).</li>
  </ol>
  <p>En los niveles examen las 4 capas están bloqueadas — solo briefing y datos.</p>

  <h3>Referencias siempre disponibles</h3>
  <ul>
    <li><strong>📚 Cheatsheet</strong> (<code>Ctrl+K</code> o botón del header) —
        referencia rápida con 23 entradas: API del héroe, sintaxis Python,
        errores comunes y cómo resolverlos.</li>
    <li><strong>🔤 Glosario</strong> (botón en el menú) — 31 términos técnicos
        (variable, lista, función, bucle, …). Aparecen subrayados en los
        briefings; pasa el cursor para ver una definición rápida.</li>
    <li><strong>📜 Aprender Python</strong> (botón en el menú) — manual técnico
        de fundamentos. Léelo del tirón al empezar o consúltalo cuando dudes
        sobre algo de sintaxis.</li>
  </ul>

  <h3>Tu progreso</h3>
  <p>Se guarda automáticamente en tu navegador (localStorage). El código que
  escribas en cada nivel también se guarda — si te sales y vuelves, sigue ahí.
  El botón <strong>↺ Reset</strong> del editor restaura el código inicial del
  nivel.</p>
`;

// THEORIES — movido a js/theories.js


const STORY_CONTENT = `
  <h3>Prólogo</h3>
  <p>El reino de <em>Pythia</em>, antaño próspero, ha caído bajo el hechizo
  del <em>Caos Nulo</em> — una entidad que se alimenta de errores no
  capturados, de variables sin definir, de bucles sin fin.</p>
  <p>Las <strong>runas rúnicas</strong> — los conjuros del lenguaje sagrado
  Python — se han dispersado por mazmorras y bosques. Solo quedan recuerdos
  fragmentados en la memoria de unos pocos.</p>
  <p>Tú eres <strong>Aldric</strong>, el último aprendiz de la Orden Rúnica.
  Tu maestro cayó hace meses. Te toca a ti recuperar las runas, una a una, y
  llegar hasta el corazón del Caos: la <em>Torre del Vacío</em>, donde aguarda
  Vorthak, Señor de la Nada.</p>

  <h3>I — Cripta de Aldric</h3>
  <p>Despiertas con la primera runa: <code>move_right</code>. Tu cuerpo recuerda
  cómo moverse en el mundo. Pequeños pasos a la derecha. Es un comienzo.</p>

  <h3>II — Senderos del bosque torcido</h3>
  <p>Las runas hermanas: <code>left</code>, <code>up</code>, <code>down</code>.
  Combinándolas, ninguna geometría te detiene.</p>

  <h3>III — Mina abandonada</h3>
  <p>Gemas de mana cyan brillan entre el polvo. Las recoges al pisarlas. Pero
  notas algo: repetir tantas líneas iguales… te aburre. Hay algo mejor.</p>

  <h3>IV — Frontera del bosque</h3>
  <p>Krug, el primer ogro. Aprendes el conjuro de combate:
  <code>attack("Krug")</code>. El nombre va dentro: tu primer
  <em>argumento</em>.</p>

  <h3>V — Encrucijada nublada</h3>
  <p>La niebla esconde nombres. Pero tu héroe ve donde tú no:
  <code>find_nearest_enemy()</code>. Para no escribir el resultado dos veces,
  lo guardas en una <strong>variable</strong>.</p>

  <h3>VI — Sala de los tres centinelas</h3>
  <p>Tres enemigos. Atacar línea a línea sería tedioso. Aparece la primera
  gran runa estructural: <code>while</code>. <em>Mientras</em> haya
  enemigos, ataca.</p>

  <h3>VII — Templo de Janus</h3>
  <p>Un esqueleto frágil y un troll resistente. Cada uno necesita una táctica
  distinta. Las decisiones — <code>if / else</code> — entran en escena.</p>

  <h3>VIII — Muralla de los Repetidores</h3>
  <p>Una U inmensa de piedra. Veinticuatro pasos. Aprendes <code>for</code>
  con <code>range(N)</code>: contar es ahora trivial.</p>

  <h3>IX — Biblioteca de las Listas</h3>
  <p>Pergaminos polvorientos con listas de coordenadas. Aprendes
  <code>[…]</code> y <code>move_to(x, y)</code>. La memoria del mundo cabe
  ahora en una variable.</p>

  <h3>X — Forja de los Conjuros</h3>
  <p>El último taller de los antiguos magos. Aquí no se usaban runas — se
  <em>creaban</em>. Definir tus propias funciones con <code>def</code>: tu
  poder ya no depende de lo heredado.</p>

  <h3>XI — La Torre del Vacío</h3>
  <p>Vorthak. El final. Junta todo: variables, condicionales, bucles, funciones.
  El Caos Nulo se disipa con cada golpe certero.</p>

  <h3>Epílogo</h3>
  <p>Las runas vuelven a brillar en los muros del reino. Aldric ya no es
  aprendiz. Y, de paso, has aprendido los fundamentos de Python.</p>
  <p style="text-align:center; color: var(--accent); margin-top: 24px; font-style: italic;">
  — Fin de la primera fase —</p>
`;
