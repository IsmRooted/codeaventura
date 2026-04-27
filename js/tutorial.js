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
      <p>Esta sección cubre los fundamentos que necesitas para los 11 niveles.
      Léela del tirón o consúltala cuando te atasques.</p>
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
  <ul>
    <li><code>Ctrl + Enter</code> — Ejecutar código</li>
    <li><code>Tab</code> en el editor — Indentar (4 espacios)</li>
  </ul>

  <h3>¿Atascado?</h3>
  <p>Cada nivel tiene un botón <em>"mostrar"</em> al lado de la palabra
  <strong>Pista</strong>. Te enseña una sugerencia de código. También puedes
  consultar la sección <strong>📜 Aprender Python</strong> desde el menú.</p>

  <h3>Tu progreso</h3>
  <p>Se guarda automáticamente en tu navegador (localStorage). El código que
  escribas en cada nivel también se guarda — si te sales y vuelves, sigue ahí.
  El botón <strong>↺ Reset código</strong> restaura el código inicial del
  nivel.</p>
`;

// Teoría específica por nivel — solo lo nuevo de ese nivel.
// Evolutiva: niveles tempranos breves; exámenes recapitulan el capítulo.
const THEORIES = {
  1: {
    title: "print() y comentarios",
    body: `
      <p>En Python una orden ocupa una línea. <code>print("texto")</code> muestra texto en pantalla
      (en CodeAventura, también como bocadillo encima de Aldric).</p>
      <p>Las líneas que empiezan por <code>#</code> son <strong>comentarios</strong>: notas para humanos.
      Python las ignora.</p>
      <pre><span class="com"># esto es un comentario</span>
print(<span class="str">"Hola"</span>)</pre>
      <p><strong>¿Por qué importa?</strong> print es la primera herramienta que tendrás para saber
      qué está pasando dentro de tu código. Lo usarás SIEMPRE.</p>
    `,
  },
  2: {
    title: "Orden de ejecución",
    body: `
      <p>Python ejecuta las líneas <strong>de arriba a abajo, una por una</strong>. Cada
      <code>hero.move_right()</code> es una orden completa: avanza una casilla y termina.</p>
      <p>Si quieres que algo pase varias veces, lo escribes varias veces. Más adelante veremos
      bucles para ahorrar tiempo, pero la base es siempre esta: secuencia.</p>
    `,
  },
  3: {
    title: "Variables: dar nombre a las cosas",
    body: `
      <p>Una <strong>variable</strong> guarda un valor. Se crea con <code>=</code>:</p>
      <pre>nombre = <span class="str">"Aldric"</span>
edad = <span class="num">25</span>
vivo = <span class="kw">True</span></pre>
      <p>Después usas el nombre en lugar del valor. Las variables tienen <em>tipo</em>:
      <code>nombre</code> es un string (texto), <code>edad</code> es un int, <code>vivo</code>
      es un bool.</p>
      <p><strong>¿Por qué importa?</strong> Las variables son la forma de no repetirte y de dar
      sentido al código. Compara <code>print("Aldric")</code> con <code>print(nombre_jugador)</code>
      — el segundo se entiende sin contexto.</p>
    `,
  },
  4: {
    title: "Operadores y conversión de tipos",
    body: `
      <p>Python sabe matemáticas:</p>
      <pre>2 + 3    <span class="com"># 5</span>
10 / 3   <span class="com"># 3.333… división normal</span>
10 // 3  <span class="com"># 3       división entera</span>
10 % 3   <span class="com"># 1       resto</span>
2 ** 8   <span class="com"># 256     potencia</span></pre>
      <p>Atención: <strong>NO puedes sumar texto y número directamente</strong>:</p>
      <pre><span class="str">"Vidas: "</span> + 3   <span class="com"># ✗ TypeError</span>
