// Generates the favicon set, PWA icons and the Open Graph image from the brand mark.
// Usage: npm run icons   (optionally SITE_URL=https://yourdomain.com npm run icons)
//
// The favicon follows the browser theme: favicon.svg switches colour with
// prefers-color-scheme, and favicon-light.png / favicon-dark.png are linked with media
// queries for browsers that don't use the SVG.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const out = (file) => fileURLToPath(new URL(`../public/${file}`, import.meta.url));
const domain = (process.env.SITE_URL ?? 'https://www.rachnalabs.com').replace(/^https?:\/\//, '').replace(/\/$/, '');

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

/** Favicon that is black in a light browser theme and white in a dark one. */
function adaptiveFavicon() {
  const box = Math.max(W, H) / 0.9;
  const x = (box - W) / 2;
  const y = (box - H) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}"><style>g{fill:#111111}@media (prefers-color-scheme:dark){g{fill:#ffffff}}</style><g transform="translate(${x} ${y})">${drawing}</g></svg>`;
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

const font = `font-family="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif"`;
const markInOg = icon({ color: '#111111', scale: 1 }).replace('<svg', '<svg x="80" y="66" width="64" height="64"');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  ${markInOg}
  <text x="150" y="114" ${font} font-size="30" font-weight="500" fill="#111111">Rachna <tspan fill="#6B6B6B" font-weight="300">Labs</tspan></text>
  <text x="80" y="300" ${font} font-size="68" font-weight="300" letter-spacing="-2" fill="#111111">Research that turns into</text>
  <text x="80" y="380" ${font} font-size="68" font-weight="300" letter-spacing="-2" fill="#111111">technology for <tspan font-style="italic">people</tspan></text>
  <text x="80" y="450" ${font} font-size="26" fill="#6B6B6B">An Indian research and product lab</text>
  <text x="80" y="560" ${font} font-size="22" fill="#6B6B6B">${domain}</text>
  <g opacity="0.06" transform="translate(800 150)">${icon({ size: 420, scale: 1 }).replace('<svg', '<svg x="0" y="0"')}</g>
</svg>`;

const favLight = (size) => png(icon({ size, color: '#111111', scale: 0.9 }));
const favDark = (size) => png(icon({ size, color: '#FFFFFF', scale: 0.9 }));
const [ico16, ico32, ico48] = await Promise.all([16, 32, 48].map(favLight));

await Promise.all([
  writeFile(out('favicon.svg'), adaptiveFavicon()),
  writeFile(out('favicon.ico'), toIco([{ size: 16, buf: ico16 }, { size: 32, buf: ico32 }, { size: 48, buf: ico48 }])),
  favLight(64).then((b) => writeFile(out('favicon-light.png'), b)),
  favDark(64).then((b) => writeFile(out('favicon-dark.png'), b)),
  png(icon({ size: 180, background: '#FFFFFF', scale: 0.62 })).then((b) => writeFile(out('apple-touch-icon.png'), b)),
  png(icon({ size: 192, background: '#FFFFFF', scale: 0.66, radius: 0.22 })).then((b) => writeFile(out('icon-192.png'), b)),
  png(icon({ size: 512, background: '#FFFFFF', scale: 0.66, radius: 0.22 })).then((b) => writeFile(out('icon-512.png'), b)),
  png(icon({ size: 512, background: '#FFFFFF', scale: 0.5 })).then((b) => writeFile(out('icon-maskable-512.png'), b)),
  png(ogSvg).then((b) => writeFile(out('og-image.png'), b)),
]);

console.log('Generated favicon.svg, favicon.ico, favicon-light/dark.png, apple-touch-icon.png, icon-192/512.png, icon-maskable-512.png, og-image.png');
