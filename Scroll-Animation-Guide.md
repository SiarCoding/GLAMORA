
​

Scroll-driven frame animations — best practices
A guide to building Apple-style scroll-driven product animations using an image sequence rendered on a canvas. This is the same core technique commonly used in Apple-like product page recreations for devices such as AirPods, MacBook, and iPhone: a rendered video is converted into frames, the frames are preloaded, and scroll progress selects which frame is drawn on a canvas.
​

1. Core idea
Do not think of this as “playing a video on scroll.” Think of it as “mapping scroll progress to a deterministic frame index in an image sequence.” That is the key architectural decision.

The production pipeline should look like this:

Rendered video / 3D animation / screen recording -> FFmpeg -> WebP image sequence -> preload images -> draw frames onto canvas -> map scroll progress to frame index

This works well because the browser only needs to draw the exact frame for the current scroll position, which is the same general approach shown in Apple-style canvas sequence tutorials.

2. Asset pipeline
Start with a rendered source video. This can come from Veo, Kling, Blender, Cinema 4D, a screen recording, or any other render pipeline, as long as the motion is already visually correct before you bring it into the website.

Extract the video into individual frames with FFmpeg. A typical command looks like this:

bash
ffmpeg -i animation.mp4 -vf "fps=30" frames/frame-%04d.webp
Choose your frame count based on the tradeoff between smoothness and total payload. In practical image-sequence examples, developers typically work with a numbered frame set and map scroll to those ordered images, so consistency of naming and count matters more than any one “magic” number.

As a practical default:

120 to 200 frames is usually a good sweet spot for a premium scroll section.

Reduce further by trimming the source video first.

Lower FPS if file weight is too high.

Remove dead time from the animation before exporting frames.

The numbering format should be stable and zero-padded, for example:

text
frame-0001.webp
frame-0002.webp
frame-0003.webp
...
That predictable naming pattern is important because most scroll-sequence implementations generate frame paths programmatically from the current frame index.

3. Use WebP, not JPG
Use WebP as the primary export format for frame sequences. WebP has broad modern browser support, and Google’s WebP documentation explicitly covers lossy, lossless, alpha, and animation feature detection.

Why WebP is the right default:

Smaller payload than many equivalent JPEG workflows in common web delivery scenarios, which helps page performance.
​

Supported in modern browsers.
​

Optional alpha support if you ever need transparency.
​

Useful for product visuals where you want a clean quality-to-size balance.
​

A practical FFmpeg export example:

bash
ffmpeg -i animation.mp4 -vf "fps=30" -quality 80 frames/frame-%04d.webp
Notes:

Tune quality based on the content.

Product renders with gradients and reflections often need a bit more quality than flat UI captures.

Always test the total folder size, not just single-frame quality.

If your sequence contains typography, UI overlays, or very sharp edges, you may also test a higher-quality WebP export or a lossless path for selected frames. WebP’s documented support for lossless and alpha makes it flexible enough for those cases.
​

4. Render on canvas, not on a video element
Do not use a normal <video> element for true scroll-driven frame animation. The common Apple-style implementation pattern described in tutorials is to draw individual images onto a <canvas> and update that drawing based on scroll progress.

Why canvas is the right choice:

You control the exact frame shown for the exact scroll position.

You are not depending on asynchronous media decoding behavior to land on a visual frame at the right time.

You can preload still images and render them instantly with drawImage.
​

You get deterministic, pixel-accurate rendering for product sequences.
​

Basic canvas idea:

js
const canvas = document.getElementById("frame-canvas");
const ctx = canvas.getContext("2d");
ctx.drawImage(frames[currentFrame], 0, 0, width, height);
The important principle is that the current scroll position determines the current frame index, and that frame is drawn to the canvas. That mapping is the heart of the technique.

5. Preload frames before heavy interaction
Preload your images. Do not wait until the user has already scrolled deep into the section before fetching the next frame. Example implementations explicitly preload images by creating Image objects and assigning their src values before the sequence is heavily used.
​

Typical preload pattern:

js
const images = [];

for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = `/frames/frame-${String(i).padStart(4, "0")}.webp`;
  images.push(img);
}
Best practices:

Load the first frame immediately so the section never appears blank.

Preload the rest as early as practical.

If the sequence is large, preload in waves, but always guarantee the early visible range is ready.

Keep a poster frame fallback until the first frame has definitely rendered.

