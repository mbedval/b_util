/**
 * ============================================================
 *  GEOMETRIC FRAME STYLE GENERATOR  --frame-style geometric
 * ============================================================
 *  A reusable, time-seeded SVG frame renderer.
 *
 *  API (browser):
 *    GeometricFrame.render(canvasEl, { seconds, width, height })
 *    GeometricFrame.renderSVG({ seconds, width, height }) → SVG string
 *
 *  API (Node / CLI):
 *    node frame-geometric.js --seconds 0-59 --width 1920 --height 1080 --out frame.svg
 *
 *  DESIGN CONSTRAINTS (mirror the reference thorn-metal image):
 *    • Corner ornament area  ≤ 4 % of each axis
 *    • Mid-edge pattern zone  = 2 % of each axis
 *    • Inner transparent centre is preserved (no fill)
 *    • 60 unique combinations driven purely by `seconds` (0-59)
 *    • Shape vocabulary: circle, triangle, square, diamond,
 *      hexagon, star4, star6, cross  (rotated & scaled per seed)
 * ============================================================
 */

;(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();          // Node / CommonJS
  } else {
    root.GeometricFrame = factory();     // Browser global
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {

  /* ── 1. SEEDED PSEUDO-RANDOM ─────────────────────────────── */
  function seededRng(seed) {
    let s = (seed + 1) * 2654435761 >>> 0;
    return function () {
      s ^= s << 13; s ^= s >> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
  }

  /* ── 2. SHAPE LIBRARY ────────────────────────────────────── */
  // Each builder returns an SVG <path d="…"> or <polygon points="…">
  // cx,cy = centre, r = half-size, rot = degrees
  const Shapes = {

    circle: (cx, cy, r) =>
      `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" />`,

    square: (cx, cy, r, rot) =>
      polygon(4, cx, cy, r, rot + 45),

    diamond: (cx, cy, r, rot) =>
      polygon(4, cx, cy, r, rot),

    triangle: (cx, cy, r, rot) =>
      polygon(3, cx, cy, r, rot),

    hexagon: (cx, cy, r, rot) =>
      polygon(6, cx, cy, r, rot),

    star4: (cx, cy, r, rot) =>
      star(4, cx, cy, r, r * 0.4, rot),

    star6: (cx, cy, r, rot) =>
      star(6, cx, cy, r, r * 0.45, rot),

    cross: (cx, cy, r, rot) => {
      const t = r * 0.32, R = r;
      const pts = [
        [-t, -R], [t, -R], [t, -t], [R, -t],
        [R, t],  [t, t],  [t, R],  [-t, R],
        [-t, t], [-R, t], [-R, -t],[-t, -t]
      ];
      return `<polygon points="${rotatePoints(pts, rot).map(p => `${f(cx+p[0])},${f(cy+p[1])}`).join(' ')}" />`;
    }
  };

  const SHAPE_KEYS = Object.keys(Shapes);

  function polygon(n, cx, cy, r, rot) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + toRad(rot);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return `<polygon points="${pts.map(p => `${f(p[0])},${f(p[1])}`).join(' ')}" />`;
  }

  function star(n, cx, cy, ro, ri, rot) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const r = (i % 2 === 0) ? ro : ri;
      const a = (i / (n * 2)) * Math.PI * 2 + toRad(rot);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return `<polygon points="${pts.map(p => `${f(p[0])},${f(p[1])}`).join(' ')}" />`;
  }

  function rotatePoints(pts, deg) {
    const rad = toRad(deg);
    const cos = Math.cos(rad), sin = Math.sin(rad);
    return pts.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos]);
  }

  function toRad(d) { return d * Math.PI / 180; }
  function f(n) { return Math.round(n * 100) / 100; }

  /* ── 3. PALETTE LIBRARY (one per "minute-group" of 6 secs) ── */
  const PALETTES = [
    // 0-5 s  → steel / chrome
    { stroke: '#a8b8c8', glow: '#6af', accent: '#c8d8e8', bg: 'none' },
    // 6-11 s → gold / amber
    { stroke: '#d4a017', glow: '#ffd700', accent: '#ffe066', bg: 'none' },
    // 12-17 s → crimson
    { stroke: '#c0392b', glow: '#e74c3c', accent: '#ff8a80', bg: 'none' },
    // 18-23 s → emerald
    { stroke: '#27ae60', glow: '#2ecc71', accent: '#80ffb4', bg: 'none' },
    // 24-29 s → violet
    { stroke: '#7f34c0', glow: '#9b59b6', accent: '#d88aff', bg: 'none' },
    // 30-35 s → cyan / ice
    { stroke: '#0097a7', glow: '#00e5ff', accent: '#b2ebf2', bg: 'none' },
    // 36-41 s → bronze / rust
    { stroke: '#8d6e63', glow: '#ff7043', accent: '#ffccbc', bg: 'none' },
    // 42-47 s → silver neon
    { stroke: '#90a4ae', glow: '#40c4ff', accent: '#e0f7fa', bg: 'none' },
    // 48-53 s → obsidian / white
    { stroke: '#e0e0e0', glow: '#ffffff', accent: '#bdbdbd', bg: 'none' },
    // 54-59 s → rose gold
    { stroke: '#c2847a', glow: '#ffab91', accent: '#ffd7cc', bg: 'none' },
  ];

  /* ── 4. CORE FRAME BUILDER ───────────────────────────────── */
  /**
   * Build the full SVG string for a geometric frame.
   * @param {object} opts
   * @param {number} opts.seconds  0-59  (time seed)
   * @param {number} [opts.width=1920]
   * @param {number} [opts.height=1080]
   * @returns {string}  SVG markup
   */
  function renderSVG({ seconds = 0, width = 1920, height = 1080 } = {}) {
    const sec   = ((seconds % 60) + 60) % 60;   // clamp to 0-59
    const rng   = seededRng(sec);
    const pal   = PALETTES[Math.floor(sec / 6)];

    // ── dimension constants ────────────────────────────────────
    const W = width, H = height;

    // Corner zone: 4 % of the shorter axis
    const CORNER_PCT = 0.04;
    const CZ = Math.min(W, H) * CORNER_PCT;   // corner ornament radius

    // Mid-edge zone: 2 % of the shorter axis
    const MID_PCT  = 0.02;
    const MZ = Math.min(W, H) * MID_PCT;       // mid-edge ornament radius

    // Border spine inset (where the "wall" path lives) ≈ 1 % axis
    const SPINE = Math.min(W, H) * 0.01;

    // ── pick shape set for this second ────────────────────────
    // Two shape types per frame, driven by rng
    const shapeIdxA = Math.floor(rng() * SHAPE_KEYS.length);
    const shapeIdxB = (shapeIdxA + 1 + Math.floor(rng() * (SHAPE_KEYS.length - 1))) % SHAPE_KEYS.length;
    const shapeA    = SHAPE_KEYS[shapeIdxA];   // corner shape
    const shapeB    = SHAPE_KEYS[shapeIdxB];   // wall/mid shape

    // ── rotation & scale variations per second ─────────────
    const rotBase   = sec * 6;          // 0° → 354° across 60 s
    const scaleVar  = 0.7 + rng() * 0.6;

    // ── wall density: how many shapes on each edge ─────────────
    // Between corners: density driven by rng (3-12 per edge)
    const density = 3 + Math.floor(rng() * 10);

    /* ── helper: draw one shape with style ─────────────────── */
    function shape(type, cx, cy, r, rot, opacity = 1) {
      const fn = Shapes[type];
      if (!fn) return '';
      const el = fn(cx, cy, r, rot);
      return el; // caller wraps in <g style>
    }

    /* ── helpers: edge point generators ──────────────────── */
    // Returns array of {x,y} along an edge (excluding corner zones)
    function edgePoints(edge, count) {
      const margin = CZ * 2;
      const pts = [];
      for (let i = 0; i < count; i++) {
        const t = margin + ((i + 0.5) / count) * (
          (edge === 'top' || edge === 'bottom') ? (W - margin * 2) : (H - margin * 2)
        );
        switch (edge) {
          case 'top':    pts.push({ x: t,     y: SPINE });     break;
          case 'bottom': pts.push({ x: t,     y: H - SPINE }); break;
          case 'left':   pts.push({ x: SPINE, y: t });         break;
          case 'right':  pts.push({ x: W - SPINE, y: t });     break;
        }
      }
      return pts;
    }

    /* ── corner positions ────────────────────────────────── */
    const corners = [
      { x: CZ,     y: CZ,     rot: rotBase },
      { x: W - CZ, y: CZ,     rot: rotBase + 90 },
      { x: W - CZ, y: H - CZ, rot: rotBase + 180 },
      { x: CZ,     y: H - CZ, rot: rotBase + 270 },
    ];

    /* ── defs (gradients, filters) ───────────────────────── */
    const filterId    = `glow_${sec}`;
    const gradId      = `grad_${sec}`;
    const strokeColor = pal.stroke;
    const glowColor   = pal.glow;
    const accentColor = pal.accent;

    // Spine path (rounded-rect used as border "rail")
    const rx = CZ * 1.2;
    const spinePath =
      `M ${CZ} ${SPINE} ` +
      `L ${W - CZ} ${SPINE} ` +          // top
      `Q ${W - SPINE} ${SPINE} ${W - SPINE} ${CZ} ` +
      `L ${W - SPINE} ${H - CZ} ` +      // right
      `Q ${W - SPINE} ${H - SPINE} ${W - CZ} ${H - SPINE} ` +
      `L ${CZ} ${H - SPINE} ` +          // bottom
      `Q ${SPINE} ${H - SPINE} ${SPINE} ${H - CZ} ` +
      `L ${SPINE} ${CZ} ` +              // left
      `Q ${SPINE} ${SPINE} ${CZ} ${SPINE} Z`;

    /* ── assemble SVG sections ───────────────────────────── */
    const defs = `
  <defs>
    <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%"   stop-color="${strokeColor}" stop-opacity="1"/>
      <stop offset="50%"  stop-color="${accentColor}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${strokeColor}" stop-opacity="1"/>
    </linearGradient>
    <radialGradient id="cornerGrad_${sec}" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="${accentColor}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.6"/>
    </radialGradient>
  </defs>`;

    // ── spine / border rail ──
    const spineEl = `
  <!-- Border rail -->
  <path d="${spinePath}"
        fill="none"
        stroke="url(#${gradId})"
        stroke-width="${f(SPINE * 0.6)}"
        stroke-linejoin="round"
        filter="url(#${filterId})"
        opacity="0.7"/>`;

    // ── wall shapes along edges ──
    const EDGES = ['top', 'bottom', 'left', 'right'];
    let wallShapes = '';
    EDGES.forEach(edge => {
      const pts = edgePoints(edge, density);
      pts.forEach((pt, i) => {
        const phase  = (i / density) * Math.PI * 2;
        const r      = MZ * (0.6 + 0.4 * Math.sin(phase + sec)) * scaleVar;
        const rot    = rotBase + i * (360 / density);
        const alpha  = 0.55 + 0.4 * Math.abs(Math.sin(phase));
        const useAlt = (i % 3 === 0);
        const sType  = useAlt ? shapeA : shapeB;
        wallShapes += `
    ${Shapes[sType](pt.x, pt.y, r, rot)}`;
      });
    });

    const wallGroup = `
  <!-- Wall / mid-edge shapes -->
  <g fill="none"
     stroke="url(#${gradId})"
     stroke-width="${f(MZ * 0.18)}"
     opacity="0.82"
     filter="url(#${filterId})">
    ${wallShapes}
  </g>`;

    // ── corner ornaments ──
    let cornerShapes = '';
    corners.forEach(c => {
      // Primary large shape
      cornerShapes += `
    ${Shapes[shapeA](c.x, c.y, CZ * 0.8 * scaleVar, c.rot)}`;
      // Inner accent shape (smaller, different type)
      cornerShapes += `
    ${Shapes[shapeB](c.x, c.y, CZ * 0.4, c.rot + 45)}`;
    });

    const cornerGroup = `
  <!-- Corner ornaments -->
  <g fill="none"
     stroke="url(#cornerGrad_${sec})"
     stroke-width="${f(CZ * 0.12)}"
     filter="url(#${filterId})">
    ${cornerShapes}
  </g>
  <!-- Corner glow fill accent -->
  <g fill="${accentColor}" opacity="0.12">
    ${corners.map(c => Shapes['circle'](c.x, c.y, CZ * 0.55)).join('\n    ')}
  </g>`;

    // ── meta badge (optional, remove for production) ──
    const badge = `
  <!-- frame-style: geometric | seconds: ${sec} | shapes: ${shapeA}+${shapeB} | palette: ${Math.floor(sec/6)} -->`;

    /* ── full SVG ───────────────────────────────────────── */
    return `<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 ${W} ${H}"
     width="${W}" height="${H}"
     style="background:transparent">
${defs}
${badge}
${spineEl}
${wallGroup}
${cornerGroup}
</svg>`;
  }

  /* ── 5. CANVAS RENDER (browser) ──────────────────────────── */
  /**
   * Draw the geometric frame onto a <canvas> element via an
   * SVG Blob + drawImage (preserves transparency).
   */
  function render(canvasEl, opts = {}) {
    const svg  = renderSVG(opts);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = function () {
      const ctx = canvasEl.getContext('2d');
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
      ctx.drawImage(img, 0, 0, canvasEl.width, canvasEl.height);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  /* ── 6. AUTO-TICK helper (browser) ──────────────────────── */
  /**
   * Attach a live-updating frame to a canvas.
   * Redraws every second using the real wall-clock second.
   * Returns a stop() function.
   */
  function liveTick(canvasEl, { width, height } = {}) {
    function draw() {
      const sec = new Date().getSeconds();
      render(canvasEl, { seconds: sec, width, height });
    }
    draw();
    const id = setInterval(draw, 1000);
    return { stop: () => clearInterval(id) };
  }

  /* ── 7. NODE CLI ENTRY POINT ─────────────────────────────── */
  if (typeof require !== 'undefined' && typeof process !== 'undefined' &&
      require.main === module) {
    const fs   = require('fs');
    const args = process.argv.slice(2);
    const get  = (flag, def) => {
      const i = args.indexOf(flag);
      return i !== -1 ? args[i + 1] : def;
    };
    const seconds = parseInt(get('--seconds', new Date().getSeconds()), 10);
    const width   = parseInt(get('--width',   '1920'), 10);
    const height  = parseInt(get('--height',  '1080'), 10);
    const outFile = get('--out', `frame_geometric_s${seconds}.svg`);

    const svg = renderSVG({ seconds, width, height });
    fs.writeFileSync(outFile, svg, 'utf8');
    console.log(`[GeometricFrame] Wrote → ${outFile}  (seconds=${seconds}, ${width}×${height})`);
  }

  /* ── 8. PUBLIC API ───────────────────────────────────────── */
  return { renderSVG, render, liveTick, PALETTES, SHAPE_KEYS };

}));