<span class="str">"Vidas: "</span> + <span class="fn">str</span>(3)  <span class="com"># ✓ "Vidas: 3"</span></pre>
      <p><code>str(...)</code> convierte cualquier valor a texto.</p>
    `,
  },
  5: {
    title: "Repaso del Capítulo 1",
    body: `
      <p>En este capítulo has aprendido los <strong>tres pilares iniciales</strong> de Python:</p>
      <ul>
        <li><strong>print y comentarios</strong> — comunicarte con la consola y dejarte notas.</li>
        <li><strong>Variables</strong> (<code>=</code>) — guardar valores con un nombre.</li>
        <li><strong>Operadores aritméticos y str()</strong> — calcular y combinar texto con números.</li>
      </ul>
      <p>Estos tres elementos aparecerán en CADA programa que escribas el resto de tu vida. Bien
      hecho.</p>
    `,
  },
  6: {
    title: "f-strings: la forma moderna",
    body: `
      <p>Las f-strings son la forma elegante de meter variables en texto. Empiezan con <code>f"</code>.
      Las llaves <code>{ }</code> se sustituyen por el valor de la variable:</p>
      <pre>nombre = <span class="str">"Aldric"</span>
vidas = <span class="num">3</span>
<span class="fn">print</span>(<span class="str">f"</span>{nombre}<span class="str"> tiene </span>{vidas}<span class="str"> vidas"</span>)</pre>
      <p>Adiós para siempre a las concatenaciones largas con <code>+</code> y <code>str()</code>.
      Más legible, más rápido de escribir, menos errores.</p>
    `,
  },
  7: {
    title: "Listas: contenedores de varios valores",
    body: `
      <p>Una lista guarda varios valores entre corchetes:</p>
      <pre>items = [<span class="str">"espada"</span>, <span class="str">"pocion"</span>, <span class="str">"oro"</span>]</pre>
      <ul>
        <li><strong>Acceso por índice</strong> (empieza en 0): <code>items[0]</code> → "espada"</li>
        <li><strong>Último elemento</strong>: <code>items[-1]</code> → "oro"</li>
        <li><strong>Tamaño</strong>: <code>len(items)</code> → 3</li>
        <li><strong>Comprobar si existe</strong>: <code>"oro" in items</code> → True</li>
      </ul>
      <p>Las listas son la estructura más usada en Python. Las verás en TODO.</p>
    `,
  },
  8: {
    title: "for x in lista — recorrer todo",
    body: `
      <p>Para hacer algo con cada elemento de una lista:</p>
      <pre><span class="kw">for</span> objeto <span class="kw">in</span> items:
    <span class="fn">print</span>(objeto)</pre>
      <p>La variable <code>objeto</code> toma el valor de cada elemento, una iteración por elemento.
      La línea interior va <strong>indentada</strong> (4 espacios). La indentación es lo que dice a
      Python qué pertenece al bucle.</p>
      <p>Si te equivocas con la indentación: <code>IndentationError</code>. Es el error más
      frecuente del principiante.</p>
    `,
  },
  9: {
    title: "for + range — repetir N veces",
    body: `
      <p><code>range(N)</code> genera los números 0, 1, 2, ..., N-1. Combinado con <code>for</code>:</p>
      <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">7</span>):
    hero.move_right()</pre>
      <p>Repite el bloque 7 veces. Mucho más limpio que escribir 7 líneas iguales.</p>
      <p>Variantes útiles:</p>
      <ul>
        <li><code>range(2, 5)</code> → 2, 3, 4</li>
        <li><code>range(0, 10, 2)</code> → 0, 2, 4, 6, 8 (paso 2)</li>
        <li><code>range(10, 0, -1)</code> → 10, 9, 8, ... 1 (al revés)</li>
      </ul>
    `,
  },
  10: {
    title: "Repaso del Capítulo 2",
    body: `
      <p>Cuatro herramientas que cambian la forma de programar:</p>
      <ul>
        <li><strong>f-strings</strong> — imprimir mezclando texto y variables sin sufrir.</li>
        <li><strong>Listas</strong> — guardar varios datos en una variable, acceso por índice.</li>
        <li><strong>for in lista</strong> — hacer algo con cada elemento.</li>
        <li><strong>for + range(N)</strong> — repetir un bloque N veces sin escribirlo N veces.</li>
      </ul>
      <p>Listas y bucles son la base de prácticamente TODO el código que vendrá. Si esto se te queda
      claro, el resto del camino es ya cuesta abajo.</p>
    `,
  },
  11: {
    title: "Argumentos en funciones",
    body: `
      <p>Las funciones reciben información dentro de los paréntesis: <strong>argumentos</strong>.</p>
      <pre>hero.attack(<span class="str">"Krug"</span>)</pre>
      <p><code>"Krug"</code> es un argumento string. Sin él, <code>attack</code> no sabría a quién
      atacar. Hay funciones con 0, 1, 2 o más argumentos.</p>
      <p><strong>Atención al detalle</strong>: los strings van entre comillas. Olvidarlas es un
      <code>NameError</code>: Python pensaría que Krug es una variable y no la encontraría.</p>
    `,
  },
  12: {
    title: "Variables que guardan resultados",
    body: `
      <p>Las funciones pueden DEVOLVER valores. Los guardas con una variable:</p>
      <pre>e = hero.find_nearest_enemy()
