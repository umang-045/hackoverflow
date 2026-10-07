import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import Timer from "../components/Timer";
import Sponsors from "../components/Sponsors";
import ProcessTimeline from "../components/ProcessTimeline";
import AsciiWords from "../components/AsciiWords";
import TechText from "../components/TechText";

const NEON = {
    cyan: {
        color: '#0ff',
        border: '2px solid #0ff',
        textShadow: 'none',
        glow: '#0ff',
    },
    apply: {
        color: 'rgba(255, 255, 255, 1)',
        border: '2px solid rgba(152, 185, 216, 1)',
        textShadow: '0 0 5px rgba(152, 185, 216, 1)',
        glow: '#f0f',
    },
};

// Same neon buttons as the home page
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
                boxShadow: hover
                    ? `0 0 10px ${t.glow}, 0 0 20px ${t.glow}, 0 0 40px ${t.glow}`
                    : `0 0 5px ${t.glow}, 0 0 10px ${t.glow}, 0 0 20px ${t.glow}`,
                transform: hover ? 'scale(1.05)' : 'scale(1)',
            }}
        >
            {children}
        </a>
    );
}

export default function SchedulePage() {
    const [isMobile, setIsMobile] = useState(false);

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
                <link rel="icon" href="/img/IMG-20240307-WA0009.jpg" type="image/jpeg" />

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

  /* Full-page ASCII background */
  .page-ascii-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }
  .page-ascii-bg canvas {
    width: 100% !important;
    height: 100% !important;
    display: block;
  }

  /* Page content sits above the background */
  .page-content {
    position: relative;
    z-index: 1;
  }

  /* Let the page sections show the ASCII bg through */
  .page-content .slider_area,
  .page-content .monocolor-rectangle {
    background: transparent !important;
  }

  /* Centered hero alignment */
  .schedule-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding-top: clamp(2rem, 6vw, 5rem);
  }
  .schedule-hero .cta-row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
`}</style>
            </Head>

            <div style={{ background: '#020611', position: 'relative', minHeight: '100vh' }}>
                {/* ASCII background – fixed, covers the entire page */}
                <div className="page-ascii-bg">
                    <AsciiWords interactive global fontSize={isMobile ? 12 : 14} restAlpha={0.07} />
                </div>

                {/* All page content above the background */}
                <div className="page-content">
                    <Navbar />

                    <div className="slider_area" style={{ position: 'relative', background: 'transparent' }}>
                        {/* Desktop hero */}
                        <div className="slider_text">
                            <div className="container">
                                <div className="schedule-hero">
                                    <div style={{ width: 'min(100%, 640px)', height: '110px', position: 'relative', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                        <TechText text="Event Schedule" fontWeight={700} fontSize={64} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                    </div>

                                    <div className="cta-row" style={{ marginTop: '2rem' }}>
                                        <NeonButton href="https://calendar.google.com/calendar/u/0/r/eventedit?text=HackOverflow+10.0&dates=20261008/20261012" tone="cyan">Add to your Calendar</NeonButton>
                                        <NeonButton href="https://unstop.com/hackathons/hackoverflow-100-aarohan-nit-durgapur-1766018" tone="apply">Apply</NeonButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile hero */}
                        <div className="slider_text_mobile">
                            <div className="container">
                                <div className="schedule-hero">
                                    <div style={{ width: '100%', height: '80px', position: 'relative', filter: 'drop-shadow(0 0 10px #0ff)' }}>
                                        <TechText text="Event Schedule" fontWeight={700} fontSize={56} color="#aaffff" accentColor="#00ffff" reveal="letter" dashLength={4} dashGap={2} specks={15} />
                                    </div>

                                    <div className="cta-row cta-row--stack" style={{ width: '100%', marginTop: '1.5rem', flexDirection: 'column' }}>
                                        <NeonButton href="https://unstop.com/hackathons/hackoverflow-100-aarohan-nit-durgapur-1766018" tone="apply" fullWidth>Apply</NeonButton>
                                        <NeonButton href="https://calendar.google.com/calendar/u/0/r/eventedit?text=HackOverflow+10.0&dates=20261008/20261012" tone="cyan" fullWidth>Add to Calendar</NeonButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timer + date */}
                        <div className="monocolor-rectangle" style={{ padding: '2rem 0', background: 'transparent' }}>
                            <div
                                className="mobile-timer"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    marginTop: 'clamp(1.5rem, 4vw, 3rem)',
                                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                                    paddingLeft: 'clamp(1rem, 3vw, 3rem)',
                                    paddingRight: 'clamp(1rem, 3vw, 3rem)',
                                }}
                            >
                                <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                                    <Timer />
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        width: '100%',
                                        maxWidth: '600px',
                                        gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                                        marginTop: 'clamp(1.5rem, 4vw, 2.5rem)',
                                    }}
                                >
                                    <p
                                        className="font-bold neon-text"
                                        style={{
                                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                            margin: 0,
                                            color: '#00ffff',
                                            textShadow: '0 0 10px #00ffff',
                                        }}
                                    >
                                        Online
                                    </p>
                                    <p
                                        className="font-bold neon-text"
                                        style={{
                                            fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
                                            margin: 0,
                                            color: 'skyblue',
                                            textShadow: '0 0 10px #ff00ff',
                                        }}
                                    >
                                        9th October, 2026
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ProcessTimeline />
                    <Sponsors />
                    <Footer />
                </div>
            </div>
        </>
    );
}