For premium product sections, a blank canvas on first paint is unacceptable. The first frame or poster frame should render immediately.

6. Use position: sticky with a tall scroll container
A classic pattern for this effect is a viewport-sized sticky canvas area inside a much taller section. Tutorials that recreate Apple-like sequences explicitly rely on giving the document or section extra scroll height so the animation has room to play out.
​

Typical structure:

Outer section with a large scroll height, often multiple viewport heights.

Inner sticky container pinned to the viewport.

Canvas inside the sticky layer.

Text overlays either pinned with the canvas or staggered across the section.

Example mental model:

text
<section class="scroll-sequence-section">
  <div class="sticky-stage">
    <canvas />
    <div class="overlay-content" />
  </div>
</section>
Good default scroll ranges:

200vh for a short reveal.

300vh to 400vh for a more premium product narrative.

Larger only if the animation genuinely earns it.

The reason this works is simple: the sticky area stays visually fixed while the user continues scrolling through a larger container, and that extra scroll distance gives you enough progress to move through the sequence smoothly.
​

7. Map scroll progress to frame index
Your logic should always reduce to three steps:

Calculate section-relative scroll progress.

Convert that progress into a normalized value from 0 to 1.

Convert normalized progress into a frame index.

That exact idea appears across canvas image-sequence examples: determine how far the user has scrolled, convert that to progress, and use that value to pick the matching image frame.

Example:

js
const progress = clamp(scrollYWithinSection / maxScrollableDistance, 0, 1);
const frameIndex = Math.min(
  frameCount - 1,
  Math.floor(progress * (frameCount - 1))
);
Rules:

Clamp progress between 0 and 1.

Clamp the frame index so you never request out-of-range frames.

Redraw only when the frame index changes.

Use requestAnimationFrame to keep drawing aligned with the browser paint cycle, which is a common recommendation for smoothing scroll-driven visual updates.

8. Use requestAnimationFrame for rendering
Even if the scroll event fires rapidly, your drawing should be coordinated with the browser render loop. Using requestAnimationFrame is a widely recommended approach for smoother visual updates in scroll-based canvas work.

Pattern:

js
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateFrameFromScroll();
      ticking = false;
    });
    ticking = true;
  }
});
This avoids excessive redraw pressure and helps the sequence feel more stable during user interaction.
​

9. Keep the canvas visually correct
Do not stretch frames arbitrarily. Product animation only looks premium if the render stays sharp and correctly framed.

Best practices:

Match the canvas aspect ratio to the source sequence.

Handle high-DPI screens with devicePixelRatio.

Draw with a cover-style strategy if the design requires full bleed.

Use a contain-style strategy if the product must never crop.

Redraw on resize.

Example resize logic:

js
const dpr = window.devicePixelRatio || 1;
canvas.width = Math.floor(canvas.clientWidth * dpr);
canvas.height = Math.floor(canvas.clientHeight * dpr);
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
Because the canvas is the final presentation layer, resizing and crispness are not optional details; they are part of the core implementation quality. The tutorials and sequence examples emphasize the canvas as the rendering target, so sizing it correctly is essential.

10. Structure overlays separately from the animation
The animation layer and the content layer should be separate concerns:

Canvas handles frames.

Overlay handles copy, CTA, labels, or metrics.

Do not bake UI text into the rendered frames unless absolutely necessary.

Why:

It keeps the animation reusable.

It avoids shipping text as pixels.

It preserves responsiveness.

It allows copy changes without rerendering the sequence.

A premium section usually has:

Eyebrow

Headline

Supporting paragraph

CTA group

Optional feature labels timed to progress

The canvas sequence handles the product motion, while the DOM handles semantic content and interaction. That separation follows the spirit of the known canvas-sequence approach shown in Apple-style recreations.
​

11. Optimize for product storytelling
A scroll-driven product animation should not just “move.” It should tell a short visual story.

A strong sequence usually has four phases:

Establishing frame

Reveal of form or depth

Detail emphasis

Final hero frame

Because scroll progress directly selects frames, the quality of the source video matters enormously. If the rendered motion is boring, the website will be boring. Therefore:

Plan the animation in the source render first.

Only then convert it into frames.

Use scroll to reveal the motion, not to invent it.

This is why the pipeline starts with a rendered video and not with random browser effects. The website is the playback system, not the place where the visual language is invented.

