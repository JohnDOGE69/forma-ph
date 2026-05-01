// Background removal via edge flood-fill — only removes pixels reachable
// from the image border that match the background colour.
// Interior white pixels (the vial label) are left fully opaque.
const sharp = require('sharp');
const path = require('path');

const input  = path.join(__dirname, 'forma-vial-retatrutide.png');
const output = path.join(__dirname, 'forma-vial-nobg.png');

async function removeBg() {
  const img = sharp(input);
  const { data, info } = await img
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const buf = Buffer.from(data);

  // Sample background colour from the four corners
  const corners = [
    [2, 2], [width - 3, 2], [2, height - 3], [width - 3, height - 3],
    [Math.floor(width / 2), 2], [2, Math.floor(height / 2)]
  ];
  let rS = 0, gS = 0, bS = 0;
  corners.forEach(([cx, cy]) => {
    const i = (cy * width + cx) * channels;
    rS += buf[i]; gS += buf[i+1]; bS += buf[i+2];
  });
  const bgR = Math.round(rS / corners.length);
  const bgG = Math.round(gS / corners.length);
  const bgB = Math.round(bS / corners.length);
  console.log(`Sampled bg: rgb(${bgR},${bgG},${bgB})`);

  const THRESHOLD = 52;   // pixels within this distance of bg → transparent
  const FEATHER    = 20;  // soft edge width

  function colorDist(i) {
    return Math.sqrt(
      (buf[i]   - bgR) ** 2 +
      (buf[i+1] - bgG) ** 2 +
      (buf[i+2] - bgB) ** 2
    );
  }

  // ── Flood-fill FROM EDGES using a BFS queue ──────────────────────────────
  // Only pixels reachable from the border that match the bg colour are removed.
  // The white vial label is interior — flood fill never reaches it.
  const visited = new Uint8Array(width * height); // 0 = unvisited
  const queue   = [];

  // Seed the queue with every border pixel that matches the background
  const seedBorderPixel = (x, y) => {
    const pi = y * width + x;
    if (visited[pi]) return;
    const i = pi * channels;
    if (colorDist(i) < THRESHOLD + FEATHER) {
      visited[pi] = 1;
      queue.push(pi);
    }
  };

  for (let x = 0; x < width;  x++) { seedBorderPixel(x, 0); seedBorderPixel(x, height - 1); }
  for (let y = 0; y < height; y++) { seedBorderPixel(0, y); seedBorderPixel(width - 1,  y); }

  // BFS — 4-connected neighbours
  const dx = [1, -1, 0,  0];
  const dy = [0,  0, 1, -1];

  let qi = 0;
  while (qi < queue.length) {
    const pi = queue[qi++];
    const px = pi % width;
    const py = Math.floor(pi / width);

    for (let d = 0; d < 4; d++) {
      const nx = px + dx[d];
      const ny = py + dy[d];
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      const npi = ny * width + nx;
      if (visited[npi]) continue;
      const ni = npi * channels;
      const dist = colorDist(ni);
      if (dist < THRESHOLD + FEATHER) {
        visited[npi] = 1;
        queue.push(npi);
      }
    }
  }

  // Apply transparency only to flood-filled pixels
  for (let pi = 0; pi < width * height; pi++) {
    if (!visited[pi]) continue;
    const i   = pi * channels;
    const dist = colorDist(i);
    if (dist < THRESHOLD) {
      buf[i + 3] = 0;
    } else {
      // soft feather at edges
      const alpha = Math.round(((dist - THRESHOLD) / FEATHER) * 255);
      buf[i + 3] = Math.min(buf[i + 3], alpha);
    }
  }

  // ── Second pass: make everything that isn't background fully opaque ──────
  // No glass transparency — the full vial (label, glass, cap) is solid.
  for (let pi = 0; pi < width * height; pi++) {
    const i = pi * channels;
    if (buf[i + 3] > 0) buf[i + 3] = 255; // fully opaque if not removed
  }

  await sharp(buf, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`Saved: ${output}`);
}

removeBg().catch(console.error);
