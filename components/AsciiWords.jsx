import { useEffect, useRef } from "react";

// A page of monospace text ("hackathon hackoverflow") that behaves like a liquid surface.
// Pointer movement sends waves through the grid, bending the letters and blooming them into heavier glyphs,
// and fires short lightning bolts. Original implementation inspired by the React Bits Pro "ASCII Ripple".
//
// <AsciiWords />                fills its (position: relative/absolute) parent, static
// <AsciiWords interactive />    waves + lightning on hover
// <AsciiWords interactive global />   inside a fixed, full-screen wrapper; listens to the whole window

const WORDS = "hackathon hackoverflow ";
const RAMP = " .:-=+*#%@";

// Effect tuning
const DAMPING = 0.955;   // lower = ripples die out faster (was 0.985)
const RIPPLE_SIZE = 0.7; // ripple radius in text rows (was 1.1)
const BOLT_LIFE = 220;   // lightning duration in ms (was 380)
const GLOW = 0.65;       // brightness of ripples + lightning (1 = original, lower = subtler)

function rng(seed) {
    let a = seed >>> 0;
    return () => {
        a |= 0; a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

export default function AsciiWords({
    fontSize = 14,
    restColor = "150,200,255",
    restAlpha = 0.09,
    global: isGlobal = false,
    interactive = false, // false = static text only; true = waves + lightning on hover
    idleDrops = false, // true = random ripples even when nobody is hovering
    className = "",
    style,
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        const ctx = canvas.getContext("2d");
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let w = 0, h = 0, cols = 0, rows = 0, cw = 8, ch = 19;
        let H, P, lines = [];
        let cx2 = 0.7, cy2 = 0.2;
        let raf = 0, visible = true, last = 0, nextDrop = 0, lastMove = 0;
        let bolts = [], boltId = 1;

        const resize = () => {
            const r = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width; h = r.height;
            canvas.width = w * dpr; canvas.height = h * dpr;
            canvas.style.width = w + "px"; canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`;
            ctx.textAlign = "left"; ctx.textBaseline = "middle";
            cw = ctx.measureText("M").width;
            ch = Math.round(fontSize * 1.35);
            cols = Math.ceil(w / cw) + 1;
            rows = Math.ceil(h / ch);
            H = new Float32Array(cols * rows);
            P = new Float32Array(cols * rows);
            // equal wave speed in pixels even though cells are taller than wide
            const k = (ch / cw) ** 2;
            cy2 = 0.9 / (1 + k);
            cx2 = 0.9 - cy2;
            const base = WORDS.repeat(Math.ceil(cols / WORDS.length) + 3);
            lines = [];
            for (let y = 0; y < rows; y++) {
                const off = (y * 7) % WORDS.length;
                lines.push(base.slice(off, off + cols));
            }
        };

        const disturb = (cx, cy, amp) => {
            const sigma = ch * RIPPLE_SIZE;
            const ri = Math.ceil((2.5 * sigma) / cw), rj = Math.ceil((2.5 * sigma) / ch);
            for (let j = -rj; j <= rj; j++) {
                for (let i = -ri; i <= ri; i++) {
                    const x = cx + i, y = cy + j;
                    if (x < 1 || y < 1 || x >= cols - 1 || y >= rows - 1) continue;
                    const d2 = (i * cw) ** 2 + (j * ch) ** 2;
                    H[y * cols + x] += amp * Math.exp(-d2 / (2 * sigma * sigma));
                }
            }
        };

        const step = () => {
            const c0 = 2 * (1 - cx2 - cy2);
            for (let y = 1; y < rows - 1; y++) {
                const row = y * cols;
                for (let x = 1; x < cols - 1; x++) {
                    const i = row + x;
                    const n = c0 * H[i] + cx2 * (H[i - 1] + H[i + 1]) + cy2 * (H[i - cols] + H[i + cols]) - P[i];
                    P[i] = n * DAMPING;
                }
            }
            const t = H; H = P; P = t;
        };

        // Lightning: jagged path with one branch, re-rolled every 60ms so it flickers.
        const boltCells = (b, age) => {
            const rand = rng(b.seed + Math.floor(age / 50) * 977);
            const cells = [];
            const walk = (x, y, ang, len, depth) => {
                for (let s = 0; s < len; s++) {
                    ang += (rand() - 0.5) * 1.2;
                    const px = Math.cos(ang) * cw * 0.9, py = Math.sin(ang) * cw * 0.9;
                    x += px / cw; y += py / ch;
                    const gx = Math.round(x), gy = Math.round(y);
                    if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) break;
                    const a = Math.atan2(py, px);
                    const g = Math.abs(Math.sin(a)) > 0.8 ? "|" : Math.abs(Math.cos(a)) > 0.8 ? "-" : Math.sin(a) * Math.cos(a) > 0 ? "\\" : "/";
                    cells.push([gx, gy, g]);
                    if (depth === 0 && s > 4 && s < len - 6 && rand() < 0.08) {
                        walk(x, y, ang + (rand() < 0.5 ? -0.9 : 0.9), Math.floor(len * 0.4), 1);
                    }
                }
            };
            walk(b.x, b.y, b.ang, b.len, 0);
            return cells;
        };

        const spawnBolt = (cx, cy, len = 12, now = performance.now()) => {
            if (bolts.length >= 6) bolts.shift();
            bolts.push({ id: boltId++, x: cx, y: cy, ang: Math.random() * Math.PI * 2, len, t: now, seed: (Math.random() * 1e9) | 0 });
        };

        const drawRest = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = `rgba(${restColor},${restAlpha})`;
            for (let y = 0; y < rows; y++) ctx.fillText(lines[y], 0, y * ch + ch / 2);
        };

        const cell = (x, y, glyph, color, alpha) => {
            ctx.clearRect(x * cw, y * ch, cw + 0.5, ch);
            ctx.fillStyle = `rgba(${color},${alpha * GLOW})`;
            ctx.fillText(glyph, x * cw, y * ch + ch / 2);
        };

        const draw = (now) => {
            drawRest();
            for (let y = 1; y < rows - 1; y++) {
                for (let x = 1; x < cols - 1; x++) {
                    const i = y * cols + x;
                    const v = H[i], a = Math.abs(v);
                    if (a < 0.05) continue;
                    const color = v > 0 ? "0,255,255" : "210,130,255";
                    if (a < 0.35) {
                        const shift = Math.round((H[i + 1] - H[i - 1]) * 5);
                        const sx = Math.max(0, Math.min(cols - 1, x + shift));
                        cell(x, y, lines[y][sx], color, Math.min(1, 0.25 + a * 1.6));
                    } else {
                        const idx = Math.min(RAMP.length - 1, 1 + Math.floor((a - 0.35) * 5));
                        cell(x, y, RAMP[idx], color, Math.min(1, 0.45 + a * 0.5));
                    }
                }
            }
            bolts = bolts.filter((b) => now - b.t < BOLT_LIFE);
            for (const b of bolts) {
                const age = now - b.t;
                const fade = 1 - age / BOLT_LIFE;
                for (const [gx, gy, g] of boltCells(b, age)) {
                    if (gx > 0) cell(gx - 1, gy, ".", "0,255,255", 0.35 * fade);
                    cell(gx, gy, g, "230,255,255", Math.min(1, 0.4 + fade));
                }
            }
        };

        const frame = (now) => {
            raf = requestAnimationFrame(frame);
            if (!visible || now - last < 33) return;
            last = now;
            if (idleDrops && now > nextDrop) {
                disturb(1 + Math.floor(Math.random() * (cols - 2)), 1 + Math.floor(Math.random() * (rows - 2)), 2.2);
                nextDrop = now + 2500 + Math.random() * 2000;
            }
            step(); step();
            draw(now);
        };

        const point = (e) => {
            const r = parent.getBoundingClientRect();
            return [Math.floor((e.clientX - r.left) / cw), Math.floor((e.clientY - r.top) / ch)];
        };
        const inside = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows;
        const onDown = (e) => {
            const [x, y] = point(e);
            if (!inside(x, y)) return;
            disturb(x, y, 3);
            spawnBolt(x, y, 16); spawnBolt(x, y, 10);
        };
        const onMove = (e) => {
            const now = performance.now();
            if (now - lastMove < 110) return;
            lastMove = now;
            const [x, y] = point(e);
            if (!inside(x, y)) return;
            disturb(x, y, 1);
            if (Math.random() < 0.45) spawnBolt(x, y, 6 + Math.floor(Math.random() * 6), now);
        };

        resize();
        if (reduced || !interactive) {
            drawRest();
            const ro = new ResizeObserver(() => { resize(); drawRest(); });
            ro.observe(parent);
            return () => ro.disconnect();
        }

        const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
        io.observe(canvas);
        const ro = new ResizeObserver(resize);
        ro.observe(parent);
        const target = isGlobal ? window : parent;
        target.addEventListener("pointerdown", onDown);
        target.addEventListener("pointermove", onMove);
        raf = requestAnimationFrame(frame);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect(); ro.disconnect();
            target.removeEventListener("pointerdown", onDown);
            target.removeEventListener("pointermove", onMove);
        };
    }, [fontSize, restColor, restAlpha, isGlobal, interactive, idleDrops]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
        />
    );
}