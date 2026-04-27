// Pixel art sprites: 16x16, 1 char por pixel.

const PALETTE = {
  '.': null,            // transparente
  '#': '#0a0a0f',       // borde / negro
  // héroe
  'K': '#b8b8c8', 'k': '#6a6a78',
  'F': '#f4c89a',
  'B': '#3b6fc4', 'b': '#2a4f8c',
  'L': '#6b4423', 'N': '#3a2410',
  'S': '#e6e6f0', 's': '#9a9aa8',
  'E': '#1a0d0d',
  // gema
  'C': '#5fd1f7', 'c': '#2faecc', 'W': '#ffffff',
  // enemigos (palette base)
  'O': '#5d8a3e', 'o': '#3f6128',
  'R': '#c43b3b', 'r': '#8c2a2a',
  // varios
  'Y': '#f5d04a', 'y': '#b8983a',
  // puerta
  'M': '#7a4f2a', 'm': '#5a3520', 'H': '#f5d04a',
  // suelo / muro
  'D': '#2e2418', 'd': '#3d3024',
  'X': '#6a6470', 'x': '#4a4450',
  'T': '#1a1018',
  'P': '#f4c89a',
  'G': '#84e684', 'g': '#3a8a3a',
};

// Variantes por tipo de enemigo (sobreescriben colores en la sprite "ogre")
const ENEMY_PALETTES = {
  ogre: PALETTE,
  skeleton: { ...PALETTE,
    'O': '#dadadd', 'o': '#8a8a96',
    'E': '#1a0d0d', 'R': '#1a0d0d', 'r': '#1a0d0d',
  },
  troll: { ...PALETTE,
    'O': '#a84030', 'o': '#702020',
    'E': '#ffd010',
  },
  boss: { ...PALETTE,
    'O': '#7c3dc8', 'o': '#4a1f80',
    'E': '#ff3030', 'R': '#ffaa00', 'r': '#c47000',
  },
};

// Evolución del héroe: cambia de aspecto al progresar capítulos.
const HERO_PALETTES = {
  // Aprendiz — armadura azul, casco plata (capítulos 1-2)
  apprentice: PALETTE,
  // Iniciado — túnica verde oscura, casco con tono pardo (capítulos 3-4)
  initiate: { ...PALETTE,
    'B': '#3a8a3e', 'b': '#1f6128',
    'K': '#7a6a4a', 'k': '#4a3a24',
  },
  // Mago — túnica púrpura, capucha oscura (capítulos 5-6)
  mage: { ...PALETTE,
    'B': '#7c3dc8', 'b': '#4a1f80',
    'K': '#3a3a44', 'k': '#1a1a24',
    'L': '#3a2a44', 'N': '#1a1018',
  },
  // Archimago — túnica dorada, casco oro (capítulo 7+)
  archmage: { ...PALETTE,
    'B': '#e0a830', 'b': '#a87018',
    'K': '#f5d04a', 'k': '#a08020',
    'S': '#fff5b8', 's': '#d4b040',
  },
};

