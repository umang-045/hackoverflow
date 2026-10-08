import { useEffect, useRef, useState } from "react";

const STYLES = String.raw`
.pt-section {
  --pt-bg: #020611;
  --pt-text: #e8f3ff;
  --pt-muted: #eef4ff;
  --pt-line: rgba(159, 180, 208, 0.25);
  --pt-cyan: #00ffff;
  --pt-magenta: #ff00ff;
  --pt-green: #00ff88;
  background: linear-gradient(180deg, rgba(2,6,17,0.45) 0%, rgba(4,18,40,0.45) 50%, rgba(2,6,17,0.45) 100%);
  padding: 72px 16px 88px;
  overflow: hidden;
}

.pt-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 0;
}

/* The dynamic SVG layer containing the background wave and the lightning wave */
.pt-svg-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

/* Base dashed track */
.pt-path-bg {
  fill: none;
  stroke: var(--pt-line);
  stroke-width: 2px;
  stroke-dasharray: 6 8;
}

/* Glowing lightning track that draws on scroll */
.pt-path-fg {
  fill: none;
  stroke: var(--pt-cyan);
  stroke-width: 4px;
  filter: drop-shadow(0 0 6px var(--pt-cyan)) drop-shadow(0 0 14px var(--pt-cyan));
  /* stroke-dasharray & stroke-dashoffset are managed via React/JS */
  will-change: stroke-dashoffset;
}

.pt-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 50px;
  position: relative;
  z-index: 2;
}

.pt-row:nth-child(odd) {
  flex-direction: row-reverse;
}

.pt-spacer {
  width: 40%;
}

.pt-content {
  width: 40%;
  position: relative;
}

.pt-node {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--pt-bg);
  border: 2px solid var(--pt-line);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
}

.pt-row:nth-child(odd) .pt-node {
  left: 40%; 
}

.pt-row:nth-child(even) .pt-node {
  left: 60%;
}

/* When the lightning scroll hits the row, light up the node */
.pt-row.is-lit .pt-node {
  border-color: #fff;
  background: var(--pt-cyan);
  box-shadow: 0 0 20px 4px rgba(0, 255, 255, 0.8), inset 0 0 8px #fff;
  transform: translate(-50%, -50%) scale(1.2);
}

.pt-item {
  border: 1px solid var(--pt-line);
  border-radius: 14px;
  background: linear-gradient(rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04)), rgba(2, 6, 17, 0.9);
  backdrop-filter: blur(8px);
  padding: 24px;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.pt-row.is-lit .pt-item {
  border-color: rgba(0, 255, 255, 0.4);
  background: linear-gradient(rgba(0, 255, 255, 0.07), rgba(0, 255, 255, 0.07)), rgba(2, 6, 17, 0.9);
}

.pt-row:nth-child(odd) .pt-item {
  text-align: right;
}

.pt-row:nth-child(even) .pt-item {
  text-align: left;
}

.pt-date-badge {
  display: inline-block;
  padding: 4px 14px;
  background: rgba(0, 255, 255, 0.1);
  color: var(--pt-cyan);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.pt-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.pt-row:nth-child(odd) .pt-header {
  flex-direction: row-reverse;
}

.pt-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 255, 0.3);
  object-fit: cover;
  flex-shrink: 0;
}

.pt-title {
  font-weight: 600;
  font-size: 1.15rem;
  color: #ffffff;
  line-height: 1.3;
}

.pt-time {
  color: var(--pt-green);
  font-weight: 600;
  font-size: 0.95rem;
  display: block;
  margin-bottom: 10px;
}

.pt-desc {
  color: var(--pt-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .pt-row, .pt-row:nth-child(odd) {
    flex-direction: column;
    align-items: flex-start;
  }
  .pt-spacer {
    display: none;
  }
  .pt-content {
    width: calc(100% - 60px);
    margin-left: 60px;
  }
  .pt-node, .pt-row:nth-child(odd) .pt-node, .pt-row:nth-child(even) .pt-node {
    left: 24px;
    top: 50%;
  }
  .pt-row:nth-child(odd) .pt-item, .pt-row:nth-child(even) .pt-item {
    text-align: left;
  }
  .pt-row:nth-child(odd) .pt-header {
    flex-direction: row;
  }
}
`;

export const SCHEDULE = [
    {
        date: "8 October, 2026",
        items: [
            { icon: "/idea.png", title: "Application Submission Phase Starts", time: "3:00 PM", desc: "Period for applications starts. Participants can submit the application on Unstop." },
        ],
    },
    {
        date: "10 October, 2026",
        items: [
            { icon: "/idea.png", title: "Application Submission Phase Ends", time: "6:00 AM" },
        ],
    },
    {
        date: "10 October, 2026",
        items: [
          { icon: "/idea.png", title: "Coding Submission Phase  Starts", time: "06:00 AM", desc: "Ready! Set! Go!" },
        ],
    },
    {
        date: "11 October, 2026",
        items: [
            { icon: "/finish-line.png", title: "Coding Submission Phase  Ends", time: "12:00 PM", desc: "Contestants stop the coding and submit their codes for further evaluation process." },
            { icon: "/podium.png", title: "Judges Address", time: "2:00 PM to 5:00 PM", desc: "Few words of motivation from our knowledgeable and experienced judges!" },
            { icon: "/idea.png", title: "Evaluation Starts", time: "2:00 pm", desc: "Each of the top 15 teams will present their projects." },
            { icon: "/podium.png", title: "Evaluation Completes", time: "4:00 pm", desc: "Teams will be evaluated by the judges." },
            { icon: "/finish-line.png", title: "Results are Published", time: "5:00 pm", desc: "Results are published based on the evaluations." },
        ],
    },
];

