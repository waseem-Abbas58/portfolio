// Converts source images in public/images to right-sized WebP files.
// Run: node scripts/optimize-images.mjs
import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images");
const rules = [
  { dir: "greenscan/screens", width: 540 },
  { dir: "greenscan", width: 720, only: /^\d\d_.*\.png$/ },
];

for (const r of rules) {
  const dir = path.join(root, r.dir);
  for (const f of await readdir(dir)) {
    const src = path.join(dir, f);
    if ((await stat(src)).isDirectory() || !/\.(png|jpe?g)$/i.test(f)) continue;
    if (r.only && !r.only.test(f)) continue;
    const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
    await sharp(src).resize({ width: r.width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
    await unlink(src);
    console.log("ok", path.relative(root, out));
  }
}

await sharp(path.join(root, "waseem.png")).resize({ width: 900 }).webp({ quality: 85 }).toFile(path.join(root, "waseem.webp"));
await sharp(path.join(root, "waseem-square.jpg")).resize({ width: 800 }).webp({ quality: 82 }).toFile(path.join(root, "waseem-square.webp"));
console.log("ok portraits");
