// 25 niveles · 5 exámenes · Python real desde el primer nivel.
// Grid 12x8.

const GRID_W = 12;
const GRID_H = 8;

const CHAPTERS = [
  { id: 1, title: "Despertar",            subtitle: "print, variables, operadores",   hero: 'apprentice' },
  { id: 2, title: "El bosque torcido",    subtitle: "f-strings, listas, bucles",      hero: 'apprentice' },
  { id: 3, title: "Niebla y nombres",     subtitle: "Argumentos y condicionales",     hero: 'initiate' },
  { id: 4, title: "Senda de decisiones",  subtitle: "elif, lógica, while",            hero: 'initiate' },
  { id: 5, title: "La forja",             subtitle: "Diccionarios y funciones",       hero: 'mage' },
];

function emptyMap() {
  const rows = [];
  for (let y = 0; y < GRID_H; y++) {
    let row = '';
    for (let x = 0; x < GRID_W; x++) {
      if (y === 0 || y === GRID_H - 1 || x === 0 || x === GRID_W - 1) row += 'W';
      else row += '.';
    }
    rows.push(row);
  }
  return rows;
}
function setCell(map, x, y, ch) {
  const r = map[y].split(''); r[x] = ch; map[y] = r.join('');
}
function blockRect(map, x1, y1, x2, y2) {
  for (let y = y1; y <= y2; y++)
    for (let x = x1; x <= x2; x++) setCell(map, x, y, 'W');
}

function lShapeMap() {
  const m = emptyMap();
  blockRect(m, 5, 3, 7, 5);
  return m;
}
function uShapeMap() {
  const m = emptyMap();
  blockRect(m, 1, 2, 9, 5);
  return m;
}

