// CodeAventura — teoría por nivel.
// Cada entrada: { title, body }. body es HTML que se inyecta en el overlay
// de teoría (capa 1 del sistema de pistas en 4 tiers).

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