const SPRITES = {
  hero: [
    "................",
    "................",
    ".....######.....",
    "....#KKKKKK#....",
    "....#KkkkkK#....",
    "....#kFFFFk#....",
    "....#FEFFEF#....",
    "....##FFFF##....",
    "...#BBbBBbBB#...",
    "...#bBBBBBBb#sS.",
    "...#BBBBBBBB#sS.",
    "....#BBBBBB#....",
    "....#L####L#....",
    "....#L#..#L#....",
    "....#N#..#N#....",
    ".....##..##.....",
  ],

  hero_left: [
    "................",
    "................",
    ".....######.....",
    "....#KKKKKK#....",
    "....#KkkkkK#....",
    "....#kFFFFk#....",
    "....#FEFFEF#....",
    "....##FFFF##....",
    "...#BBbBBbBB#...",
    ".Ss#bBBBBBBb#...",
    ".Ss#BBBBBBBB#...",
    "....#BBBBBB#....",
    "....#L####L#....",
    "....#L#..#L#....",
    "....#N#..#N#....",
    ".....##..##.....",
  ],

  ogre: [
    "................",
    "................",
    "....########....",
    "...#oOOOOOOo#...",
    "...#OoOOOOoO#...",
    "...#OEOOOOEO#...",
    "...#OOOOOOOO#...",
    "...##RRRRRR##...",
    "..#OOOOOOOOOO#..",
    "..#oOOOOOOOOo#..",
    "..#OOOOOOOOOO#..",
    "..#OOOOOOOOOO#..",
    "...#OOOOOOOO#...",
    "....##O##O##....",
    "....#N#..#N#....",
    ".....##..##.....",
  ],

  // Boss más imponente: cuerpo grande con corona y báculo
  boss: [
    "................",
    ".....######.....",
    "....#YYYYYY#....",   // corona dorada
    "....#YHRHRY#....",
    "...#OOOOOOOO#...",
    "..#OoOOOOOOoO#..",
    "..#OEOOOOOOEO#..",
    "..##RRRRRRRR##..",
    ".#OOOOOOOOOOOO#.",
    ".#oOOOOOOOOOOo#.",
    ".#OOOOOOOOOOOO#.",
    ".#OOOOOOOOOOOO#.",
    "..#OOOOOOOOOO#..",
    "...##O##O##.....",
    "...#N#..#N#.....",
    "....##..##......",
  ],

  gem: [
    "................",
    "................",
    "................",
    ".......##.......",
    "......#WC#......",
    ".....#WCCC#.....",
    "....#CCCCCCC#...",
    "...#CCCCCCCCC#..",
    "...#CCWCCCCCC#..",
    "....#cCCCCCC#...",
    ".....#ccCCC#....",
    "......#ccc#.....",
    ".......##.......",
    "................",
    "................",
    "................",
  ],

  door: [
    "................",
    "...##########...",
    "..#mMMMMMMMMm#..",
    "..#MmmmmmmmmM#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTHTTm#..",
    "..#MmTTTTHTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmTTTTTTTm#..",
    "..#MmmmmmmmmM#..",
    "..#MMMMMMMMMM#..",
    "..############..",
  ],

  wall: [
    "XXXXXXXXXXXXXXXX",
    "XXXxxxxxXXXxxxxX",
    "XXxxxxxxXXxxxxxX",
    "XXxxxxxxXXxxxxxX",
    "XXxxxxxxXXxxxxxX",
    "XXXXXXXXXXXXXXXX",
    "xxXXXXxxxxxxXXxx",
    "xXxxxXXXxxxxXxxx",
    "xXxxxxxXxxxxXxxx",
    "xXxxxxxXxxxxXxxx",
    "XXXXXXXXXXXXXXXX",
    "XXxxxxXXXxxxxxXX",
    "XxxxxxxXXxxxxxXX",
    "XxxxxxxXXxxxxxXX",
    "XxxxxxxXXxxxxxXX",
    "XXXXXXXXXXXXXXXX",
  ],

  floor: [
    "DDDDDDDDDDDDDDDD",
    "DdDDDDDDDDDDDDdD",
    "DDDDDdDDDDDDDDDD",
    "DDDDDDDDDDdDDDDD",
    "DDDDDDDDDDDDDDDD",
    "DDdDDDDDDDDDDDDD",
    "DDDDDDDDdDDDDDDD",
    "DDDDDDDDDDDDDDdD",
    "DdDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDD",
    "DDDDDDdDDDDDDDDD",
    "DDDDDDDDDDDdDDDD",
    "DDDDDDDDDDDDDDDD",
    "DDDDdDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDD",
    "DDDDDDDDDDDDDDDD",
  ],
};

function drawSprite(ctx, name, px, py, tileSize, paletteOverride = null) {
  const sprite = SPRITES[name];
  if (!sprite) return;
  const pal = paletteOverride || PALETTE;
  const pix = tileSize / 16;
  for (let y = 0; y < 16; y++) {
    const row = sprite[y];
    for (let x = 0; x < 16; x++) {
      const c = row[x];
      const color = pal[c];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(px + x * pix, py + y * pix, Math.ceil(pix), Math.ceil(pix));
    }
  }
}

function drawText(ctx, text, x, y, color = '#fff', size = 12) {
  ctx.font = `bold ${size}px Consolas, monospace`;
  ctx.fillStyle = '#000';
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
