import GlassSurface from "./GlassSurface";


const STYLES = String.raw`
.cta-glass__link {
  display: flex; align-items: center; justify-content: center;
  width: 100%; height: 100%; padding: 0 1rem;
  color: #fff; font-weight: 600; font-size: 1rem; letter-spacing: 0.01em;
  text-decoration: none; white-space: nowrap; border-radius: inherit;
}
.cta-glass--cyan .cta-glass__link { color: #aaffff; }
.cta-glass__link:focus-visible { outline: 2px solid #00ffff; outline-offset: 3px; }
.cta-glass { transition: transform 0.2s ease; }
.cta-glass:hover { transform: translateY(-2px); }
.cta-row { display: flex; flex-wrap: wrap; gap: 16px; }
.cta-row--stack { flex-direction: column; align-items: center; }
@media (prefers-reduced-motion: reduce) { .cta-glass { transition: none; } .cta-glass:hover { transform: none; } }
`;
// Glass pill button built on React Bits GlassSurface.
export default function CtaButton({ href, children, tone = "cyan", width = 200, external = true }) {
    return (
<>
<style dangerouslySetInnerHTML={{ __html: STYLES }} />
        <GlassSurface
            width={width}
            height={52}
            borderRadius={14}
            brightness={45}
            opacity={0.9}
            blur={10}
            backgroundOpacity={0.08}
            className={`cta-glass cta-glass--${tone}`}
        >
            <a
                href={href}
                className="cta-glass__link"
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </a>
        </GlassSurface>
</>
    );
}
