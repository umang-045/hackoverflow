import React, { useEffect, useState } from "react";
import ProfileCard, { PROFILE_CARD_CSS } from "./ProfileCard";

/* ------------------------------------------------------------------ */
/*  Judges – add / edit people here. Empty or missing contacts are     */
/*  hidden automatically.                                              */
/* ------------------------------------------------------------------ */
const JUDGES = [
    {
        name: "Vivek Yadav",
        title: "Solutions Architect @ FlutterFlow",
        handle: "viveky259",
        status: "Judge",
        avatar: "/vivekYadav.jpeg",
        bio: "Enterprise Solutions Architect at FlutterFlow | Google Developer Expert (Flutter & Dart) | EdTech Founder | Hackathon Judge & Mentor",
        connections: "500+",
        location: "India",
        // Fill in the ones you have. Supported: linkedin, github, twitter, email, website
        contacts: {
            linkedin: "https://www.linkedin.com/in/viveky259/",
            github: "",
            twitter: "",
            email: "",
            website: "",
        },
    },
];

/* ------------------------------------------------------------------ */
/*  Icons (stroke icons, inherit currentColor)                         */
/* ------------------------------------------------------------------ */
const Svg = ({ children }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
    </svg>
);

const CONTACT_META = {
    linkedin: {
        label: "LinkedIn",
        icon: (
            <Svg>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
            </Svg>
        ),
    },
    github: {
        label: "GitHub",
        icon: (
            <Svg>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </Svg>
        ),
    },
    twitter: {
        label: "Twitter / X",
        icon: (
            <Svg>
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </Svg>
        ),
    },
    email: {
        label: "Email",
        icon: (
            <Svg>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
            </Svg>
        ),
    },
    website: {
        label: "Website",
        icon: (
            <Svg>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </Svg>
        ),
    },
};

const hrefFor = (key, value) => (key === "email" && !value.startsWith("mailto:") ? `mailto:${value}` : value);

