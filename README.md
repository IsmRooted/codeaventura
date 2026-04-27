# CodeAventura

> Aprende Python en una aventura — cripta, ogros y conjuros.

CodeAventura es un juego educativo en navegador para aprender Python desde cero, ambientado en una aventura de fantasía: la cripta del aprendiz, el bosque torcido, la niebla, la forja y la torre del vacío. Cada nivel se resuelve con código Python real — `print()`, variables, listas, `for`, `if`, `while`, diccionarios, funciones — sobre un grid donde diriges a un héroe.

Todo el código del jugador se ejecuta en un **sandbox dentro del navegador** (Pyodide). Sin servidor, sin cuentas, sin telemetría.

---

## ⚠ Aviso

Material **educativo** para principiantes absolutos en Python. No requiere conocimientos previos. Cada nivel introduce un concepto nuevo, valida que lo apliques (mediante regex sobre tu código) y avanza solo cuando lo escribes tú.

---

## Estado actual

**25 operaciones** · **5 capítulos** · 5 evaluaciones internas (una por capítulo).

| Cap | Tema | Operaciones |
|-----|------|-------------|
| 1 | Despertar — `print`, variables, operadores | 5 |
| 2 | El bosque torcido — f-strings, listas, bucles | 5 |
| 3 | Niebla y nombres — argumentos y condicionales | 5 |
| 4 | Senda de decisiones — `elif`, lógica, `while` | 5 |
| 5 | La forja — diccionarios y funciones (boss final: Vorthak) | 5 |

---

## Cómo jugar

Necesitas un navegador moderno (Chrome, Firefox, Edge, Safari recientes) y Python instalado para servir los archivos por HTTP. Pyodide requiere CORS, así que abrir `index.html` directamente con `file://` no funciona.

```bash
git clone https://github.com/IsmRooted/codeaventura.git
cd codeaventura
python3 -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000). La primera carga descarga Pyodide (~10 MB desde CDN) y tarda 5-15 segundos. Las siguientes son instantáneas (caché del navegador).

---

## Cómo está hecho

- **Vanilla** HTML / CSS / JavaScript. Sin frameworks, sin build step, sin dependencias `npm`.
- [**Pyodide**](https://pyodide.org/) (CDN) — Python 3 ejecutándose en el navegador vía WebAssembly. Trae casi toda la stdlib.
- [**CodeMirror 5**](https://codemirror.net/5/) (CDN) — editor de código con resaltado Python.
- **Sprites SVG** — héroes (apprentice, initiate, mage), enemigos, objetos del grid, dibujados como SVG inline.

---

## Mecánicas

- **Editor + ejecutar** — escribes Python, pulsas `▶ Ejecutar` (o `Ctrl+Enter`).
- **Grid 12×8** — el héroe se mueve por casillas. Las paredes (`W`), enemigos, items y la salida son parte del mapa de cada nivel.
- **API del héroe** — el código del jugador llama a métodos del personaje:
  - `hero.move_right()` — avanza una casilla a la derecha.
  - `hero.move_to(x, y)` — se desplaza a coordenadas concretas.
  - `hero.attack(name)` — ataca al enemigo con ese nombre.
  - `hero.find_nearest_enemy()` — devuelve el enemigo más cercano (o `None`).
  - `hero.is_at_exit()` — devuelve `True` si está sobre la casilla de salida.
- **Cover meter** ❤ — equivalente a "vidas". Cada error de Python te quema 1 punto. A 0 vuelves al checkpoint.
- **Pociones** 🛡 — algunos niveles te dan una para recuperar 1 punto.
- **Exámenes** (uno por capítulo) — restricciones técnicas, sin pista, sin teoría previa.
- **Persistencia local** — progreso, código por nivel y preferencias en `localStorage`. Sin cuentas, sin servidor.

### Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl+Enter` | Ejecutar el código |
| `Esc` | Cerrar overlay activo |
| `Enter` | Aceptar/avanzar en overlays modales |

---

## Estructura del repo

```
codeaventura/
├── index.html              # menú + pantallas + overlays
├── style.css               # estilos
├── README.md
├── LICENSE                 # MIT
└── js/
    ├── levels.js           # 25 niveles con mapa, mission, hint, validators
    ├── sprites.js          # SVGs de héroes, enemigos, objetos
    ├── tutorial.js         # manual técnico, briefing narrativo
    ├── game.js             # motor: vidas, simulación de movimientos, win checks
    ├── runner.js           # carga Pyodide y ejecuta código del jugador
    └── main.js             # pantallas, persistencia, render del grid
```

---

## Filosofía

CodeAventura está pensada para que **escribas tú el código**, no para copiar:

- Los `starterCode` solo recuerdan la misión — la lógica la escribes tú.
- La pista (`hint`) muestra una solución posible, pero el juego valida que **uses el concepto enseñado** mediante regex sobre tu código.
- Los exámenes tienen restricciones técnicas (líneas máximas, operadores requeridos) y bloquean la pista.

---

## Roadmap

Posibles ampliaciones futuras (ninguna bloqueante):

- Más capítulos cubriendo Python intermedio (regex, clases, módulos).
- Sistema de pista en varias capas (teoría → estrategia → solución), como en el proyecto hermano [PyHack](https://github.com/IsmRooted/pyhack).
- Sprites animados.
- Modo libre / sandbox.

---

## Licencia

[MIT](LICENSE) — usa, modifica, redistribuye.

---

## Inspirado por

- [CodeCombat](https://codecombat.com/) — programar como mecánica central de un juego.
- Las clásicas mazmorras por turnos sobre grid (Roguelikes).