<span class="fn">print</span>(e)
hero.attack(e)</pre>
      <p><strong>Detalle clave</strong>: cuando <code>e</code> ya contiene el string "Krug", al
      pasarla a otra función la variable va <strong>SIN comillas</strong>:</p>
      <pre>hero.attack(e)        <span class="com"># ✓ correcto</span>
hero.attack(<span class="str">"e"</span>)      <span class="com"># ✗ ataca a un enemigo llamado literalmente "e"</span></pre>
    `,
  },
  13: {
    title: "Decisiones: if",
    body: `
      <p><code>if condición:</code> ejecuta el bloque siguiente solo si la condición es verdadera:</p>
      <pre><span class="kw">if</span> e <span class="kw">is</span> <span class="kw">None</span>:
    <span class="fn">print</span>(<span class="str">"sala vacía"</span>)
<span class="kw">else</span>:
    hero.attack(e)</pre>
      <ul>
        <li>La línea termina en <code>:</code></li>
        <li>El bloque va <strong>indentado</strong> (4 espacios)</li>
        <li><code>is None</code> comprueba si el valor es 'nada'</li>
      </ul>
      <p>El if es la primera forma de hacer que tu programa <em>reaccione</em>.</p>
    `,
  },
  14: {
    title: "Comparar con ==",
    body: `
      <p><code>==</code> (DOBLE igual) compara dos valores. Devuelve <code>True</code> o <code>False</code>:</p>
      <pre>5 == 5      <span class="com"># True</span>
<span class="str">"a"</span> == <span class="str">"b"</span>   <span class="com"># False</span></pre>
      <p><strong>Confusión clásica</strong>:</p>
      <ul>
        <li><code>=</code> ASIGNA un valor a una variable</li>
        <li><code>==</code> COMPARA dos valores</li>
      </ul>
      <p>Si pones <code>=</code> donde va <code>==</code>, Python te lanza un <code>SyntaxError</code>.
      Mejor que pase pronto.</p>
    `,
  },
  15: {
    title: "Repaso del Capítulo 3",
    body: `
      <p>El lenguaje empieza a parecer un LENGUAJE de verdad:</p>
      <ul>
        <li><strong>Argumentos</strong> en funciones — pasar información dentro de los paréntesis.</li>
        <li><strong>Variables que guardan resultados</strong> — la base para encadenar lógica.</li>
        <li><strong>if + ==</strong> — el primer paso de las decisiones.</li>
      </ul>
      <p>Un programa es básicamente: leer datos, decidir, actuar, repetir. Ya tienes 3 de las 4
      piezas.</p>
    `,
  },
  16: {
    title: "if / elif / else — más de dos caminos",
    body: `
      <p><code>elif</code> es 'else if'. Encadena condiciones sin anidar:</p>
      <pre><span class="kw">if</span> tipo == <span class="str">"esqueleto"</span>:
    hero.attack(e)