/* ------------------------------------------------------------------ */
/*  Flip wrapper CSS (sizes match ProfileCard's own breakpoints)       */
/* ------------------------------------------------------------------ */
const JC_CSS = String.raw`
.jc-row { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 36px; padding: 10px 0 20px; }

.jc-scene { position: relative; height: min(80svh, 540px); aspect-ratio: 0.718; max-width: 100%; perspective: 1400px; }
@media (max-width: 768px) { .jc-scene { height: min(70svh, 450px); } }
@media (max-width: 480px) { .jc-scene { height: min(60svh, 380px); } }

.jc-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.85s cubic-bezier(0.4, 0.2, 0.2, 1); }
.jc-scene.is-flipped .jc-inner { transform: rotateY(180deg); }

.jc-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.jc-front { pointer-events: auto; }
.jc-scene.is-flipped .jc-front { pointer-events: none; }
.jc-back { transform: rotateY(180deg); pointer-events: none; }
.jc-scene.is-flipped .jc-back { pointer-events: auto; }

/* make ProfileCard fill the flip face */
.jc-front .pc-card-wrapper, .jc-front .pc-card-shell { height: 100%; }
.jc-front .pc-card { height: 100%; max-height: none; aspect-ratio: auto; }

/* match the site's neon look on the front */
.jc-front .pc-card { box-shadow: 0 0 30px rgba(0, 255, 255, 0.35), rgba(0, 0, 0, 0.8) 0 10px 20px -5px; border: 2px solid rgba(0, 255, 255, 0.55); }
.jc-front .pc-contact-btn { background: rgba(0, 255, 255, 0.16); color: #aaffff; border-color: rgba(0, 255, 255, 0.55); letter-spacing: 0.04em; }
.jc-front .pc-contact-btn:hover { background: rgba(0, 255, 255, 0.3); border-color: #00ffff; box-shadow: 0 0 12px rgba(0, 255, 255, 0.6); }

/* Regular (non cut-out) photos: stop the holo blend modes from blowing the image out */
.jc-front .pc-avatar-content { mix-blend-mode: normal; }
.jc-front .pc-shine { opacity: 0.4; }
.jc-front .pc-glare { opacity: 0.25; }
.jc-front .pc-avatar-content::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 38%; z-index: 1; pointer-events: none;
  background: linear-gradient(to top, rgba(2, 6, 17, 0.92) 0%, rgba(2, 6, 17, 0.55) 55%, transparent 100%);
}
.jc-front .pc-user-info { background: rgba(2, 6, 17, 0.6); border-color: rgba(0, 255, 255, 0.35); }

/* Name + title: crisp white, no luminosity blending */
.jc-front .pc-content:not(.pc-avatar-content) { mix-blend-mode: normal; }
.jc-front .pc-details h3 { background-image: linear-gradient(to bottom, #ffffff, #d6f4ff); filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.65)); }
.jc-front .pc-details p { background-image: linear-gradient(to bottom, #ffffff, #aaffff); filter: drop-shadow(0 1px 5px rgba(0, 0, 0, 0.7)); }

/* ---------------- back face (contacts) ---------------- */
.jc-back-card {
  height: 100%; display: flex; flex-direction: column; gap: 14px; padding: 24px 22px 20px; overflow: hidden;
  border-radius: 30px; border: 2px solid rgba(0, 255, 255, 0.55);
  background: linear-gradient(160deg, rgba(0, 255, 255, 0.16) 0%, rgba(255, 0, 255, 0.12) 100%), rgba(2, 6, 17, 0.97);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.35), inset 0 0 30px rgba(0, 255, 255, 0.06);
}
.jc-b-head { display: flex; align-items: center; gap: 14px; }
.jc-b-avatar { width: 58px; height: 58px; border-radius: 50%; object-fit: cover; border: 2px solid #00ffff; box-shadow: 0 0 14px rgba(0, 255, 255, 0.6); flex-shrink: 0; }
.jc-b-name { margin: 0; font-size: 1.2rem; font-weight: 700; color: #00ffff; text-shadow: 0 0 8px rgba(0, 255, 255, 0.6); line-height: 1.2; }
.jc-b-title { margin: 3px 0 0; font-size: 0.85rem; color: #e6eefc; line-height: 1.3; }
.jc-b-bio { margin: 0; font-size: 0.88rem; line-height: 1.55; color: #f4f8ff; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.jc-b-meta { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 0.8rem; color: #e6eefc; }
.jc-b-meta strong { color: #00ff88; text-shadow: 0 0 6px rgba(0, 255, 136, 0.6); }
.jc-b-label { font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase; color: #ff7aff; margin-top: 2px; }
.jc-b-contacts { display: flex; flex-direction: column; gap: 8px; }
.jc-contact {
  display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 12px; text-decoration: none; color: #eaffff; font-weight: 600; font-size: 0.92rem;
  border: 1px solid rgba(0, 255, 255, 0.35); background: rgba(0, 255, 255, 0.07);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}
.jc-contact svg { color: #00ffff; flex-shrink: 0; }
.jc-contact .jc-arrow { margin-left: auto; opacity: 0.7; transition: transform 0.25s ease; }
.jc-contact:hover, .jc-contact:focus-visible { transform: translateX(4px); border-color: #00ffff; background: rgba(0, 255, 255, 0.18); box-shadow: 0 0 14px rgba(0, 255, 255, 0.4); outline: none; }
.jc-contact:hover .jc-arrow { transform: translateX(3px); opacity: 1; }
.jc-empty { font-size: 0.85rem; color: #e6eefc; opacity: 0.8; }
.jc-flipback {
  margin-top: auto; align-self: stretch; padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 0.82rem; letter-spacing: 0.08em; text-transform: uppercase;
  color: #fff; background: rgba(255, 0, 255, 0.16); border: 1px solid rgba(255, 0, 255, 0.6); transition: all 0.25s ease;
}
.jc-flipback:hover, .jc-flipback:focus-visible { background: rgba(255, 0, 255, 0.32); box-shadow: 0 0 14px rgba(255, 0, 255, 0.55); outline: none; }

@media (max-width: 480px) {
  .jc-back-card { padding: 16px 14px 14px; gap: 10px; border-radius: 22px; }
  .jc-b-avatar { width: 44px; height: 44px; }
  .jc-b-name { font-size: 1rem; }
  .jc-b-bio { -webkit-line-clamp: 3; font-size: 0.8rem; }
  .jc-contact { padding: 7px 10px; font-size: 0.82rem; }
}

@media (prefers-reduced-motion: reduce) { .jc-inner { transition-duration: 0.01ms; } }
`;

