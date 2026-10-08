// my new version of index.js with 3D background and improved styling 

import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Timer from "../components/Timer";
import Link from "next/link";
import { useEffect, useState } from "react";
import BlobScene from "../components/Flow";
import Shuffle from "../components/font/Shuffle";
import AsciiWords from "../components/AsciiWords";
import TechText from "../components/TechText";
import JudgeCards from "../components/JudgeCards";

const NEON = {
    cyan: {
        color: '#0ff',
        border: '2px solid #0ff',
        textShadow: 'none',
    },
    apply: {
        color: 'rgba(255, 255, 255, 1)',
        border: '2px solid rgba(152, 185, 216, 1)',
        textShadow: 'none',
    },
};

function NeonButton({ href, tone = "cyan", fullWidth = false, children }) {
    const [hover, setHover] = useState(false);
    const t = NEON[tone];
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                display: 'inline-block',
                textAlign: 'center',
                textDecoration: 'none',
                padding: '0.8rem 1.5rem',
                color: t.color,
                textShadow: t.textShadow,
                border: t.border,
                borderRadius: '8px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                backgroundColor: 'black',
                transition: '0.3s',
                width: fullWidth ? 'min(100%, 260px)' : 'auto',
                transform: hover ? 'scale(1.05)' : 'scale(1)',
            }}
        >
            {children}
        </a>
    );
}

const THEMES = [
    { title: "Blockchain Technology", img: "/blockchain.png", rgb: "0, 255, 255", color: "#00ffff",
      desc: "Keeping all important data in one place is risky. So it's better to keep important data at decentralised locations. Any web/mobile app can make use of this concept." },
    { title: "Road Safety", img: "/road-safety.png", rgb: "255, 0, 255", color: "#ff4dff",
      desc: "Road safety is a constant concern for public safety, particularly in developing countries. Design an effective solution that could help tackle contemporary challenges for road safety." },
    { title: "HealthCare", img: "/healthcare.png", rgb: "0, 255, 136", color: "#00ff88",
      desc: "The global COVID-19 pandemic has accelerated the need for digital reinvention and the adoption of better healthcare technology. High-quality health care helps prevent diseases and improve quality of life. Build solutions to increase access to health care services." },
    { title: "Education", img: "/classroom.png", rgb: "0, 255, 255", color: "#00ffff",
      desc: "Our education system has not updated since long but technological advancements have been rapid. Upcoming technology can help students better grasp concepts." },
    { title: "Agriculture", img: "/agriculture.png", rgb: "255, 0, 255", color: "#ff4dff",
      desc: "Producing and distributing food materials is a challenge with many environmental as well as government policies affecting it. Make use of technology to ease this problem." },
    { title: "Open Innovation", img: "/open-sign.png", rgb: "0, 255, 136", color: "#00ff88",
      desc: "Make use of developer tools to help solve any issue in society. It can be related to health, education, environment, etc. Anything that can help the society is valid." },
];