<span class="kw">elif</span> tipo == <span class="str">"ogro"</span>:
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>): hero.attack(e)
<span class="kw">else</span>:
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>): hero.attack(e)</pre>
      <p>Python comprueba en orden y ejecuta SOLO la primera rama que sea True. <code>else</code> es
      opcional pero recomendable: cubre todos los casos no contemplados.</p>
    `,
  },
  17: {
    title: "Operadores lógicos: and / or / not",
    body: `
      <p>Combinan condiciones booleanas:</p>
      <ul>
        <li><code>a and b</code>: True solo si AMBOS son True</li>
        <li><code>a or b</code>: True si AL MENOS UNO es True</li>
        <li><code>not a</code>: True si a es False</li>
      </ul>
      <pre><span class="kw">if</span> nombre == <span class="str">"Aldric"</span> <span class="kw">and</span> rango == <span class="str">"mago"</span>:
    <span class="fn">print</span>(<span class="str">"autorizado"</span>)</pre>
      <p>Con esto puedes hacer condiciones complejas en una sola línea. Cuidado con la prioridad:
      <code>and</code> tiene mayor prioridad que <code>or</code> — usa paréntesis si dudas.</p>
    `,
  },
  18: {
    title: "while True + break",
    body: `
      <p><code>while CONDICIÓN:</code> repite el bloque MIENTRAS la condición sea True.</p>
      <p><code>while True:</code> repite SIEMPRE — hasta que <code>break</code> salga del bucle:</p>
      <pre><span class="kw">while</span> <span class="kw">True</span>:
    e = hero.find_nearest_enemy()
    <span class="kw">if</span> e <span class="kw">is</span> <span class="kw">None</span>:
        <span class="kw">break</span>
    hero.attack(e)</pre>
      <p>El patrón "haz X mientras quede algo que hacer". <strong>Cuidado</strong>: olvidar el
      <code>break</code> = bucle infinito. CodeAventura corta a las 2000 acciones; en la realidad
      cuelga el programa.</p>
    `,
  },
  19: {
    title: "while con condición declarativa",
    body: `
      <p>En lugar de <code>while True + if + break</code>, pon directamente la condición de salida en el
      while:</p>
      <pre><span class="kw">while</span> <span class="kw">not</span> hero.is_at_exit():
    hero.move_right()</pre>
      <p>"Mientras NO esté en la salida, avanza". Más declarativo y normalmente preferible cuando la
      condición es clara.</p>
      <p>Dos formas, mismo resultado. Elige la más legible para tu caso.</p>
    `,
  },
  20: {
    title: "Repaso del Capítulo 4",
    body: `
      <p>La lógica de control completa:</p>
      <ul>
        <li><strong>if/elif/else</strong> — árboles de decisión limpios.</li>
        <li><strong>and/or/not</strong> — combinar condiciones.</li>
        <li><strong>while True + break</strong> — bucles controlados.</li>
        <li><strong>while con condición</strong> — bucles declarativos.</li>
      </ul>
      <p>Con esto y lo que sabes ya, puedes escribir prácticamente cualquier algoritmo simple.
      Lo que viene ahora son herramientas para hacerlo MEJOR: estructuras de datos y abstracción.</p>
    `,
  },
  21: {
    title: "Diccionarios: pares clave→valor",
    body: `
      <p>Un diccionario guarda pares <code>clave: valor</code> entre <code>{ }</code>:</p>
      <pre>hp = {<span class="str">"Krug"</span>: <span class="num">2</span>, <span class="str">"Bones"</span>: <span class="num">1</span>}
