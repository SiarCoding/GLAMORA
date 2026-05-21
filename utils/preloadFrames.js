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

  // Remaining frames load in waves so a slow connection still gets the early
  // visible range first.
  const queue = paths.slice(1).map((src, i) => ({ src, index: i + 1 }));
  const concurrent = 6;
  let cursor = 0;

  const pump = () => {
    while (cursor < queue.length) {
      const slot = queue[cursor];
      cursor += 1;
      const img = new Image();
      img.decoding = "async";
      img.src = slot.src;
      images[slot.index] = img;
      img.addEventListener(
        "load",
        () => {
          loaded += 1;
          if (onProgress) onProgress(loaded / queue.length);
        },
        { once: true }
      );
      img.addEventListener(
        "error",
        () => {
          loaded += 1;
          if (onProgress) onProgress(loaded / queue.length);
        },
        { once: true }
      );
      if (cursor % concurrent === 0) break;
    }
    if (cursor < queue.length) {
      // Schedule the next wave on the next animation frame so we don't choke
      // the network during initial paint.
      requestAnimationFrame(pump);
    }
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
