const STYLES = String.raw`
.sp-section {
  position: relative; overflow: hidden; padding: 88px 16px;
  background: linear-gradient(180deg, rgba(2,6,17,0.45) 0%, rgba(4,18,40,0.45) 50%, rgba(2,6,17,0.45) 100%);
}
.sp-inner { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; text-align: center; }
.sp-title { color: #e8f3ff; font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 700; margin: 0 0 40px; }
.sp-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 24px; }

.sp-card {
  width: min(100%, 320px); height: 220px; border-radius: 18px;
  background: linear-gradient(rgba(0, 255, 255, 0.05), rgba(0, 255, 255, 0.05)), rgba(2, 6, 17, 0.9);
  border: 1px solid rgba(0, 255, 255, 0.28);
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
}
.sp-card:hover {
  background: linear-gradient(rgba(0, 255, 255, 0.1), rgba(0, 255, 255, 0.1)), rgba(2, 6, 17, 0.9);
  border-color: rgba(0, 255, 255, 0.5);
  transform: translateY(-5px);
}
.sp-link {
  position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center;
  justify-content: center; height: 100%;
  gap: 14px; padding: 24px; text-decoration: none; width: 100%;
}
.sp-logo-wrap { display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 12px; padding: 14px 20px; }
.sp-logo { max-height: 64px; max-width: 200px; width: auto; }
.sp-role { color: #eef4ff; font-size: 0.95rem; }
.sp-link:focus-visible { outline: 2px solid #00ffff; outline-offset: 4px; border-radius: 12px; }
`;

// Add or remove partners here.
const PARTNERS = [
    { name: "Unstop", role: "Platform Partner", href: "https://unstop.com/", logo: "/Unstop_idGARQA_PG_0.png" },
];

export default function Sponsors() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
            <section className="sp-section" aria-labelledby="sponsors-title">
                <div className="sp-inner">
                    <h3 id="sponsors-title" className="sp-title">Powered By</h3>
                    <div className="sp-grid">
                        {PARTNERS.map((p) => (
                            <div key={p.name} className="sp-card">
                                <a href={p.href} target="_blank" rel="noopener noreferrer" className="sp-link">
                                    <span className="sp-logo-wrap">
                                        <img src={p.logo} alt="UNSTOP LOGO" className="sp-logo" />
                                    </span>
                                    <span className="sp-role">{p.role}</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}