const THEMES_CSS = `
.th-section { position: relative; padding: 90px 0 100px; background: linear-gradient(180deg, rgba(2,6,17,0.45) 0%, rgba(4,18,40,0.45) 100%); overflow: hidden; }
.th-head { text-align: center; max-width: 720px; margin: 0 auto 48px; padding: 0 16px; }
.th-eyebrow { display: inline-block; font-size: 0.85rem; letter-spacing: 0.3em; text-transform: uppercase; color: #00ff88; text-shadow: 0 0 8px rgba(0,255,136,0.7); margin-bottom: 14px; }
.th-heading { margin: 0; font-weight: 800; font-size: clamp(2rem, 5vw, 3.2rem); line-height: 1.1;
  background: linear-gradient(90deg, #00ffff 0%, #7fe9ff 40%, #ff4dff 100%); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 12px rgba(0,255,255,0.35)); }
.th-sub { margin: 16px auto 0; color: #e6eefc; font-size: 1.05rem; line-height: 1.6; }
.th-hint { margin-top: 10px; color: #9fe9ff; font-size: 0.85rem; letter-spacing: 0.08em; opacity: .85; }
.th-divider { width: 120px; height: 3px; margin: 22px auto 0; border-radius: 3px; background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent); box-shadow: 0 0 12px rgba(0,255,255,0.6); }

/* Bento grid */
.th-wrap { max-width: 1320px; margin: 0 auto; padding: 0 24px; }
.th-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-auto-rows: minmax(230px, auto); gap: 22px; }
.th-card.th-featured { grid-column: 1 / span 2; grid-row: 1 / span 2; }
@media (max-width: 991px) {
  .th-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .th-card.th-featured { grid-column: 1 / -1; grid-row: auto; }
}
@media (max-width: 639px) {
  .th-wrap { padding: 0 14px; }
  .th-grid { grid-template-columns: 1fr; }
}

.th-card { position: relative; overflow: hidden; display: flex; flex-direction: column; padding: 26px 24px; border-radius: 20px; cursor: pointer; outline: none;
  background: linear-gradient(160deg, rgba(var(--rgb), 0.14) 0%, rgba(var(--rgb), 0.03) 55%), rgba(2, 6, 17, 0.92);
  border: 1px solid rgba(var(--rgb), 0.35);
  transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
.th-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: .85; }
.th-card::after { content: ""; position: absolute; width: 240px; height: 240px; right: -100px; top: -100px; border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--rgb), 0.28), transparent 70%); opacity: 0; transition: opacity .35s ease; pointer-events: none; }
.th-card:hover, .th-card:focus-visible { transform: translateY(-6px); border-color: rgba(var(--rgb), 0.85); box-shadow: 0 12px 40px rgba(var(--rgb), 0.28), 0 0 18px rgba(var(--rgb), 0.25); }
.th-card:hover::after, .th-card:focus-visible::after { opacity: 1; }

.th-icon { width: 64px; height: 64px; border-radius: 50%; padding: 3px; margin-bottom: 16px; background: linear-gradient(135deg, var(--accent), rgba(var(--rgb), 0.2)); box-shadow: 0 0 20px rgba(var(--rgb), 0.55); flex-shrink: 0; transition: all .35s ease; }
.th-icon img { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; background: #0a1224; }
.th-title { margin: 0 0 8px; font-size: 1.2rem; font-weight: 700; color: var(--accent); text-shadow: 0 0 10px rgba(var(--rgb), 0.55); }
.th-desc { margin: 0; color: #f4f8ff; font-size: 0.95rem; line-height: 1.65; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; }
.th-more { margin-top: auto; padding-top: 14px; font-size: 0.78rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); opacity: .85; }
.th-more::after { content: " →"; }

/* Featured (large) card */
.th-card.th-featured { justify-content: center; padding: 40px 40px; cursor: default; animation: thPop .45s ease both;
  background: linear-gradient(145deg, rgba(var(--rgb), 0.22) 0%, rgba(var(--rgb), 0.04) 60%), rgba(2, 6, 17, 0.94);
  border-color: rgba(var(--rgb), 0.75); box-shadow: 0 0 40px rgba(var(--rgb), 0.28), inset 0 0 40px rgba(var(--rgb), 0.06); }
.th-card.th-featured:hover, .th-card.th-featured:focus-visible { transform: none; }
.th-card.th-featured::after { opacity: 1; width: 380px; height: 380px; right: -140px; top: -140px; }
.th-featured .th-icon { width: 120px; height: 120px; padding: 4px; margin-bottom: 26px; box-shadow: 0 0 34px rgba(var(--rgb), 0.7); }
.th-featured .th-tag { display: inline-block; align-self: flex-start; margin-bottom: 14px; padding: 4px 14px; border-radius: 999px; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--accent); border: 1px solid rgba(var(--rgb), 0.6); background: rgba(var(--rgb), 0.1); }
.th-featured .th-title { font-size: clamp(1.7rem, 3vw, 2.4rem); margin-bottom: 14px; }
.th-featured .th-desc { font-size: 1.15rem; line-height: 1.8; -webkit-line-clamp: unset; display: block; overflow: visible; max-width: 640px; }
.th-featured .th-more { display: none; }
@keyframes thPop { from { opacity: 0; transform: scale(.96); } to { opacity: 1; transform: scale(1); } }
`;

const FAQ_ITEMS = [
    { title: "Do I need to have any specific qualifications to be a participant for the Hackathon?", body: "If you love to code, you are more than welcome to participate in the Hackathon." },
    { title: "Do I need to pay any money to register for the Hackathon?", body: "No. You do not have to pay anything to anyone to register yourself for any Hackathon on unstop." },
    { title: "How do I submit what I have made for the Hackathon?", body: "You have to develop the application on your local system and submit it on unstop in tar/zip file format along with instructions to run the application and source code." },
    { title: "Do we need to have the entire idea fully working?", body: "The entire idea need not be fully implemented however, the submission should be functional so that it can be reviewed by the judges." },
    { title: "How do we submit our hack?", body: "You have to develop the entire software application on your local system and submit it on unstop in tar/zip file format along with instructions to run the application and source code. If it is a mobile app, package it as an apk and send along with the source code." },
    { title: "Does one have to be online and available for the entire duration of the Hackathon?", body: "No, one does not need to be logged in on Unstop or be online for the entire duration. You can develop the application on your local system based on the given themes and then submit it on Unstop, on the specific challenge page." },
    { title: "Since there is no specific technology mentioned, are there any restrictions on using number of pre-built libraries?", body: "There is no restriction to use any language, technology stack, or libraries. You can use any of them to create the web/mobile application." },
    { title: "Do I need to give a demo for the product that I have built?", body: "If you want you can submit a small presentation or video that demos your submission, however it's not mandatory, and only good to have. In case you are one of the winners, you might be invited to demo your application at a physical event, details of which will be shared with sufficient advance notice." },
];


