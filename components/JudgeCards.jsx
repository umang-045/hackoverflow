import React, { useState } from "react";
import ProfileCard, { PROFILE_CARD_CSS } from "./ProfileCard";

/* ------------------------------------------------------------------ */
/*  Judges – add / edit people here.                                   */
/* ------------------------------------------------------------------ */
const JUDGES = [
  {
    name: "Sangram Rath",
    title: "Cloud Architect & Technology Advisor",
    avatar: "/judge1.jpeg",
    bio: "Cloud Architect & Technology Advisor | Microsoft Certified Trainer & MCT Onboarding Advisor | Mentor: GSoC and LFX | Author, Speaker, Hackathon Judge & Certification Exam Developer | Maintainer @ Meshery (CNCF)",
    linkedin: "https://www.linkedin.com/in/sangramrath/",
  },
];

/* ------------------------------------------------------------------ */
/*  Wrapper CSS                                                        */
/* ------------------------------------------------------------------ */
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const JC_CSS = String.raw`
.jc-row { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 36px; padding: 10px 0 20px; }

.jc-scene { position: relative; height: min(80svh, 540px); aspect-ratio: 0.718; max-width: 100%; perspective: 1400px; }
@media (max-width: 768px) { .jc-scene { height: min(70svh, 450px); } }
@media (max-width: 480px) { .jc-scene { height: min(60svh, 380px); } }

/* flip on hover (tap on touch devices) */
.jc-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 0.85s cubic-bezier(0.4, 0.2, 0.2, 1); }
.jc-scene.is-flipped .jc-inner { transform: rotateY(180deg); }
@media (hover: hover) { .jc-scene:hover .jc-inner { transform: rotateY(180deg); } }

.jc-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.jc-back { transform: rotateY(180deg); }

/* back face: description only */
.jc-back-card {
  height: 100%; display: flex; flex-direction: column; gap: 24px; align-items: center; justify-content: center; padding: 28px 24px; box-sizing: border-box;
  border-radius: 30px; border: 2px solid rgba(0, 255, 255, 0.55);
  background: linear-gradient(160deg, rgba(0, 255, 255, 0.16) 0%, rgba(255, 0, 255, 0.12) 100%), rgba(2, 6, 17, 0.97);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.35), inset 0 0 30px rgba(0, 255, 255, 0.06);
}
.jc-b-bio { margin: 0; font-size: 1rem; line-height: 1.7; color: #f4f8ff; text-align: center; }
.jc-linkedin {
  width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #aaffff;
  background: rgba(0, 255, 255, 0.16); border: 1px solid rgba(0, 255, 255, 0.55); transition: all 0.25s ease;
}
.jc-linkedin svg { width: 26px; height: 26px; }
.jc-linkedin:hover, .jc-linkedin:focus-visible { background: rgba(0, 255, 255, 0.3); border-color: #00ffff; box-shadow: 0 0 14px rgba(0, 255, 255, 0.6); outline: none; }
@media (max-width: 480px) { .jc-back-card { padding: 18px 16px; border-radius: 22px; } .jc-b-bio { font-size: 0.85rem; line-height: 1.55; } }

@media (prefers-reduced-motion: reduce) { .jc-inner { transition-duration: 0.01ms; } }

/* make ProfileCard fill the wrapper */
.jc-scene .pc-card-wrapper, .jc-scene .pc-card-shell { height: 100%; }
.jc-scene .pc-card { height: 100%; max-height: none; aspect-ratio: auto; }

/* hide the whole top header (name + title) and the handle */
.jc-scene .pc-details,
.jc-scene .pc-handle,
.jc-scene .pc-contact-btn { display: none; }

/* let the photo fill the space the header used to take */
.jc-scene .pc-avatar-content .avatar {
  top: 0 !important; bottom: 0 !important; left: 0 !important;
  width: 100% !important; height: 100% !important;
  object-fit: cover; object-position: center top; transform: none !important;
}

/* match the site's neon look */
.jc-scene .pc-card { box-shadow: 0 0 30px rgba(0, 255, 255, 0.35), rgba(0, 0, 0, 0.8) 0 10px 20px -5px; border: 2px solid rgba(0, 255, 255, 0.55); }

/* Regular (non cut-out) photos: stop the holo blend modes from blowing the image out */
.jc-scene .pc-avatar-content { mix-blend-mode: normal; }
.jc-scene .pc-shine { opacity: 0.4; }
.jc-scene .pc-glare { opacity: 0.25; }
.jc-scene .pc-avatar-content::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 38%; z-index: 1; pointer-events: none;
  background: linear-gradient(to top, rgba(2, 6, 17, 0.92) 0%, rgba(2, 6, 17, 0.55) 55%, transparent 100%);
}

/* bottom box: avatar + name (status slot) */
.jc-scene .pc-user-info { background: rgba(2, 6, 17, 0.6); border-color: rgba(0, 255, 255, 0.35); }
.jc-scene .pc-status { color: #ffffff; font-weight: 600; font-size: 1rem; }

`;

/* ------------------------------------------------------------------ */
/*  One judge = ProfileCard                                            */
/* ------------------------------------------------------------------ */
function JudgeCard({ judge }) {
  const [flipped, setFlipped] = useState(false);

  // Touch devices have no hover: tap the card to flip it (the LinkedIn link still works)
  const onSceneClick = (e) => {
    if (window.matchMedia("(hover: none)").matches && !e.target.closest("a")) {
      setFlipped((f) => !f);
    }
  };

  return (
    <div className={`jc-scene${flipped ? " is-flipped" : ""}`} onClick={onSceneClick}>
      <div className="jc-inner">
        {/* FRONT */}
        <div className="jc-face jc-front">
          <ProfileCard
            avatarUrl={judge.avatar}
            miniAvatarUrl={judge.avatar}
            name={judge.name}
            title=""
            status={judge.name}
            showUserInfo
            enableTilt
            enableMobileTilt={false}
            iconUrl=""
            grainUrl=""
            innerGradient="linear-gradient(145deg, rgba(0,200,255,0.30) 0%, rgba(70,40,150,0.55) 55%, rgba(200,0,200,0.30) 100%)"
            behindGlowColor="rgba(0, 255, 255, 0.55)"
            behindGlowSize="55%"
          />
        </div>

        {/* BACK: description only */}
        <div className="jc-face jc-back">
          <div className="jc-back-card">
            <p className="jc-b-bio">{judge.bio}</p>
            {judge.linkedin && (
              <a
                className="jc-linkedin"
                href={judge.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${judge.name} on LinkedIn`}
              >
                <LinkedInIcon />
              </a>
            )}
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
          <JudgeCard key={j.name} judge={j} />
        ))}
      </div>
    </>
  );
}