<span class="fn">print</span>(hp[<span class="str">"Krug"</span>])  <span class="com"># 2</span></pre>
      <p>Como una lista, pero accedes <strong>por nombre</strong> en vez de por número. Ideal cuando
      los datos tienen "etiquetas".</p>
      <p>Operaciones útiles:</p>
      <ul>
        <li><code>"Krug" in hp</code> → True</li>
        <li><code>hp.get("Brak", 1)</code> → valor de "Brak", o 1 si no existe</li>
        <li><code>for clave in hp:</code> → recorre las claves</li>
      </ul>
    `,
  },
  22: {
    title: "Funciones: tus propias palabras",
    body: `
      <p>Una función agrupa instrucciones bajo un nombre, definida con <code>def</code>:</p>
      <pre><span class="kw">def</span> <span class="fn">avanzar</span>():
    hero.move_right()
    hero.move_right()
    hero.move_right()</pre>
      <p>Después la llamas con paréntesis: <code>avanzar()</code>. Cada vez que la llamas, ejecuta
      sus líneas.</p>
      <p><strong>¿Por qué importa?</strong> Definir funciones es <em>abstraer</em>: dar nombre a una
      idea. <code>avanzar()</code> dice qué pasa. Los 3 <code>hero.move_right()</code> dicen cómo. La
      próxima vez que cambie el cómo, solo tocas un sitio.</p>
    `,
  },
  23: {
    title: "Funciones con argumentos",
    body: `
      <p>Las funciones pueden recibir información, declarada en los paréntesis del <code>def</code>:</p>
      <pre><span class="kw">def</span> <span class="fn">golpear</span>(enemigo, veces):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(veces):
        hero.attack(enemigo)

<span class="fn">golpear</span>(<span class="str">"Krug"</span>, <span class="num">2</span>)
<span class="fn">golpear</span>(<span class="str">"Throg"</span>, <span class="num">3</span>)</pre>
      <p>Los argumentos hacen que la misma función sirva para distintos casos. <em>Reutilización</em>
      es la palabra clave de toda la programación: escribe una vez, usa muchas.</p>
    `,
  },
  24: {
    title: "return: funciones que devuelven",
    body: `
      <p><code>return</code> hace que la función DEVUELVA un valor. Después puedes guardarlo o
      usarlo:</p>
      <pre><span class="kw">def</span> <span class="fn">doble</span>(n):
    <span class="kw">return</span> n * <span class="num">2</span>

x = <span class="fn">doble</span>(<span class="num">5</span>)        <span class="com"># x = 10</span>
<span class="fn">print</span>(<span class="fn">doble</span>(<span class="num">7</span>))  <span class="com"># 14</span></pre>
      <p>Tras un <code>return</code>, la función termina inmediatamente. Si no hay return, la función
      devuelve <code>None</code> implícitamente.</p>
      <p><strong>El return es la pieza que faltaba</strong> — ahora tus funciones pueden COMPONERSE:
      una función llama a otra y usa su resultado.</p>
    `,
  },
  25: {
    title: "Has aprendido los fundamentos de Python",
    body: `
      <p>Vorthak ha caído. Repasa lo que sabes:</p>
      <ul>
        <li><strong>Sintaxis</strong>: print, comentarios, variables, tipos básicos (int, str, bool).</li>
        <li><strong>Operadores</strong>: aritméticos, comparación, lógicos (and/or/not).</li>
        <li><strong>Texto</strong>: strings, concatenación, f-strings.</li>
        <li><strong>Control de flujo</strong>: if/elif/else, while, for + range.</li>
        <li><strong>Estructuras de datos</strong>: listas, tuplas, diccionarios.</li>
        <li><strong>Abstracción</strong>: def, argumentos, return.</li>
      </ul>
      <p>Con esto puedes empezar a escribir código real. Lo que viene es práctica, ejercicio y
      curiosidad. Si ahora abres cualquier libro o curso de Python, vas a entender la mitad de las
      cosas a la primera.</p>
      <p>El siguiente nivel — fuera de este juego — es construir algo tuyo. ¡Enhorabuena, mago!</p>
    `,
  },
};

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
