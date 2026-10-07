import React from "react";
import Link from "next/link";

const Icon = ({ children }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children}
  </svg>
);

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/arhn.nitd/",
    icon: <Icon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></Icon>,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/arhn_nitd",
    icon: <Icon><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></Icon>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arhn.nitd/?hl=en",
    icon: (
      <Icon>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </Icon>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCDRVna-w5uai2Vrcp5WgvSg",
    icon: (
      <Icon>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </Icon>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      className="footer footer_bg_1"
      style={{
        // translucent so the page's ASCII background shows through
        background: "linear-gradient(180deg, rgba(4,18,40,0.55) 0%, rgba(2,6,17,0.9) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .footer {
          border-top: 1px solid rgba(0, 255, 255, 0.3);
          padding-top: 56px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, #ff00ff, #00ff88, transparent);
          animation: scanLine 3s linear infinite;
        }
        /* soft glow at the top edge */
        .footer::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -140px;
          width: 640px;
          height: 280px;
          transform: translateX(-50%);
          background: radial-gradient(ellipse at center, rgba(0, 255, 255, 0.16), transparent 70%);
          pointer-events: none;
        }

        .footer :global(.container) {
          position: relative;
          z-index: 1;
        }

        .footer_grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
          text-align: left;
          color: #e6eefc;
        }

        /* glass panel per column */
        .footer_section {
          padding: 26px 26px 22px;
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(0, 255, 255, 0.07) 0%, rgba(255, 0, 255, 0.04) 100%), rgba(2, 6, 17, 0.55);
          border: 1px solid rgba(0, 255, 255, 0.2);
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .footer_section:hover {
          border-color: rgba(0, 255, 255, 0.5);
          box-shadow: 0 8px 30px rgba(0, 255, 255, 0.14);
          transform: translateY(-3px);
        }

        .footer_title {
          color: #00ffff !important;
          font-weight: 700;
          font-size: 1.3rem;
          letter-spacing: 0.04em;
          margin: 0 0 22px;
          position: relative;
          display: inline-block;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.45);
        }
        .footer_title::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 50%;
          height: 2px;
          background: linear-gradient(90deg, #00ffff, transparent);
          box-shadow: 0 0 10px #00ffff;
        }

        .footer_links ul,
        .footer_links2 ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .footer_links li,
        .footer_links2 li {
          margin: 0;
        }
        .footer_links a,
        .footer_links2 :global(a) {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
          color: #e6eefc;
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease, text-shadow 0.25s ease;
        }
        .footer_links a svg {
          color: #00ffff;
          opacity: 0.85;
          transition: transform 0.25s ease, filter 0.25s ease;
        }
        .footer_links a:hover,
        .footer_links2 :global(a:hover) {
          color: #00ffff;
          text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
          transform: translateX(6px);
        }
        .footer_links a:hover svg {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px #00ffff);
        }
        .footer_links2 :global(a)::before {
          content: "›";
          color: #00ffff;
          font-size: 1.2rem;
          line-height: 1;
        }

        .footer_venue p {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin: 0 0 12px;
          color: #e6eefc;
          line-height: 1.55;
        }
        .footer_venue p svg {
          color: #00ff88;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .footer_bottom {
          text-align: center;
          padding: 24px 0 28px;
          font-size: 0.95rem;
          color: #e6eefc;
          margin-top: 44px;
          position: relative;
        }
        .footer_bottom::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 255, 0.5), rgba(255, 0, 255, 0.4), transparent);
        }
        .footer_logo {
          display: block;
          margin: 10px auto 12px;
          height: 56px;
          filter: drop-shadow(0 0 10px rgba(0, 255, 255, 0.45));
          transition: transform 0.4s ease, filter 0.4s ease;
        }
        .footer_logo:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 0 16px rgba(0, 255, 255, 0.85));
        }
        .footer_bottom p {
          margin: 0;
        }
        .footer_heart {
          display: inline-block;
          color: #ff69b4;
          text-shadow: 0 0 8px rgba(255, 105, 180, 0.7);
          animation: heartbeat 1.5s infinite;
        }

        @media (max-width: 575px) {
          .footer {
            padding-top: 40px;
          }
          .footer_section {
            padding: 22px 20px 18px;
          }
        }
      `}</style>

      <div className="container">
        <div className="footer_grid">
          {/* Follow Us */}
          <div className="footer_section">
            <h3 className="footer_title">Follow Us</h3>
            <div className="footer_links">
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.icon}
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div className="footer_section">
            <h3 className="footer_title">Links</h3>
            <div className="footer_links2">
              <ul>
                <li>
                  <Link href="/schedule">Schedule</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Venue */}
          <div className="footer_section">
            <h3 className="footer_title">Venue</h3>
            <div className="footer_venue">
              <p>
                <Icon>
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </Icon>
                Online (Discord)
              </p>
              <p>
                <Icon>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </Icon>
                National Institute of Technology, Durgapur
              </p>
            </div>
          </div>
        </div>

        <div className="footer_bottom">
          <img src="/logo2026.png" alt="Logo" className="footer_logo" />
          <p>
            Aarohan, {new Date().getFullYear()} | Made with{" "}
            <span className="footer_heart">♥</span> by Team Aavishkar
          </p>
        </div>
      </div>
    </footer>
  );
}