/* ------------------------------------------------------------------ */
/*  One judge = ProfileCard (front) + contacts (back)                  */
/* ------------------------------------------------------------------ */
function JudgeFlipCard({ judge }) {
    const [flipped, setFlipped] = useState(false);

    // Esc flips back
    useEffect(() => {
        if (!flipped) return;
        const onKey = (e) => e.key === "Escape" && setFlipped(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [flipped]);

    const contacts = Object.entries(judge.contacts || {}).filter(([key, value]) => value && CONTACT_META[key]);

    return (
        <div className={`jc-scene${flipped ? " is-flipped" : ""}`}>
            <div className="jc-inner">
                {/* FRONT – React Bits Profile Card */}
                <div className="jc-face jc-front" aria-hidden={flipped}>
                    <ProfileCard
                        avatarUrl={judge.avatar}
                        miniAvatarUrl={judge.avatar}
                        name={judge.name}
                        title={judge.title}
                        handle={judge.handle}
                        status={judge.status}
                        contactText="Contact"
                        showUserInfo
                        enableTilt
                        enableMobileTilt={false}
                        iconUrl=""
                        grainUrl=""
                        innerGradient="linear-gradient(145deg, rgba(0,200,255,0.30) 0%, rgba(70,40,150,0.55) 55%, rgba(200,0,200,0.30) 100%)"
                        behindGlowColor="rgba(0, 255, 255, 0.55)"
                        behindGlowSize="55%"
                        onContactClick={() => setFlipped(true)}
                    />
                </div>

                {/* BACK – contacts */}
                <div className="jc-face jc-back" aria-hidden={!flipped}>
                    <div className="jc-back-card">
                        <div className="jc-b-head">
                            <img className="jc-b-avatar" src={judge.avatar} alt="" />
                            <div>
                                <h4 className="jc-b-name">{judge.name}</h4>
                                <p className="jc-b-title">{judge.title}</p>
                            </div>
                        </div>

                        {judge.bio && <p className="jc-b-bio">{judge.bio}</p>}

                        <div className="jc-b-meta">
                            {judge.connections && (
                                <span><strong>{judge.connections}</strong> Connections</span>
                            )}
                            {judge.location && <span>📍 {judge.location}</span>}
                        </div>

                        <div className="jc-b-label">Get in touch</div>
                        <div className="jc-b-contacts">
                            {contacts.length === 0 && <span className="jc-empty">No public contacts listed.</span>}
                            {contacts.map(([key, value]) => (
                                <a
                                    key={key}
                                    className="jc-contact"
                                    href={hrefFor(key, value)}
                                    target={key === "email" ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    tabIndex={flipped ? 0 : -1}
                                >
                                    {CONTACT_META[key].icon}
                                    <span>{CONTACT_META[key].label}</span>
                                    <span className="jc-arrow" aria-hidden="true">→</span>
                                </a>
                            ))}
                        </div>

                        <button type="button" className="jc-flipback" onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>
                            ↺ Flip back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JudgeCards() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: PROFILE_CARD_CSS + JC_CSS }} />
            <div className="jc-row">
                {JUDGES.map((j) => (
                    <JudgeFlipCard key={j.name} judge={j} />
                ))}
            </div>
        </>
    );
}