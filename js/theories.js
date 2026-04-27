// CodeAventura — teoría por nivel.
// Cada entrada: { title, body }. body es HTML que se inyecta en el overlay
// de teoría (capa 1 del sistema de pistas en 4 tiers).
//
// Filosofía: cada teoría cubre el concepto NUEVO del nivel, con:
//   1. ¿Qué es? (definición desde cero)
//   2. Sintaxis básica con ejemplo
//   3. Ejemplo progresivo
//   4. Patrón típico aplicado al juego (héroe, hero.attack, etc.)
//   5. Errores típicos y cómo identificarlos
//   6. Conexión con conceptos previos cuando aplica

const THEORIES = {

  // ============================================================
  // CAPÍTULO 1 — DESPERTAR
  // ============================================================

  1: {
    title: "print() y comentarios",
    body: `
      <h4>¿Qué es print?</h4>
      <p><code>print()</code> es una <strong>función</strong> incorporada en Python
      que escribe en la salida estándar — en CodeAventura, en la consola
      del juego (la zona inferior derecha de la pantalla) y como bocadillo
      sobre la cabeza del héroe.</p>
      <p>Es la primera herramienta que aprendes y la usarás constantemente
      durante toda tu vida programando: para depurar, para mostrar
      resultados, para "hablar" con quien usa tu programa.</p>

      <h4>Sintaxis básica</h4>
      <pre><span class="fn">print</span>(<span class="str">"Hola, mundo"</span>)</pre>
      <p>Dos partes:</p>
      <ul>
        <li><code>print</code> — el nombre de la función.</li>
        <li><code>(...)</code> — los <em>paréntesis</em>. Lo que va dentro
            es lo que la función imprime. Eso se llama <em>argumento</em>.</li>
      </ul>

      <h4>Ejemplos progresivos</h4>
      <pre><span class="com"># 1. Un texto cualquiera</span>
<span class="fn">print</span>(<span class="str">"Soy Aldric"</span>)

<span class="com"># 2. Varios argumentos separados por coma — espacio entre ellos</span>
<span class="fn">print</span>(<span class="str">"Edad:"</span>, <span class="num">25</span>)
<span class="com"># Edad: 25</span>

<span class="com"># 3. Comillas dobles o simples — Python las trata igual</span>
<span class="fn">print</span>(<span class="str">'también funciona'</span>)</pre>

      <h4>Comentarios — el # ignorado</h4>
      <p>Las líneas que empiezan con <code>#</code> son <strong>comentarios</strong>:
      Python las ignora completamente. Sirven para que tú (o quien lea tu
      código) entiendas qué hace cada parte.</p>
      <pre><span class="com"># Esto es un comentario — Python no lo lee</span>
<span class="fn">print</span>(<span class="str">"Hola"</span>)  <span class="com"># también puede ir después del código</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>1. Olvidar las comillas en un texto</dt>
        <dd><code>print(Hola)</code> → NameError. Python piensa que <em>Hola</em>
        es una variable y no la encuentra.</dd>
        <dt>2. Olvidar los paréntesis</dt>
        <dd><code>print "Hola"</code> → SyntaxError. En Python 3 los paréntesis
        son obligatorios.</dd>
        <dt>3. Mezclar comillas en la misma cadena</dt>
        <dd><code>print("Hola')</code> → SyntaxError. Empieza con doble, cierra
        con doble. O simple a simple.</dd>
      </dl>

      <h4>Por qué importa</h4>
      <p>Cuando lleves cinco capítulos y tu código no haga lo que esperas,
      tu primera herramienta para entender qué pasa va a ser meter
      <code>print</code> por todas partes hasta encontrar dónde se rompe.
      Esa técnica se llama <em>printf debugging</em> y es probablemente la
      más usada del mundo.</p>
    `,
  },

  2: {
    title: "Múltiples órdenes — el orden importa",
    body: `
      <h4>Líneas que se ejecutan en orden</h4>
      <p>Python ejecuta tu código de <strong>arriba hacia abajo</strong>, una
      línea a la vez. Cuando termina una, pasa a la siguiente. Sin saltos
      mágicos: lo que escribes primero, ocurre primero.</p>
      <pre><span class="fn">print</span>(<span class="str">"Empiezo"</span>)
hero.<span class="fn">move_right</span>()
<span class="fn">print</span>(<span class="str">"Acabo"</span>)</pre>
      <p>Ese código imprime <em>"Empiezo"</em>, luego mueve al héroe, luego
      imprime <em>"Acabo"</em>. En ese orden exacto.</p>

      <h4>Aplicado al juego</h4>
      <p>Para que el héroe avance N casillas, escribes N llamadas a
      <code>hero.move_right()</code>, una por línea:</p>
      <pre>hero.<span class="fn">move_right</span>()  <span class="com"># 1</span>
hero.<span class="fn">move_right</span>()  <span class="com"># 2</span>
hero.<span class="fn">move_right</span>()  <span class="com"># 3</span>
hero.<span class="fn">move_right</span>()  <span class="com"># 4</span></pre>
      <p>Sí, es repetitivo. En el Cap 2 verás <code>for</code>, que te ahorra
      escribir N veces lo mismo. Pero por ahora tener que repetir te ayuda
      a entender que <em>cada línea es una acción</em>.</p>

      <h4>Indentación: cuidado al copiar y pegar</h4>
      <p>Cuando copies y pegues, asegúrate de que las líneas pegadas
      empiezan en la columna 0 (sin espacios al inicio). Si quedan
      indentadas por accidente, Python lanzará un IndentationError. La
      indentación significa algo en Python — la veremos en el Cap 3.</p>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Una sola línea con dos órdenes</dt>
        <dd>NO escribas <code>hero.move_right() hero.move_right()</code> en la
        misma línea. Una orden por línea, salto de línea entre ellas.</dd>
        <dt>Olvidar los paréntesis</dt>
        <dd><code>hero.move_right</code> sin <code>()</code> es solo una
        referencia a la función — no la ejecuta. Tienes que <em>llamar</em>
        a la función con paréntesis.</dd>
      </dl>

      <h4>Truco</h4>
      <p>Para copiar/pegar líneas rápidamente: <code>Ctrl+C</code> sobre la
      línea entera y <code>Ctrl+V</code> donde quieras. Casi todos los
      editores lo hacen sin necesidad de seleccionar.</p>
    `,
  },

  3: {
    title: "Variables — dar nombre a las cosas",
    body: `
      <h4>¿Qué es una variable?</h4>
      <p>Una <strong>variable</strong> es un nombre que pones a un valor
      para poder reutilizarlo. La creas con el operador <code>=</code>:</p>
      <pre>nombre = <span class="str">"Aldric"</span>
edad = <span class="num">18</span>
vivo = <span class="kw">True</span></pre>
      <p>Después puedes usar el nombre en cualquier sitio donde antes
      usabas el valor:</p>
      <pre><span class="fn">print</span>(nombre)        <span class="com"># Aldric</span>
<span class="fn">print</span>(<span class="str">"Edad:"</span>, edad) <span class="com"># Edad: 18</span></pre>

      <h4>Reglas para los nombres de variables</h4>
      <ul>
        <li>Solo letras, números y guion bajo (<code>_</code>).</li>
        <li>NO pueden empezar por número: <code>1nombre</code> no vale,
            <code>nombre1</code> sí.</li>
        <li>Distinguen mayúsculas: <code>nombre</code> y <code>Nombre</code>
            son DOS variables distintas.</li>
        <li>Mejor descriptivos: <code>edad</code> &gt; <code>e</code>,
            <code>num_enemigos</code> &gt; <code>n</code>.</li>
        <li>Convención Python: <code>snake_case</code> (todo minúsculas,
            palabras separadas por <code>_</code>).</li>
      </ul>

      <h4>= no es lo mismo que ==</h4>
      <p>Ojo con esta confusión clásica:</p>
      <ul>
        <li><code>=</code> ASIGNA: <code>x = 5</code> guarda 5 en x.</li>
        <li><code>==</code> COMPARA: <code>x == 5</code> devuelve True/False.</li>
      </ul>
      <p>Si los confundes, Python te lo dirá con un SyntaxError o un
      comportamiento raro.</p>

      <h4>print(variable) ≠ print("variable")</h4>
      <p>Sutil pero importante:</p>
      <pre>nombre = <span class="str">"Aldric"</span>
<span class="fn">print</span>(nombre)         <span class="com"># Aldric — el VALOR de la variable</span>
<span class="fn">print</span>(<span class="str">"nombre"</span>)       <span class="com"># nombre — el LITERAL "nombre"</span></pre>
      <p>Sin comillas → variable. Con comillas → texto literal.</p>

      <h4>Las variables se pueden cambiar</h4>
      <p>Una variable es <em>variable</em>: su valor puede cambiar.</p>
      <pre>vida = <span class="num">3</span>
<span class="fn">print</span>(vida)   <span class="com"># 3</span>
vida = vida - <span class="num">1</span>
<span class="fn">print</span>(vida)   <span class="com"># 2</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>NameError: name 'X' is not defined</dt>
        <dd>Estás usando una variable que no has creado. Causa más común:
        typo. Comprueba ortografía y mayúsculas exactas.</dd>
        <dt>Asignar al revés</dt>
        <dd><code>"Aldric" = nombre</code> no funciona. El nombre va a la
        izquierda del <code>=</code>, el valor a la derecha.</dd>
      </dl>
    `,
  },

  4: {
    title: "Operadores y conversión de tipos",
    body: `
      <h4>Aritmética básica</h4>
      <p>Python sabe matemáticas. Los operadores principales:</p>
      <pre><span class="num">2</span> + <span class="num">3</span>     <span class="com"># 5    suma</span>
<span class="num">10</span> - <span class="num">4</span>    <span class="com"># 6    resta</span>
<span class="num">3</span> * <span class="num">4</span>     <span class="com"># 12   multiplicación</span>
<span class="num">10</span> / <span class="num">3</span>    <span class="com"># 3.33 división (siempre devuelve float)</span>
<span class="num">10</span> // <span class="num">3</span>   <span class="com"># 3    división ENTERA (descarta decimales)</span>
<span class="num">10</span> % <span class="num">3</span>    <span class="com"># 1    módulo (resto de la división)</span>
<span class="num">2</span> ** <span class="num">8</span>    <span class="com"># 256  potencia</span></pre>

      <h4>Asignar el resultado</h4>
      <pre>vida = <span class="num">3</span>
energia = <span class="num">5</span>
total = vida + energia
<span class="fn">print</span>(total)   <span class="com"># 8</span></pre>
      <p>Puedes mezclar números y variables — Python los evalúa.</p>

      <h4>Concatenar texto y números — el TypeError</h4>
      <p>Aquí viene un error CLÁSICO:</p>
      <pre><span class="str">"Edad: "</span> + <span class="num">25</span>
<span class="com"># TypeError: can only concatenate str (not "int") to str</span></pre>
      <p>Python no acepta sumar texto + número directamente. ¿Qué tendría
      que hacer? ¿"Edad: 25"? ¿O 31 (sumando los códigos)? Como la
      ambigüedad es real, Python prefiere que tú lo aclares.</p>

      <h4>str() — convertir número a texto</h4>
      <p>La función <code>str()</code> convierte cualquier valor a su
      representación textual:</p>
      <pre><span class="fn">str</span>(<span class="num">25</span>)         <span class="com"># "25"</span>
<span class="fn">str</span>(<span class="num">3.14</span>)       <span class="com"># "3.14"</span>
<span class="fn">str</span>(<span class="kw">True</span>)       <span class="com"># "True"</span>

<span class="str">"Edad: "</span> + <span class="fn">str</span>(<span class="num">25</span>)   <span class="com"># "Edad: 25" ✓</span></pre>

      <h4>int() — texto → número</h4>
      <p>Lo contrario también existe. Útil cuando recibes texto que en
      realidad es un número:</p>
      <pre><span class="fn">int</span>(<span class="str">"42"</span>)      <span class="com"># 42 (entero)</span>
<span class="fn">float</span>(<span class="str">"3.14"</span>)  <span class="com"># 3.14 (decimal)</span>

<span class="fn">int</span>(<span class="str">"hola"</span>)    <span class="com"># ValueError — no es un número</span></pre>

      <h4>Atajo: f-strings (lo verás en el Cap 2)</h4>
      <p>En el siguiente capítulo verás una forma mucho más limpia:</p>
      <pre><span class="fn">print</span>(<span class="str">f"Edad: </span>{<span class="num">25</span>}<span class="str">"</span>)   <span class="com"># f-string — sin str() ni +</span></pre>
      <p>Por ahora, str() y + es lo que tienes.</p>

      <h4>Errores típicos</h4>
      <dl>
        <dt>TypeError al concatenar</dt>
        <dd>Convierte con <code>str()</code> o usa f-string.</dd>
        <dt>División que devuelve float cuando esperabas int</dt>
        <dd><code>10 / 3</code> = 3.33. Si quieres entero, usa <code>10 // 3</code>.</dd>
        <dt>Olvidar los paréntesis en operaciones complejas</dt>
        <dd><code>2 + 3 * 4</code> = 14 (Python respeta el orden matemático).
        Si quieres (2+3)*4 = 20, pon paréntesis.</dd>
      </dl>
    `,
  },

  5: {
    title: "Repaso del Capítulo 1",
    body: `
      <h4>Cuatro pilares iniciales</h4>
      <p>En el Cap 1 has cubierto los cuatro pilares más fundamentales de
      cualquier lenguaje de programación:</p>
      <ul>
        <li><strong>print y comentarios</strong> — comunicarte con la salida
        y dejarte notas.</li>
        <li><strong>Líneas en orden</strong> — Python ejecuta de arriba a abajo.</li>
        <li><strong>Variables</strong> (<code>=</code>) — dar nombre a valores
        para reutilizarlos.</li>
        <li><strong>Operadores y str()</strong> — calcular y combinar tipos.</li>
      </ul>

      <h4>Lo que viene en el Cap 2</h4>
      <p>El Capítulo 2 te enseña a <em>repetir</em> y a <em>guardar varias
      cosas</em>:</p>
      <ul>
        <li><strong>f-strings</strong> — la forma elegante de mezclar texto
        y variables (sin más <code>+ str(...)</code>).</li>
        <li><strong>Listas</strong> — guardar varios valores en una sola
        variable: <code>[1, 2, 3]</code>.</li>
        <li><strong>for</strong> — recorrer una lista (o repetir N veces con
        <code>range</code>) sin escribir N líneas iguales.</li>
      </ul>

      <h4>Recursos siempre disponibles</h4>
      <p>Cuando te atasques, recuerda:</p>
      <ul>
        <li><strong>📖 Teoría</strong> en cada nivel (este overlay) — concepto
        explicado a fondo.</li>
        <li><strong>🧭 Estrategia</strong> — pseudocódigo paso a paso si la
        teoría no basta.</li>
        <li><strong>🪜 Esqueleto</strong> — código con huecos para rellenar.</li>
        <li><strong>💡 Solución</strong> — código completo (último recurso).</li>
        <li><strong>📚 Cheatsheet</strong> (Ctrl+K) — referencia rápida.</li>
        <li><strong>🔤 Glosario</strong> (botón en menú) — términos técnicos.</li>
      </ul>

      <h4>Truco profesional: enumerate</h4>
      <p>Aún no lo necesitas en el juego, pero verás esto en cualquier
      código Python real. Cuando recorres una lista y necesitas el índice
      Y el valor a la vez:</p>
      <pre><span class="kw">for</span> i, ip <span class="kw">in</span> <span class="fn">enumerate</span>(ips, <span class="num">1</span>):
    <span class="fn">print</span>(<span class="str">f"</span>{i}<span class="str">: </span>{ip}<span class="str">"</span>)</pre>
      <p><code>enumerate(lista, 1)</code> empieza a contar desde 1. Útil
      cuando muestras resultados numerados al usuario.</p>
    `,
  },

  // ============================================================
  // CAPÍTULO 2 — EL BOSQUE TORCIDO
  // ============================================================

  6: {
    title: "f-strings — la forma moderna",
    body: `
      <h4>El problema del nivel anterior</h4>
      <p>Para mezclar texto y variables aprendiste:</p>
      <pre><span class="str">"Edad: "</span> + <span class="fn">str</span>(<span class="num">25</span>) + <span class="str">" años"</span></pre>
      <p>Funciona, pero es feo. Cuantas más variables, peor. Comillas,
      pluses y str() por todas partes.</p>

      <h4>La solución: f-strings</h4>
      <p>Empieza la cadena con <code>f"</code> (o <code>f'</code>) y mete
      las variables entre llaves <code>{ }</code>:</p>
      <pre>edad = <span class="num">25</span>
<span class="fn">print</span>(<span class="str">f"Edad: </span>{edad}<span class="str"> años"</span>)
<span class="com"># Edad: 25 años</span></pre>
      <p>Más limpio. Y NO necesitas <code>str()</code>: la f-string convierte
      automáticamente.</p>

      <h4>Cualquier expresión cabe entre {}</h4>
      <pre>x = <span class="num">5</span>
<span class="fn">print</span>(<span class="str">f"El doble de </span>{x}<span class="str"> es </span>{x * <span class="num">2</span>}<span class="str">"</span>)
<span class="com"># El doble de 5 es 10</span>

nombre = <span class="str">"Aldric"</span>
<span class="fn">print</span>(<span class="str">f"En mayúsculas: </span>{nombre.<span class="fn">upper</span>()}<span class="str">"</span>)
<span class="com"># En mayúsculas: ALDRIC</span></pre>

      <h4>Format spec — modificar la presentación</h4>
      <p>Después de la variable, dos puntos y un especificador:</p>
      <pre>pi = <span class="num">3.14159</span>
<span class="fn">print</span>(<span class="str">f"</span>{pi:<span class="str">.2f</span>}<span class="str">"</span>)        <span class="com"># 3.14 (2 decimales)</span>
<span class="fn">print</span>(<span class="str">f"</span>{<span class="num">42</span>:<span class="str">05d</span>}<span class="str">"</span>)         <span class="com"># 00042 (rellena con ceros)</span>
<span class="fn">print</span>(<span class="str">f"</span>{nombre:<span class="str">&gt;10</span>}<span class="str">"</span>)    <span class="com"># "    Aldric" (alineado dcha, ancho 10)</span></pre>

      <h4>Ejemplo aplicado al juego</h4>
      <pre>nombre = <span class="str">"Aldric"</span>
vida = <span class="num">3</span>
<span class="fn">print</span>(<span class="str">f"</span>{nombre}<span class="str"> tiene </span>{vida}<span class="str"> vidas"</span>)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar la f</dt>
        <dd><code>"Edad: {edad}"</code> imprime literalmente <em>{edad}</em>.
        Necesitas la <code>f</code> al principio.</dd>
        <dt>Confundir comillas dentro de la f-string</dt>
        <dd>Si abres con <code>f"</code>, dentro usa simples:
        <code>f"hola {d['key']}"</code> ✓.</dd>
        <dt>Llaves literales</dt>
        <dd>Para imprimir una llave literal (<code>{</code> o <code>}</code>),
        duplícala: <code>f"{{ literal }}"</code>.</dd>
      </dl>

      <h4>Compatibilidad</h4>
      <p>Las f-strings existen desde Python 3.6 (2016). Es <em>la</em>
      forma actual de hacer formato de cadenas. Si ves
      <code>"%s" % var</code> o <code>"{}".format(var)</code> en código
      antiguo, son los predecesores.</p>
    `,
  },

  7: {
    title: "Listas — contenedores de varios valores",
    body: `
      <h4>¿Qué es una lista?</h4>
      <p>Una <strong>lista</strong> guarda varios valores ordenados en una
      sola variable. Sintaxis: corchetes <code>[ ]</code> con valores
      separados por comas.</p>
      <pre>inventario = [<span class="str">"espada"</span>, <span class="str">"pocion"</span>, <span class="str">"mapa"</span>, <span class="str">"oro"</span>]
puertos = [<span class="num">22</span>, <span class="num">80</span>, <span class="num">443</span>]
mixta = [<span class="num">1</span>, <span class="str">"dos"</span>, <span class="kw">True</span>, <span class="num">3.14</span>]   <span class="com"># tipos mezclados, válido</span></pre>

      <h4>Operaciones básicas</h4>
      <pre>inventario = [<span class="str">"espada"</span>, <span class="str">"pocion"</span>, <span class="str">"mapa"</span>, <span class="str">"oro"</span>]

<span class="fn">len</span>(inventario)        <span class="com"># 4 (cuántos hay)</span>
inventario[<span class="num">0</span>]            <span class="com"># "espada" (PRIMER elemento, índice 0)</span>
inventario[<span class="num">1</span>]            <span class="com"># "pocion"</span>
inventario[-<span class="num">1</span>]           <span class="com"># "oro" (ÚLTIMO, índice negativo)</span>
<span class="str">"mapa"</span> <span class="kw">in</span> inventario  <span class="com"># True</span>

inventario.<span class="fn">append</span>(<span class="str">"varita"</span>)   <span class="com"># añade al final</span>
<span class="fn">len</span>(inventario)        <span class="com"># 5 ahora</span>

inventario.<span class="fn">remove</span>(<span class="str">"oro"</span>)     <span class="com"># elimina (la primera coincidencia)</span></pre>

      <h4>Índice empieza en 0 — el clásico que se olvida</h4>
      <p>El primer elemento es <code>lista[0]</code>, NO <code>lista[1]</code>.
      Es contrario a cómo contamos los humanos pero es estándar en casi
      todos los lenguajes.</p>
      <p>Trucos útiles:</p>
      <ul>
        <li><code>lista[0]</code> — primer elemento.</li>
        <li><code>lista[-1]</code> — último elemento (sin importar la longitud).</li>
        <li><code>lista[1:3]</code> — porción del 1 al 2 inclusive (slicing).</li>
      </ul>

      <h4>Las listas se modifican</h4>
      <p>A diferencia de los strings, las listas son <em>mutables</em>:
      puedes cambiar elementos.</p>
      <pre>nums = [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>]
nums[<span class="num">0</span>] = <span class="num">99</span>
<span class="fn">print</span>(nums)   <span class="com"># [99, 2, 3]</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>IndexError: list index out of range</dt>
        <dd>Pides un índice mayor que <code>len(lista) - 1</code>. Si la lista
        tiene 3 elementos, los índices válidos son 0, 1, 2. Pedir el 3 falla.</dd>
        <dt>Confundir crear lista con asignar</dt>
        <dd><code>lista = []</code> crea lista vacía. <code>lista[0] = "x"</code>
        SOLO funciona si la lista YA tiene un elemento en la posición 0.</dd>
        <dt>Olvidar las comas</dt>
        <dd><code>["a" "b"]</code> sin coma fusiona los strings ("ab"), no
        crea dos elementos. Coma siempre.</dd>
      </dl>

      <h4>Por qué importan</h4>
      <p>Las listas son la estructura más usada del lenguaje. En el resto del
      curso (y en cualquier código Python real) procesarás listas de cosas
      constantemente: enemigos, posiciones, mensajes, datos.</p>
    `,
  },

  8: {
    title: "for in lista — recorrer todo",
    body: `
      <h4>El problema</h4>
      <p>Tienes una lista y quieres hacer algo con cada elemento. Sin
      <code>for</code>, tendrías que escribir una línea por elemento:</p>
      <pre>inventario = [<span class="str">"espada"</span>, <span class="str">"pocion"</span>, <span class="str">"mapa"</span>]
<span class="fn">print</span>(inventario[<span class="num">0</span>])
<span class="fn">print</span>(inventario[<span class="num">1</span>])
<span class="fn">print</span>(inventario[<span class="num">2</span>])</pre>
      <p>Feo, repetitivo, y se rompe si la lista cambia de tamaño.</p>

      <h4>La solución: for</h4>
      <pre><span class="kw">for</span> objeto <span class="kw">in</span> inventario:
    <span class="fn">print</span>(objeto)</pre>
      <p>Tres elementos clave:</p>
      <ul>
        <li><code>for</code> — palabra clave que inicia el bucle.</li>
        <li><code>objeto</code> — variable que toma cada valor de la lista.
        El nombre es libre — podrías llamarla <code>x</code>, <code>item</code>,
        <code>cosa</code>... lo que tenga sentido.</li>
        <li><code>in inventario</code> — qué lista recorrer.</li>
        <li><code>:</code> al final — OBLIGATORIO. Si lo olvidas, SyntaxError.</li>
      </ul>

      <h4>Indentación: 4 espacios</h4>
      <p>La línea(s) que van dentro del bucle se indentan con 4 espacios.
      Eso es lo que dice a Python qué pertenece al bucle:</p>
      <pre><span class="kw">for</span> p <span class="kw">in</span> puertos:
    <span class="fn">print</span>(p)        <span class="com"># DENTRO — se ejecuta una vez por iteración</span>
    <span class="fn">print</span>(<span class="str">"---"</span>)    <span class="com"># DENTRO también</span>
<span class="fn">print</span>(<span class="str">"final"</span>)        <span class="com"># FUERA — solo una vez al terminar</span></pre>

      <h4>Ejemplos progresivos</h4>
      <pre><span class="com"># 1. Imprimir cada elemento</span>
<span class="kw">for</span> hechizo <span class="kw">in</span> [<span class="str">"fuego"</span>, <span class="str">"hielo"</span>, <span class="str">"rayo"</span>]:
    <span class="fn">print</span>(hechizo)

<span class="com"># 2. Acumular un total</span>
total = <span class="num">0</span>
<span class="kw">for</span> n <span class="kw">in</span> [<span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>]:
    total = total + n
<span class="fn">print</span>(total)   <span class="com"># 10</span>

<span class="com"># 3. Atacar a una lista de enemigos</span>
enemigos = [<span class="str">"Krug"</span>, <span class="str">"Bones"</span>, <span class="str">"Throg"</span>]
<span class="kw">for</span> e <span class="kw">in</span> enemigos:
    hero.<span class="fn">attack</span>(e)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar los dos puntos</dt>
        <dd><code>for x in lista</code> sin <code>:</code> → SyntaxError.</dd>
        <dt>Indentación inconsistente</dt>
        <dd>4 espacios SIEMPRE. No 3, no 5, no tab. Mezclar tabs y espacios
        en el mismo archivo es la causa #1 de IndentationError.</dd>
        <dt>Modificar la lista mientras la recorres</dt>
        <dd><code>for x in lista: lista.remove(x)</code> da resultados
        impredecibles. Si necesitas modificar, recorre una copia.</dd>
      </dl>
    `,
  },

  9: {
    title: "for + range — repetir N veces",
    body: `
      <h4>¿Y si quiero repetir algo N veces sin tener una lista?</h4>
      <p>El nivel anterior recorrías listas de cosas concretas. Pero a
      veces solo quieres "haz esto 7 veces". Para eso está
      <code>range(N)</code>:</p>
      <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">7</span>):
    hero.<span class="fn">move_right</span>()</pre>
      <p>Eso ejecuta hero.move_right() siete veces. La variable <code>i</code>
      toma los valores 0, 1, 2, 3, 4, 5, 6 (sí, NO incluye el 7).</p>

      <h4>Las tres formas de range</h4>
      <pre><span class="fn">range</span>(<span class="num">5</span>)        <span class="com"># 0, 1, 2, 3, 4</span>
<span class="fn">range</span>(<span class="num">2</span>, <span class="num">7</span>)     <span class="com"># 2, 3, 4, 5, 6 (segundo NO incluido)</span>
<span class="fn">range</span>(<span class="num">0</span>, <span class="num">10</span>, <span class="num">2</span>) <span class="com"># 0, 2, 4, 6, 8 (paso 2)</span>
<span class="fn">range</span>(<span class="num">10</span>, <span class="num">0</span>, -<span class="num">1</span>) <span class="com"># 10, 9, 8, ..., 1 (paso negativo)</span></pre>

      <h4>¿Necesitas la variable i?</h4>
      <p>Si solo quieres repetir N veces y no usas <code>i</code> para nada,
      la convención es llamarla <code>_</code> (subrayado):</p>
      <pre><span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">7</span>):
    hero.<span class="fn">move_right</span>()</pre>
      <p>Funciona igual. <code>_</code> indica a quien lea tu código:
      "esta variable existe pero no la uso".</p>

      <h4>Cuando sí importa el i</h4>
      <pre><span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    <span class="fn">print</span>(<span class="str">f"Iteración </span>{i + <span class="num">1</span>}<span class="str">"</span>)
<span class="com"># Iteración 1
# Iteración 2
# ...</span></pre>

      <h4>range vs lista — cuál usar</h4>
      <ul>
        <li><strong>Tienes una lista de cosas concretas</strong> →
        <code>for x in lista:</code></li>
        <li><strong>Quieres repetir N veces</strong> →
        <code>for _ in range(N):</code></li>
        <li><strong>Quieres índice + valor</strong> →
        <code>for i, x in enumerate(lista):</code></li>
      </ul>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Pensar que range(N) incluye N</dt>
        <dd><code>range(7)</code> NO incluye el 7. Va de 0 a 6. Si quieres
        7 elementos, ya los tienes (los siete del 0 al 6). Es estándar en
        Python: el límite final es exclusivo.</dd>
        <dt>Olvidar los paréntesis de range</dt>
        <dd><code>for i in range 7:</code> → SyntaxError. Es función,
        necesita paréntesis.</dd>
        <dt>Usar range con lista en lugar de iterar la lista</dt>
        <dd>Anti-patrón: <code>for i in range(len(lista)): print(lista[i])</code>.
        Mejor: <code>for x in lista: print(x)</code>.</dd>
      </dl>
    `,
  },

  10: {
    title: "Repaso del Capítulo 2",
    body: `
      <h4>Tres herramientas que cambian el juego</h4>
      <ul>
        <li><strong>f-strings</strong> — la forma elegante de mezclar texto
        y variables. Adiós a <code>" + str(x) + "</code>.</li>
        <li><strong>Listas</strong> — guardar varios valores en uno.
        <code>len()</code>, <code>[i]</code>, <code>append()</code>,
        <code>in</code>.</li>
        <li><strong>for</strong> — recorrer una lista o repetir N veces con
        <code>range</code>. Sin más copy-paste de líneas iguales.</li>
      </ul>

      <h4>Antes y después</h4>
      <p>Compara cómo era el código en el Cap 1 vs ahora:</p>
      <pre><span class="com"># Cap 1: avanzar 5 casillas era 5 líneas</span>
hero.<span class="fn">move_right</span>()
hero.<span class="fn">move_right</span>()
hero.<span class="fn">move_right</span>()
hero.<span class="fn">move_right</span>()
hero.<span class="fn">move_right</span>()

<span class="com"># Cap 2: 2 líneas, da igual N</span>
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">5</span>):
    hero.<span class="fn">move_right</span>()</pre>
      <p>Esa progresión — escribir cada vez menos para hacer cada vez más —
      es lo que tiene programar.</p>

      <h4>Lo que viene en el Cap 3</h4>
      <ul>
        <li><strong>Argumentos</strong>: pasar información a métodos.
        <code>hero.attack("Krug")</code>.</li>
        <li><strong>find_nearest_enemy()</strong>: tu primer método que
        DEVUELVE un valor.</li>
        <li><strong>if / else</strong>: tomar decisiones según el resultado.</li>
        <li><strong>None</strong>: el valor "no hay nada".</li>
      </ul>

      <h4>Ejercicio extra (opcional)</h4>
      <p>Antes de pasar al Cap 3, intenta combinar lo aprendido:</p>
      <pre><span class="com"># Imprime los puertos pares del 0 al 20</span>
<span class="kw">for</span> p <span class="kw">in</span> <span class="fn">range</span>(<span class="num">0</span>, <span class="num">21</span>, <span class="num">2</span>):
    <span class="fn">print</span>(<span class="str">f"Puerto: </span>{p}<span class="str">"</span>)</pre>
    `,
  },

  // ============================================================
  // CAPÍTULO 3 — NIEBLA Y NOMBRES
  // ============================================================

  11: {
    title: "Argumentos — pasar información a una función",
    body: `
      <h4>Métodos sin argumentos vs con argumentos</h4>
      <p>Hasta ahora has llamado métodos del héroe con paréntesis vacíos:</p>
      <pre>hero.<span class="fn">move_right</span>()</pre>
      <p>Ese método NO necesita información extra: solo "muévete a la
      derecha". Pero algunos métodos necesitan saber MÁS — necesitan un
      <strong>argumento</strong>:</p>
      <pre>hero.<span class="fn">attack</span>(<span class="str">"Krug"</span>)</pre>
      <p>"Krug" entre los paréntesis es el argumento. Le dice a
      <code>attack</code> a quién atacar.</p>

      <h4>Argumentos con tipos</h4>
      <p>Un argumento puede ser cualquier valor:</p>
      <pre>hero.<span class="fn">attack</span>(<span class="str">"Krug"</span>)        <span class="com"># string</span>
<span class="fn">print</span>(<span class="num">42</span>)               <span class="com"># entero</span>
<span class="fn">range</span>(<span class="num">0</span>, <span class="num">10</span>, <span class="num">2</span>)        <span class="com"># varios argumentos: int, int, int</span>
hero.<span class="fn">move_to</span>(<span class="num">5</span>, <span class="num">3</span>)       <span class="com"># dos enteros: x, y</span></pre>

      <h4>Strings — comillas obligatorias</h4>
      <p>Cuando el argumento es texto literal, va entre comillas:</p>
      <pre>hero.<span class="fn">attack</span>(<span class="str">"Krug"</span>)    <span class="com"># ✓ "Krug" como string</span>
hero.<span class="fn">attack</span>(Krug)      <span class="com"># ✗ NameError: Krug no existe como variable</span></pre>

      <h4>El método attack en CodeAventura</h4>
      <ul>
        <li>Funciona a cualquier distancia (es magia).</li>
        <li>El argumento es el NOMBRE del enemigo, no su tipo.</li>
        <li>Si el enemigo no existe en el mapa, no pasa nada — no es error.</li>
        <li>Algunos enemigos aguantan varios golpes (HP). Hay que llamar
        attack tantas veces como su HP.</li>
      </ul>

      <h4>Patrón: combinar con for</h4>
      <p>¿Atacar a alguien 3 veces?</p>
      <pre><span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
    hero.<span class="fn">attack</span>(<span class="str">"Throg"</span>)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar las comillas</dt>
        <dd><code>hero.attack(Krug)</code> → NameError. Krug no es una
        variable, es un texto. Comillas obligatorias.</dd>
        <dt>Atacar a alguien que ya no está</dt>
        <dd>No es error pero el ataque "se pierde". Cuando hagas niveles
        con varios enemigos, mejor usa <code>find_nearest_enemy</code>
        (siguiente nivel).</dd>
        <dt>Confundir mayúsculas en el nombre</dt>
        <dd><code>hero.attack("krug")</code> con minúscula no encuentra a
        "Krug" mayúscula. Los strings distinguen mayúsculas.</dd>
      </dl>
    `,
  },

  12: {
    title: "Variables que guardan resultados de funciones",
    body: `
      <h4>Funciones que devuelven un valor</h4>
      <p>Algunos métodos no solo HACEN cosas — también te DEVUELVEN un
      valor. Como <code>find_nearest_enemy</code>:</p>
      <pre>hero.<span class="fn">find_nearest_enemy</span>()  <span class="com"># devuelve "Krug" (o el nombre del más cercano)</span></pre>
      <p>El método busca el enemigo más cercano y te entrega su nombre.
      Pero si no lo guardas en una variable, ese valor se pierde.</p>

      <h4>Captura el resultado en una variable</h4>
      <pre>enemigo = hero.<span class="fn">find_nearest_enemy</span>()
<span class="fn">print</span>(enemigo)              <span class="com"># muestra el nombre</span>
hero.<span class="fn">attack</span>(enemigo)       <span class="com"># lo usa para atacar</span></pre>
      <p>Aquí la variable <code>enemigo</code> guarda el string devuelto
      por <code>find_nearest_enemy()</code>. Después puedes pasarlo a
      otros métodos sin volver a llamar a <code>find_nearest</code>.</p>

      <h4>Variable string ≠ string literal — el detalle clave</h4>
      <p>Compara estos dos:</p>
      <pre><span class="com"># Literal — "Krug" entre comillas, ES un string</span>
hero.<span class="fn">attack</span>(<span class="str">"Krug"</span>)

<span class="com"># Variable — enemigo CONTIENE "Krug", ya ES el string</span>
enemigo = hero.<span class="fn">find_nearest_enemy</span>()
hero.<span class="fn">attack</span>(enemigo)        <span class="com"># SIN comillas: la variable ya es el string</span>

<span class="com"># Esto está MAL:</span>
hero.<span class="fn">attack</span>(<span class="str">"enemigo"</span>)      <span class="com"># busca a un enemigo llamado "enemigo"</span></pre>
      <p>Cuando pasas una variable, NO le pongas comillas. La variable ya
      contiene el texto.</p>

      <h4>Reutilización: el motivo principal</h4>
      <p>¿Por qué guardar en variable en vez de llamar varias veces?
      Limpieza y eficiencia:</p>
      <pre><span class="com"># Sin variable — feo y se llama 3 veces a find_nearest</span>
hero.<span class="fn">attack</span>(hero.<span class="fn">find_nearest_enemy</span>())
hero.<span class="fn">attack</span>(hero.<span class="fn">find_nearest_enemy</span>())
hero.<span class="fn">attack</span>(hero.<span class="fn">find_nearest_enemy</span>())

<span class="com"># Con variable — limpio</span>
e = hero.<span class="fn">find_nearest_enemy</span>()
hero.<span class="fn">attack</span>(e)
hero.<span class="fn">attack</span>(e)
hero.<span class="fn">attack</span>(e)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Pasar la variable entre comillas</dt>
        <dd><code>hero.attack("e")</code> busca un enemigo llamado "e",
        no usa el valor de la variable e.</dd>
        <dt>Olvidar los paréntesis al llamar</dt>
        <dd><code>e = hero.find_nearest_enemy</code> sin <code>()</code> no
        llama a la función — guarda una referencia a la función. Después
        <code>e</code> no es el nombre, es la función misma.</dd>
        <dt>Volver a llamar después de matar</dt>
        <dd>Después de matar al enemigo, <code>find_nearest</code> devuelve
        el siguiente (o None si no quedan). No es lo mismo que el primero.</dd>
      </dl>
    `,
  },

  13: {
    title: "Decisiones — if y None",
    body: `
      <h4>Tomar decisiones con if</h4>
      <p>Hasta ahora tu código va siempre por el mismo camino. <code>if</code>
      te permite hacer algo SOLO si una condición se cumple:</p>
      <pre><span class="kw">if</span> hero.hp &lt; <span class="num">3</span>:
    <span class="fn">print</span>(<span class="str">"¡Cuidado!"</span>)</pre>
      <p>Estructura:</p>
      <ul>
        <li><code>if</code> — palabra clave.</li>
        <li>Después, una <strong>condición</strong> que se evalúa a True o False.</li>
        <li><code>:</code> al final — OBLIGATORIO.</li>
        <li>Líneas indentadas (4 espacios) — solo se ejecutan si la condición
        es True.</li>
      </ul>

      <h4>El valor None — "no hay nada"</h4>
      <p>Algunos métodos devuelven <code>None</code> cuando no encuentran
      resultado. <code>find_nearest_enemy</code> devuelve None si no quedan
      enemigos.</p>
      <pre>e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">if</span> e <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"Sala vacía"</span>)</pre>

      <h4>is None vs == None</h4>
      <p>Para comparar con None, la convención Python es usar <code>is</code>:</p>
      <ul>
        <li><code>e is None</code> ← preferido</li>
        <li><code>e == None</code> ← funciona pero menos pythónico</li>
      </ul>
      <p>(<code>is</code> compara identidad — son el MISMO objeto. None solo
      hay UN None en todo Python, así que <code>is</code> es la forma
      correcta.)</p>

      <h4>else — la otra rama</h4>
      <pre><span class="kw">if</span> e <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"vacío"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">f"hay </span>{e}<span class="str">"</span>)
    hero.<span class="fn">attack</span>(e)</pre>
      <p><code>else</code> ejecuta su bloque cuando la condición del if fue
      False. Solo se ejecuta UNA de las dos ramas.</p>

      <h4>Indentación: la regla de oro</h4>
      <p>Lo que está dentro del if/else va con 4 espacios. Lo que está
      fuera, sin indentar:</p>
      <pre><span class="kw">if</span> e <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"vacío"</span>)        <span class="com"># dentro del if</span>
    <span class="fn">print</span>(<span class="str">"sigue dentro"</span>)
<span class="fn">print</span>(<span class="str">"fuera, siempre"</span>)  <span class="com"># fuera, siempre se ejecuta</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar los dos puntos</dt>
        <dd><code>if e is None</code> sin <code>:</code> → SyntaxError.</dd>
        <dt>Confundir = con ==</dt>
        <dd><code>if x = 5:</code> → SyntaxError. Para comparar usa <code>==</code>.</dd>
        <dt>IndentationError</dt>
        <dd>El bloque del if necesita indentarse. Si Python encuentra un if
        con la siguiente línea sin indentar, lanza error.</dd>
        <dt>else en línea separada</dt>
        <dd><code>else</code> debe ir alineado con su <code>if</code>, sin indentar
        respecto a él, y con <code>:</code> al final.</dd>
      </dl>
    `,
  },

  14: {
    title: "Comparar con == — el doble igual",
    body: `
      <h4>= asigna · == compara</h4>
      <p>Esta confusión es CLÁSICA. Veamos los dos:</p>
      <pre>x = <span class="num">5</span>      <span class="com"># ASIGNA: pone 5 en x</span>
x == <span class="num">5</span>     <span class="com"># COMPARA: devuelve True/False (en este caso True)</span></pre>
      <p>Recordad: si necesitas decidir, usa dos iguales seguidos.</p>

      <h4>La familia de comparadores</h4>
      <table style="font-size:13px;">
        <tr><td><code>==</code></td><td>iguales</td><td>5 == 5 → True</td></tr>
        <tr><td><code>!=</code></td><td>distintos</td><td>5 != 3 → True</td></tr>
        <tr><td><code>&lt;</code></td><td>menor</td><td>3 &lt; 5 → True</td></tr>
        <tr><td><code>&gt;</code></td><td>mayor</td><td>5 &gt; 3 → True</td></tr>
        <tr><td><code>&lt;=</code></td><td>menor o igual</td><td>5 &lt;= 5 → True</td></tr>
        <tr><td><code>&gt;=</code></td><td>mayor o igual</td><td>5 &gt;= 5 → True</td></tr>
      </table>

      <h4>Cualquier tipo se puede comparar con ==</h4>
      <pre><span class="num">5</span> == <span class="num">5</span>           <span class="com"># True</span>
<span class="str">"a"</span> == <span class="str">"a"</span>       <span class="com"># True</span>
<span class="str">"a"</span> == <span class="str">"A"</span>       <span class="com"># False (mayúsculas distinguen)</span>
[<span class="num">1</span>,<span class="num">2</span>] == [<span class="num">1</span>,<span class="num">2</span>] <span class="com"># True</span>
<span class="num">5</span> == <span class="str">"5"</span>         <span class="com"># False (entero vs string)</span></pre>

      <h4>Aplicado al juego</h4>
      <pre>e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">if</span> e == <span class="str">"Bones"</span>:
    hero.<span class="fn">attack</span>(e)        <span class="com"># 1 ataque (Bones es débil)</span>
<span class="kw">else</span>:
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
        hero.<span class="fn">attack</span>(e)    <span class="com"># 3 ataques (asume otro enemigo más duro)</span></pre>

      <h4>if con expresiones complejas</h4>
      <p>La condición puede ser cualquier expresión que dé True/False:</p>
      <pre><span class="kw">if</span> hero.hp &lt;= <span class="num">2</span>:
    <span class="fn">print</span>(<span class="str">"casi muerto"</span>)

<span class="kw">if</span> <span class="fn">len</span>(inventario) &gt; <span class="num">5</span>:
    <span class="fn">print</span>(<span class="str">"mochila llena"</span>)

<span class="kw">if</span> <span class="str">"pocion"</span> <span class="kw">in</span> inventario:
    <span class="fn">print</span>(<span class="str">"tienes poción"</span>)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Usar = en lugar de ==</dt>
        <dd><code>if x = 5:</code> → SyntaxError. Es el más fácil de
        identificar porque el editor o Python te lo señalan inmediatamente.</dd>
        <dt>Comparar tipos distintos</dt>
        <dd><code>5 == "5"</code> → False, no True. Si vienes de otros
        lenguajes laxos puede sorprenderte.</dd>
        <dt>Mayúsculas en strings</dt>
        <dd><code>"Krug" == "krug"</code> → False. Si quieres ignorar mayúsculas:
        <code>"Krug".lower() == "krug".lower()</code>.</dd>
      </dl>
    `,
  },

  15: {
    title: "Repaso del Capítulo 3",
    body: `
      <h4>Has subido un escalón importante</h4>
      <p>Hasta ahora tu código era <em>lineal</em>: hacía siempre lo mismo.
      Con if has aprendido a que el código <strong>tome decisiones</strong>
      según los datos. Eso es la base de cualquier programa interesante.</p>

      <ul>
        <li><strong>Argumentos</strong>: pasar info a métodos
        (<code>hero.attack("X")</code>).</li>
        <li><strong>find_nearest_enemy()</strong>: tu primer método con
        retorno. Captura el valor en una variable.</li>
        <li><strong>Variables vs literales</strong>: con comillas si es
        literal, sin comillas si es variable.</li>
        <li><strong>None</strong>: el valor "no hay nada". Comparar con
        <code>is None</code>.</li>
        <li><strong>if / else</strong>: dos caminos.</li>
        <li><strong>== != &lt; &gt;</strong>: comparadores. NO confundir
        <code>=</code> (asigna) con <code>==</code> (compara).</li>
      </ul>

      <h4>Antes y después</h4>
      <pre><span class="com"># Cap 1-2: código que asume la realidad</span>
hero.<span class="fn">attack</span>(<span class="str">"Krug"</span>)   <span class="com"># pero ¿y si Krug ya no está? ¿y si hay otro?</span>

<span class="com"># Cap 3: código que SE ADAPTA a la realidad</span>
e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">if</span> e <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"Despejado"</span>)
<span class="kw">else</span>:
    hero.<span class="fn">attack</span>(e)</pre>

      <h4>Lo que viene en el Cap 4</h4>
      <ul>
        <li><strong>elif</strong>: más de dos caminos.</li>
        <li><strong>and / or / not</strong>: combinar condiciones.</li>
        <li><strong>while</strong>: repetir mientras se cumpla algo
        (a diferencia de for, que repite N veces).</li>
        <li><strong>break</strong>: salir de un bucle antes.</li>
      </ul>

      <h4>Truco para el examen del Cap 3</h4>
      <p>Si tienes varios enemigos y vas a atacar al más cercano cada vez,
      la estructura es siempre la misma:</p>
      <pre>e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">if</span> e <span class="kw">is None</span>:
    <span class="fn">print</span>(<span class="str">"despejado"</span>)
<span class="kw">else</span>:
    <span class="fn">print</span>(<span class="str">f"atacando </span>{e}<span class="str">"</span>)
    hero.<span class="fn">attack</span>(e)</pre>
      <p>(En el Cap 4 lo meterás dentro de un while para repetirlo
      automáticamente.)</p>
    `,
  },

  // ============================================================
  // CAPÍTULO 4 — SENDA DE DECISIONES
  // ============================================================

  16: {
    title: "if / elif / else — más de dos caminos",
    body: `
      <h4>Cuando dos no bastan</h4>
      <p>Con <code>if</code>/<code>else</code> tienes dos ramas. Pero a veces
      necesitas más:</p>
      <ul>
        <li>Si es Bones → 1 ataque.</li>
        <li>Si es Krug → 2 ataques.</li>
        <li>Si es Throg → 3 ataques.</li>
      </ul>

      <h4>Solución fea: if anidados</h4>
      <pre><span class="kw">if</span> e == <span class="str">"Bones"</span>:
    hero.<span class="fn">attack</span>(e)
<span class="kw">else</span>:
    <span class="kw">if</span> e == <span class="str">"Krug"</span>:
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>): hero.<span class="fn">attack</span>(e)
    <span class="kw">else</span>:
        <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>): hero.<span class="fn">attack</span>(e)</pre>
      <p>Funciona, pero indentación creciente y feo. Para 5 ramas, sería
      pesadilla.</p>

      <h4>Solución limpia: elif</h4>
      <pre><span class="kw">if</span> e == <span class="str">"Bones"</span>:
    hero.<span class="fn">attack</span>(e)
<span class="kw">elif</span> e == <span class="str">"Krug"</span>:
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">2</span>):
        hero.<span class="fn">attack</span>(e)
<span class="kw">else</span>:
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">3</span>):
        hero.<span class="fn">attack</span>(e)</pre>
      <p><code>elif</code> es contracción de "else if". Se evalúa solo si la
      condición anterior fue False.</p>

      <h4>Reglas de elif</h4>
      <ul>
        <li>Puedes tener cuantos elif quieras: <code>if … elif … elif … else</code>.</li>
        <li>Solo se ejecuta UNA rama, la primera cuya condición sea True.</li>
        <li>Una vez encontrada, las demás se saltan (no se evalúan).</li>
        <li><code>else</code> es opcional. Si no lo pones y ninguna condición
        era True, no se ejecuta nada.</li>
      </ul>

      <h4>Ejemplo: clasificar números</h4>
      <pre><span class="kw">def</span> <span class="fn">clasificar</span>(n):
    <span class="kw">if</span> n &lt; <span class="num">0</span>:
        <span class="fn">print</span>(<span class="str">"negativo"</span>)
    <span class="kw">elif</span> n == <span class="num">0</span>:
        <span class="fn">print</span>(<span class="str">"cero"</span>)
    <span class="kw">elif</span> n &lt; <span class="num">10</span>:
        <span class="fn">print</span>(<span class="str">"un dígito"</span>)
    <span class="kw">elif</span> n &lt; <span class="num">100</span>:
        <span class="fn">print</span>(<span class="str">"dos dígitos"</span>)
    <span class="kw">else</span>:
        <span class="fn">print</span>(<span class="str">"grande"</span>)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>elif sin if previo</dt>
        <dd><code>elif</code> SIEMPRE va después de un <code>if</code>. Solo,
        es SyntaxError.</dd>
        <dt>Olvidar dos puntos</dt>
        <dd>Tanto <code>if</code> como <code>elif</code> y <code>else</code>
        terminan con <code>:</code>.</dd>
        <dt>Pensar que elif evalúa todo</dt>
        <dd>Una vez que un elif (o el if inicial) es True, los siguientes NO
        se evalúan. Útil para optimizar.</dd>
      </dl>
    `,
  },

  17: {
    title: "Operadores lógicos — and / or / not",
    body: `
      <h4>Combinar varias condiciones</h4>
      <p>A veces una sola comparación no basta. Necesitas combinar:</p>
      <ul>
        <li>"el héroe está vivo Y tiene poción" → <code>and</code>.</li>
        <li>"es Krug O es Bones" → <code>or</code>.</li>
        <li>"NO está en la salida" → <code>not</code>.</li>
      </ul>

      <h4>Tabla de verdad</h4>
      <pre>A     B     A and B    A or B
True  True  True       True
True  False False      True
False True  False      True
False False False      False</pre>
      <ul>
        <li><code>and</code> → True solo si AMBOS son True.</li>
        <li><code>or</code> → True si AL MENOS UNO es True.</li>
        <li><code>not X</code> → invierte: True si X es False, y viceversa.</li>
      </ul>

      <h4>Sintaxis</h4>
      <pre><span class="kw">if</span> nombre == <span class="str">"Aldric"</span> <span class="kw">and</span> rango == <span class="str">"mago"</span>:
    <span class="fn">print</span>(<span class="str">"acceso"</span>)

<span class="kw">if</span> e == <span class="str">"Bones"</span> <span class="kw">or</span> e == <span class="str">"Skellie"</span>:
    hero.<span class="fn">attack</span>(e)   <span class="com"># los esqueletos caen de un golpe</span>

<span class="kw">if</span> <span class="kw">not</span> hero.<span class="fn">is_at_exit</span>():
    hero.<span class="fn">move_right</span>()</pre>

      <h4>Cortocircuito (importante)</h4>
      <p>Python evalúa de izquierda a derecha y PARA cuando ya sabe el
      resultado:</p>
      <ul>
        <li><code>False and X</code> → False sin evaluar X (sea lo que sea,
        no cambia el resultado).</li>
        <li><code>True or X</code> → True sin evaluar X.</li>
      </ul>
      <p>Útil para evitar errores: <code>if e is not None and e == "Krug":</code>
      no peta si e es None, porque la segunda parte ni se evalúa.</p>

      <h4>Cuidado con paréntesis</h4>
      <p>Cuando mezclas <code>and</code> y <code>or</code>, Python da
      precedencia a <code>and</code>:</p>
      <pre>A <span class="kw">or</span> B <span class="kw">and</span> C    <span class="com"># equivale a: A or (B and C)</span></pre>
      <p>Si quieres otra cosa, paréntesis explícitos:</p>
      <pre>(A <span class="kw">or</span> B) <span class="kw">and</span> C  <span class="com"># resultado distinto</span></pre>

      <h4>Comparaciones encadenadas (atajo Python)</h4>
      <pre><span class="num">0</span> &lt;= edad &lt; <span class="num">18</span>     <span class="com"># equivalente a: 0 &lt;= edad and edad &lt; 18</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Confundir and con &</dt>
        <dd>En Python <code>&</code> es operador BIT a bit (otro tipo de
        operación). Para lógica usa <code>and</code>. Lo mismo
        <code>or</code> vs <code>|</code>.</dd>
        <dt>Olvidar repetir la variable</dt>
        <dd><code>if e == "Bones" or "Krug":</code> NO funciona como esperas.
        Hay que escribir: <code>if e == "Bones" or e == "Krug":</code>.</dd>
        <dt>not antes de comparación</dt>
        <dd><code>if not x == 5</code> funciona pero es feo. Prefiere
        <code>if x != 5</code>.</dd>
      </dl>
    `,
  },

  18: {
    title: "while True + break — bucle indefinido",
    body: `
      <h4>El problema del for con find_nearest</h4>
      <p>Con for + range repites N veces FIJAS. Pero si no sabes cuántos
      enemigos quedan… ¿cómo iteras?</p>
      <pre><span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(?):   <span class="com"># ¿4? ¿7? Imposible saberlo.</span>
    e = hero.<span class="fn">find_nearest_enemy</span>()
    hero.<span class="fn">attack</span>(e)</pre>

      <h4>La solución: while True</h4>
      <pre><span class="kw">while True</span>:
    e = hero.<span class="fn">find_nearest_enemy</span>()
    <span class="kw">if</span> e <span class="kw">is None</span>:
        <span class="kw">break</span>
    hero.<span class="fn">attack</span>(e)</pre>
      <p>Lectura: "repite por siempre. En cada iteración, busca enemigo. Si
      no queda ninguno, ROMPE el bucle. Si lo hay, atácalo".</p>

      <h4>Las dos piezas: while y break</h4>
      <ul>
        <li><code>while True:</code> bucle que se repite indefinidamente.
        La condición <code>True</code> nunca pasa a False, así que sin
        ayuda interna sería infinito.</li>
        <li><code>break</code> SALE inmediatamente del bucle. Es la forma
        de decirle "cuándo parar" desde dentro.</li>
      </ul>

      <h4>Patrón canónico: "haz mientras quede algo que hacer"</h4>
      <p>Cuando no sabes cuántas iteraciones harán falta, este patrón es
      universal:</p>
      <pre><span class="kw">while True</span>:
    cosa = <span class="fn">conseguir_siguiente</span>()
    <span class="kw">if</span> cosa <span class="kw">is None</span>:        <span class="com"># ya no quedan</span>
        <span class="kw">break</span>
    <span class="fn">procesar</span>(cosa)</pre>
      <p>Ejemplos: leer líneas de un fichero, procesar items de una cola,
      atacar enemigos hasta que no queden, etc.</p>

      <h4>Cuidado con bucles infinitos de verdad</h4>
      <p>Si el código del bucle nunca lleva a un break (o a algo que cambie
      la condición), el bucle es infinito. CodeAventura corta a las 2000
      acciones para protegerte, pero perder vidas y tiempo:</p>
      <pre><span class="kw">while True</span>:
    <span class="fn">print</span>(<span class="str">"infinito"</span>)   <span class="com"># sin break — ¡fuga!</span></pre>

      <h4>break vs continue</h4>
      <ul>
        <li><code>break</code> — sale del bucle.</li>
        <li><code>continue</code> — salta a la siguiente iteración (sin
        ejecutar el resto del cuerpo). Lo verás más adelante.</li>
      </ul>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar el break</dt>
        <dd><code>while True:</code> sin <code>break</code> en su cuerpo es
        un bucle infinito. Tienes que tener algún camino que salga.</dd>
        <dt>Indentación del break</dt>
        <dd>El break va dentro del bucle (indentado al menos 4 espacios).
        Si lo dejas fuera, no tiene sentido.</dd>
        <dt>break solo</dt>
        <dd><code>break</code> sin un bucle alrededor → SyntaxError.</dd>
      </dl>
    `,
  },

  19: {
    title: "while con condición — la forma elegante",
    body: `
      <h4>Más declarativo que while True + break</h4>
      <p>El nivel anterior usabas <code>while True</code> con un break dentro.
      Funciona, pero hay una forma más limpia cuando la condición de salida
      es simple: ponerla directamente en el while.</p>
      <pre><span class="com"># Versión vieja: while True + break</span>
<span class="kw">while True</span>:
    <span class="kw">if</span> hero.<span class="fn">is_at_exit</span>():
        <span class="kw">break</span>
    hero.<span class="fn">move_right</span>()

<span class="com"># Versión limpia: condición en el while</span>
<span class="kw">while not</span> hero.<span class="fn">is_at_exit</span>():
    hero.<span class="fn">move_right</span>()</pre>
      <p>Lectura: "mientras NO esté en la salida, avanza".</p>

      <h4>Sintaxis general</h4>
      <pre><span class="kw">while</span> condición:
    <span class="com"># cuerpo del bucle</span></pre>
      <p>Antes de cada iteración Python evalúa la condición. Si True,
      ejecuta el cuerpo y vuelve a evaluar. Si False, sale del bucle.</p>

      <h4>Diferencia con for</h4>
      <ul>
        <li><strong>for</strong>: para cuando sabes cuántas iteraciones (con
        range) o tienes una colección que recorrer (con lista).</li>
        <li><strong>while</strong>: para cuando NO sabes cuántas
        iteraciones, sino que dependes de una condición.</li>
      </ul>

      <h4>Ejemplos</h4>
      <pre><span class="com"># Avanzar hasta llegar al exit</span>
<span class="kw">while not</span> hero.<span class="fn">is_at_exit</span>():
    hero.<span class="fn">move_right</span>()

<span class="com"># Atacar mientras queden enemigos</span>
e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">while</span> e <span class="kw">is not None</span>:
    hero.<span class="fn">attack</span>(e)
    e = hero.<span class="fn">find_nearest_enemy</span>()  <span class="com"># actualizar</span>

<span class="com"># Contar mientras x sea menor que 100</span>
n = <span class="num">0</span>
<span class="kw">while</span> n &lt; <span class="num">100</span>:
    n = n + <span class="num">1</span>
<span class="fn">print</span>(n)   <span class="com"># 100</span></pre>

      <h4>Cuándo usar cuál</h4>
      <pre><span class="com"># for: número fijo de iteraciones</span>
<span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(<span class="num">7</span>):
    hero.<span class="fn">move_right</span>()

<span class="com"># while True + break: lógica compleja de salida</span>
<span class="kw">while True</span>:
    e = hero.<span class="fn">find_nearest_enemy</span>()
    <span class="kw">if</span> e <span class="kw">is None</span>: <span class="kw">break</span>
    <span class="kw">if</span> e == <span class="str">"jefe"</span>: <span class="kw">break</span>
    hero.<span class="fn">attack</span>(e)

<span class="com"># while con condición: salida simple, declarativa</span>
<span class="kw">while not</span> hero.<span class="fn">is_at_exit</span>():
    hero.<span class="fn">move_right</span>()</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Bucle infinito por no actualizar</dt>
        <dd><code>while x &lt; 10: print(x)</code> sin tocar x es infinito.
        Asegúrate de que algo dentro del bucle va a hacer que la condición
        eventualmente sea False.</dd>
        <dt>Off-by-one</dt>
        <dd><code>while x &lt; 10</code> NO incluye 10. Si quieres incluirlo:
        <code>while x &lt;= 10</code>.</dd>
        <dt>Olvidar los dos puntos</dt>
        <dd>Como con for/if/def, <code>:</code> al final.</dd>
      </dl>
    `,
  },

  20: {
    title: "Repaso del Capítulo 4",
    body: `
      <h4>Lo que dominas ahora</h4>
      <ul>
        <li><strong>elif</strong>: múltiples ramas sin anidar.</li>
        <li><strong>and / or / not</strong>: combinar condiciones.</li>
        <li><strong>while True + break</strong>: bucle indefinido con salida explícita.</li>
        <li><strong>while con condición</strong>: bucle declarativo.</li>
      </ul>

      <h4>Las 3 herramientas para repetir</h4>
      <p>Con todo lo aprendido, ya tienes el repertorio completo:</p>
      <table style="font-size: 13px;">
        <tr><th>Herramienta</th><th>Cuándo</th><th>Ejemplo</th></tr>
        <tr>
          <td><code>for ... in lista</code></td>
          <td>Recorrer una colección</td>
          <td><code>for x in nombres:</code></td>
        </tr>
        <tr>
          <td><code>for ... in range(N)</code></td>
          <td>N veces fijas</td>
          <td><code>for _ in range(7):</code></td>
        </tr>
        <tr>
          <td><code>while cond:</code></td>
          <td>Hasta que algo sea False</td>
          <td><code>while not at_exit():</code></td>
        </tr>
        <tr>
          <td><code>while True + break</code></td>
          <td>Salida con lógica compleja</td>
          <td><code>while True: ... break</code></td>
        </tr>
      </table>

      <h4>Lo que viene en el Cap 5 — el último</h4>
      <ul>
        <li><strong>Diccionarios</strong>: estructura clave→valor.
        <code>{"Krug": 2, "Throg": 3}</code>.</li>
        <li><strong>Funciones</strong> con <code>def</code>: tus propias
        herramientas reutilizables.</li>
        <li><strong>Argumentos</strong> en tus funciones.</li>
        <li><strong>return</strong>: funciones que devuelven valores.</li>
        <li><strong>Boss final</strong>: Vorthak. Aplicar todo lo aprendido.</li>
      </ul>

      <h4>Truco para el examen del Cap 4</h4>
      <p>Si el examen dice "sin if/elif", la herramienta es <code>while</code>
      con condición. Por ejemplo, "atacar a todos hasta que no queden":</p>
      <pre>e = hero.<span class="fn">find_nearest_enemy</span>()
<span class="kw">while</span> e <span class="kw">is not None</span>:
    hero.<span class="fn">attack</span>(e)
    hero.<span class="fn">attack</span>(e)
    e = hero.<span class="fn">find_nearest_enemy</span>()</pre>
    `,
  },

  // ============================================================
  // CAPÍTULO 5 — LA FORJA
  // ============================================================

  21: {
    title: "Diccionarios — pares clave→valor",
    body: `
      <h4>El problema</h4>
      <p>Tienes 3 enemigos con HP distintos: Bones (1), Krug (2), Throg (3).
      Cuando find_nearest devuelve un nombre, ¿cómo sabes cuántos golpes
      necesita?</p>
      <p>Con if/elif lo puedes hacer, pero es feo y se llena al añadir más
      enemigos.</p>

      <h4>La solución: diccionarios</h4>
      <pre>golpes = {<span class="str">"Bones"</span>: <span class="num">1</span>, <span class="str">"Krug"</span>: <span class="num">2</span>, <span class="str">"Throg"</span>: <span class="num">3</span>}
golpes[<span class="str">"Krug"</span>]   <span class="com"># 2</span></pre>
      <p>Estructura clave→valor entre llaves. Acceso por clave en
      <strong>tiempo constante</strong> (mucho más rápido que recorrer una
      lista buscando).</p>

      <h4>Sintaxis</h4>
      <pre><span class="com"># Crear</span>
edades = {<span class="str">"Iris"</span>: <span class="num">35</span>, <span class="str">"Aldric"</span>: <span class="num">18</span>}

<span class="com"># Leer</span>
edades[<span class="str">"Iris"</span>]                 <span class="com"># 35</span>
edades.<span class="fn">get</span>(<span class="str">"Marco"</span>, <span class="num">0</span>)         <span class="com"># 0 (default si no existe)</span>

<span class="com"># Modificar / añadir</span>
edades[<span class="str">"Iris"</span>] = <span class="num">36</span>
edades[<span class="str">"Marco"</span>] = <span class="num">42</span>             <span class="com"># añade entrada nueva</span>

<span class="com"># Comprobar existencia</span>
<span class="str">"Iris"</span> <span class="kw">in</span> edades             <span class="com"># True</span>
<span class="str">"Pepe"</span> <span class="kw">in</span> edades             <span class="com"># False</span>

<span class="com"># Tamaño</span>
<span class="fn">len</span>(edades)                  <span class="com"># 2 (después del Marco)</span>

<span class="com"># Recorrer</span>
<span class="kw">for</span> nombre, edad <span class="kw">in</span> edades.<span class="fn">items</span>():
    <span class="fn">print</span>(<span class="str">f"</span>{nombre}<span class="str">: </span>{edad}<span class="str">"</span>)</pre>

      <h4>Tipos de claves</h4>
      <p>Las claves pueden ser strings, números, tuplas — cualquier valor
      <em>inmutable</em>. Lo más común son strings o ints. Las listas NO
      pueden ser claves (son mutables).</p>
      <pre>d1 = {<span class="str">"a"</span>: <span class="num">1</span>}            <span class="com"># clave string</span>
d2 = {<span class="num">1</span>: <span class="str">"uno"</span>, <span class="num">2</span>: <span class="str">"dos"</span>} <span class="com"># claves int</span>
d3 = {(<span class="num">0</span>, <span class="num">0</span>): <span class="str">"origen"</span>}    <span class="com"># claves tupla</span></pre>

      <h4>Ejemplo aplicado al juego</h4>
      <pre>golpes = {<span class="str">"Bones"</span>: <span class="num">1</span>, <span class="str">"Krug"</span>: <span class="num">2</span>, <span class="str">"Throg"</span>: <span class="num">3</span>}

<span class="kw">while True</span>:
    e = hero.<span class="fn">find_nearest_enemy</span>()
    <span class="kw">if</span> e <span class="kw">is None</span>:
        <span class="kw">break</span>
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(golpes[e]):
        hero.<span class="fn">attack</span>(e)</pre>
      <p>Sin if/elif. Sin escribir cada caso. Si añades un enemigo nuevo, solo
      tienes que añadir una entrada al dict.</p>

      <h4>Errores típicos</h4>
      <dl>
        <dt>KeyError: 'X'</dt>
        <dd>Pides una clave que no existe. Solución: comprueba antes con
        <code>"X" in d</code> o usa <code>d.get("X", default)</code>.</dd>
        <dt>Confundir { } de dict con { } de set</dt>
        <dd><code>{}</code> sin contenido es un DICT vacío, no un set. Para
        set vacío usa <code>set()</code>. Para dict con elementos,
        <code>{"a": 1}</code> incluye los <code>:</code>.</dd>
        <dt>Olvidar las comas</dt>
        <dd><code>{"a": 1 "b": 2}</code> sin coma → SyntaxError.</dd>
      </dl>

      <h4>Por qué los dicts importan</h4>
      <p>El diccionario es probablemente la estructura más versátil de
      Python. Configs, JSON, contadores, mappings, índices... todo encaja
      en dicts. Aprende a verlo y aprende a usarlo.</p>
    `,
  },

  22: {
    title: "Funciones — tus propias palabras",
    body: `
      <h4>¿Por qué funciones?</h4>
      <p>Hasta ahora has USADO funciones (<code>print</code>,
      <code>len</code>, <code>hero.attack</code>...). Ahora vas a CREARLAS.</p>
      <p>Una función es un bloque de código que reúnes bajo un nombre.
      Después puedes ejecutar ese bloque tantas veces como quieras llamando
      al nombre.</p>

      <h4>Sintaxis básica</h4>
      <pre><span class="kw">def</span> <span class="fn">avanzar</span>():
    hero.<span class="fn">move_right</span>()
    hero.<span class="fn">move_right</span>()
    hero.<span class="fn">move_right</span>()</pre>
      <p>Tres elementos:</p>
      <ul>
        <li><code>def</code> — palabra clave: "voy a definir una función".</li>
        <li><code>avanzar</code> — el nombre que tú eliges.</li>
        <li><code>()</code> — paréntesis (de momento vacíos, sin argumentos).</li>
        <li><code>:</code> al final — obligatorio.</li>
        <li>Cuerpo indentado con 4 espacios.</li>
      </ul>

      <h4>Definir vs llamar</h4>
      <p>Cuidado: definir una función NO la ejecuta. Solo le dice a Python
      "esto se llama así y hace esto". Para ejecutarla, hay que LLAMARLA.</p>
      <pre><span class="kw">def</span> <span class="fn">saludar</span>():
    <span class="fn">print</span>(<span class="str">"Hola"</span>)

<span class="com"># En este punto, "Hola" NO se ha impreso todavía</span>

<span class="fn">saludar</span>()    <span class="com"># Ahora sí: imprime Hola</span>
<span class="fn">saludar</span>()    <span class="com"># Y otra vez: Hola</span></pre>

      <h4>Aplicado al juego</h4>
      <pre><span class="kw">def</span> <span class="fn">avanzar_3</span>():
    hero.<span class="fn">move_right</span>()
    hero.<span class="fn">move_right</span>()
    hero.<span class="fn">move_right</span>()

<span class="fn">avanzar_3</span>()    <span class="com"># 3 pasos</span>
<span class="fn">avanzar_3</span>()    <span class="com"># otros 3 — 6 en total</span></pre>

      <h4>Por qué importa</h4>
      <ul>
        <li><strong>Reutilización</strong>: defines una vez, usas mil veces.</li>
        <li><strong>Legibilidad</strong>: <code>avanzar_3()</code> dice qué
        hace; tres líneas <code>hero.move_right()</code> requieren leerlas.</li>
        <li><strong>Mantenimiento</strong>: si cambia la lógica, cambias la
        función — no 50 sitios donde la copiaste.</li>
        <li><strong>Composición</strong>: las funciones se llaman entre sí.
        Construyes problemas grandes con piezas pequeñas.</li>
      </ul>

      <h4>Convenciones de nombres</h4>
      <ul>
        <li>Verbos para funciones que HACEN cosas:
        <code>guardar</code>, <code>atacar_todos</code>.</li>
        <li>Sustantivos para funciones que CALCULAN cosas:
        <code>distancia</code>, <code>siguiente_enemigo</code>.</li>
        <li><code>snake_case</code> en minúsculas (Python lo prefiere).</li>
      </ul>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Llamar antes de definir</dt>
        <dd>Si llamas a la función antes de su <code>def</code>, Python no
        la conoce → NameError. Ponla arriba del archivo.</dd>
        <dt>Olvidar los paréntesis al llamar</dt>
        <dd><code>avanzar_3</code> sin <code>()</code> no la ejecuta — es
        solo una referencia.</dd>
        <dt>Cuerpo sin indentar</dt>
        <dd><code>def avanzar():\\nhero.move_right()</code> sin indentar →
        IndentationError.</dd>
      </dl>
    `,
  },

  23: {
    title: "Funciones con argumentos",
    body: `
      <h4>Funciones flexibles</h4>
      <p>Una función sin argumentos siempre hace lo mismo. Para que sea
      <em>reutilizable</em> de verdad, le pasas información al llamarla:</p>
      <pre><span class="kw">def</span> <span class="fn">avanzar_n</span>(n):
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(n):
        hero.<span class="fn">move_right</span>()

<span class="fn">avanzar_n</span>(<span class="num">3</span>)    <span class="com"># 3 pasos</span>
<span class="fn">avanzar_n</span>(<span class="num">5</span>)    <span class="com"># 5 pasos — la misma función</span></pre>

      <h4>Parámetro vs argumento</h4>
      <p>Dos términos parecidos pero distintos:</p>
      <ul>
        <li><strong>Parámetro</strong>: el nombre en la definición. En el
        ejemplo de arriba, <code>n</code> es un parámetro.</li>
        <li><strong>Argumento</strong>: el VALOR que pasas al llamar. Cuando
        haces <code>avanzar_n(3)</code>, el 3 es un argumento.</li>
      </ul>
      <p>Al llamar la función, el argumento se asigna al parámetro. Dentro
      de la función, <code>n</code> vale 3.</p>

      <h4>Múltiples argumentos</h4>
      <pre><span class="kw">def</span> <span class="fn">golpear</span>(enemigo, veces):
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(veces):
        hero.<span class="fn">attack</span>(enemigo)

<span class="fn">golpear</span>(<span class="str">"Krug"</span>, <span class="num">2</span>)
<span class="fn">golpear</span>(<span class="str">"Throg"</span>, <span class="num">3</span>)</pre>
      <p>Los argumentos se asignan en orden: primero a enemigo, luego a
      veces. La función no sabe nada del nombre que tenían antes —
      solo conoce sus parámetros.</p>

      <h4>Argumentos por defecto</h4>
      <pre><span class="kw">def</span> <span class="fn">saludar</span>(nombre, prefijo=<span class="str">"Sr."</span>):
    <span class="fn">print</span>(<span class="str">f"Hola </span>{prefijo}<span class="str"> </span>{nombre}<span class="str">"</span>)

<span class="fn">saludar</span>(<span class="str">"Vega"</span>)              <span class="com"># Hola Sr. Vega</span>
<span class="fn">saludar</span>(<span class="str">"Vega"</span>, <span class="str">"Iris"</span>)      <span class="com"># Hola Iris Vega</span></pre>
      <p>Los parámetros con valor por defecto son opcionales al llamar.</p>

      <h4>Argumentos por nombre (keyword)</h4>
      <p>Puedes pasar argumentos por su nombre, en cualquier orden:</p>
      <pre><span class="fn">golpear</span>(veces=<span class="num">3</span>, enemigo=<span class="str">"Throg"</span>)   <span class="com"># funciona</span></pre>

      <h4>Aplicado al juego</h4>
      <pre><span class="kw">def</span> <span class="fn">golpear</span>(enemigo, veces):
    <span class="kw">for</span> _ <span class="kw">in</span> <span class="fn">range</span>(veces):
        hero.<span class="fn">attack</span>(enemigo)

golpes = {<span class="str">"Bones"</span>: <span class="num">1</span>, <span class="str">"Krug"</span>: <span class="num">2</span>, <span class="str">"Throg"</span>: <span class="num">3</span>}
<span class="kw">while True</span>:
    e = hero.<span class="fn">find_nearest_enemy</span>()
    <span class="kw">if</span> e <span class="kw">is None</span>: <span class="kw">break</span>
    <span class="fn">golpear</span>(e, golpes[e])   <span class="com"># una llamada por enemigo</span></pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Número de argumentos incorrecto</dt>
        <dd><code>golpear("Krug")</code> con golpear que necesita 2 →
        TypeError. Asegúrate de pasar tantos como pide la función.</dd>
        <dt>Confundir orden</dt>
        <dd><code>golpear(2, "Krug")</code> → enemigo = 2, veces = "Krug".
        Después <code>range("Krug")</code> peta. El orden importa.</dd>
        <dt>Modificar parámetros sin querer</dt>
        <dd>Modificar un parámetro dentro de la función NO afecta a la
        variable original (excepto para listas/dicts mutables — pero eso es
        otro tema).</dd>
      </dl>
    `,
  },

  24: {
    title: "return — funciones que devuelven valores",
    body: `
      <h4>Funciones que CALCULAN, no solo HACEN</h4>
      <p>Las funciones de los niveles anteriores HACÍAN cosas:
      mover al héroe, atacar. Pero a veces quieres que la función te
      DEVUELVA un valor para que tú lo uses después.</p>
      <pre><span class="kw">def</span> <span class="fn">doble</span>(n):
    <span class="kw">return</span> n * <span class="num">2</span>

resultado = <span class="fn">doble</span>(<span class="num">5</span>)   <span class="com"># resultado = 10</span></pre>

      <h4>Cómo funciona return</h4>
      <ul>
        <li><code>return X</code> termina la función Y devuelve el valor X.</li>
        <li>Cuando llamas a la función, <code>doble(5)</code> "se convierte
        en" 10 — donde sea que esté la llamada.</li>
        <li>Después de un return, NO se ejecuta más código de la función.</li>
      </ul>
      <pre><span class="kw">def</span> <span class="fn">prueba</span>():
    <span class="fn">print</span>(<span class="str">"Antes"</span>)
    <span class="kw">return</span> <span class="num">42</span>
    <span class="fn">print</span>(<span class="str">"Después"</span>)   <span class="com"># NUNCA se imprime</span>

x = <span class="fn">prueba</span>()
<span class="com"># Output: Antes
# x = 42</span></pre>

      <h4>Sin return = devuelve None</h4>
      <p>Si una función no tiene return, devuelve <code>None</code>:</p>
      <pre><span class="kw">def</span> <span class="fn">saludar</span>(nombre):
    <span class="fn">print</span>(<span class="str">f"Hola </span>{nombre}<span class="str">"</span>)

x = <span class="fn">saludar</span>(<span class="str">"Aldric"</span>)
<span class="fn">print</span>(x)   <span class="com"># None</span></pre>
      <p>Por eso saludar() se usa "por su efecto" (imprime), no por su
      retorno (que es None).</p>

      <h4>return puede devolver cualquier tipo</h4>
      <pre><span class="kw">def</span> <span class="fn">es_par</span>(n):
    <span class="kw">return</span> n % <span class="num">2</span> == <span class="num">0</span>     <span class="com"># bool</span>

<span class="kw">def</span> <span class="fn">primeros_cinco</span>():
    <span class="kw">return</span> [<span class="num">0</span>, <span class="num">1</span>, <span class="num">2</span>, <span class="num">3</span>, <span class="num">4</span>]    <span class="com"># lista</span>

<span class="kw">def</span> <span class="fn">info</span>(n):
    <span class="kw">return</span> {<span class="str">"valor"</span>: n, <span class="str">"doble"</span>: n*<span class="num">2</span>}   <span class="com"># dict</span></pre>

      <h4>Componer funciones — el premio gordo</h4>
      <p>Cuando tus funciones devuelven valores, puedes usarlas dentro de
      otras llamadas:</p>
      <pre><span class="fn">print</span>(<span class="fn">doble</span>(<span class="fn">doble</span>(<span class="num">3</span>)))   <span class="com"># 12 — doble del doble</span></pre>
      <p>Esto es la base de la programación funcional y de la composición
      modular: combinar piezas pequeñas para resolver problemas grandes.</p>

      <h4>Aplicado al juego</h4>
      <pre><span class="kw">def</span> <span class="fn">camino_libre</span>():
    <span class="kw">return</span> hero.<span class="fn">find_nearest_enemy</span>() <span class="kw">is None</span>

<span class="kw">while not</span> <span class="fn">camino_libre</span>():
    e = hero.<span class="fn">find_nearest_enemy</span>()
    hero.<span class="fn">attack</span>(e)

<span class="fn">print</span>(<span class="str">"Sala despejada"</span>)</pre>

      <h4>Errores típicos</h4>
      <dl>
        <dt>Olvidar el return</dt>
        <dd>Tu función "calcula" pero no devuelve. Quien la llame recibirá
        None y se preguntará qué pasa.</dd>
        <dt>return sin estar dentro de una función</dt>
        <dd><code>return X</code> a nivel global → SyntaxError.</dd>
        <dt>Confundir return con print</dt>
        <dd>print MUESTRA en pantalla. return DEVUELVE el valor a quien
        llamó. Son cosas distintas.</dd>
        <dt>Múltiples returns sin orden</dt>
        <dd>Está bien tener varios returns en una función (uno por rama del
        if), pero asegúrate de que TODOS los caminos lleguen a algún return.</dd>
      </dl>
    `,
  },

  25: {
    title: "Has aprendido los fundamentos de Python",
    body: `
      <h4>Lo que llevas en la mochila</h4>
      <p>Empezaste con un <code>print("Hola")</code>. Acabas de derrotar a
      Vorthak combinando todo el repertorio:</p>
      <ul>
        <li><strong>Cap 1</strong> — print, comentarios, variables, operadores,
        str().</li>
        <li><strong>Cap 2</strong> — f-strings, listas, índices, for, range.</li>
        <li><strong>Cap 3</strong> — argumentos, find_nearest, variables que
        guardan resultados, if/else, None, comparadores.</li>
        <li><strong>Cap 4</strong> — elif, operadores lógicos and/or/not,
        while True + break, while con condición.</li>
        <li><strong>Cap 5</strong> — diccionarios, funciones (def), argumentos
        propios, return.</li>
      </ul>

      <h4>Lo que NO has cubierto (todavía)</h4>
      <p>Para no asustarte, aquí queda fuera de CodeAventura:</p>
      <ul>
        <li><strong>Clases y objetos</strong> (POO).</li>
        <li><strong>Excepciones</strong> (try/except).</li>
        <li><strong>Módulos y librerías</strong> (import).</li>
        <li><strong>Archivos</strong> (open, with).</li>
        <li><strong>Comprehensions</strong> (<code>[x*2 for x in lista]</code>).</li>
        <li>Y mucho más — pero ya tienes la base para aprenderlo.</li>
      </ul>

      <h4>Qué hacer a partir de aquí</h4>
      <ul>
        <li><strong>Practicar</strong>: Codewars, Exercism, HackerRank.</li>
        <li><strong>Construir algo</strong>: pequeño juego, scraper, bot de
        Discord, lo que te apetezca.</li>
        <li><strong>Leer código de otros</strong>: GitHub. Verás patrones
        que aún no entiendes — y aprender a leerlos es la siguiente fase.</li>
        <li><strong>Aprender una librería</strong>: Flask para web, Pandas
        para datos, Pygame para juegos, requests para HTTP.</li>
      </ul>

      <h4>El mayor truco</h4>
      <p>Programar no es saberse las APIs de memoria — es <em>resolver
      problemas con código</em>. Cada vez que veas un problema, descomponlo
      en pasos pequeños. Para cada paso, pregúntate: ¿qué herramienta de
      Python encaja aquí? Y si no la conoces, búscala. Eso no acaba nunca.</p>

      <h4>Una despedida</h4>
      <p>Aldric vuelve a ser aprendiz — pero ya nadie le llama así. Las
      runas brillan en los muros. Tu maestro estaría orgulloso. Y tú,
      ahora, tienes el lenguaje sagrado en la cabeza.</p>
      <p style="text-align:center; color: var(--cyan, #7dd3fc); margin-top: 24px; font-style: italic;">
      — Python: aprendido —</p>
    `,
  },

};
