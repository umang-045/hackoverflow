import { useEffect, useRef } from "react";

// Original ASCII ripple background (not the React Bits Pro component, whose source is paywalled).
// Click/tap or move over the parent element to create ripples. Respects prefers-reduced-motion.
const RAMP = " .:-=+*#%@";

export default function AsciiRipple({
    cell = 16,
    color = "0,255,255",
    speed = 240,
    global: isGlobal = false, // listen on the whole window (use inside a fixed, full-screen wrapper)
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

        let w = 0, h = 0, cols = 0, rows = 0;
        let raf = 0, visible = true, last = 0, nextAuto = 0, lastMove = 0;
        let ripples = [];

        const resize = () => {
            const r = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = r.width; h = r.height;
            canvas.width = w * dpr; canvas.height = h * dpr;
            canvas.style.width = w + "px"; canvas.style.height = h + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(w / cell); rows = Math.ceil(h / cell);
            ctx.font = `${cell}px ui-monospace, Menlo, Consolas, monospace`;
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
        };

        const add = (x, y, strength = 1, t = performance.now()) => {
            ripples.push({ x, y, t, s: strength });
            if (ripples.length > 8) ripples.shift();
        };

        const draw = (now) => {
            ctx.clearRect(0, 0, w, h);
            ripples = ripples.filter((r) => now - r.t < 4200);
            for (let j = 0; j < rows; j++) {
                for (let i = 0; i < cols; i++) {
                    const cx = i * cell + cell / 2, cy = j * cell + cell / 2;
                    let v = 0;
                    for (const r of ripples) {
                        const age = (now - r.t) / 1000;
                        const delta = Math.hypot(cx - r.x, cy - r.y) - age * speed;
                        v += Math.cos(delta * 0.07) * Math.exp(-(delta * delta) / 9800) * (1 - age / 4.2) * r.s;
                    }
                    const idx = Math.floor(Math.max(0, Math.min(1, v)) * (RAMP.length - 1));
                    if (!idx) continue;
                    ctx.fillStyle = `rgba(${color},${0.12 + 0.55 * (idx / (RAMP.length - 1))})`;
                    ctx.fillText(RAMP[idx], cx, cy);
                }
            }
        };

        const frame = (now) => {
            raf = requestAnimationFrame(frame);
            if (!visible || now - last < 33) return;
            last = now;
            if (now > nextAuto) {
                add(Math.random() * w, Math.random() * h, 0.9, now);
                nextAuto = now + 2200 + Math.random() * 1500;
            }
            draw(now);
        };

        const point = (e) => {
            const r = parent.getBoundingClientRect();
            return [e.clientX - r.left, e.clientY - r.top];
        };
        const onDown = (e) => add(...point(e), 1.3);
        const onMove = (e) => {
            const now = performance.now();
            if (now - lastMove < 140) return;
            lastMove = now;
            add(...point(e), 0.6, now);
        };

        resize();
        if (reduced) {
            add(w / 2, h / 2, 1, performance.now() - 1300);
            draw(performance.now());
            return;
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
    }, [cell, color, speed, isGlobal]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={className}
            style={{ position: "absolute", inset: 0, pointerEvents: "none", ...style }}
        />
    );
}