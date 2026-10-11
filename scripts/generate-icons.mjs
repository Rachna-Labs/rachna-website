// Generates the favicon set, PWA icons and the Open Graph image from the brand mark.
// Usage: npm run icons
//
// The favicon is the website icon, a black mark in a white circle, which reads on
// light and dark browser tabs alike.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = (file) => fileURLToPath(new URL(`../public/${file}`, import.meta.url));

// The mark's drawing, in its own coordinates (read from its viewBox).
const source = await readFile(new URL('../src/assets/brand/mark.svg', import.meta.url), 'utf8');
const drawing = source.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const [, , W, H] = source.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);

/** The mark centred on a square canvas, `scale` of its height, on an optional background. */
function icon({ size, color = '#111111', background, scale = 0.8, radius = 0 }) {
  const box = Math.max(W, H) / scale;
  const x = (box - W) / 2;
  const y = (box - H) / 2;
  const dims = size ? `width="${size}" height="${size}"` : '';
  const bg = background ? `<rect width="${box}" height="${box}" rx="${radius * box}" fill="${background}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" ${dims} viewBox="0 0 ${box} ${box}">${bg}<g transform="translate(${x} ${y})" fill="${color}">${drawing}</g></svg>`;
}

/**
 * The website icon (src/assets/brand/website-icon.png): the black mark inside a white circle,
 * so it reads on light and dark browser tabs alike. The mark is 80.6% of the circle's height,
 * centred slightly low, as in the designed icon.
 */
function websiteIcon(size) {
  const box = 1000;
  const h = 806;
  const w = (h * W) / H;
  const dims = size ? `width="${size}" height="${size}"` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" ${dims} viewBox="0 0 ${box} ${box}"><circle cx="500" cy="500" r="500" fill="#ffffff"/><g transform="translate(${(box - w) / 2} ${544 - h / 2}) scale(${h / H})" fill="#111111">${drawing}</g></svg>`;
}

const png = (svg) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

/** Packs PNG buffers into a multi-size .ico file. */
function toIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + 16 * images.length;
  images.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...images.map((img) => img.buf)]);
}

const font = `font-family="'Helvetica Neue', Helvetica, Inter, Arial, sans-serif"`;

// The social preview: just the mark and the name, centred on white.
const markHeight = 200;
const markWidth = (markHeight * W) / H;
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <g transform="translate(${600 - markWidth / 2} 130) scale(${markHeight / H})" fill="#111111">${drawing}</g>
  <text x="600" y="420" text-anchor="middle" ${font} font-size="54" letter-spacing="-1.2" fill="#111111"><tspan font-weight="500">Rachna</tspan> <tspan font-weight="300" fill="#8A8A8A">Labs</tspan></text>
  <text x="600" y="476" text-anchor="middle" ${font} font-size="24" font-weight="300" fill="#8A8A8A">Research that turns into technology for people</text>
</svg>`;

const fav = (size) => png(websiteIcon(size));
const [ico16, ico32, ico48] = await Promise.all([16, 32, 48].map(fav));

await Promise.all([
  writeFile(out('favicon.svg'), websiteIcon()),
  writeFile(out('favicon.ico'), toIco([{ size: 16, buf: ico16 }, { size: 32, buf: ico32 }, { size: 48, buf: ico48 }])),
  fav(96).then((b) => writeFile(out('favicon-96.png'), b)),
  png(icon({ size: 180, background: '#FFFFFF', scale: 0.62 })).then((b) => writeFile(out('apple-touch-icon.png'), b)),
  png(icon({ size: 192, background: '#FFFFFF', scale: 0.66, radius: 0.22 })).then((b) => writeFile(out('icon-192.png'), b)),
  png(icon({ size: 512, background: '#FFFFFF', scale: 0.66, radius: 0.22 })).then((b) => writeFile(out('icon-512.png'), b)),
  png(icon({ size: 512, background: '#FFFFFF', scale: 0.5 })).then((b) => writeFile(out('icon-maskable-512.png'), b)),
  png(ogSvg).then((b) => writeFile(out('og.png'), b)),
]);

console.log('Generated favicon.svg, favicon.ico, favicon-96.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og.png');