12. Mobile and fallback strategy
Do not assume mobile devices should receive the exact same experience as desktop.

Best practices:

Use fewer frames on mobile if necessary.

Reduce canvas resolution on smaller screens.

Keep the same visual story, but shorten the scroll range.

Provide a reduced-motion fallback.

If performance is poor, show a static hero frame or a lightweight alternate animation.

For users with reduced motion preferences, do not force the full scrubbed sequence. A static poster frame or a small fade-based transition is often the more appropriate accessibility choice.

13. Folder structure
Use a predictable structure so Claude Code can wire the section fast:

text
public/
  product-sequence/
    frames/
      frame-0001.webp
      frame-0002.webp
      frame-0003.webp
      ...
    poster.webp
If you need multiple variants:

text
public/
  sequences/
    solarboat-hero/
      frames/
    solarboat-detail/
      frames/
    solarroof-closeup/
      frames/
A clean folder structure makes frame generation, preloading, debugging, and deployment much easier.

14. Suggested implementation architecture
Claude Code should usually build the section with these pieces:

text
components/
  SolarBoatSequenceSection.tsx

hooks/
  useScrollFrameSequence.ts

utils/
  preloadFrames.ts
  drawCoverImage.ts
Recommended responsibilities:

SolarBoatSequenceSection.tsx: layout, sticky section, copy, canvas ref.

useScrollFrameSequence.ts: scroll progress, frame math, resize, RAF loop.

preloadFrames.ts: frame list creation and preload state.

drawCoverImage.ts: draw logic with aspect-ratio handling.

This separation keeps the implementation production-friendly and easier to maintain.

15. FFmpeg examples
Basic extraction:

bash
ffmpeg -i animation.mp4 -vf "fps=30" frames/frame-%04d.webp
Higher control example:

bash
ffmpeg -i animation.mp4 -vf "fps=24,scale=1920:-1" -quality 80 frames/frame-%04d.webp
Trim first, then extract:

bash
ffmpeg -ss 00:00:01.000 -to 00:00:06.000 -i animation.mp4 -vf "fps=24" frames/frame-%04d.webp
General rule:

Trim before export.

Lower FPS before exporting thousands of unnecessary frames.

Export only the useful motion.

16. Common mistakes
Do not do these:

Do not use a normal autoplay <video> and call it scroll-driven.

Do not fetch frames lazily one-by-one during active scroll if it causes visible popping.

Do not use random file names.

Do not ignore first-frame loading.

Do not use a short section height with a long sequence.

Do not stretch the canvas without aspect-ratio handling.

Do not redraw more than needed.

Do not ship giant unoptimized JPG sequences if WebP is available. WebP is broadly supported in modern browsers and is the sensible default for this kind of sequence delivery.

17. Minimal implementation logic
Pseudo-flow:

text
1. Render source animation.
2. Extract frames with FFmpeg.
3. Export as numbered WebP files.
4. Place frames in /public.
5. Preload first frame and then the remaining sequence.
6. Create sticky viewport-height canvas section.
7. Measure scroll progress within the section.
8. Convert progress to frame index.
9. Draw that frame on canvas.
10. Add overlay content in DOM.
11. Handle resize and reduced-motion fallback.
12. Optimize until the section feels instant and stable.
18. What Claude Code should remember
When building this pattern, prioritize these goals in order:

No blank first paint

Smooth scroll-to-frame mapping

Crisp canvas rendering

Minimal payload

Clean sticky layout

Reliable mobile fallback

Reusable architecture

The effect should feel premium, silent, precise, and product-led. The user should feel like they are revealing the object with scroll, not watching a laggy embedded video. That product-first, frame-sequence-on-canvas pattern is exactly what the well-known Apple-style recreations demonstrate.
​

19. Instruction block for Claude Code
Use this as the final implementation instruction:

text
Build this section as a scroll-driven canvas image sequence, not as a normal video player. Use a sticky full-screen stage inside a tall scroll container. Preload a numbered WebP frame sequence from /public, map section-relative scroll progress to frame index, and draw the active frame onto a canvas with correct aspect-ratio handling. Use requestAnimationFrame for smooth updates, render the first frame immediately, and add reduced-motion fallback. Keep the architecture modular with separate preload, draw, and scroll logic. Optimize for premium product presentation, stable performance, and production-ready maintainability.