function AccordionIcon({ isOpen, accentColor, mutedColor }) {
    return (
        <div style={{ position: "relative", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-hidden="true">
            <svg
                style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    color: isOpen ? accentColor : mutedColor,
                    transition: "transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55), color 300ms",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
            >
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" strokeDasharray="4 4" />
            </svg>
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", transform: isOpen ? "rotate(90deg) scale(1.1)" : "scale(1)", transition: "transform 500ms" }}>
                <div style={{ position: "absolute", width: 12, height: 2, borderRadius: 9999, background: isOpen ? accentColor : mutedColor, transition: "background 500ms" }} />
                <div style={{ position: "absolute", height: 12, width: 2, borderRadius: 9999, background: isOpen ? "transparent" : mutedColor, transform: isOpen ? "rotate(90deg) scale(0)" : "scale(1)", transition: "all 500ms" }} />
            </div>
        </div>
    );
}

function AccordionRow({ item, idx, isOpen, onToggle, accentColor, titleSize, bodySize, titleColor, bodyColor, mutedColor, borderColor }) {
    const [hovered, setHovered] = useState(false);
    const contentId = `acc-content-${idx}`;

    return (
        <div
            style={{ position: "relative", display: "flex", alignItems: "flex-start" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Left circular button + connector line */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", marginTop: 2, marginRight: 16, flexShrink: 0 }}>
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    style={{
                        width: 48, height: 48, borderRadius: 9999,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${isOpen ? accentColor : borderColor}`,
                        boxShadow: isOpen ? `0 0 20px color-mix(in srgb, ${accentColor} 25%, transparent)` : "none",
                        transform: isOpen ? "scale(1.1)" : hovered ? "scale(1.05)" : "scale(1)",
                        cursor: "pointer", userSelect: "none", padding: 0, outline: "none",
                        transition: "background-color 500ms, border-color 500ms, box-shadow 500ms, transform 500ms",
                    }}
                >
                    <AccordionIcon isOpen={isOpen} accentColor={accentColor} mutedColor={mutedColor} />
                </button>
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute", top: 48, bottom: -12, width: 2,
                        background: isOpen ? `linear-gradient(to bottom, ${accentColor}, transparent)` : "transparent",
                        opacity: isOpen ? 1 : 0,
                        transformOrigin: "top",
                        transform: isOpen ? "scaleY(1)" : "scaleY(0)",
                        transition: "all 500ms",
                    }}
                />
            </div>

            {/* Title + body */}
            <div style={{ flex: 1, minWidth: 0, transform: isOpen ? "translateX(4px)" : hovered ? "translateX(2px)" : "translateX(0)", transition: "transform 500ms" }}>
                <button
                    type="button"
                    onClick={onToggle}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    style={{
                        width: "100%", textAlign: "left", padding: 16, borderRadius: 16,
                        background: isOpen || hovered ? "linear-gradient(rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.07)), rgba(2, 6, 17, 0.88)" : "linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), rgba(2, 6, 17, 0.88)",
                        border: `1px solid ${isOpen ? `color-mix(in srgb, ${accentColor} 25%, transparent)` : borderColor}`,
                        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                        cursor: "pointer", userSelect: "none", outline: "none",
                        position: "relative", overflow: "hidden",
                        borderBottomLeftRadius: isOpen ? 0 : 16,
                        borderBottomRightRadius: isOpen ? 0 : 16,
                        transition: "background-color 500ms, border-color 500ms, border-radius 500ms",
                    }}
                >
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute", inset: 0,
                            background: `linear-gradient(to right, ${accentColor}, transparent)`,
                            opacity: isOpen ? 0.1 : hovered ? 0.05 : 0,
                            transition: "opacity 150ms", pointerEvents: "none",
                        }}
                    />
                    <span style={{ position: "relative", zIndex: 1, fontSize: titleSize, fontWeight: 500, color: isOpen ? titleColor : mutedColor, transition: "color 300ms" }}>
                        {item.title}
                    </span>
                </button>

                <div
                    id={contentId}
                    role="region"
                    aria-hidden={!isOpen}
                    style={{
                        display: "grid",
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                        transition: "grid-template-rows 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <div style={{ overflow: "hidden" }}>
                        <div
                            style={{
                                position: "relative", padding: 20,
                                border: `1px solid color-mix(in srgb, ${accentColor} 12.5%, transparent)`,
                                borderTop: "none",
                                borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
                                background: "linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03)), rgba(2, 6, 17, 0.88)",
                                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                            }}
                        >
                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute", top: 0, left: 0, width: "100%", height: 1,
                                    background: `linear-gradient(to right, transparent, color-mix(in srgb, ${accentColor} 31%, transparent), transparent)`,
                                }}
                            />
                            <div style={{ position: "relative", zIndex: 1, fontSize: bodySize, lineHeight: 1.55, color: bodyColor }}>
                                {item.body}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnimatedAccordion({
    items,
    type = "single",
    defaultOpenIndex = 0,
    accentColor = "#8b5cf6",
    titleSize = 14,
    bodySize = 14,
    titleColor = "#f5f5f5",
    bodyColor = "rgba(245, 245, 245, 0.7)",
    mutedColor = "rgba(245, 245, 245, 0.5)",
    borderColor = "rgba(255, 255, 255, 0.1)",
    rowGap = 16,
}) {
    const [openValues, setOpenValues] = useState(() =>
        defaultOpenIndex < 0 || defaultOpenIndex >= items.length ? [] : [String(defaultOpenIndex)]
    );

    const toggle = (value) => {
        setOpenValues((prev) => {
            const isOpen = prev.includes(value);
            if (type === "single") return isOpen ? [] : [value];
            return isOpen ? prev.filter((v) => v !== value) : [...prev, value];
        });
    };

    return (
        <div style={{ position: "relative", width: "100%", fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
            {/* Vertical guide line behind the circles */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute", left: 23, top: 40, bottom: 40, width: 2,
                    background: `linear-gradient(to bottom, transparent, ${borderColor}, transparent)`,
                    pointerEvents: "none",
                }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: rowGap }}>
                {items.map((item, idx) => (
                    <AccordionRow
                        key={idx}
                        item={item}
                        idx={idx}
                        isOpen={openValues.includes(String(idx))}
                        onToggle={() => toggle(String(idx))}
                        accentColor={accentColor}
                        titleSize={titleSize}
                        bodySize={bodySize}
                        titleColor={titleColor}
                        bodyColor={bodyColor}
                        mutedColor={mutedColor}
                        borderColor={borderColor}
                    />
                ))}
            </div>
        </div>
    );
}

export default function IndexPage() {

    const [isMobile, setIsMobile] = useState(false);
    const [activeTheme, setActiveTheme] = useState(0);
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://apply.devfolio.co/v2/sdk.js";
    //     script.async = true;
    //     script.defer = true;
    //     script.onload = () => {
    //         console.log("Devfolio SDK loaded");
    //         if (window.Devfolio) {
    //             window.Devfolio.setup();
    //         }
    //     };
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize(); // run once
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <Head>
                {/* Basic Meta */}
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="IE=edge" />
                <title>HackOverflow 10.0</title>
                <meta
                    name="description"
                    content="HackOverflow 10.0 - NIT Durgapur's official hackathon platform"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />

                {/* Favicon */}
                <link rel="icon" href="/logo2026.png" type="image/jpeg" />

                {/* Bootstrap CSS */}
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css"
                    integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl"
                    crossOrigin="anonymous"
                />

                {/* Other CSS files */}
                <link rel="stylesheet" href="/css/owl.carousel.min.css" />
                <link rel="stylesheet" href="/css/magnific-popup.css" />
                <link rel="stylesheet" href="/css/font-awesome.min.css" />
                <link rel="stylesheet" href="/css/themify-icons.css" />
                <link rel="stylesheet" href="/css/nice-select.css" />
                <link rel="stylesheet" href="/css/flaticon.css" />
                <link rel="stylesheet" href="/css/animate.css" />
                <link rel="stylesheet" href="/css/slicknav.css" />
                <link rel="stylesheet" href="/css/style.css" />

                {/* Optional: global animation styles */}
                <style>{`
  html {
    scroll-behavior: smooth;
  }
  
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  body {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
  
  .slider_area, .about_area, .speakers_area, .event_area {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    will-change: transform;
  }
  
  a, button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  canvas {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
  }

  .pixel-card.theme-pixel {
    width: 100%;
    height: auto;
    aspect-ratio: auto;
    display: block;
    border: 0;
    border-radius: 15px;
    margin-bottom: 25px;
    --pixel-card-active-color: transparent;
  }
  .theme-pixel .pixel-canvas {
    position: absolute;
    inset: 0;
  }
`}</style>

                {/* Scripts should go outside of <Head> ideally */}
            </Head>
            <style>{`
                .page-ascii-bg {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    z-index: 0;
                    overflow: hidden;
                    pointer-events: none;
                }
                .page-ascii-bg canvas { width: 100% !important; height: 100% !important; display: block; }
                .page-content { position: relative; z-index: 1; }
            `}</style>
            <div style={{ background: '#020611', position: 'relative', minHeight: '100vh' }}>
                {/* ASCII background - fixed, covers the whole page */}
                <div className="page-ascii-bg">
                    <AsciiWords interactive global fontSize={isMobile ? 12 : 14} restAlpha={0.07} />
                </div>
                <div className="page-content">
                <Navbar />
                <div>
                    <div style={{ position: 'relative', minHeight: '100vh' }}>
                        {/* 3D Background */}
                        {/* <BlobScene /> */}


                        {/* Original Content with positioning */}
                        <div className="slider_area" style={{ position: 'relative', zIndex: 1, background: 'transparent' }}>
                            <div className="slider_text">
                                <div className="container">
                                    <div className="position_relv">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="title_text" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                                    {/* <h3
                                                        style={{
                                                            color: '#aaffff !important',
                                                            fontWeight: 'bold',
                                                            fontSize: '4rem',
                                                            WebkitTextFillColor: '#aaffff',
                                                            filter: 'drop-shadow(0 0 10px #0ff)',
                                                        }}
                                                    >
                                                        HackOverflow 10.0
                                                        <br />
                                                        Aarohan, 2026
                                                    </h3> */}
                                                    <div style={{ width: 'min(100%, 640px)', height: '110px', position: 'relative', margin: '0 auto', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                                        <TechText text="HackOverflow 10.0" fontWeight={700} fontSize={64} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                                    </div>
                                                    <div style={{ width: 'min(100%, 410px)', height: '110px', position: 'relative', margin: '0 auto', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                                        <TechText text="Aarohan, 2026" fontWeight={700} fontSize={64} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                                    </div>
                                                    <br />
                                                    <div className="relative flex gap-4" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1.5rem' }}>
                                                        <NeonButton href="https://calendar.google.com/calendar/u/0/r/eventedit?text=HackOverflow+10.0&dates=20261008/20261012" tone="cyan">Add to your Calendar</NeonButton>
                                                        {/* 
                                                        <div
                                                            className="apply-button"
                                                            data-hackathon-slug="hackoverflow09"
                                                            data-button-theme="light"
                                                            style={{ height: 44, width: 312, margin: '1rem 0' }}
                                                        ></div> */}
                                                        <NeonButton href="https://unstop.com/hackathons/hackoverflow-100-aarohan-nit-durgapur-1766018" tone="apply">Apply</NeonButton>
                                                        {/* 
                                                        <div
                                                            className="apply-button"
                                                            data-hackathon-slug="hackoverflow09"
                                                            data-button-theme="dark"
                                                            style={{ height: 44, width: 312, margin: '1rem 0', color: 'white', borderRadius: '8px', backgroundColor: 'black' }}
                                                        ></div> */}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="slider_text_mobile">
                                <div className="container flex flex-wrap flex-column justify-center">
                                    <div className="position_relv flex flex-col gap-2 items-center text-center">
                                        {/* <h3
                                            className="md:mt-5"
                                            style={{
                                                color: '#aaffff',
                                                // textShadow: `
                                                //     0 0 5px #0ff,
                                                //     0 0 10px #0ff,
                                                //     0 0 20px #0ff,
                                                //     0 0 30px #0ff
                                                // `,
                                                fontWeight: 'bold',
                                                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                                                WebkitTextFillColor: '#aaffff',
                                                filter: 'drop-shadow(0 0 10px #0ff)',
                                                marginBottom: '0.5rem'
                                            }}
                                        >
                                            HackOverflow 10.0
                                        </h3> */}
                                        <div style={{ width: '100%', height: '80px', position: 'relative', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                                        <TechText text="HackOverflow 10.0" fontWeight={700} fontSize={56} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                                    </div>
                                        <div style={{ width: '100%', height: '70px', position: 'relative', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                                        <TechText text="Aarohan, 2026" fontWeight={700} fontSize={48} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                                    </div>
                                        <div className="relative flex flex-col flex-wrap gap-4 justify-center mb-5" style={{ marginTop: '1.25rem' }}>
                                            <NeonButton href="https://unstop.com/hackathons/hackoverflow-100-aarohan-nit-durgapur-1766018" tone="apply" fullWidth>Apply</NeonButton>
                                            {/* <div
                                                className="apply-button"
                                                data-hackathon-slug="hackoverflow09"
                                                data-button-theme="light"
                                                style={{ height: 400, width: 312, margin: '1rem 0' }}
                                            ></div> */}
                                            <NeonButton href="https://calendar.google.com/calendar/u/0/r/eventedit?text=HackOverflow+10.0&dates=20261008/20261012" tone="cyan" fullWidth>Add to Calendar</NeonButton>




                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="monocolor-rectangle" style={{ padding: '2rem 0' }}>
                                <div className="mobile-timer flex flex-col items-center text-center"
                                    style={{
                                        marginTop: 'clamp(1.5rem, 4vw, 3rem)',
                                        marginBottom: 'clamp(2rem, 5vw, 3rem)',
                                        paddingLeft: 'clamp(1rem, 3vw, 3rem)',
                                        paddingRight: 'clamp(1rem, 3vw, 3rem)'
                                    }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            padding: '0 1rem',
                                            margin: '0 auto',
                                        }}
                                    >
                                        <div style={{ width: '100%', maxWidth: '700px' }}>
                                            <Timer />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center w-full"
                                        style={{
                                            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                                            marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
                                            maxWidth: '600px'
                                        }}>
                                        <p
                                            className="font-bold text-white"
                                            style={{
                                                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                                marginBottom: '0'
                                            }}
                                        >
                                            Online
                                        </p>
                                        <p
                                            className="font-bold text-white"
                                            style={{
                                                fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                                marginBottom: '0'
                                            }}
                                        >
                                            9th October, 2026
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="p-4 md:p-6"
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        marginTop: 'clamp(1rem, 3vw, 2rem)',
                                        marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)'
                                    }}
                                >
                                    <div style={{ width: '100%', maxWidth: '350px', padding: '0 1.5rem' }}>
                                        {/* <a
                                            href="https://calendar.google.com/calendar/u/0/r/eventedit?text=Hackoverflow+8.0&dates=20250321/20250324"
                                            className="md:my-2 block"
                                            id="register-2"
                                            style={{
                                                display: 'inline-block',
                                                width: '100%',
                                                padding: 'clamp(0.8rem, 2.5vw, 1rem) clamp(1rem, 3vw, 1.5rem)',
                                                color: '#0ff',
                                                border: '2px solid #0ff',
                                                borderRadius: '8px',
                                                textTransform: 'uppercase',
                                                fontWeight: 'bold',
                                                boxShadow: '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff',
                                                transition: '0.3s',
                                                textDecoration: 'none',
                                                fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
                                                textAlign: 'center',
                                                whiteSpace: 'normal',
                                                lineHeight: '1.4',
                                                marginTop: '0.5rem'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.boxShadow = '0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff';
                                                e.target.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.boxShadow = '0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff';
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        >
                                            Add to Calendar
                                        </a> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about_area" style={{ background: 'linear-gradient(180deg, rgba(2,6,17,0.45) 0%, rgba(4,18,40,0.45) 100%)', position: 'relative', overflow: 'hidden' }}>
                    <div className="shape-1 d-none d-xl-block">
                        <img src="img/about/shap1.png" alt style={{ filter: 'drop-shadow(0 0 20px #00ffff)' }} />
                    </div>
                    <div className="shape-2 d-none d-xl-block">
                        <img src="img/about/shap2.png" alt style={{ filter: 'drop-shadow(0 0 20px #ff00ff)' }} />
                    </div>
                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-md-6 slide-in-left">
                                <div className="about_thumb float-animation scanline-effect" style={{
                                    border: '2px solid #00ffff',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    background: 'rgba(0, 255, 255, 0.05)',
                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)'
                                }}>
                                    <img src="img/about/about.png" alt style={{ borderRadius: '15px' }} />
                                </div>
                            </div>
                            <div className="col-xl-5 offset-xl-1 col-md-6 slide-in-right">
                                <div className="about_info">
                                    <div className="section_title">
                                        <span className="sub_heading neon-text" style={{ color: '#00ff88', fontWeight: 'bold' }}>
                                            Welcome To
                                        </span>
                                        <h3 className="neon-text" style={{
                                            color: '#00ffff',
                                            textShadow: '0 0 4px #00ffff, 0 0 8px #00ffff',
                                            marginTop: '20px'
                                        }}>
                                            The Biggest Technical <br />
                                            Fest of the <br />
                                            Year 2026
                                        </h3>
                                    </div>
                                    <p style={{
                                        color: '#b0c4de',
                                        fontSize: '1.1rem',
                                        lineHeight: '1.8',
                                        textShadow: '0 0 5px rgba(176, 196, 222, 0.5)'
                                    }}>
                                        <br />
                                        <br />
                                        Hackoverflow 10.0 is conducted by team
                                        Aavishkar during Aarohan, the second
                                        largest techno-management of Eastern
                                        India!
                                    </p>
                                    <br />
                                    <br />
                                    <br />
                                    <a
                                        href="https://www.instagram.com/arhn.nitd?stkn=MTAyYWFiOHc3MTNkaA=="
                                        className="boxed-btn-red neon-border"
                                        style={{
                                            background: 'linear-gradient(135deg, #866be6ff 0%, #ff0080 100%)',
                                            border: '2px solid #a0c0e5ff',
                                            borderRadius: '8px',
                                            boxShadow: '0 0 20px rgba(255, 0, 255, 0.5)',
                                            transition: 'all 0.3s ease',
                                            color: "white",
                                            textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
                                            fontWeight: "bolder",
                                        }}
                                    >
                                        Learn More about Aarohan
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="speakers_area" style={{ background: 'linear-gradient(180deg, rgba(4,18,40,0.45) 0%, rgba(2,6,17,0.45) 100%)', position: 'relative' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="serction_title_large mb-95">
                                    <h3 className="neon-text" style={{
                                        color: '#afa2ecff',
                                        textShadow: '0 0 4px #ff00ff, 0 0 8px #ff00ff'
                                    }}>Judge</h3>
                                </div>
                            </div>
                        </div>

                        <JudgeCards />
                    </div>
                </div>

                <style>{THEMES_CSS}</style>
                <div className="event_area th-section" style={{ position: 'relative' }}>
                    <div className="th-wrap">
                        <div className="th-head">
                            <h2 className="th-heading">Hackathon Themes</h2>
                            <p className="th-sub">Six tracks, one goal: build technology that solves real problems.</p>
                            <p className="th-hint">Click any card to bring it into focus</p>
                            <div className="th-divider" />
                        </div>
                        <div className="th-grid">
                            {[THEMES[activeTheme], ...THEMES.filter((_, i) => i !== activeTheme)].map((t) => {
                                const isActive = t.title === THEMES[activeTheme].title;
                                const select = () => setActiveTheme(THEMES.findIndex((x) => x.title === t.title));
                                return (
                                    <article
                                        key={t.title}
                                        className={`th-card${isActive ? ' th-featured' : ''}`}
                                        style={{ '--rgb': t.rgb, '--accent': t.color }}
                                        {...(isActive
                                            ? {}
                                            : {
                                                role: 'button',
                                                tabIndex: 0,
                                                'aria-label': `Show ${t.title} theme`,
                                                onClick: select,
                                                onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(); } },
                                            })}
                                    >
                                        <div className="th-icon"><img src={t.img} alt="" /></div>
                                        {isActive && <span className="th-tag">Selected theme</span>}
                                        <h4 className="th-title">{t.title}</h4>
                                        <p className="th-desc">{t.desc}</p>
                                        {!isActive && <span className="th-more">View</span>}
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="resister_book" style={{
                    background: 'linear-gradient(180deg, rgba(4,18,40,0.45) 0%, rgba(2,6,17,0.45) 100%)',
                    position: 'relative',
                    padding: '80px 0',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        opacity: 0.1,
                        background: 'radial-gradient(circle at 20% 50%, #00ffff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ff00ff 0%, transparent 50%)',
                        animation: 'pulse 4s ease-in-out infinite',
                    }}></div>

                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="resister_text text-center">
                                    {/* <h3 className="neon-text" style={{
                                        color: '#00ffff',
                                        // textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
                                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                                        fontWeight: 'bold',
                                        marginBottom: '3rem',
                                        // animation: 'glow 2s ease-in-out infinite alternate'
                                    }}>
                                        Specific Sponsor Track Benefits and Prizes!
                                    </h3> */}
                                    <ul style={{
                                        fontFamily: "Poppins",
                                        listStyle: 'none',
                                        padding: 0
                                    }}>


                                        {/* <li className="fade-in" style={{ animationDelay: '0.1s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(130, 71, 229, 0.1) 0%, rgba(130, 71, 229, 0.05) 100%)',
                                                    border: '2px solid rgba(130, 71, 229, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(130, 71, 229, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(130, 71, 229, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(130, 71, 229, 0.3)';
                                                }}
                                            >
                                                <Link href="https://ethindia2024.devfolio.co">
                                                    <img
                                                        className="mb-10"
                                                        src="/ethindia-light.png"
                                                        alt="ETHINDIA LOGO"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(130, 71, 229, 0.5))',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    />
                                                </Link>
                                                <span style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                                                }}>
                                                    ETHIndia is empowering the Ethereum Community through its various initiatives including hackathons,
                                                    <br />
                                                    fellowships, grants, and more
                                                </span>
                                            </div>
                                        </li> */}

                                        {/* Polygon */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.1s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(130, 71, 229, 0.1) 0%, rgba(130, 71, 229, 0.05) 100%)',
                                                    border: '2px solid rgba(130, 71, 229, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(130, 71, 229, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(130, 71, 229, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(130, 71, 229, 0.3)';
                                                }}
                                            >
                                                <Link href="https://polygon.technology/">
                                                    <img
                                                        className="mb-10"
                                                        src="/Portis_Logo-Colored.png"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(130, 71, 229, 0.5))',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    />
                                                </Link>
                                                <span style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                                                }}>
                                                    <strong style={{ color: '#00ffff' }}>$200</strong> for best hack built on Ethereum + Polygon
                                                    <br />
                                                    <strong style={{ color: '#00ffff' }}>$150</strong> for best hack built on Ethereum
                                                </span>
                                            </div>
                                        </li> */}

                                        {/* Replit */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.2s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.1) 0%, rgba(255, 0, 255, 0.05) 100%)',
                                                    border: '2px solid rgba(255, 0, 255, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 0, 255, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 0, 255, 0.3)';
                                                }}
                                            >
                                                <Link href="https://replit.com/">
                                                    <img
                                                        src="/Replit-light-background.png"
                                                        className="h-20 mb-4"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.5))',
                                                        }}
                                                    />
                                                </Link>
                                                <span style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                                                }}>
                                                    <strong style={{ color: '#ff00ff' }}>$50</strong> for winning Project deployed on Replit
                                                </span>
                                            </div>
                                        </li> */}

                                        {/* Filecoin */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.3s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                                                    border: '2px solid rgba(0, 255, 136, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(0, 255, 136, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 136, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.3)';
                                                }}
                                            >
                                                <Link href="https://filecoin.io">
                                                    <img
                                                        src="/Filecoin.png"
                                                        className="w-45 h-20 mb-6"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(0, 255, 136, 0.5))',
                                                        }}
                                                    />
                                                </Link>
                                                <span style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)'
                                                }}>
                                                    <strong style={{ color: '#00ff88' }}>$250</strong> for best use of Filecoin and/or IPFS
                                                </span>
                                            </div>
                                        </li> */}

                                        {/* Solana */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.4s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%)',
                                                    border: '2px solid rgba(0, 255, 255, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 255, 255, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
                                                }}
                                            >
                                                <Link href="https://solana.com/">
                                                    <img
                                                        src="/Solana-Colored.svg"
                                                        className="w-45 h-10 mb-10"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.5))',
                                                        }}
                                                    />
                                                </Link>
                                                <div style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                    textAlign: 'center'
                                                }}>
                                                    <span>
                                                        <strong style={{ color: '#00ffff' }}>$USDC 100</strong> for the best project beginners just starting out on Solana
                                                    </span>
                                                    <span>
                                                        <strong style={{ color: '#00ffff' }}>$USDC 250</strong> for the best project that goes into depth, demonstrating higher-order code
                                                    </span>
                                                    <span>
                                                        <strong style={{ color: '#00ffff' }}>$USDC 500</strong> for the best advanced project that is almost ready for full-time development
                                                    </span>
                                                </div>
                                            </div>
                                        </li> */}

                                        {/* Digital Ocean */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.5s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(0, 123, 255, 0.1) 0%, rgba(0, 123, 255, 0.05) 100%)',
                                                    border: '2px solid rgba(0, 123, 255, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(0, 123, 255, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(0, 123, 255, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 123, 255, 0.3)';
                                                }}
                                            >
                                                <Link href="https://www.digitalocean.com/">
                                                    <img
                                                        src="/digital_ocean.png"
                                                        className="w-45 h-12 md:h-16 mb-10"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(0, 123, 255, 0.5))',
                                                        }}
                                                    />
                                                </Link>
                                                <div style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                    textAlign: 'center'
                                                }}>
                                                    <span>
                                                        A total of <strong style={{ color: '#007bff' }}>$2,000</strong> in credits to the winning team(s) - these can be distributed only in sums of $100, $125, and $250, per winning team
                                                    </span>
                                                    <span>
                                                        <strong style={{ color: '#007bff' }}>$50</strong>, 30-day free trial for all the attendees
                                                    </span>
                                                </div>
                                            </div>
                                        </li> */}

                                        {/* Wolfram */}
                                        {/* <li className="fade-in" style={{ animationDelay: '0.6s' }}>
                                            <div
                                                className="p-4 flex flex-col items-center justify-around rounded shadow md:w-3/5 md:mx-auto"
                                                style={{
                                                    marginBottom: "25px",
                                                    background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.1) 0%, rgba(255, 69, 0, 0.05) 100%)',
                                                    border: '2px solid rgba(255, 69, 0, 0.4)',
                                                    borderRadius: '20px',
                                                    boxShadow: '0 0 30px rgba(255, 69, 0, 0.3)',
                                                    transition: 'all 0.3s ease',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 69, 0, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                                    e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 69, 0, 0.3)';
                                                }}
                                            >
                                                <Link href="https://www.wolfram.com/">
                                                    <img
                                                        src="/img/wolf.jpg"
                                                        className="w-45 h-20 mb-10"
                                                        style={{
                                                            filter: 'drop-shadow(0 0 10px rgba(255, 69, 0, 0.5))',
                                                            borderRadius: '10px'
                                                        }}
                                                    />
                                                </Link>
                                                <div style={{
                                                    color: '#e0e0ff',
                                                    fontSize: '1.1rem',
                                                    lineHeight: '1.8',
                                                    textShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '10px',
                                                    textAlign: 'center'
                                                }}>
                                                    <span>
                                                        A year of <strong style={{ color: '#ff4500' }}>Wolfram|One Personal Edition</strong> plus a one-year subscription to <strong style={{ color: '#ff4500' }}>Wolfram|Alpha Pro</strong> to all the members of top 10 teams
                                                    </span>
                                                    <span>
                                                        The value of each individual award is <strong style={{ color: '#ff4500' }}>$375.00</strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section with Neon Theme */}
                <div className="faq_area" style={{
                    background: 'linear-gradient(180deg, rgba(2,6,17,0.45) 0%, rgba(4,18,40,0.45) 100%)',
                    position: 'relative',
                    padding: '80px 0',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        opacity: 0.05,
                        background: 'radial-gradient(circle at 50% 50%, #ff00ff 0%, transparent 50%)',
                    }}></div>

                    <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="serction_title_large mb-95 text-center">
                                    <h3 className="neon-text" style={{
                                        color: '#7799e4ff',
                                        // textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
                                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                                        fontWeight: 'bold',
                                        marginBottom: '3rem',
                                        animation: 'glow 2s ease-in-out infinite alternate'
                                    }}>
                                        Frequently Asked Questions
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-12">
                                <AnimatedAccordion
                                    items={FAQ_ITEMS}
                                    type="single"
                                    defaultOpenIndex={0}
                                    accentColor="#7799e4"
                                    titleSize={18}
                                    bodySize={16}
                                    titleColor="#ffffff"
                                    bodyColor="#f4f8ff"
                                    mutedColor="#e6eefc"
                                    borderColor="rgba(119, 153, 228, 0.25)"
                                    rowGap={20}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add CSS animations */}
                <style jsx>{`
            // @keyframes glow {
            //     from {
            //         text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
            //     }
            //     to {
            //         text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor, 0 0 50px currentColor;
            //     }
            // }

            @keyframes pulse {
                0%, 100% {
                    opacity: 0.1;
                }
                50% {
                    opacity: 0.15;
                }
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .fade-in {
                animation: fadeIn 0.6s ease-out forwards;
                opacity: 0;
            }

            .neon-text {
                animation: glow 2s ease-in-out infinite alternate;
            }
        `}</style>

                <Footer />
                </div>
            </div>
        </>
    );
}