export default function ProcessTimeline({ days = SCHEDULE }) {
    const wrapRef = useRef(null);
    const pathRef = useRef(null);
    const [pathData, setPathData] = useState("");
    const [pathLength, setPathLength] = useState(0);

    const flatSchedule = days.flatMap(day => 
        day.items.map(item => ({ ...item, date: day.date }))
    );

    // Calculate dynamic node positions to draw the seamless wave
    useEffect(() => {
        const updatePath = () => {
            if (!wrapRef.current) return;
            const container = wrapRef.current;
            const nodes = Array.from(container.querySelectorAll('.pt-node'));
            if (nodes.length < 2) return;

            const rect = container.getBoundingClientRect();
            let d = "";

            nodes.forEach((node, i) => {
                const nRect = node.getBoundingClientRect();
                const x = nRect.left - rect.left + nRect.width / 2;
                const y = nRect.top - rect.top + nRect.height / 2;

                if (i === 0) {
                    d += `M ${x} ${y} `;
                } else {
                    const prevRect = nodes[i - 1].getBoundingClientRect();
                    const prevX = prevRect.left - rect.left + prevRect.width / 2;
                    const prevY = prevRect.top - rect.top + prevRect.height / 2;
                    
                    const dy = y - prevY;
                    
                    // Creates the smooth sine curve linking the alternating points
                    const cp1X = prevX;
                    const cp1Y = prevY + dy / 2;
                    const cp2X = x;
                    const cp2Y = y - dy / 2;

                    d += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${x} ${y} `;
                }
            });

            setPathData(d);
        };

        const resizeObserver = new ResizeObserver(updatePath);
        if (wrapRef.current) resizeObserver.observe(wrapRef.current);

        return () => resizeObserver.disconnect();
    }, [days]);

    // Set the SVG path length so we can animate its offset via stroke-dashoffset
    useEffect(() => {
        if (pathRef.current && pathData) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
            // Hide the glowing line initially
            pathRef.current.style.strokeDasharray = length;
            pathRef.current.style.strokeDashoffset = length;
        }
    }, [pathData]);

    // Handle scroll physics: Lighting up nodes & drawing the lightning line
    useEffect(() => {
        const el = wrapRef.current;
        const fgPath = pathRef.current;
        if (!el) return;

        let rafId;

        const handleScroll = () => {
            rafId = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const vh = window.innerHeight;
                
                // Set the focal point where the line should "touch" as you scroll down
                const triggerPoint = vh * 0.65; 

                // 1. Light up individual rows when they cross the focal point
                el.querySelectorAll('.pt-row').forEach((row) => {
                    const rowRect = row.getBoundingClientRect();
                    // Node center crosses the trigger point
                    if (rowRect.top + (rowRect.height / 2) < triggerPoint) {
                        row.classList.add('is-lit');
                    } else {
                        row.classList.remove('is-lit');
                    }
                });

                // 2. Draw the glowing lightning path proportionally to container scroll
                if (fgPath && pathLength > 0) {
                    // Calculate scroll percentage strictly within the bounds of the container
                    const startDrawY = rect.top; 
                    const maxScrollDistance = rect.height;
                    
                    // Maps how far the trigger point has travelled down the container
                    let scrollProgress = (triggerPoint - startDrawY) / maxScrollDistance;
                    scrollProgress = Math.max(0, Math.min(1, scrollProgress));
                    
                    fgPath.style.strokeDashoffset = pathLength * (1 - scrollProgress);
                }
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Init positions

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [pathLength]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: STYLES }} />
            <section className="pt-section" aria-label="Event schedule">
                <div className="pt-container" ref={wrapRef}>
                    <svg className="pt-svg-wave" aria-hidden="true">
                        <path className="pt-path-bg" d={pathData} />
                        <path className="pt-path-fg" d={pathData} ref={pathRef} />
                    </svg>

                    {flatSchedule.map((event, index) => (
                        <div className="pt-row" key={index}>
                            <div className="pt-spacer"></div>
                            <span className="pt-node" aria-hidden="true" />
                            <div className="pt-content">
                                <div className="pt-item">
                                    <span className="pt-date-badge">{event.date}</span>
                                    <div className="pt-header">
                                        <img src={event.icon} alt="" className="pt-icon" />
                                        <span className="pt-title">{event.title}</span>
                                    </div>
                                    <span className="pt-time">{event.time}</span>
                                    {event.desc && <p className="pt-desc">{event.desc}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}