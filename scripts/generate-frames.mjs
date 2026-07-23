/**
 * Generates 60 transparent PNG frames for tortilla split scroll sequence.
 * Uses sharp to remove light backgrounds and interpolate solo → duo → club.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const framesDir = path.join(root, "public", "brand", "frames");
const outDir = path.join(framesDir, "seq");
const SIZE = 800;
const TOTAL = 60;

fs.mkdirSync(outDir, { recursive: true });

async function toTransparentPng(inputPath, outPath) {
  const { data, info } = await sharp(inputPath)
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    // Remove near-white / cream studio backgrounds
    const brightness = (r + g + b) / 3;
    const isLight = brightness > 225 && Math.abs(r - g) < 35 && Math.abs(g - b) < 35;
    const isCream = r > 230 && g > 220 && b > 200 && brightness > 210;
    if (isLight || isCream) {
      px[i + 3] = 0;
    } else if (brightness > 190 && brightness <= 225) {
      // Soft edge feather
      px[i + 3] = Math.min(px[i + 3], Math.floor(((225 - brightness) / 35) * 255));
    }
  }

  await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile(outPath);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

async function compositeFrame(solo, duo, club, t, outPath) {
  // t: 0..1 across full sequence
  // 0-0.35 solo, 0.35-0.65 cross to duo with gap, 0.65-1 club with separation
  let base;
  let gap = 0;

  if (t < 0.35) {
    base = solo;
    gap = 0;
  } else if (t < 0.65) {
    const u = (t - 0.35) / 0.3;
    // blend weight for duo
    base = u < 0.5 ? solo : duo;
    gap = lerp(0, 28, Math.min(1, u * 1.4));
  } else {
    const u = (t - 0.65) / 0.35;
    base = club;
    gap = lerp(12, 36, u);
  }

  // For gap simulation: scale slightly and leave transparent margins
  const scale = 1 - gap / 400;
  const size = Math.round(SIZE * scale);
  const left = Math.round((SIZE - size) / 2);
  const top = Math.round((SIZE - size) / 2);

  const resized = await sharp(base)
    .resize(size, size, { fit: "fill" })
    .png()
    .toBuffer();

  // Extra separation on duo/club phases via horizontal offset halves
  if (t >= 0.35 && t < 0.65) {
    const u = (t - 0.35) / 0.3;
    const sep = Math.round(lerp(0, 20, u));
    const halfW = Math.floor(size / 2);
    const leftHalf = await sharp(resized)
      .extract({ left: 0, top: 0, width: halfW, height: size })
      .png()
      .toBuffer();
    const rightHalf = await sharp(resized)
      .extract({ left: halfW, top: 0, width: size - halfW, height: size })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: SIZE,
        height: SIZE,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        { input: leftHalf, left: left - sep, top },
        { input: rightHalf, left: left + halfW + sep, top },
      ])
      .png()
      .toFile(outPath);
    return;
  }

  if (t >= 0.65) {
    const u = (t - 0.65) / 0.35;
    const sep = Math.round(lerp(4, 18, u));
    const h = Math.floor(size / 2);
    const w = Math.floor(size / 2);
    const parts = [];
    const coords = [
      [0, 0, -sep, -sep],
      [w, 0, sep, -sep],
      [0, h, -sep, sep],
      [w, h, sep, sep],
    ];
    for (const [sx, sy, ox, oy] of coords) {
      const piece = await sharp(resized)
        .extract({
          left: sx,
          top: sy,
          width: sx + w > size ? size - sx : w,
          height: sy + h > size ? size - sy : h,
        })
        .png()
        .toBuffer();
      parts.push({
        input: piece,
        left: left + sx + ox,
        top: top + sy + oy,
      });
    }
    await sharp({
      create: {
        width: SIZE,
        height: SIZE,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite(parts)
      .png()
      .toFile(outPath);
    return;
  }

  await sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png()
    .toFile(outPath);
}

async function main() {
  const soloPng = path.join(framesDir, "solo.png");
  const duoPng = path.join(framesDir, "duo.png");
  const clubPng = path.join(framesDir, "club.png");

  console.log("Removing backgrounds…");
  await toTransparentPng(path.join(framesDir, "raw-solo.jpg"), soloPng);
  await toTransparentPng(path.join(framesDir, "raw-duo.jpg"), duoPng);
  await toTransparentPng(path.join(framesDir, "raw-club.jpg"), clubPng);

  // Also export clean product PNGs for UI
  await sharp(soloPng).png().toFile(path.join(root, "public", "brand", "product-solo.png"));
  await sharp(duoPng).png().toFile(path.join(root, "public", "brand", "product-duo.png"));
  await sharp(clubPng).png().toFile(path.join(root, "public", "brand", "product-club.png"));

  console.log(`Generating ${TOTAL} frames…`);
  for (let i = 0; i < TOTAL; i++) {
    const t = i / (TOTAL - 1);
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await compositeFrame(soloPng, duoPng, clubPng, t, path.join(outDir, name));
    if (i % 10 === 0) console.log(`  ${name}`);
  }

  const manifest = {
    count: TOTAL,
    fps: 60,
    size: SIZE,
    path: "/brand/frames/seq/frame-###.png",
  };
  fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