const LEVELS = [
  // ============================================================
  // CAPÍTULO 1 — DESPERTAR (1-5): print, variables, operadores
  // ============================================================
  {
    id: 1, chapter: 1,
    title: "Tu primer hechizo",
    location: "Cripta — Sello del Aprendiz",
    concept: "print() y comentarios",
    is_checkpoint: true,
    intro:
      "Despiertas en una cripta. Una voz ronca: \"Para que las puertas " +
      "antiguas te dejen pasar, debes hablar. En este lenguaje sagrado, " +
      "hablar es invocar print(...). Después, camina con hero.move_right().\"",
    outro:
      "Tus primeras palabras escritas en código. Print: la herramienta más " +
      "universal. Y el primer paso del héroe.",
    diary:
      "Día 1. Mi primer conjuro: print. Lo que digo entre comillas y entre " +
      "paréntesis queda escrito en el aire. Después, hero.move_right() me " +
      "hace avanzar. Pequeño, pero ya es magia.",
    mission:
      "Tienes que hacer DOS cosas:\n\n" +
      "1) Decir algo con print(\"...\") — lo que sea entre comillas.\n" +
      "2) Avanzar 2 casillas hasta la puerta con hero.move_right().\n\n" +
      "Las líneas se ejecutan en orden. Una orden por línea.",
    hint:
      'print("Hola, soy Aldric")\nhero.move_right()\nhero.move_right()',
    strategy:
      "PASO 1 — Habla. La función print() escribe en la consola lo que pongas\n" +
      "         entre paréntesis. Si pasas un texto, ponlo entre comillas\n" +
      "         (dobles \" o simples ', tú eliges).\n" +
      "\n" +
      "PASO 2 — Camina. Cada llamada a hero.move_right() avanza una casilla\n" +
      "         a la derecha. Necesitas avanzar HASTA la puerta — mira el\n" +
      "         briefing para saber cuántas casillas son.\n" +
      "\n" +
      "PASO 3 — El orden importa. Las líneas se ejecutan de arriba a abajo,\n" +
      "         una a una. Habla primero, anda después.",
    skeleton:
      'print("[TODO: lo que tu héroe diga, entre comillas]")\n' +
      'hero.move_right()\n' +
      'hero.move_right()',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 3, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
  },

  {
    id: 2, chapter: 1,
    title: "Cuatro casillas",
    location: "Pasillo del Eco",
    concept: "Múltiples órdenes en orden",
    intro:
      "El pasillo se alarga. Aquí no hace falta hablar — solo caminar. " +
      "Cada hero.move_right() avanza UNA casilla. Te toca repetir.",
    outro:
      "Cuatro líneas, cuatro pasos. La paciencia es virtud — pero no por " +
      "mucho tiempo: pronto verás cómo abreviar.",
    diary:
      "Día 1, tarde. Repetí cuatro veces lo mismo. Pensé que tenía que " +
      "haber un atajo. La voz dijo: \"Lo habrá. Aún no.\"",
    mission:
      "Avanza 4 casillas a la derecha. Necesitarás 4 líneas hero.move_right(). " +
      "(Pista: tu antiguo amigo Ctrl+C / Ctrl+V copia y pega líneas).",
    hint:
      'hero.move_right()\nhero.move_right()\nhero.move_right()\nhero.move_right()',
    strategy:
      "PASO 1 — Cuenta las casillas que separan al héroe de la puerta. Mira\n" +
      "         el briefing — son 4.\n" +
      "\n" +
      "PASO 2 — Llama a hero.move_right() una vez por cada casilla. Una\n" +
      "         línea por llamada.\n" +
      "\n" +
      "PASO 3 — En el siguiente capítulo verás cómo evitar repetir la misma\n" +
      "         línea N veces — los bucles for. Por ahora, paciencia.",
    skeleton:
      'hero.move_right()\n' +
      'hero.move_right()\n' +
      '[TODO: ¿cuántas líneas más necesitas? Mira el briefing]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 5, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true },
  },

  {
    id: 3, chapter: 1,
    title: "Tu nombre verdadero",
    location: "Sala de los nombres",
    concept: "Variables: asignación con =",
    gives_potion: true,
    intro:
      "Una sala vacía con un altar. Para que el altar te reconozca, debes " +
      "GUARDAR tu nombre en una variable y pronunciarlo. Una variable se " +
      "crea con =:\n\n" +
      "    nombre = \"Aldric\"\n" +
      "    print(nombre)",
    outro:
      "Variables: nombres que dan poder a las cosas. Has encontrado una " +
      "poción. Aparece en tu inventario — úsala cuando te quedes sin vidas.",
    diary:
      "Día 2. Hoy aprendí lo que es una variable. Un nombre que guarda un " +
      "valor. \"nombre = Aldric\". Y luego puedo usar nombre como si " +
      "fuera Aldric. Encontré una poción de vida en el altar.",
    mission:
      "1) Crea una variable nombre con tu nombre (\"Aldric\" o el que " +
      "quieras), entre comillas.\n" +
      "2) Imprime esa variable con print(nombre) — sin comillas dentro.\n" +
      "3) Avanza 3 casillas hasta la puerta.",
    hint:
      'nombre = "Aldric"\nprint(nombre)\nhero.move_right()\nhero.move_right()\nhero.move_right()',
    strategy:
      "PASO 1 — Crea una variable que guarde tu nombre. Sintaxis:\n" +
      "             nombre = \"el-nombre-que-elijas\"\n" +
      "         El operador = ASIGNA: pone el valor a la derecha dentro del\n" +
      "         nombre a la izquierda.\n" +
      "\n" +
      "PASO 2 — Imprime la VARIABLE, no el texto. La diferencia clave:\n" +
      "             print(\"nombre\")    → imprime la palabra \"nombre\"\n" +
      "             print(nombre)      → imprime el VALOR de la variable\n" +
      "         Sin comillas dentro del print en este caso.\n" +
      "\n" +
      "PASO 3 — Avanza 3 casillas con 3 líneas hero.move_right().",
    skeleton:
      '# 1. Variable: el nombre va entre comillas\n' +
      'nombre = "[TODO: tu nombre]"\n' +
      '\n' +
      '# 2. Imprimir la variable (SIN comillas — usamos la variable, no el texto)\n' +
      'print([TODO: la variable, sin comillas])\n' +
      '\n' +
      '# 3. Avanzar 3 casillas\n' +
      'hero.move_right()\n' +
      '[TODO: 2 líneas más]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 4, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /^[ \t]*[a-zA-Z_]\w*\s*=(?!=)/m,
        message: "Debes definir una variable con = (ej: nombre = \"Aldric\")" },
    ],
  },

  {
    id: 4, chapter: 1,
    title: "La aritmética de los pasos",
    location: "Salón de las cuentas",
    concept: "Operadores aritméticos y str()",
    intro:
      "El salón tiene un puzzle: para abrir la puerta, debes calcular el " +
      "número exacto de pasos.\n\n" +
      "Operadores: +  -  *  /  //  %\n" +
      "Concatenar texto y número: usa str(numero).\n\n" +
      "    pasos = 2 + 3\n" +
      "    print(\"Voy a dar \" + str(pasos) + \" pasos\")",
    outro:
      "Aritmética: la columna vertebral del cálculo. Y has aprendido a " +
      "convertir números a texto con str() para concatenar.",
    diary:
      "Día 3. Aprendí a sumar dentro de Python. Y descubrí que no se puede " +
      "concatenar texto con número directamente — hay que convertir. " +
      "str(5) → \"5\". Detalle pequeño, error frecuente.",
    mission:
      "1) Calcula pasos = 2 + 3 (debe dar 5).\n" +
      "2) Imprime un mensaje concatenado: \"Voy a dar 5 pasos\".\n" +
      "3) Avanza 5 casillas hasta la puerta.",
    hint:
      'pasos = 2 + 3\nprint("Voy a dar " + str(pasos) + " pasos")\nhero.move_right()\n# repite hero.move_right() las veces necesarias',
    strategy:
      "PASO 1 — Calcula. Asigna a una variable pasos el resultado de 2 + 3.\n" +
      "         Python sabe matemáticas:\n" +
      "             +  -  *  /     suma, resta, multiplicación, división\n" +
      "             %             módulo (resto de la división)\n" +
      "             //            división entera\n" +
      "\n" +
      "PASO 2 — Concatena. Para juntar texto y número en un mismo string\n" +
      "         con el operador +, hay un problema: Python NO permite sumar\n" +
      "         texto + número directamente (eso da TypeError).\n" +
      "         Solución: convierte el número a texto con str(numero).\n" +
      "             \"Tengo \" + str(edad) + \" años\"\n" +
      "         (En Cap 2 verás f-strings, una forma más limpia.)\n" +
      "\n" +
      "PASO 3 — Avanza tantas casillas como el resultado del cálculo.",
    skeleton:
      '# 1. Calcular y guardar en una variable\n' +
      'pasos = 2 [TODO: operador +] 3\n' +
      '\n' +
      '# 2. Imprimir mensaje. Convertir el número a texto con str()\n' +
      'print("Voy a dar " + [TODO: str(...) sobre la variable pasos] + " pasos")\n' +
      '\n' +
      '# 3. Avanzar el número de casillas calculado\n' +
      'hero.move_right()\n' +
      '[TODO: el resto de líneas hero.move_right()]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 6, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bstr\s*\(/,
        message: "Debes usar str(...) para convertir un número a texto" },
      { type: 'mustContain', regex: /=\s*[^=\n]*[+\-*/]/,
        message: "Debes hacer una operación aritmética (ej: pasos = 2 + 3)" },
    ],
  },

  // ----------- EXAMEN 1 -----------
  {
    id: 5, chapter: 1,
    title: "Examen del primer sello",
    location: "Cámara del Examen",
    concept: "EXAMEN — repaso del Capítulo 1",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "Una cámara distinta. La luz cae solo sobre ti. Aquí no hay pista. " +
      "Aquí se demuestra que has entendido.",
    outro:
      "Has roto el primer gran sello. Tu maestro estaría orgulloso. Te " +
      "vuelve la vida al máximo y subes tu límite.",
    diary:
      "Día 4. Mi primer examen. Sin pista. Sin red. Pero salí. Algo dentro " +
      "de mí cambia.",
    mission:
      "Define vida = 3 y energia = 5. Imprime un mensaje que diga la suma " +
      "de ambos. Después avanza 4 casillas hasta la puerta.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 8 líneas (sin contar comentarios o vacías)\n" +
      "• Debes usar al menos UNA variable nueva con =",
    hint: "Examen sin pista.",
    solution:
      'vida = 3\n' +
      'energia = 5\n' +
      'print("La suma es " + str(vida + energia))\n' +
      'for i in range(4):\n' +
      '    hero.move_right()',
    starterCode:
      '# EXAMEN — Capítulo 1\n# Sin pista. Tú puedes.\n\n',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 5, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    restrictions: [
      { type: 'maxLines', value: 8, message: "Máximo 8 líneas" },
      { type: 'mustContain', regex: /^[ \t]*[a-zA-Z_]\w*\s*=(?!=)/m, message: "Debes asignar al menos una variable con =" },
    ],
  },

  // ============================================================
  // CAPÍTULO 2 — EL BOSQUE TORCIDO (6-10): f-strings, listas, bucles
  // ============================================================
  {
    id: 6, chapter: 2,
    title: "Los hechizos brillan",
    location: "Bosque torcido — Claro",
    concept: "f-strings",
    is_checkpoint: true,
    intro:
      "El bosque torcido. Hay otra forma de mezclar texto y variables, más " +
      "limpia que str() y +. Las f-strings:\n\n" +
      "    nombre = \"Aldric\"\n" +
      "    vida = 3\n" +
      "    print(f\"{nombre} tiene {vida} vidas\")\n\n" +
      "Las llaves { } se sustituyen por el valor de la variable.",
    outro:
      "f-strings: la forma moderna y elegante de imprimir. Adiós para " +
      "siempre a las concatenaciones largas.",
    diary:
      "Día 5. f-strings. Antes hacía \"a \" + str(b) + \" c\". Ahora " +
      "f\"a {b} c\". Cambio pequeño, ahorro enorme.",
    mission:
      "Define nombre y vida. Imprime usando una f-string un mensaje del " +
      "estilo \"Aldric tiene 3 vidas\". Después llega a la puerta.",
    hint:
      'nombre = "Aldric"\nvida = 3\nprint(f"{nombre} tiene {vida} vidas")\nhero.move_right()  # x N',
    strategy:
      "PASO 1 — Crea dos variables (las que quieras): un string para el\n" +
      "         nombre y un número para la vida.\n" +
      "\n" +
      "PASO 2 — Imprime con una f-string. La sintaxis: empieza el string con\n" +
      "         f\" y mete las variables entre llaves { }.\n" +
      "             f\"Hola {nombre}, tienes {vida} vidas\"\n" +
      "         Compara con la versión vieja del nivel anterior:\n" +
      "             \"Hola \" + nombre + \", tienes \" + str(vida) + \" vidas\"\n" +
      "         La f-string es mucho más limpia y ESCRIBES MENOS.\n" +
      "\n" +
      "PASO 3 — Avanza hasta la puerta.",
    skeleton:
      'nombre = "[TODO: cualquier nombre]"\n' +
      'vida = [TODO: un número]\n' +
      '\n' +
      '# f-string: prefijo f" — variables entre {}\n' +
      'print([TODO: f"...{nombre}...{vida}..."])\n' +
      '\n' +
      '[TODO: avanzar hasta la puerta]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 5, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bf['"]/,
        message: "Debes usar una f-string (empieza con f\" o f')" },
    ],
  },

  {
    id: 7, chapter: 2,
    title: "Inventario del aprendiz",
    location: "Cabaña abandonada",
    concept: "Listas: crear, len(), índice [0]",
    gives_potion: true,
    intro:
      "Una cabaña abandonada con cuatro objetos sobre la mesa. Una LISTA " +
      "guarda varios valores entre corchetes:\n\n" +
      "    inventario = [\"espada\", \"pocion\", \"mapa\", \"oro\"]\n\n" +
      "• len(inventario) → 4 (cuántos elementos)\n" +
      "• inventario[0] → \"espada\" (el primero, índice 0)\n" +
      "• inventario[-1] → \"oro\" (el último)",
    outro:
      "Tu primer contenedor de datos. Las listas vendrán contigo el resto " +
      "del viaje. Otra poción para el camino.",
    diary:
      "Día 6. Listas. Una variable que tiene varias cosas dentro. Y se " +
      "indexan desde CERO, no desde 1 como las personas normales. Un detalle " +
      "que me costó.",
    mission:
      "1) Crea una lista inventario con 4 strings (los que quieras).\n" +
      "2) Imprime cuántos hay (len).\n" +
      "3) Imprime el primer elemento (índice 0).\n" +
      "4) Avanza hasta la puerta.",
    hint:
      'inventario = ["espada", "pocion", "mapa", "oro"]\nprint(len(inventario))\nprint(inventario[0])\nhero.move_right()  # x N',
    strategy:
      "PASO 1 — Crea una lista. Sintaxis: corchetes [] con valores separados\n" +
      "         por comas. Strings entre comillas. Mínimo 4 elementos.\n" +
      "             inventario = [\"espada\", \"pocion\", \"mapa\", \"oro\"]\n" +
      "\n" +
      "PASO 2 — Cuenta cuántos hay con len(lista). Devuelve un entero.\n" +
      "         print(len(inventario)) imprime ese número.\n" +
      "\n" +
      "PASO 3 — Accede al primer elemento. En Python los índices empiezan\n" +
      "         en 0 (no en 1). El primer elemento es lista[0]. El último es\n" +
      "         lista[-1]. Imprime el primero.\n" +
      "\n" +
      "PASO 4 — Avanza hasta la puerta.",
    skeleton:
      '# 1. Lista entre corchetes\n' +
      'inventario = [TODO: 4 strings entre comillas separados por comas]\n' +
      '\n' +
      '# 2. Tamaño de la lista\n' +
      'print(len([TODO: la lista]))\n' +
      '\n' +
      '# 3. Primer elemento (índice 0)\n' +
      'print([TODO: la lista][0])\n' +
      '\n' +
      '# 4. Avanzar hasta la puerta\n' +
      '[TODO: hero.move_right() las veces necesarias]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 6, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrintMin: 2 },
    requires: [
      { type: 'mustContain', regex: /=\s*\[[^\]]*,[^\]]*\]/,
        message: "Debes crear una lista con varios elementos (ej: items = [\"a\", \"b\", \"c\"])" },
      { type: 'mustContain', regex: /\blen\s*\(/,
        message: "Debes usar len(...) para imprimir el tamaño de la lista" },
    ],
  },

  {
    id: 8, chapter: 2,
    title: "Recorre el inventario",
    location: "Camino del bosque",
    concept: "for x in lista",
    intro:
      "Para hacer algo con CADA elemento de una lista, usa for:\n\n" +
      "    for objeto in inventario:\n" +
      "        print(objeto)\n\n" +
      "objeto toma el valor de cada elemento, uno por iteración. La línea " +
      "interior está INDENTADA (4 espacios). La indentación es lo que dice " +
      "a Python qué pertenece al bucle.",
    outro:
      "for + lista: la primera vez que el código repite por ti. Lo agradeces.",
    diary:
      "Día 7. for. \"Para cada cosa en la lista, hacer algo\". Mi mano " +
      "respira aliviada de tanto Ctrl+V.",
    mission:
      "Define una lista de hechizos (al menos 3 strings). Recórrela con un " +
      "for, imprimiendo cada uno. Después avanza hasta la puerta.",
    hint:
      'hechizos = ["fuego", "hielo", "rayo"]\nfor h in hechizos:\n    print(h)\nhero.move_right()  # x N',
    strategy:
      "PASO 1 — Define una lista de hechizos con al menos 3 strings.\n" +
      "\n" +
      "PASO 2 — Recórrela con un bucle for:\n" +
      "             for variable in lista:\n" +
      "                 (línea indentada con lo que hagas)\n" +
      "         La variable toma cada valor de la lista, una vez por\n" +
      "         iteración. La indentación (4 espacios) es OBLIGATORIA — es\n" +
      "         lo que dice a Python qué pertenece al bucle.\n" +
      "\n" +
      "PASO 3 — Dentro del for, imprime la variable.\n" +
      "\n" +
      "PASO 4 — Después del for (sin indentar), avanza al exit.",
    skeleton:
      'hechizos = [TODO: lista con al menos 3 strings]\n' +
      '\n' +
      '# for variable in lista:\n' +
      'for [TODO: nombre de variable] in [TODO: la lista]:\n' +
      '    # 4 espacios al inicio = dentro del bucle\n' +
      '    print([TODO: la variable])\n' +
      '\n' +
      '# Sin indentar = después del bucle\n' +
      '[TODO: avanzar hasta la puerta]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 5, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrintMin: 3 },
    requires: [
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+(?!range\b)\w+/,
        message: "Debes recorrer una LISTA con for (no range): for x in lista:" },
    ],
  },

  {
    id: 9, chapter: 2,
    title: "El gran corredor",
    location: "Corredor sin fin",
    concept: "for + range()",
    intro:
      "Un corredor inmenso. Para repetir un bloque N veces sin escribir N " +
      "líneas:\n\n" +
      "    for i in range(7):\n" +
      "        hero.move_right()\n\n" +
      "range(N) genera 0, 1, 2, ..., N-1. La variable i toma cada uno. El " +
      "bloque se ejecuta N veces.",
    outro:
      "for + range: el bucle del programador eficiente. Se acabó copiar y " +
      "pegar.",
    diary:
      "Día 8. range. Un bucle for que cuenta hasta donde le digas. Avancé " +
      "7 casillas con dos líneas. ¡Dos!",
    mission:
      "Avanza 7 casillas a la derecha usando for con range. Una sola " +
      "llamada a hero.move_right() dentro del bucle.",
    hint: 'for i in range(7):\n    hero.move_right()',
    strategy:
      "PASO 1 — range(N) genera la secuencia 0, 1, 2, ..., N-1.\n" +
      "         range(7) → 0, 1, 2, 3, 4, 5, 6 (siete números).\n" +
      "\n" +
      "PASO 2 — Combinarlo con for da un bucle que se repite N veces:\n" +
      "             for i in range(7):\n" +
      "                 hero.move_right()\n" +
      "         La variable i toma cada valor de la secuencia. Si NO la usas\n" +
      "         dentro del bucle, da igual su nombre — pero hay que ponerla.\n" +
      "\n" +
      "PASO 3 — Solo dos líneas y avanzas 7 veces. Compara con escribir\n" +
      "         hero.move_right() siete veces — feo.",
    skeleton:
      '# for i in range(N) — repite N veces\n' +
      'for i in range([TODO: el número de casillas]):\n' +
      '    [TODO: la línea que se repite, indentada con 4 espacios]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 8, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true },
    requires: [
      { type: 'mustContain', regex: /\bfor\s+\w+\s+in\s+range\s*\(/,
        message: "Debes usar la forma: for i in range(N):" },
    ],
  },

  // ----------- EXAMEN 2 -----------
  {
    id: 10, chapter: 2,
    title: "Examen del bucle",
    location: "Cámara del Examen II",
    concept: "EXAMEN — repaso del Capítulo 2",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "Segundo examen. Más exigente. Sin pista. Tu vida está en juego — " +
      "pero al superarlo, vuelve a llenarse y crece.",
    outro:
      "Dominas listas y bucles. La cripta abre el siguiente capítulo: el " +
      "bosque trae enemigos.",
    diary:
      "Día 9. Segundo examen, segundo sello roto. Mis dedos teclean solos.",
    mission:
      "Define una lista con 3 mensajes. Recórrela con un for imprimiendo " +
      "cada uno. Después avanza 5 casillas hasta la puerta.\n\n" +
      "RESTRICCIONES:\n" +
      "• Máximo 6 líneas (sin contar comentarios o vacías)\n" +
      "• Debes usar al menos un bucle for\n" +
      "• No puedes escribir hero.move_right() más de 1 vez literal",
    hint: "Examen sin pista.",
    solution:
      'mensajes = ["Listo", "para", "avanzar"]\n' +
      'for m in mensajes:\n' +
      '    print(m)\n' +
      'for i in range(5):\n' +
      '    hero.move_right()',
    starterCode:
      '# EXAMEN — Capítulo 2\n# Listas + for. Sin pista.\n\n',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 6, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrintMin: 3 },
    restrictions: [
      { type: 'maxLines', value: 6, message: "Máximo 6 líneas" },
      { type: 'mustContain', regex: /\bfor\b/, message: "Debes usar un bucle for" },
      { type: 'maxOccurrences', regex: /hero\.move_right\(\)/g, max: 1, message: "Solo puedes escribir hero.move_right() UNA vez" },
    ],
  },

  // ============================================================
  // CAPÍTULO 3 — NIEBLA Y NOMBRES (11-15): args, find_nearest, if
  // ============================================================
  {
    id: 11, chapter: 3,
    title: "El primer ogro",
    location: "Frontera del bosque",
    concept: "Argumentos string en métodos",
    is_checkpoint: true,
    intro:
      "Un ogro llamado Krug bloquea el sendero. Para atacarlo, su nombre " +
      "va dentro de los paréntesis, ENTRE COMILLAS. A eso se le llama " +
      "ARGUMENTO:\n\n" +
      "    hero.attack(\"Krug\")\n\n" +
      "Krug aguanta 2 golpes. El ataque funciona a cualquier distancia.",
    outro:
      "Argumentos: información que pasas a una función. Las funciones sin " +
      "argumentos no podrían distinguir entre objetivos.",
    diary:
      "Día 10. Krug. Un ogro torpe. El conjuro de combate exige el nombre " +
      "entre comillas. Detalle de gramática que mi maestro repetía como un " +
      "mantra.",
    mission:
      "Derrota a Krug (HP 2). Después avanza hasta la puerta.\n\n" +
      "Recuerda: el nombre va entre comillas dentro de attack().",
    hint:
      'hero.attack("Krug")\nhero.attack("Krug")\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — Atacar a Krug. La función hero.attack() necesita un dato:\n" +
      "         a quién atacar. Ese dato (el ARGUMENTO) va dentro de los\n" +
      "         paréntesis. Como Krug es un nombre, va entre comillas:\n" +
      "             hero.attack(\"Krug\")\n" +
      "         Krug aguanta 2 golpes — necesitas 2 ataques.\n" +
      "\n" +
      "PASO 2 — Una vez muerto, avanza hasta la puerta. Aprovecha el for+range\n" +
      "         que aprendiste en el nivel anterior para no escribir 9 veces\n" +
      "         hero.move_right().",
    skeleton:
      '# Atacar a Krug — el nombre va entre comillas (es ARGUMENTO string)\n' +
      'hero.attack([TODO: "Krug"])\n' +
      'hero.attack("Krug")    # un segundo ataque (HP 2)\n' +
      '\n' +
      '# Avanzar hasta la puerta con for + range\n' +
      'for i in range([TODO: número de casillas hasta la puerta]):\n' +
      '    hero.move_right()',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [{ name: "Krug", type: "ogre", x: 5, y: 4, hp: 2 }],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
  },

  {
    id: 12, chapter: 3,
    title: "Niebla en la encrucijada",
    location: "Encrucijada nublada",
    concept: "find_nearest_enemy + variables",
    intro:
      "La niebla esconde el nombre del enemigo (verás \"???\"). Pero tu " +
      "héroe puede detectarlo:\n\n" +
      "    enemigo = hero.find_nearest_enemy()\n" +
      "    print(enemigo)\n" +
      "    hero.attack(enemigo)\n\n" +
      "find_nearest_enemy() DEVUELVE el nombre. Lo guardas en una variable " +
      "y lo reutilizas. ATENCIÓN: enemigo (la variable) no lleva comillas " +
      "al pasarlo a attack — ya contiene el string.",
    outro:
      "Variables que guardan resultados de funciones. La diferencia entre " +
      "\"Krug\" (literal) y enemigo (variable que contiene \"Krug\") es " +
      "fundamental.",
    diary:
      "Día 11. find_nearest_enemy. La niebla ya no me asusta. Y aprendí: " +
      "una variable que guarda un string se pasa SIN comillas, porque ya " +
      "ES el string.",
    mission:
      "Hay un enemigo de nombre desconocido (HP 2). Encuéntralo, imprime " +
      "su nombre, derrótalo, y llega a la puerta.",
    hint:
      'e = hero.find_nearest_enemy()\nprint(f"Encontré a {e}")\nhero.attack(e)\nhero.attack(e)\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — find_nearest_enemy() te DEVUELVE el nombre del enemigo más\n" +
      "         cercano. Tienes que GUARDAR ese resultado en una variable\n" +
      "         para reutilizarlo:\n" +
      "             e = hero.find_nearest_enemy()\n" +
      "\n" +
      "PASO 2 — Imprime el nombre. Ya tienes la variable, úsala. Mejor aún\n" +
      "         con f-string: f\"Encontré a {e}\".\n" +
      "\n" +
      "PASO 3 — Atácalo. AQUÍ EL DETALLE CLAVE:\n" +
      "             hero.attack(\"Krug\")  ← \"Krug\" es un literal: comillas\n" +
      "             hero.attack(e)        ← e ya CONTIENE el string: SIN comillas\n" +
      "         La variable ya guarda el texto — no le pongas comillas extras.\n" +
      "         HP 2 → necesitas 2 ataques.\n" +
      "\n" +
      "PASO 4 — Avanza al exit con for + range.",
    skeleton:
      '# 1. Guardar el resultado de find_nearest_enemy en una variable\n' +
      'e = hero.[TODO: método para encontrar al enemigo más cercano]()\n' +
      '\n' +
      '# 2. Imprimir el nombre — la variable ya contiene el string\n' +
      'print([TODO: f-string que use {e}])\n' +
      '\n' +
      '# 3. Atacar 2 veces. La variable e SIN comillas (ya es un string)\n' +
      'hero.attack([TODO: la variable, sin comillas])\n' +
      'hero.attack(e)\n' +
      '\n' +
      '# 4. Avanzar\n' +
      '[TODO: for + range]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [{ name: "???", type: "ogre", x: 5, y: 4, hp: 2 }],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true, mustPrint: true },
  },

  {
    id: 13, chapter: 3,
    title: "¿Hay alguien?",
    location: "Templo silencioso",
    concept: "if y comparación con None",
    gives_potion: true,
    intro:
      "find_nearest_enemy() puede devolver None si no queda nadie. " +
      "Para tomar decisiones según el resultado, usa if:\n\n" +
      "    if e is None:\n" +
      "        print(\"sala vacía\")\n" +
      "    else:\n" +
      "        hero.attack(e)\n\n" +
      "Termina la línea del if con DOS PUNTOS. El bloque interior va " +
      "INDENTADO (4 espacios).",
    outro:
      "Decisiones. La gramática del if con sus dos puntos y la indentación " +
      "es exigente, pero predecible.",
    diary:
      "Día 12. if. La indentación importa. Cuatro espacios. Ni tres ni " +
      "cinco. Las runas son maniáticas con eso.",
    mission:
      "Hay UN enemigo (HP 1). Búscalo. Si NO es None, atácalo e imprime " +
      "que lo has matado. Si es None, imprime que no había. Después avanza.",
    hint:
      'e = hero.find_nearest_enemy()\nif e is None:\n    print("sala vacía")\nelse:\n    print(f"atacando a {e}")\n    hero.attack(e)\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — Guarda en una variable el resultado de find_nearest_enemy().\n" +
      "         Puede devolver un nombre... o None si la sala está vacía.\n" +
      "\n" +
      "PASO 2 — Decide con un if. La sintaxis:\n" +
      "             if condicion:\n" +
      "                 (líneas indentadas — qué hacer si la condición es True)\n" +
      "             else:\n" +
      "                 (líneas indentadas — qué hacer si NO)\n" +
      "         Reglas estrictas:\n" +
      "         - Dos puntos al final del if y del else.\n" +
      "         - Indentación de 4 espacios para las líneas dentro.\n" +
      "         - Para comparar con None se usa `is None` (no ==).\n" +
      "\n" +
      "PASO 3 — Si NO es None, atácalo (HP 1, un solo ataque).\n" +
      "         Si es None, imprime que no había enemigos.\n" +
      "\n" +
      "PASO 4 — Avanza al exit (esto va FUERA del if/else, sin indentar).",
    skeleton:
      'e = hero.find_nearest_enemy()\n' +
      '\n' +
      '# if con dos puntos. Indenta el bloque interior.\n' +
      'if e [TODO: operador para comparar con None] None:\n' +
      '    print("sala vacía")\n' +
      'else:\n' +
      '    print(f"atacando a {e}")\n' +
      '    hero.attack(e)\n' +
      '\n' +
      '# Sin indentar — fuera del if/else\n' +
      '[TODO: avanzar al exit con for + range]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [{ name: "Eco", type: "skeleton", x: 5, y: 4, hp: 1 }],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bif\b/,
        message: "Debes usar un if" },
      { type: 'mustContain', regex: /\bis\s+(not\s+)?None\b|!=\s*None\b|==\s*None\b/,
        message: "Debes comprobar si es None (ej: if e is None)" },
    ],
  },

  {
    id: 14, chapter: 3,
    title: "Fuerte o débil",
    location: "Templo de Janus",
    concept: "if/else con == (comparación)",
    intro:
      "Dos enemigos: Bones (esqueleto, 1 golpe) y Throg (troll, 3 golpes). " +
      "Compara con == (DOBLE igual — un solo = es ASIGNAR, dos == es " +
      "COMPARAR):\n\n" +
      "    if e == \"Bones\":\n" +
      "        hero.attack(e)\n" +
      "    else:\n" +
      "        for i in range(3):\n" +
      "            hero.attack(e)",
    outro:
      "= asigna. == compara. Confundirlos es un clásico — todos hemos " +
      "caído alguna vez.",
    diary:
      "Día 13. = asigna. == compara. Lo escribiré 50 veces hasta que se me " +
      "grabe.",
    mission:
      "Dos enemigos. Para CADA UNO (el más cercano cada vez), comprueba el " +
      "nombre con ==. Bones: 1 ataque. Throg: 3 ataques. Hazlo manualmente " +
      "(sin bucle while todavía).",
    hint:
      'e = hero.find_nearest_enemy()\nif e == "Bones":\n    hero.attack(e)\nelse:\n    for i in range(3):\n        hero.attack(e)\n\n# Repite el bloque para el segundo enemigo\n\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — Encuentra al enemigo más cercano y guárdalo en una variable.\n" +
      "\n" +
      "PASO 2 — Compara su nombre. AQUÍ EL ERROR CLÁSICO:\n" +
      "             =   asigna   (e = \"X\" pone \"X\" dentro de e)\n" +
      "             ==  compara  (e == \"X\" devuelve True/False)\n" +
      "         Para comparar siempre dos iguales seguidos.\n" +
      "\n" +
      "PASO 3 — Decide:\n" +
      "             if e == \"Bones\": atacar 1 vez\n" +
      "             else: (es Throg) atacar 3 veces — usa for+range dentro\n" +
      "\n" +
      "PASO 4 — Repite TODO el bloque (find + if/else) para el segundo\n" +
      "         enemigo. Cuando matas al primero, find_nearest_enemy()\n" +
      "         devolverá el segundo.\n" +
      "\n" +
      "PASO 5 — Avanza al exit.",
    skeleton:
      '# ----- Primer enemigo -----\n' +
      'e = hero.find_nearest_enemy()\n' +
      '\n' +
      '# Comparar con DOBLE igual: e [TODO: operador comparación] "Bones"\n' +
      'if e == "Bones":\n' +
      '    hero.attack(e)\n' +
      'else:\n' +
      '    # Throg necesita 3 ataques — usa for + range\n' +
      '    [TODO: bucle for que ataque 3 veces]\n' +
      '\n' +
      '# ----- Segundo enemigo (mismo patrón) -----\n' +
      '[TODO: repetir el bloque anterior — find + if/else]\n' +
      '\n' +
      '# ----- Avanzar -----\n' +
      '[TODO: for + range hasta el exit]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Bones", type: "skeleton", x: 4, y: 4, hp: 1 },
      { name: "Throg", type: "troll",    x: 7, y: 4, hp: 3 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    requires: [
      { type: 'mustContain', regex: /\bif\b/,
        message: "Debes usar un if" },
      { type: 'mustContain', regex: /==/,
        message: "Debes comparar con == (doble igual)" },
      { type: 'mustContain', regex: /\belse\b/,
        message: "Debes usar else para la otra rama" },
    ],
  },

  // ----------- EXAMEN 3 -----------
  {
    id: 15, chapter: 3,
    title: "Examen del juicio",
    location: "Cámara del Examen III",
    concept: "EXAMEN — repaso del Capítulo 3",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "Tercer examen. Combates con condicionales. Sin pista.",
    outro:
      "Has dominado las decisiones. La senda se abre. Y los ogros también " +
      "— en grupo.",
    diary:
      "Día 14. Tercer sello. Cada examen me cuesta menos. Será que estoy " +
      "aprendiendo, después de todo.",
    mission:
      "Dos enemigos: Bones (HP 1) y Throg (HP 3). Para cada uno, comprueba " +
      "con if/== el nombre y atáca el número correcto de veces. Después " +
      "llega a la puerta.\n\n" +
      "RESTRICCIONES:\n" +
      "• Debes usar if y ==\n" +
      "• Máximo 12 líneas\n" +
      "• No puedes usar while (aún no)",
    hint: "Examen sin pista.",
    solution:
      'e = hero.find_nearest_enemy()\n' +
      'if e == "Bones":\n' +
      '    hero.attack(e)\n' +
      'else:\n' +
      '    for i in range(3): hero.attack(e)\n' +
      'e = hero.find_nearest_enemy()\n' +
      'if e == "Bones":\n' +
      '    hero.attack(e)\n' +
      'else:\n' +
      '    for i in range(3): hero.attack(e)\n' +
      'hero.move_to(10, 4)',
    starterCode:
      '# EXAMEN — Capítulo 3\n# if + == + ataque adaptado al enemigo\n\n',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Bones", type: "skeleton", x: 4, y: 4, hp: 1 },
      { name: "Throg", type: "troll",    x: 7, y: 4, hp: 3 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    restrictions: [
      { type: 'mustContain', regex: /\bif\b/, message: "Debes usar if" },
      { type: 'mustContain', regex: /==/, message: "Debes usar == (comparación)" },
      { type: 'mustNotContain', regex: /\bwhile\b/, message: "No puedes usar while en este examen" },
      { type: 'maxLines', value: 12, message: "Máximo 12 líneas" },
    ],
  },

  // ============================================================
  // CAPÍTULO 4 — SENDA DE DECISIONES (16-20): elif, lógica, while
  // ============================================================
  {
    id: 16, chapter: 4,
    title: "Tres caminos",
    location: "Encrucijada de Hermes",
    concept: "if/elif/else",
    is_checkpoint: true,
    intro:
      "Tres tipos de enemigos. Para más de dos ramas, usa elif (else if):\n\n" +
      "    if e == \"Bones\":\n" +
      "        hero.attack(e)\n" +
      "    elif e == \"Krug\":\n" +
      "        for i in range(2): hero.attack(e)\n" +
      "    else:\n" +
      "        for i in range(3): hero.attack(e)",
    outro:
      "elif: la rama del medio. Encadenable. Tres caminos, una decisión " +
      "limpia.",
    diary:
      "Día 15. elif. Tres ramas sin anidar. Mucho más legible que if " +
      "dentro de else dentro de else dentro de else…",
    mission:
      "Tres enemigos: Bones (1), Krug (2), Throg (3 golpes). Combina el " +
      "while True bucle con if/elif/else.\n\n" +
      "AHORA SÍ puedes usar while True con break — lo aprendiste en el " +
      "Cap 3 (no, no lo aprendiste — lo introducimos en el siguiente nivel). " +
      "Por ahora hazlo manualmente, 3 veces.",
    hint:
      'e = hero.find_nearest_enemy()\nif e == "Bones":\n    hero.attack(e)\nelif e == "Krug":\n    for i in range(2): hero.attack(e)\nelse:\n    for i in range(3): hero.attack(e)\n\n# Repite 2 veces más\n\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — elif es \"else if\". Te permite añadir más ramas a un\n" +
      "         condicional sin anidar:\n" +
      "             if condición1:\n" +
      "                 ...\n" +
      "             elif condición2:\n" +
      "                 ...   ← se evalúa solo si condición1 era False\n" +
      "             else:\n" +
      "                 ...   ← si NINGUNA anterior fue True\n" +
      "         Solo se ejecuta UNA rama.\n" +
      "\n" +
      "PASO 2 — Para cada enemigo, encuentra el más cercano y compara su\n" +
      "         nombre:\n" +
      "             Bones → 1 ataque (skeleton)\n" +
      "             Krug  → 2 ataques (ogro)\n" +
      "             Throg → 3 ataques (troll)\n" +
      "         Para 2 o 3 ataques, usa for + range dentro del bloque.\n" +
      "\n" +
      "PASO 3 — Repite el bloque 3 veces (uno por enemigo). En el siguiente\n" +
      "         nivel verás cómo no repetir con while True.\n" +
      "\n" +
      "PASO 4 — Avanza al exit.",
    skeleton:
      '# Bloque para UN enemigo — repite 3 veces variando solo si hace falta\n' +
      'e = hero.find_nearest_enemy()\n' +
      'if e == "Bones":\n' +
      '    hero.attack(e)\n' +
      '[TODO: elif para "Krug" — 2 ataques con for+range]\n' +
      'else:\n' +
      '    # Throg, 3 ataques\n' +
      '    [TODO: for + range de 3 ataques]\n' +
      '\n' +
      '# Repite el bloque entero 2 veces más\n' +
      '[TODO: copia y pega — 2 veces]\n' +
      '\n' +
      '# Avanzar\n' +
      '[TODO: for + range hasta el exit]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Bones", type: "skeleton", x: 3, y: 4, hp: 1 },
      { name: "Krug",  type: "ogre",     x: 5, y: 4, hp: 2 },
      { name: "Throg", type: "troll",    x: 7, y: 4, hp: 3 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    requires: [
      { type: 'mustContain', regex: /\belif\b/,
        message: "Debes usar al menos un elif" },
      { type: 'mustContain', regex: /\belse\b/,
        message: "Debes usar else para el caso restante" },
    ],
  },

  {
    id: 17, chapter: 4,
    title: "El portero exigente",
    location: "Puerta del santuario",
    concept: "Operadores lógicos: and / or / not",
    intro:
      "Un portero te interroga. Solo te deja pasar si TU NOMBRE es Aldric Y " +
      "tu rango es \"mago\". Operadores lógicos:\n\n" +
      "    and  (los DOS verdaderos)\n" +
      "    or   (al menos UNO verdadero)\n" +
      "    not  (lo opuesto)\n\n" +
      "    if nombre == \"Aldric\" and rango == \"mago\":\n" +
      "        print(\"autorizado\")\n" +
      "    else:\n" +
      "        print(\"denegado\")",
    outro:
      "Combinaciones lógicas: nadie quiere escribir if anidados cuando un " +
      "and resuelve.",
    diary:
      "Día 16. and, or, not. Tres operadores que valen por veinte if " +
      "anidados.",
    mission:
      "1) Define nombre = \"Aldric\" y rango = \"mago\".\n" +
      "2) Si AMBAS coinciden, imprime \"autorizado\" y avanza hasta la " +
      "puerta. Si no, imprime \"denegado\" y NO te muevas.\n" +
      "3) Comprueba después con valores incorrectos para entender qué pasa.",
    hint:
      'nombre = "Aldric"\nrango = "mago"\nif nombre == "Aldric" and rango == "mago":\n    print("autorizado")\n    for i in range(7):\n        hero.move_right()\nelse:\n    print("denegado")',
    strategy:
      "PASO 1 — Define dos variables: nombre y rango.\n" +
      "\n" +
      "PASO 2 — Operadores lógicos:\n" +
      "             and  → True si AMBOS lados son True\n" +
      "             or   → True si AL MENOS UNO es True\n" +
      "             not  → invierte (de True a False y viceversa)\n" +
      "         Aquí necesitas AND porque tienen que cumplirse las DOS\n" +
      "         condiciones (nombre correcto Y rango correcto).\n" +
      "\n" +
      "PASO 3 — Estructura del if:\n" +
      "             if nombre == \"Aldric\" and rango == \"mago\":\n" +
      "                 (autorizado: imprime y avanza)\n" +
      "             else:\n" +
      "                 (denegado: imprime, NO te muevas)\n" +
      "         Solo un if/else, no un and seguido de otro if.\n" +
      "\n" +
      "PASO 4 — Después de probar con valores válidos, prueba a cambiar el\n" +
      "         rango por \"aprendiz\". Verás que el portero te deniega.",
    skeleton:
      'nombre = "[TODO: Aldric]"\n' +
      'rango = "[TODO: mago]"\n' +
      '\n' +
      '# Combinar dos comparaciones con AND\n' +
      'if nombre == "Aldric" [TODO: operador lógico AND] rango == "mago":\n' +
      '    print("autorizado")\n' +
      '    [TODO: avanzar al exit]\n' +
      'else:\n' +
      '    print("denegado")',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 8, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\b(and|or)\b/,
        message: "Debes usar al menos un operador lógico (and / or)" },
      { type: 'mustContain', regex: /\bif\b/,
        message: "Debes usar un if que evalúe la condición" },
    ],
  },

  {
    id: 18, chapter: 4,
    title: "El bucle eterno",
    location: "Sala de los espejos infinitos",
    concept: "while True + break",
    intro:
      "Cuatro centinelas. Atacarlos uno por uno con if/elif sería tedioso. " +
      "Usa un bucle:\n\n" +
      "    while True:\n" +
      "        e = hero.find_nearest_enemy()\n" +
      "        if e is None:\n" +
      "            break\n" +
      "        hero.attack(e)\n\n" +
      "while True repite siempre. break sale del bucle. La salida limpia " +
      "es: cuando find_nearest devuelve None, paramos.",
    outro:
      "Mientras quede algo que hacer, házlo. break para cuando ya no.",
    diary:
      "Día 17. while True. Repite hasta que tú decidas parar. Pesadilla si " +
      "olvidas el break, paraíso si no.",
    mission:
      "Cuatro esqueletos en fila (HP 1). Derrótalos a todos con un solo " +
      "while True que use find_nearest y break. Después llega a la puerta.",
    hint:
      'while True:\n    e = hero.find_nearest_enemy()\n    if e is None:\n        break\n    hero.attack(e)\nfor i in range(9):\n    hero.move_right()',
    strategy:
      "PASO 1 — while True repite siempre. Para que NO sea infinito, dentro\n" +
      "         del bucle tienes que llegar a un punto donde uses break,\n" +
      "         que sale del bucle inmediatamente.\n" +
      "\n" +
      "PASO 2 — Patrón típico para 'haz mientras quede algo':\n" +
      "             while True:\n" +
      "                 e = hero.find_nearest_enemy()\n" +
      "                 if e is None:    ← cuando no quedan enemigos\n" +
      "                     break        ← salimos del bucle\n" +
      "                 hero.attack(e)   ← si lo hay, atacar\n" +
      "         Cada iteración busca un enemigo nuevo. Cuando find_nearest\n" +
      "         devuelve None, ya no quedan, y rompemos.\n" +
      "\n" +
      "PASO 3 — Después del while (sin indentar), avanza al exit.",
    skeleton:
      'while True:\n' +
      '    e = hero.find_nearest_enemy()\n' +
      '    # Si ya no hay enemigos, salimos\n' +
      '    if e [TODO: operador para comparar con None] None:\n' +
      '        [TODO: keyword para SALIR del bucle]\n' +
      '    # Si lo hay, atacarlo\n' +
      '    hero.attack(e)\n' +
      '\n' +
      '# Sin indentar — fuera del while\n' +
      '[TODO: avanzar al exit]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "S1", type: "skeleton", x: 3, y: 4, hp: 1 },
      { name: "S2", type: "skeleton", x: 5, y: 4, hp: 1 },
      { name: "S3", type: "skeleton", x: 7, y: 4, hp: 1 },
      { name: "S4", type: "skeleton", x: 9, y: 4, hp: 1 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    requires: [
      { type: 'mustContain', regex: /\bwhile\s+True\s*:/,
        message: "Debes usar un bucle while True:" },
      { type: 'mustContain', regex: /\bbreak\b/,
        message: "Debes usar break para salir del while" },
    ],
  },

  {
    id: 19, chapter: 4,
    title: "Mientras no llegues",
    location: "Pasillo sin fin",
    concept: "while con condición",
    gives_potion: true,
    intro:
      "while puede usar cualquier expresión booleana, no solo True. " +
      "hero.is_at_exit() devuelve True si estás en la puerta:\n\n" +
      "    while not hero.is_at_exit():\n" +
      "        hero.move_right()\n\n" +
      "Más elegante que un while True con break.",
    outro:
      "while con condición: la forma elegante. Sin trucos, sin break — " +
      "solo gramática limpia.",
    diary:
      "Día 18. while con condición de salida. \"Mientras no esté en la " +
      "puerta, avanza\". El antiguo Aldric habría escrito 9 líneas.",
    mission:
      "Avanza hasta la puerta usando while not hero.is_at_exit() y " +
      "hero.move_right() dentro. Solo 2 líneas.",
    hint: 'while not hero.is_at_exit():\n    hero.move_right()',
    strategy:
      "PASO 1 — while puede usar cualquier condición, no solo True. Aquí\n" +
      "         hero.is_at_exit() devuelve True si estás en la puerta.\n" +
      "\n" +
      "PASO 2 — La condición que necesitas: 'mientras NO esté en la puerta'.\n" +
      "         Eso se escribe con not:\n" +
      "             while not hero.is_at_exit():\n" +
      "                 hero.move_right()\n" +
      "\n" +
      "PASO 3 — Compara con while True + break del nivel anterior. Esta\n" +
      "         versión es más elegante: la condición misma decide cuándo\n" +
      "         parar, sin necesidad de break.\n" +
      "\n" +
      "PASO 4 — Solo 2 líneas. Si te ves usando break, simplifica.",
    skeleton:
      '# while con condición declarativa: "mientras NO esté en la salida"\n' +
      'while [TODO: not + hero.is_at_exit()]:\n' +
      '    hero.move_right()',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true },
    requires: [
      { type: 'mustContain', regex: /\bwhile\b(?!\s+True)/,
        message: "Debes usar while con una condición (no while True)" },
      { type: 'mustContain', regex: /hero\.is_at_exit\s*\(/,
        message: "Debes usar hero.is_at_exit() en la condición del while" },
      { type: 'mustNotContain', regex: /\bbreak\b/,
        message: "Aquí no necesitas break — la condición del while debe terminar el bucle sola" },
    ],
  },

  // ----------- EXAMEN 4 -----------
  {
    id: 20, chapter: 4,
    title: "Examen del bucle eterno",
    location: "Cámara del Examen IV",
    concept: "EXAMEN — repaso del Capítulo 4",
    is_exam: true,
    is_checkpoint: true,
    intro:
      "Cuarto examen. Bucles + condicionales. Sin pista.",
    outro:
      "Cuatro sellos rotos. La forja te espera — funciones y diccionarios.",
    diary:
      "Día 19. Cuarto examen. Cada vez tardo menos. Cada vez me equivoco " +
      "en cosas más sutiles. Es un buen signo.",
    mission:
      "Tres ogros (HP 2 cada uno). Derrótalos a todos y llega a la puerta.\n\n" +
      "RESTRICCIONES:\n" +
      "• Debes usar al menos un while\n" +
      "• Máximo 10 líneas\n" +
      "• Sin if/elif (solo lógica de bucle)",
    hint: "Examen sin pista.",
    solution:
      'e = hero.find_nearest_enemy()\n' +
      'while e is not None:\n' +
      '    hero.attack(e)\n' +
      '    hero.attack(e)\n' +
      '    e = hero.find_nearest_enemy()\n' +
      'while not hero.is_at_exit():\n' +
      '    hero.move_right()',
    starterCode:
      '# EXAMEN — Capítulo 4\n# while + lógica de bucle. Sin if/elif.\n\n',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Grok",  type: "ogre", x: 4, y: 4, hp: 2 },
      { name: "Brak",  type: "ogre", x: 6, y: 4, hp: 2 },
      { name: "Thurg", type: "ogre", x: 8, y: 4, hp: 2 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    restrictions: [
      { type: 'mustContain', regex: /\bwhile\b/, message: "Debes usar un bucle while" },
      { type: 'mustNotContain', regex: /\b(if|elif)\b/, message: "Sin if/elif en este examen" },
      { type: 'maxLines', value: 10, message: "Máximo 10 líneas" },
    ],
  },

  // ============================================================
  // CAPÍTULO 5 — LA FORJA (21-25): dicts, funciones, boss
  // ============================================================
  {
    id: 21, chapter: 5,
    title: "El libro de los nombres",
    location: "Forja — biblioteca",
    concept: "Diccionarios",
    is_checkpoint: true,
    intro:
      "Un libro lista enemigos con su daño. Un DICCIONARIO empareja claves " +
      "con valores entre llaves { }:\n\n" +
      "    danio = {\"Krug\": 2, \"Bones\": 1, \"Throg\": 3}\n" +
      "    print(danio[\"Krug\"])  # 2\n\n" +
      "Como una lista, pero accedes por nombre en vez de por número.",
    outro:
      "Diccionarios: la estructura más versátil de Python. Te resolverán " +
      "muchos problemas.",
    diary:
      "Día 20. Diccionarios. Listas de pares clave: valor. Acceso por " +
      "nombre. Mucho más legible que recordar índices.",
    mission:
      "Define un dict golpes = {\"Bones\": 1, \"Throg\": 3}. Para cada " +
      "enemigo (manualmente o con bucle), busca cuántos golpes necesita en " +
      "el dict y atácalo esa cantidad. Llega a la puerta.",
    hint:
      'golpes = {"Bones": 1, "Throg": 3}\nwhile True:\n    e = hero.find_nearest_enemy()\n    if e is None:\n        break\n    for i in range(golpes[e]):\n        hero.attack(e)\nwhile not hero.is_at_exit():\n    hero.move_right()',
    strategy:
      "PASO 1 — Diccionario: estructura clave→valor con llaves { }.\n" +
      "             golpes = {\"Bones\": 1, \"Throg\": 3}\n" +
      "         Acceso por clave: golpes[\"Bones\"] devuelve 1.\n" +
      "         Si la clave no existe → KeyError.\n" +
      "\n" +
      "PASO 2 — Combina dict + bucle del nivel anterior:\n" +
      "             while True:\n" +
      "                 e = hero.find_nearest_enemy()\n" +
      "                 if e is None: break\n" +
      "                 for i in range(golpes[e]):\n" +
      "                     hero.attack(e)\n" +
      "         Cuando atacas a Bones, golpes[\"Bones\"] = 1 → 1 ataque.\n" +
      "         Cuando atacas a Throg, golpes[\"Throg\"] = 3 → 3 ataques.\n" +
      "\n" +
      "PASO 3 — Avanza al exit con while not hero.is_at_exit().",
    skeleton:
      '# Diccionario clave→valor\n' +
      'golpes = {[TODO: "Bones": 1], "Throg": 3}\n' +
      '\n' +
      '# Mismo bucle de combate, pero el número de ataques sale del dict\n' +
      'while True:\n' +
      '    e = hero.find_nearest_enemy()\n' +
      '    if e is None:\n' +
      '        break\n' +
      '    # for que repite golpes[e] veces\n' +
      '    for i in range([TODO: acceso al dict por clave e]):\n' +
      '        hero.attack(e)\n' +
      '\n' +
      '# Avanzar\n' +
      '[TODO: while not hero.is_at_exit()]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Bones", type: "skeleton", x: 4, y: 4, hp: 1 },
      { name: "Throg", type: "troll",    x: 7, y: 4, hp: 3 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    requires: [
      { type: 'mustContain', regex: /=\s*\{[^}]*:[^}]*\}/,
        message: "Debes definir un diccionario con { clave: valor }" },
      { type: 'mustContain', regex: /\[[^\[\]]*\]/,
        message: "Debes acceder a un valor del dict por su clave (ej: golpes[e])" },
    ],
  },

  {
    id: 22, chapter: 5,
    title: "Tu primera función",
    location: "Forja — taller",
    concept: "def función sin argumentos",
    intro:
      "Las funciones agrupan instrucciones bajo un nombre:\n\n" +
      "    def avanzar():\n" +
      "        hero.move_right()\n" +
      "        hero.move_right()\n" +
      "        hero.move_right()\n\n" +
      "Después la llamas: avanzar(). Cada vez que la llames, ejecuta sus 3 " +
      "líneas.",
    outro:
      "Funciones: tus propias runas. Defines tú mismo lo que el lenguaje " +
      "puede hacer.",
    diary:
      "Día 21. def. Mi primera función. Ahora puedo crear conjuros con mis " +
      "propios nombres.",
    mission:
      "Define una función avanzar() que llame 3 veces a hero.move_right(). " +
      "Después llámala 2 veces (avanzar() avanzar()) para llegar a la " +
      "puerta a 6 casillas.",
    hint:
      'def avanzar():\n    hero.move_right()\n    hero.move_right()\n    hero.move_right()\n\navanzar()\navanzar()',
    strategy:
      "PASO 1 — Definir una función:\n" +
      "             def nombre():\n" +
      "                 (líneas indentadas con lo que hace)\n" +
      "         La palabra clave es def. Los () están vacíos (sin argumentos\n" +
      "         por ahora). Dos puntos al final. Las líneas dentro indentadas\n" +
      "         con 4 espacios.\n" +
      "\n" +
      "PASO 2 — Define avanzar() con 3 llamadas a hero.move_right() dentro.\n" +
      "         Esto SOLO define la función — no la ejecuta.\n" +
      "\n" +
      "PASO 3 — Llamar a la función: pones su nombre + paréntesis.\n" +
      "             avanzar()\n" +
      "         Cada vez que la llamas, ejecuta sus 3 líneas. Llámala 2 veces\n" +
      "         para llegar a 6 casillas.",
    skeleton:
      '# Definir la función con def\n' +
      '[TODO: keyword def] avanzar():\n' +
      '    # 4 espacios — dentro de la función\n' +
      '    hero.move_right()\n' +
      '    hero.move_right()\n' +
      '    hero.move_right()\n' +
      '\n' +
      '# Llamar 2 veces (sin indentar, fuera de la def)\n' +
      'avanzar()\n' +
      '[TODO: segunda llamada]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 7, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+\s*\(\s*\)\s*:/,
        message: "Debes definir una función SIN argumentos: def nombre():" },
    ],
  },

  {
    id: 23, chapter: 5,
    title: "Conjuros con argumentos",
    location: "Forja — sala mayor",
    concept: "def con argumentos",
    gives_potion: true,
    intro:
      "Una función puede recibir información. Los argumentos van entre los " +
      "paréntesis del def:\n\n" +
      "    def golpear(enemigo, veces):\n" +
      "        for i in range(veces):\n" +
      "            hero.attack(enemigo)\n\n" +
      "Y al llamar: golpear(\"Krug\", 2). El nombre y el número se asignan " +
      "a las variables enemigo y veces dentro de la función.",
    outro:
      "Funciones parametrizadas: un mismo conjuro, distintos objetivos. " +
      "Reutilizable y elegante.",
    diary:
      "Día 22. Funciones con argumentos. Mi vocabulario crece sin escribir " +
      "más líneas. La poción del altar me ha dado un respiro.",
    mission:
      "Define golpear(enemigo, veces) que ataque \"veces\" veces a " +
      "\"enemigo\". Úsala en un bucle para los 3 enemigos (Bones HP 1, " +
      "Krug HP 2, Throg HP 3). Después llega a la puerta.",
    hint:
      'def golpear(enemigo, veces):\n    for i in range(veces):\n        hero.attack(enemigo)\n\ngolpes = {"Bones": 1, "Krug": 2, "Throg": 3}\nwhile True:\n    e = hero.find_nearest_enemy()\n    if e is None:\n        break\n    golpear(e, golpes[e])\n\nwhile not hero.is_at_exit():\n    hero.move_right()',
    strategy:
      "PASO 1 — Define una función con DOS argumentos:\n" +
      "             def golpear(enemigo, veces):\n" +
      "                 for i in range(veces):\n" +
      "                     hero.attack(enemigo)\n" +
      "         Los nombres entre paréntesis son PARÁMETROS — variables\n" +
      "         que reciben valores cuando llamas la función. Dentro del\n" +
      "         cuerpo, los usas como variables normales.\n" +
      "\n" +
      "PASO 2 — Llamar: pasas valores en el mismo orden que los parámetros.\n" +
      "             golpear(\"Krug\", 2)\n" +
      "         \"Krug\" se asigna a enemigo, 2 se asigna a veces.\n" +
      "\n" +
      "PASO 3 — Combina con el dict del nivel anterior y el bucle:\n" +
      "             golpes = {\"Bones\": 1, \"Krug\": 2, \"Throg\": 3}\n" +
      "             while True:\n" +
      "                 e = hero.find_nearest_enemy()\n" +
      "                 if e is None: break\n" +
      "                 golpear(e, golpes[e])\n" +
      "\n" +
      "PASO 4 — Avanza al exit con while + is_at_exit.",
    skeleton:
      '# Función con argumentos\n' +
      'def golpear([TODO: enemigo], [TODO: veces]):\n' +
      '    for i in range(veces):\n' +
      '        hero.attack(enemigo)\n' +
      '\n' +
      '# Dict con los golpes que aguanta cada enemigo\n' +
      'golpes = {"Bones": 1, "Krug": 2, "Throg": 3}\n' +
      '\n' +
      '# Bucle: encuentra y golpea con el número correcto\n' +
      'while True:\n' +
      '    e = hero.find_nearest_enemy()\n' +
      '    if e is None:\n' +
      '        break\n' +
      '    golpear([TODO: el enemigo], [TODO: golpes[e] — los golpes que aguanta])\n' +
      '\n' +
      '# Avanzar\n' +
      '[TODO: while not hero.is_at_exit()]',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Bones", type: "skeleton", x: 3, y: 4, hp: 1 },
      { name: "Krug",  type: "ogre",     x: 5, y: 4, hp: 2 },
      { name: "Throg", type: "troll",    x: 7, y: 4, hp: 3 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+\s*\(\s*\w+\s*[,)]/,
        message: "Debes definir una función CON argumentos: def nombre(arg1, ...):" },
    ],
  },

  {
    id: 24, chapter: 5,
    title: "Funciones que devuelven",
    location: "Forja — el espejo",
    concept: "def con return",
    intro:
      "Una función puede DEVOLVER un valor con return. El valor se puede " +
      "guardar en una variable o usar directamente:\n\n" +
      "    def doble(n):\n" +
      "        return n * 2\n\n" +
      "    print(doble(5))   # 10\n" +
      "    x = doble(7)      # x = 14\n\n" +
      "Después de un return, la función termina.",
    outro:
      "Funciones que devuelven: la pieza que faltaba. Ahora puedes componer " +
      "una función dentro de otra.",
    diary:
      "Día 23. return. La función ya no solo hace cosas — me da algo a " +
      "cambio. Compongo conjuros como engranajes.",
    mission:
      "1) Define una función dado_de(n) que devuelva n * 2 (return).\n" +
      "2) Calcula cuantos = dado_de(2) (debe dar 4).\n" +
      "3) Imprime cuantos.\n" +
      "4) Avanza esa cantidad de casillas (4) hasta la puerta.",
    hint:
      'def dado_de(n):\n    return n * 2\n\ncuantos = dado_de(2)\nprint(cuantos)\nfor i in range(cuantos):\n    hero.move_right()',
    strategy:
      "PASO 1 — return hace que la función DEVUELVA un valor. Sintaxis:\n" +
      "             def doble(n):\n" +
      "                 return n * 2\n" +
      "         Después de la palabra return va lo que la función devuelve.\n" +
      "         Cuando se ejecuta el return, la función TERMINA — el código\n" +
      "         posterior dentro de la función no se ejecuta.\n" +
      "\n" +
      "PASO 2 — Captura el valor devuelto en una variable:\n" +
      "             cuantos = doble(2)   ← cuantos vale 4\n" +
      "         O úsalo directamente:\n" +
      "             print(doble(5))      ← imprime 10\n" +
      "\n" +
      "PASO 3 — La diferencia con las funciones del nivel anterior:\n" +
      "         Antes la función HACÍA cosas (atacar, mover).\n" +
      "         Ahora la función CALCULA un valor y te lo devuelve.\n" +
      "         Si una función no tiene return, devuelve None.\n" +
      "\n" +
      "PASO 4 — Define dado_de(n) que devuelve n*2. Llámala con argumento\n" +
      "         2, guarda el resultado, imprímelo y avanza esa cantidad de\n" +
      "         casillas con for+range.",
    skeleton:
      '# Función que CALCULA y devuelve un valor\n' +
      'def dado_de(n):\n' +
      '    [TODO: keyword para devolver] n * 2\n' +
      '\n' +
      '# Llamar y capturar el resultado\n' +
      'cuantos = dado_de(2)\n' +
      'print([TODO: la variable])\n' +
      '\n' +
      '# Avanzar esa cantidad de casillas\n' +
      'for i in range(cuantos):\n' +
      '    hero.move_right()',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 5, y: 4 },
    enemies: [], gems: [],
    win: { mustReachExit: true, mustPrint: true },
    requires: [
      { type: 'mustContain', regex: /\bdef\s+\w+\s*\(/,
        message: "Debes definir una función con def" },
      { type: 'mustContain', regex: /^[ \t]+return\b/m,
        message: "Tu función debe usar return para devolver un valor" },
    ],
  },

  // ----------- EXAMEN 5 — BOSS -----------
  {
    id: 25, chapter: 5,
    title: "La Torre del Vacío",
    location: "Cima — Vorthak",
    concept: "EXAMEN FINAL — Vorthak",
    is_exam: true,
    is_final: true,
    intro:
      "Vorthak, Señor del Caos Nulo. HP 8. Cuatro esqueletos guardianes " +
      "(HP 1 cada uno). No vas a vencerlo línea a línea — necesitas todo: " +
      "diccionarios, funciones, bucles, condicionales. Sin pista. " +
      "Demuestra quién eres.",
    outro:
      "Vorthak cae con un grito que retumba por toda la torre. El Caos " +
      "Nulo se disipa. Las runas vuelven a brillar en los muros del reino. " +
      "Has aprendido los fundamentos de Python — y has salvado Pythia.",
    diary:
      "Día 24. La Torre. Vorthak. Aldric, que hace tres semanas no sabía " +
      "pulsar Ejecutar, ahora ha derrotado al Caos. Todo gracias a un " +
      "puñado de runas bien aprendidas. Mañana toca aprender otra cosa.",
    mission:
      "Derrota a Vorthak (HP 8) y a sus 4 esqueletos guardianes. " +
      "Combina lo aprendido. Después llega a la puerta.\n\n" +
      "RESTRICCIONES:\n" +
      "• Debes definir AL MENOS UNA función con def\n" +
      "• Debes usar al menos un bucle while\n" +
      "• Máximo 18 líneas",
    hint: "EXAMEN FINAL — sin pista.",
    solution:
      'def matar_a_todos():\n' +
      '    while True:\n' +
      '        e = hero.find_nearest_enemy()\n' +
      '        if e is None:\n' +
      '            break\n' +
      '        hero.attack(e)\n' +
      '\n' +
      'matar_a_todos()\n' +
      '\n' +
      'while not hero.is_at_exit():\n' +
      '    hero.move_right()',
    starterCode:
      '# EXAMEN FINAL — Vorthak\n# def + while + lo que hayas aprendido.\n\n',
    map: emptyMap(),
    hero: { x: 1, y: 4 }, exit: { x: 10, y: 4 },
    enemies: [
      { name: "Skel-1",  type: "skeleton", x: 4, y: 2, hp: 1 },
      { name: "Skel-2",  type: "skeleton", x: 4, y: 6, hp: 1 },
      { name: "Skel-3",  type: "skeleton", x: 7, y: 3, hp: 1 },
      { name: "Skel-4",  type: "skeleton", x: 7, y: 5, hp: 1 },
      { name: "Vorthak", type: "boss",     x: 9, y: 4, hp: 8 },
    ],
    gems: [],
    win: { mustReachExit: true, mustKillAll: true },
    restrictions: [
      { type: 'mustContain', regex: /\bdef\s+\w+/, message: "Debes definir al menos una función con def" },
      { type: 'mustContain', regex: /\bwhile\b/, message: "Debes usar un bucle while" },
      { type: 'maxLines', value: 18, message: "Máximo 18 líneas" },
    ],
    isFinal: true,
  },
];
