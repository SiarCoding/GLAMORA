/**
 * Build the list of frame URLs and preload them.
 * Returns { images, firstFrameReady } — images is an array of HTMLImageElement
 * (in order) and firstFrameReady is a promise resolving once frame 1 has decoded.
 */
export function buildFramePaths({ basePath, frameCount, pad = 3, ext = "webp" }) {
  const paths = [];
  for (let i = 1; i <= frameCount; i += 1) {
    paths.push(`${basePath}/frame-${String(i).padStart(pad, "0")}.${ext}`);
  }
  return paths;
}

export function preloadFrames(paths, onProgress) {
  const images = paths.map(() => null);
  let loaded = 0;

  // The first frame is loaded eagerly so the canvas never appears blank.
  const firstFrame = new Image();
  firstFrame.decoding = "async";
  firstFrame.src = paths[0];
  images[0] = firstFrame;

  const firstFrameReady = new Promise((resolve) => {
    if (firstFrame.complete && firstFrame.naturalWidth > 0) {
      resolve(firstFrame);
    } else {
      firstFrame.addEventListener("load", () => resolve(firstFrame), {
        once: true,
      });
      firstFrame.addEventListener("error", () => resolve(firstFrame), {
        once: true,
      });
    }
  });

  // Remaining frames stream in order with a fixed number of requests in
  // flight: early frames (the visible range) arrive first, and the sequence
  // never floods the connection ahead of the hero image, fonts and scripts.
  // `fetchPriority = "low"` keeps them behind anything the page needs to paint.
  const queue = paths.slice(1).map((src, i) => ({ src, index: i + 1 }));
  const maxInFlight = 8;
  let cursor = 0;

  const startNext = () => {
    if (cursor >= queue.length) return;
    const slot = queue[cursor];
    cursor += 1;
    const img = new Image();
    img.decoding = "async";
    img.fetchPriority = "low";
    const done = () => {
      loaded += 1;
      if (onProgress) onProgress(loaded / queue.length);
      startNext();
    };
    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    img.src = slot.src;
    images[slot.index] = img;
  };

  const pump = () => {
    for (let i = 0; i < maxInFlight; i += 1) startNext();
  };

  // Kick off preloading after the first paint settles.
  if (typeof window !== "undefined") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(pump, { timeout: 400 });
    } else {
      setTimeout(pump, 50);
    }
  }

  return { images, firstFrameReady };
}
