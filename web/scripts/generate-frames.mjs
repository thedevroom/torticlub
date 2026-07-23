/**
 * TortiClub scroll sequence — 60 transparent PNGs.
 *
 * Timeline (from a single whole tortilla, geometric cuts only):
 *   0.00–0.34  SOLO  — whole piece
 *   0.34–0.64  DUO   — two clean halves, gap grows
 *   0.64–1.00  CLUB  — four clean quarters, gap grows
 *
 * Never re-slice a pre-cut product photo (that creates “+” artefacts
 * and fake extra wedges). All splits come from the whole SOLO plate.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const framesDir = path.join(root, "public", "brand", "frames");
const outDir = path.join(framesDir, "seq");
const SIZE = 900;
const TOTAL = 60;

// Canvas padding so separated pieces never clip
const PAD = 48;
const INNER = SIZE - PAD * 2;

fs.mkdirSync(outDir, { recursive: true });

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * Build a clean whole tortilla plate:
 * - remove studio / cream / pure-white rings (the “+” artefact source)
 * - keep only warm food tones inside a soft circular mask
 * - trim to content so splits are food-only
 */
async function toTransparentPlate(inputPath) {
  const { data, info } = await sharp(inputPath)
    .resize(INNER, INNER, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = Buffer.from(data);
  const cx = info.width / 2;
  const cy = info.height / 2;
  // Food disc is smaller than the white decorative ring in the plate photo
  const foodRadius = Math.min(info.width, info.height) * 0.42;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = px[i];
      const g = px[i + 1];
      const b = px[i + 2];
      const brightness = (r + g + b) / 3;
      const dist = Math.hypot(x - cx, y - cy);

      // Pure white / near-white ring or studio plate → always transparent
      const isWhite =
        brightness > 235 ||
        (r > 245 && g > 245 && b > 245) ||
        (r > 238 && g > 238 && b > 238 && Math.abs(r - g) < 12);

      // Outside food radius: kill decorative arcs completely
      if (dist > foodRadius || isWhite) {
        px[i + 3] = 0;
        continue;
      }

      // Soft edge of the tortilla disc
      const edge = foodRadius - dist;
      if (edge < foodRadius * 0.06) {
        const fade = edge / (foodRadius * 0.06);
        px[i + 3] = Math.floor(px[i + 3] * fade);
      }

      // Residual cream backdrop inside disc
      const isCream =
        r > 230 && g > 220 && b > 195 && brightness > 210 && r - b < 50;
      if (isCream && brightness > 220) {
        px[i + 3] = 0;
      }
    }
  }

  // Trim transparent margins so quarters are balanced on the food
  const trimmed = await sharp(px, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .trim({ threshold: 8 })
    .resize(INNER, INNER, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return trimmed;
}

async function blank() {
  return sharp({
    create: {
      width: SIZE,
      height: SIZE,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .png()
    .toBuffer();
}

/** Place a buffer centered on the canvas (optional offset). */
async function placeCentered(plate, ox = 0, oy = 0) {
  const meta = await sharp(plate).metadata();
  const w = meta.width ?? INNER;
  const h = meta.height ?? INNER;
  const left = Math.round((SIZE - w) / 2 + ox);
  const top = Math.round((SIZE - h) / 2 + oy);
  return sharp(await blank())
    .composite([{ input: plate, left: Math.max(0, left), top: Math.max(0, top) }])
    .png()
    .toBuffer();
}

/**
 * Extract a region and draw it on a full-size transparent canvas
 * at the original plate position + separation offset.
 */
async function placePiece(plateBuf, plateW, plateH, region, offsetX, offsetY) {
  const piece = await sharp(plateBuf)
    .extract({
      left: region.left,
      top: region.top,
      width: region.width,
      height: region.height,
    })
    .png()
    .toBuffer();

  // Plate is centered in SIZE canvas
  const baseLeft = Math.round((SIZE - plateW) / 2);
  const baseTop = Math.round((SIZE - plateH) / 2);

  return {
    input: piece,
    left: Math.round(baseLeft + region.left + offsetX),
    top: Math.round(baseTop + region.top + offsetY),
  };
}

async function renderSolo(plate) {
  return placeCentered(plate, 0, 0);
}

async function renderDuo(plate, gap) {
  const meta = await sharp(plate).metadata();
  const w = meta.width;
  const h = meta.height;
  const half = Math.floor(w / 2);
  // Ensure exact coverage: left takes half, right takes remainder
  const leftW = half;
  const rightW = w - half;
  const sep = gap / 2;

  const layers = [
    await placePiece(
      plate,
      w,
      h,
      { left: 0, top: 0, width: leftW, height: h },
      -sep,
      0,
    ),
    await placePiece(
      plate,
      w,
      h,
      { left: half, top: 0, width: rightW, height: h },
      sep,
      0,
    ),
  ];

  return sharp(await blank()).composite(layers).png().toBuffer();
}

async function renderClub(plate, gap) {
  const meta = await sharp(plate).metadata();
  const w = meta.width;
  const h = meta.height;
  const midX = Math.floor(w / 2);
  const midY = Math.floor(h / 2);
  const sep = gap / 2;

  // Exactly four rectangles — no diagonals, no residual “+” art from source.
  const regions = [
    { left: 0, top: 0, width: midX, height: midY, ox: -sep, oy: -sep },
    { left: midX, top: 0, width: w - midX, height: midY, ox: sep, oy: -sep },
    { left: 0, top: midY, width: midX, height: h - midY, ox: -sep, oy: sep },
    {
      left: midX,
      top: midY,
      width: w - midX,
      height: h - midY,
      ox: sep,
      oy: sep,
    },
  ];

  const layers = [];
  for (const r of regions) {
    layers.push(
      await placePiece(
        plate,
        w,
        h,
        { left: r.left, top: r.top, width: r.width, height: r.height },
        r.ox,
        r.oy,
      ),
    );
  }

  return sharp(await blank()).composite(layers).png().toBuffer();
}

async function compositeFrame(plate, t, outPath) {
  let buf;

  if (t < 0.34) {
    // Hold whole, micro breathe at end of phase
    const u = t / 0.34;
    buf = await renderSolo(plate);
    if (u > 0.85) {
      // tiny preview of a hairline gap before duo (optional polish: keep solid)
      buf = await renderSolo(plate);
    }
  } else if (t < 0.64) {
    const u = easeInOut((t - 0.34) / 0.3);
    const gap = lerp(0, 36, u);
    buf = await renderDuo(plate, gap);
  } else {
    const u = easeInOut((t - 0.64) / 0.36);
    // Start from a mild half-gap feel into full 2×2 quarter spread
    const gap = lerp(10, 44, u);
    buf = await renderClub(plate, gap);
  }

  await sharp(buf).png().toFile(outPath);
}

async function main() {
  const rawSolo =
    fs.existsSync(path.join(framesDir, "raw-solo.jpg"))
      ? path.join(framesDir, "raw-solo.jpg")
      : path.join(root, "public", "brand", "tortilla-solo.jpg");

  console.log("Building transparent whole plate from", rawSolo);
  const plate = await toTransparentPlate(rawSolo);

  // Export clean UI products from geometric states of the same plate
  const soloOut = path.join(framesDir, "solo.png");
  const duoOut = path.join(framesDir, "duo.png");
  const clubOut = path.join(framesDir, "club.png");

  await sharp(await renderSolo(plate)).png().toFile(soloOut);
  await sharp(await renderDuo(plate, 28)).png().toFile(duoOut);
  await sharp(await renderClub(plate, 36)).png().toFile(clubOut);

  const brand = path.join(root, "public", "brand");
  await sharp(soloOut).png().toFile(path.join(brand, "product-solo.png"));
  await sharp(duoOut).png().toFile(path.join(brand, "product-duo.png"));
  await sharp(clubOut).png().toFile(path.join(brand, "product-club.png"));

  console.log(`Generating ${TOTAL} sequence frames…`);
  for (let i = 0; i < TOTAL; i++) {
    const t = i / (TOTAL - 1);
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await compositeFrame(plate, t, path.join(outDir, name));
    if (i % 10 === 0 || i === TOTAL - 1) console.log(`  ${name}  t=${t.toFixed(2)}`);
  }

  fs.writeFileSync(
    path.join(outDir, "manifest.json"),
    JSON.stringify(
      {
        count: TOTAL,
        fps: 60,
        size: SIZE,
        path: "/brand/frames/seq/frame-###.png",
        phases: { solo: [0, 0.34], duo: [0.34, 0.64], club: [0.64, 1] },
        note: "Geometric splits from whole plate only — exact 1 / 2 / 4 pieces",
      },
      null,
      2,
    ),
  );
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
