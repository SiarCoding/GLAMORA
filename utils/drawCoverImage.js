/**
 * Draw an image onto a canvas using a "cover" strategy that preserves the
 * source aspect ratio — the same behaviour as CSS `object-fit: cover` plus
 * `object-position`. focalX / focalY are 0..1 (default 0.5, 0.5 = center).
 * Use focalY ~= 0.2 to favour the top of a portrait subject (keep the head).
 * Returns true if the image was actually drawn.
 */
export function drawCoverImage(
  ctx,
  img,
  width,
  height,
  focalX = 0.5,
  focalY = 0.5
) {
  if (!ctx || !img || !img.naturalWidth || !img.naturalHeight) return false;

  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cw = width;
  const ch = height;

  const sourceRatio = iw / ih;
  const targetRatio = cw / ch;

  let sx, sy, sw, sh;

  if (sourceRatio > targetRatio) {
    // image is wider than target — crop horizontally
    sh = ih;
    sw = ih * targetRatio;
    sx = clamp((iw - sw) * focalX, 0, iw - sw);
    sy = 0;
  } else {
    // image is taller than target — crop vertically
    sw = iw;
    sh = iw / targetRatio;
    sx = 0;
    sy = clamp((ih - sh) * focalY, 0, ih - sh);
  }

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  return true;
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Resize a canvas to fit its CSS box at the device pixel ratio.
 * Returns the CSS width and height so the caller can keep them in state.
 */
export function sizeCanvasToBox(canvas, maxDpr = 2) {
  if (!canvas) return null;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  const w = Math.max(1, Math.floor(rect.width));
  const h = Math.max(1, Math.floor(rect.height));
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { width: w, height: h, dpr };
}
