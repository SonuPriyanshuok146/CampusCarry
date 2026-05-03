import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";

/* ── Google Fonts ── */
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap";
function injectFont() {
  if (document.querySelector(`link[href="${FONT_LINK}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_LINK;
  document.head.appendChild(link);
}

/* ── Intersection observer hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ══════════════════════════════════════════════
   FIX 3 — NEW LOGO: clean parcel-with-arrow SVG
   (replaces the old emoji 📦)
══════════════════════════════════════════════ */
function LogoIcon() {
  return (
    <svg
      width="36" height="36" viewBox="0 0 36 36"
      fill="none" xmlns="http://www.w3.org/2000/svg"
      style={styles.logoSvg}
    >
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c63ff" />
          <stop offset="1" stopColor="#00e5ff" />
        </linearGradient>
      </defs>
      {/* Rounded square background */}
      <rect width="36" height="36" rx="10" fill="url(#lg1)" />
      {/* Parcel box body */}
      <rect x="8" y="12" width="20" height="16" rx="2.5" fill="none" stroke="white" strokeWidth="1.8" />
      {/* Horizontal tape */}
      <line x1="8" y1="18" x2="28" y2="18" stroke="white" strokeWidth="1.8" />
      {/* Vertical tape */}
      <line x1="18" y1="12" x2="18" y2="28" stroke="white" strokeWidth="1.8" />
      {/* Centre knot dot */}
      <circle cx="18" cy="18" r="2.2" fill="white" />
      {/* Top-right arrow (dispatch / send) */}
      <polyline points="22,7 27,7 27,12" stroke="white" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="22" y1="12" x2="27" y2="7" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ══════════════════════════════════════════════
   FIX 2 — NEW HERO VISUAL: animated campus
   delivery scene (no live data / dashboard)
══════════════════════════════════════════════ */
function HeroVisual() {
  return (
    <div style={styles.heroVisual}>
      {/* Floating notification pills */}
      <div style={{ ...styles.floatPill, ...styles.fp1 }}>
        <span style={styles.fpDotGreen} />
        <span style={styles.fpText}>Parcel #4829 delivered ✓</span>
      </div>
      <div style={{ ...styles.floatPill, ...styles.fp2 }}>
        <span style={styles.fpDotCyan} />
        <span style={styles.fpText}>Token verified · Hostel B</span>
      </div>

      <svg viewBox="0 0 860 420" xmlns="http://www.w3.org/2000/svg" style={styles.heroSvg}>
        <defs>
          <linearGradient id="bgG"   x1="0" y1="0" x2="860" y2="420" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0d0d1a" /><stop offset="1" stopColor="#0a0a18" />
          </linearGradient>
          <linearGradient id="purpG" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6c63ff" /><stop offset="1" stopColor="#9b59ff" />
          </linearGradient>
          <linearGradient id="cyanG" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#00e5ff" /><stop offset="1" stopColor="#0099cc" />
          </linearGradient>
          <linearGradient id="greenG" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#4ade80" /><stop offset="1" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="roadG" x1="0" y1="0" x2="860" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(108,99,255,0)" />
            <stop offset="0.3" stopColor="rgba(108,99,255,0.35)" />
            <stop offset="0.7" stopColor="rgba(0,229,255,0.35)" />
            <stop offset="1" stopColor="rgba(0,229,255,0)" />
          </linearGradient>
          <radialGradient id="spotP" cx="50%" cy="50%" r="50%">
            <stop stopColor="rgba(108,99,255,0.22)" /><stop offset="1" stopColor="rgba(108,99,255,0)" />
          </radialGradient>
          <radialGradient id="spotC" cx="50%" cy="50%" r="50%">
            <stop stopColor="rgba(0,229,255,0.18)" /><stop offset="1" stopColor="rgba(0,229,255,0)" />
          </radialGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <style>{`
            @keyframes dashRoad  { to { stroke-dashoffset: -40; } }
            @keyframes truckRoll { 0%{transform:translate(75px,196px)} 100%{transform:translate(685px,196px)} }
            @keyframes nodePulse { 0%,100%{r:8;opacity:.75} 50%{r:13;opacity:1} }
            @keyframes ringOut   { 0%{r:10;opacity:.9} 100%{r:44;opacity:0} }
            @keyframes scanLine  { 0%,100%{opacity:0;transform:scaleY(.15)} 50%{opacity:.8;transform:scaleY(1)} }
            @keyframes checkAnim { 0%,55%{stroke-dashoffset:40} 100%{stroke-dashoffset:0} }
            @keyframes dataStr   { 0%{stroke-dashoffset:80;opacity:.15} 50%{opacity:.9} 100%{stroke-dashoffset:0;opacity:.15} }
            @keyframes boxBounce { 0%,100%{transform:translateY(0) rotate(-3deg)} 50%{transform:translateY(-9px) rotate(-3deg)} }
            @keyframes glowP     { 0%,100%{opacity:.5} 50%{opacity:1} }
            .road-dash  { stroke-dasharray:22 10; animation:dashRoad 1s linear infinite; }
            .truck      { animation:truckRoll 5s cubic-bezier(.45,0,.55,1) infinite; }
            .np1 { animation:nodePulse 2.2s ease-in-out infinite; }
            .np2 { animation:nodePulse 2.2s ease-in-out .75s infinite; }
            .np3 { animation:nodePulse 2.2s ease-in-out 1.5s infinite; }
            .r1  { animation:ringOut 2.4s ease-out infinite; }
            .r2  { animation:ringOut 2.4s ease-out .9s infinite; }
            .r3  { animation:ringOut 2.4s ease-out 1.8s infinite; }
            .scan      { animation:scanLine 2s ease-in-out infinite; transform-origin:center top; }
            .chk       { stroke-dasharray:40; animation:checkAnim 1s ease .6s forwards; }
            .ds1 { animation:dataStr 3s ease-in-out infinite; stroke-dasharray:80; }
            .ds2 { animation:dataStr 3s ease-in-out 1s infinite; stroke-dasharray:80; }
            .ds3 { animation:dataStr 3s ease-in-out 2s infinite; stroke-dasharray:80; }
            .boxf { animation:boxBounce 3s ease-in-out infinite; transform-origin:center; }
            .gp   { animation:glowP 3s ease-in-out infinite; }
          `}</style>
        </defs>

        {/* Background */}
        <rect width="860" height="420" fill="url(#bgG)" rx="20" />
        <ellipse cx="215" cy="215" rx="200" ry="130" fill="url(#spotP)" />
        <ellipse cx="645" cy="215" rx="200" ry="130" fill="url(#spotC)" />

        {/* ── ROAD ── */}
        <rect x="80" y="204" width="700" height="22" rx="11"
          fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="80" y1="215" x2="780" y2="215"
          stroke="url(#roadG)" strokeWidth="2.5" className="road-dash" />

        {/* ── NODE 1 — HOSTEL ── */}
        <circle cx="165" cy="215" r="10" fill="none" stroke="rgba(108,99,255,0.6)" strokeWidth="1.2" className="r1" />
        <circle cx="165" cy="215" r="10" fill="none" stroke="rgba(108,99,255,0.3)" strokeWidth="1.2" className="r2" />
        <rect x="130" y="108" width="70" height="82" rx="5"
          fill="rgba(108,99,255,0.1)" stroke="rgba(108,99,255,0.5)" strokeWidth="1.5" />
        <rect x="130" y="108" width="70" height="7" rx="5" fill="url(#purpG)" opacity="0.8" />
        <rect x="140" y="122" width="14" height="12" rx="2" fill="rgba(108,99,255,0.45)" />
        <rect x="162" y="122" width="14" height="12" rx="2" fill="rgba(108,99,255,0.45)" />
        <rect x="184" y="122" width="8"  height="12" rx="2" fill="rgba(108,99,255,0.3)" />
        <rect x="140" y="142" width="14" height="12" rx="2" fill="rgba(108,99,255,0.5)" />
        <rect x="162" y="142" width="14" height="12" rx="2" fill="rgba(108,99,255,0.25)" />
        <rect x="184" y="142" width="8"  height="12" rx="2" fill="rgba(108,99,255,0.45)" />
        <rect x="152" y="165" width="26" height="25" rx="4" fill="rgba(108,99,255,0.55)" />
        <circle cx="174" cy="177" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="165" cy="215" className="np1" fill="url(#purpG)" />
        <line x1="165" y1="190" x2="165" y2="214"
          stroke="rgba(108,99,255,0.7)" strokeWidth="1.8" className="ds1" />
        <text x="165" y="100" textAnchor="middle"
          fill="#a09aff" fontSize="11" fontFamily="DM Sans,sans-serif" fontWeight="700" letterSpacing="1">HOSTEL</text>

        {/* ── FLOATING PARCEL (between hostel & gate) ── */}
        <g className="boxf">
          <rect x="295" y="155" width="32" height="28" rx="4"
            fill="rgba(255,255,255,0.06)" stroke="rgba(108,99,255,0.6)" strokeWidth="1.5" />
          <line x1="295" y1="169" x2="327" y2="169" stroke="rgba(108,99,255,0.5)" strokeWidth="1" />
          <line x1="311" y1="155" x2="311" y2="183" stroke="rgba(108,99,255,0.5)" strokeWidth="1" />
          <rect x="305" y="148" width="12" height="8" rx="2" fill="rgba(108,99,255,0.4)" />
          <circle cx="287" cy="162" r="2" fill="rgba(108,99,255,0.7)" className="gp" />
          <circle cx="340" cy="172" r="1.5" fill="rgba(0,229,255,0.6)" className="gp" style={{animationDelay:"0.5s"}} />
        </g>

        {/* ── NODE 2 — MAIN GATE ── */}
        <circle cx="430" cy="215" r="10" fill="none" stroke="rgba(0,229,255,0.6)" strokeWidth="1.2" className="r1" style={{animationDelay:"0.5s"}} />
        <circle cx="430" cy="215" r="10" fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="1.2" className="r2" style={{animationDelay:"1.4s"}} />
        <rect x="392" y="130" width="16" height="72" rx="3"
          fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.45)" strokeWidth="1.5" />
        <rect x="460" y="130" width="16" height="72" rx="3"
          fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.45)" strokeWidth="1.5" />
        <path d="M392 130 Q430 105 476 130" fill="none" stroke="rgba(0,229,255,0.5)" strokeWidth="1.5" />
        <rect x="408" y="163" width="52" height="6" rx="3" fill="rgba(0,229,255,0.55)" />
        <rect x="410" y="170" width="48" height="30" rx="2" fill="rgba(0,229,255,0.12)" className="scan" />
        <rect x="390" y="126" width="20" height="5" rx="2.5" fill="url(#cyanG)" opacity="0.7" />
        <rect x="458" y="126" width="20" height="5" rx="2.5" fill="url(#cyanG)" opacity="0.7" />
        <circle cx="430" cy="215" className="np2" fill="url(#cyanG)" />
        <line x1="430" y1="192" x2="430" y2="214"
          stroke="rgba(0,229,255,0.7)" strokeWidth="1.8" className="ds2" />
        <text x="430" y="98" textAnchor="middle"
          fill="#00e5ff" fontSize="11" fontFamily="DM Sans,sans-serif" fontWeight="700" letterSpacing="1">MAIN GATE</text>

        {/* ── NODE 3 — GUARD STATION ── */}
        <circle cx="665" cy="215" r="10" fill="none" stroke="rgba(74,222,128,0.6)" strokeWidth="1.2" className="r1" style={{animationDelay:"1s"}} />
        <circle cx="665" cy="215" r="10" fill="none" stroke="rgba(74,222,128,0.3)" strokeWidth="1.2" className="r3" />
        <path d="M665 108 L698 121 L698 162 Q698 186 665 196 Q632 186 632 162 L632 121 Z"
          fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.55)" strokeWidth="1.8" />
        <polyline points="650,154 662,167 682,143"
          fill="none" stroke="#4ade80" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" className="chk" />
        <rect x="640" y="198" width="50" height="14" rx="7"
          fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.35)" strokeWidth="1" />
        <circle cx="665" cy="215" className="np3" fill="url(#greenG)" />
        <line x1="665" y1="212" x2="665" y2="214"
          stroke="rgba(74,222,128,0.7)" strokeWidth="1.8" className="ds3" />
        <text x="665" y="100" textAnchor="middle"
          fill="#4ade80" fontSize="11" fontFamily="DM Sans,sans-serif" fontWeight="700" letterSpacing="1">GUARD STATION</text>

        {/* ── DELIVERY VAN ── */}
        <g className="truck" filter="url(#glow)">
          <rect x="0" y="-2" width="40" height="24" rx="5" fill="rgba(108,99,255,0.92)" />
          <rect x="28" y="2" width="16" height="16" rx="3"
            fill="rgba(108,99,255,0.7)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
          <rect x="30" y="4" width="11" height="9" rx="2" fill="rgba(0,229,255,0.45)" />
          <circle cx="10" cy="22" r="6" fill="#0a0a18" stroke="rgba(108,99,255,0.7)" strokeWidth="1.8" />
          <circle cx="33" cy="22" r="6" fill="#0a0a18" stroke="rgba(108,99,255,0.7)" strokeWidth="1.8" />
          <circle cx="10" cy="22" r="2.5" fill="rgba(108,99,255,0.6)" />
          <circle cx="33" cy="22" r="2.5" fill="rgba(108,99,255,0.6)" />
          {/* Parcel on roof */}
          <rect x="7" y="-16" width="20" height="14" rx="3"
            fill="rgba(255,255,255,0.13)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
          <line x1="7"  y1="-9" x2="27" y2="-9"  stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" />
          <line x1="17" y1="-16" x2="17" y2="-2" stroke="rgba(255,255,255,0.4)" strokeWidth="0.9" />
          {/* Speed lines */}
          <line x1="-6" y1="8"  x2="-18" y2="8"  stroke="rgba(108,99,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="-6" y1="13" x2="-22" y2="13" stroke="rgba(108,99,255,0.2)"  strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Road faint connectors */}
        <line x1="175" y1="215" x2="390" y2="215" stroke="rgba(108,99,255,0.1)" strokeWidth="1" />
        <line x1="478" y1="215" x2="630" y2="215" stroke="rgba(0,229,255,0.1)"  strokeWidth="1" />

        {/* ── STAT BADGES ── */}
        <g filter="url(#glow)">
          <rect x="46" y="28" width="118" height="48" rx="12"
            fill="rgba(13,13,26,0.97)" stroke="rgba(108,99,255,0.45)" strokeWidth="1.2" />
          <rect x="58" y="40" width="16" height="16" rx="4" fill="url(#purpG)" opacity="0.85" />
          <text x="80" y="51" fill="#a09aff" fontSize="9.5" fontFamily="DM Sans,sans-serif" fontWeight="600">TOTAL PARCELS</text>
          <text x="80" y="66" fill="#f0f0ff" fontSize="16" fontFamily="Syne,sans-serif" fontWeight="800">1,284</text>
        </g>
        <g filter="url(#glow)">
          <rect x="368" y="25" width="124" height="48" rx="12"
            fill="rgba(13,13,26,0.97)" stroke="rgba(0,229,255,0.4)" strokeWidth="1.2" />
          <rect x="380" y="37" width="16" height="16" rx="4" fill="url(#cyanG)" opacity="0.85" />
          <text x="402" y="48" fill="#00e5ff" fontSize="9.5" fontFamily="DM Sans,sans-serif" fontWeight="600">VERIFIED TODAY</text>
          <text x="402" y="63" fill="#f0f0ff" fontSize="16" fontFamily="Syne,sans-serif" fontWeight="800">47 / 47</text>
        </g>
        <g filter="url(#glow)">
          <rect x="700" y="28" width="118" height="48" rx="12"
            fill="rgba(13,13,26,0.97)" stroke="rgba(74,222,128,0.4)" strokeWidth="1.2" />
          <rect x="712" y="40" width="16" height="16" rx="4" fill="url(#greenG)" opacity="0.85" />
          <text x="734" y="51" fill="#4ade80" fontSize="9.5" fontFamily="DM Sans,sans-serif" fontWeight="600">DELIVERED</text>
          <text x="734" y="66" fill="#f0f0ff" fontSize="16" fontFamily="Syne,sans-serif" fontWeight="800">100%</text>
        </g>

        {/* ── DECORATIVE BAR CHART ── */}
        <rect x="490" y="272" width="8"  height="53" rx="4" fill="rgba(108,99,255,0.35)" />
        <rect x="504" y="287" width="8"  height="38" rx="4" fill="rgba(108,99,255,0.22)" />
        <rect x="518" y="277" width="8"  height="48" rx="4" fill="rgba(0,229,255,0.35)" />
        <rect x="532" y="292" width="8"  height="33" rx="4" fill="rgba(0,229,255,0.2)" />
        <rect x="546" y="268" width="8"  height="57" rx="4" fill="rgba(74,222,128,0.4)" />
        <rect x="560" y="282" width="8"  height="43" rx="4" fill="rgba(74,222,128,0.22)" />
        <rect x="574" y="262" width="8"  height="63" rx="4" fill="rgba(108,99,255,0.5)" />
        <text x="532" y="342" textAnchor="middle"
          fill="#8888aa" fontSize="9" fontFamily="DM Sans,sans-serif">Delivery Analytics</text>

        {/* ── LEGEND ── */}
        <circle cx="155" cy="302" r="4" fill="rgba(108,99,255,0.8)" />
        <text x="167" y="306" fill="#8888aa" fontSize="10" fontFamily="DM Sans,sans-serif">Student creates request</text>
        <circle cx="155" cy="320" r="4" fill="rgba(0,229,255,0.8)" />
        <text x="167" y="324" fill="#8888aa" fontSize="10" fontFamily="DM Sans,sans-serif">Parcel arrives at gate</text>
        <circle cx="155" cy="338" r="4" fill="rgba(74,222,128,0.8)" />
        <text x="167" y="342" fill="#8888aa" fontSize="10" fontFamily="DM Sans,sans-serif">Guard scans token &amp; verifies</text>
        <circle cx="155" cy="356" r="4" fill="rgba(251,191,36,0.8)" />
        <text x="167" y="360" fill="#8888aa" fontSize="10" fontFamily="DM Sans,sans-serif">Parcel handed over securely ✓</text>

        {/* ── ROLE CHIPS ── */}
        <rect x="620" y="290" width="84" height="24" rx="12"
          fill="rgba(108,99,255,0.14)" stroke="rgba(108,99,255,0.4)" strokeWidth="1" />
        <text x="662" y="306" textAnchor="middle"
          fill="#a09aff" fontSize="10" fontFamily="DM Sans,sans-serif" fontWeight="600">👨‍🎓 Student</text>
        <rect x="620" y="322" width="84" height="24" rx="12"
          fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.35)" strokeWidth="1" />
        <text x="662" y="338" textAnchor="middle"
          fill="#00e5ff" fontSize="10" fontFamily="DM Sans,sans-serif" fontWeight="600">🛡️ Guard</text>
        <rect x="620" y="354" width="84" height="24" rx="12"
          fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.35)" strokeWidth="1" />
        <text x="662" y="370" textAnchor="middle"
          fill="#4ade80" fontSize="10" fontFamily="DM Sans,sans-serif" fontWeight="600">⚙️ Admin</text>

        {/* Watermark */}
        <text x="430" y="400" textAnchor="middle"
          fill="rgba(255,255,255,0.06)" fontSize="11"
          fontFamily="DM Sans,sans-serif" letterSpacing="4">
          END · TO · END · CAMPUS · PARCEL · INTELLIGENCE
        </text>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PARCEL TRACKER
══════════════════════════════════════════════ */
const TRACK_STEPS = [
  { icon: "🏠", label: "Request\nCreated" },
  { icon: "📮", label: "At Main\nGate" },
  { icon: "🛡️", label: "Guard\nVerifies" },
  { icon: "🔐", label: "Token\nScanned" },
  { icon: "✅", label: "Delivered\nSecurely" },
];

function ParcelTracker() {
  const [ref, inView] = useInView(0.4);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const run = () => { setStep(i); i++; if (i <= TRACK_STEPS.length) setTimeout(run, 600); };
    run();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setStep(-1);
      setTimeout(() => {
        let i = 0;
        const run = () => { setStep(i); i++; if (i <= TRACK_STEPS.length) setTimeout(run, 600); };
        run();
      }, 600);
    }, 8000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} style={styles.trackRow}>
      {TRACK_STEPS.map((s, idx) => (
        <div key={idx} style={{ display: "contents" }}>
          <div style={{ ...styles.trackStep, ...(step >= idx ? styles.trackStepShow : {}) }}>
            <div style={{ ...styles.trackCircle, ...(step >= idx ? styles.trackCircleActive : {}) }}>
              {s.icon}
            </div>
            <div style={styles.trackLabel}>
              {s.label.split("\n").map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}
            </div>
          </div>
          {idx < TRACK_STEPS.length - 1 && (
            <div style={styles.trackLine}>
              <div style={{ ...styles.trackLineFill, ...(step > idx ? styles.trackLineFillActive : {}) }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   FEATURE CARD
══════════════════════════════════════════════ */
const FEAT_COLORS = [
  { bg: "rgba(108,99,255,0.15)", line: "linear-gradient(90deg,transparent,#6c63ff,transparent)" },
  { bg: "rgba(0,229,255,0.10)",  line: "linear-gradient(90deg,transparent,#00e5ff,transparent)" },
  { bg: "rgba(74,222,128,0.10)", line: "linear-gradient(90deg,transparent,#4ade80,transparent)" },
  { bg: "rgba(251,191,36,0.10)", line: "linear-gradient(90deg,transparent,#fbbf24,transparent)" },
  { bg: "rgba(248,113,113,0.10)",line: "linear-gradient(90deg,transparent,#f87171,transparent)" },
  { bg: "rgba(96,165,250,0.10)", line: "linear-gradient(90deg,transparent,#60a5fa,transparent)" },
];

function FeatCard({ icon, title, description, colorIdx, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  const col = FEAT_COLORS[colorIdx % FEAT_COLORS.length];
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.featCard,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border-color 0.3s, box-shadow 0.3s`,
        borderColor: hovered ? "rgba(108,99,255,0.4)" : "rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(108,99,255,0.1)" : "none",
      }}
    >
      <div style={{ ...styles.cardLine, background: col.line, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      <div style={{ ...styles.featIconWrap, background: col.bg }}>
        <span style={{ fontSize: "1.6rem" }}>{icon}</span>
      </div>
      <div style={styles.featTitle}>{title}</div>
      <div style={styles.featDesc}>{description}</div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════ */
const FEATURES = [
  { title: "For Students",        description: "Create delivery requests, track your parcels in real-time, and generate pickup tokens securely.", icon: "👨‍🎓" },
  { title: "For Guards",          description: "Verify deliveries, scan tokens, manage handovers, and ensure secure parcel distribution.",        icon: "🛡️" },
  { title: "For Admins",          description: "Monitor all operations, manage users, view analytics, and oversee the entire system.",             icon: "⚙️" },
  { title: "Real-Time Tracking",  description: "Track parcels from submission to delivery with live status updates.",                             icon: "📍" },
  { title: "Secure Verification", description: "Email verification, token-based access, and role-based security controls.",                      icon: "🔒" },
  { title: "Analytics Dashboard", description: "Get insights into delivery patterns, user statistics, and system performance.",                   icon: "📊" },
];

export default function Home() {
  useEffect(() => { injectFont(); }, []);

  return (
    <div style={styles.root}>
      <div style={styles.noise} />
      <div style={styles.grid} />
      <div style={{ ...styles.orb, ...styles.orb1 }} />
      <div style={{ ...styles.orb, ...styles.orb2 }} />
      <div style={{ ...styles.orb, ...styles.orb3 }} />

      {/* ── FIX 1: NAV is position:fixed — stays visible while scrolling ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>
            <LogoIcon />
            <span style={styles.logoText}>CampusCarry</span>
          </div>
          <div style={styles.navBtns}>
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/register"><Button size="sm">Register</Button></Link>
          </div>
        </div>
      </nav>

      {/* Spacer so content isn't hidden under the fixed nav */}
      <div style={{ height: 64 }} />

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroBadge}>
          <span style={styles.badgeDot} />
          Now live on your campus
        </div>
        <h1 style={styles.h1}>
          Smart Campus<br />
          <span style={styles.grad}>Parcel Delivery</span>
        </h1>
        <p style={styles.heroP}>
          Streamline parcel management and student deliveries with our intelligent platform
        </p>
        <div style={styles.heroBtns}>
          <Link to="/register"><Button size="lg">Get Started →</Button></Link>
          <Link to="/login"><Button size="lg" variant="ghost">Sign In</Button></Link>
        </div>
      </section>

      {/* ── FIX 2: ANIMATED CAMPUS ILLUSTRATION (no live dashboard data) ── */}
      <HeroVisual />

      {/* ── PARCEL TRACKER ── */}
      <div style={styles.trackerLabel}>
        <p style={styles.trackerLabelText}>Live Parcel Journey</p>
      </div>
      <ParcelTracker />

      {/* ── SEPARATOR ── */}
      <div style={styles.sep}>
        <div style={styles.sepLine} />
        <span style={styles.sepLabel}>Designed for every role</span>
        <div style={styles.sepLine} />
      </div>

      {/* ── FEATURES ── */}
      <div style={styles.features}>
        {FEATURES.map((f, i) => (
          <FeatCard key={i} icon={f.icon} title={f.title} description={f.description} colorIdx={i} delay={0.05 * (i % 3)} />
        ))}
      </div>

      {/* ── CTA ── */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <h2 style={styles.ctaH2}>Ready to streamline your campus deliveries?</h2>
          <p style={styles.ctaP}>Join as a student, guard, or admin and experience efficient parcel management.</p>
          <div style={styles.ctaBtns}>
            <Link to="/register"><Button size="lg">Create Account →</Button></Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <p style={styles.footerP}>© 2026 CampusCarry. All rights reserved. Smart parcel delivery for modern campuses.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        @keyframes gridPan   { to { background-position: 60px 60px; } }
        @keyframes orbFloat  { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.05)} }
        @keyframes orbFloat2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(30px) scale(.97)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes iconPulse { 0%,100%{box-shadow:0 0 20px rgba(108,99,255,.4)} 50%{box-shadow:0 0 35px rgba(108,99,255,.7)} }
        @keyframes floatA    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatB    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(10px)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════ */
const styles = {
  root: {
    minHeight: "100vh", background: "#09090f", color: "#f0f0ff",
    fontFamily: "'DM Sans', sans-serif", overflowX: "hidden", position: "relative",
  },
  noise: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  },
  grid: {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
    backgroundImage: "linear-gradient(rgba(108,99,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(108,99,255,0.04) 1px,transparent 1px)",
    backgroundSize: "60px 60px",
    animationName: "gridPan", animationDuration: "20s",
    animationTimingFunction: "linear", animationIterationCount: "infinite",
  },
  orb: { position: "fixed", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 },
  orb1: { width: 600, height: 600, background: "radial-gradient(circle,rgba(108,99,255,0.18) 0%,transparent 70%)", top: -200, left: -150, animationName: "orbFloat", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" },
  orb2: { width: 500, height: 500, background: "radial-gradient(circle,rgba(0,229,255,0.10) 0%,transparent 70%)", top: "20%", right: -150, animationName: "orbFloat2", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "3s" },
  orb3: { width: 400, height: 400, background: "radial-gradient(circle,rgba(108,99,255,0.12) 0%,transparent 70%)", bottom: "10%", left: "30%", animationName: "orbFloat", animationDuration: "8s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: "5s" },

  /* FIX 1 — position:fixed pins nav to top at all times */
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(9,9,15,0.85)",
    backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
    animationName: "slideDown", animationDuration: "0.6s",
    animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationFillMode: "both",
  },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoSvg: {
    animationName: "iconPulse", animationDuration: "3s",
    animationTimingFunction: "ease-in-out", animationIterationCount: "infinite",
    borderRadius: 10, display: "block",
  },
  logoText: { fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#f0f0ff", letterSpacing: "-0.02em" },
  navBtns: { display: "flex", gap: 10, alignItems: "center" },

  hero: {
    position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto",
    padding: "80px 24px 60px", textAlign: "center",
    animationName: "fadeUp", animationDuration: "0.7s",
    animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationFillMode: "both",
  },
  heroBadge: {
    display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
    borderRadius: 100, border: "1px solid rgba(108,99,255,0.35)",
    background: "rgba(108,99,255,0.1)", fontSize: "0.8rem", fontWeight: 500,
    color: "#a09aff", marginBottom: 28,
  },
  badgeDot: {
    display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#00e5ff",
    animationName: "blink", animationDuration: "1.5s", animationIterationCount: "infinite",
  },
  h1: {
    fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.8rem,6vw,5.2rem)",
    fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f0f0ff",
  },
  grad: {
    background: "linear-gradient(135deg,#6c63ff 0%,#00e5ff 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
  },
  heroP: { marginTop: 24, fontSize: "1.2rem", color: "#8888aa", maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 },
  heroBtns: { marginTop: 40, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" },

  heroVisual: {
    position: "relative", zIndex: 1, maxWidth: 900, margin: "50px auto 0", padding: "0 24px",
    animationName: "fadeUp", animationDuration: "0.9s",
    animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)", animationDelay: "0.4s", animationFillMode: "both",
  },
  heroSvg: {
    width: "100%", height: "auto", borderRadius: 20,
    border: "1px solid rgba(108,99,255,0.2)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 80px rgba(108,99,255,0.12)",
    display: "block",
  },
  floatPill: {
    position: "absolute", display: "flex", alignItems: "center", gap: 8,
    padding: "10px 16px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(17,17,24,0.9)", backdropFilter: "blur(14px)",
    fontSize: "0.8rem", whiteSpace: "nowrap", boxShadow: "0 8px 30px rgba(0,0,0,0.4)", zIndex: 2,
  },
  fp1: { top: -18, right: 40, animationName: "floatA", animationDuration: "4s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" },
  fp2: { bottom: -18, left: 30, animationName: "floatB", animationDuration: "4s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite" },
  fpDotGreen: { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#4ade80", animationName: "blink", animationDuration: "1.5s", animationIterationCount: "infinite" },
  fpDotCyan:  { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#00e5ff", animationName: "blink", animationDuration: "1.5s", animationIterationCount: "infinite", animationDelay: "0.5s" },
  fpText: { color: "#f0f0ff", fontWeight: 500 },

  trackerLabel: { position: "relative", zIndex: 1, textAlign: "center", marginTop: 70, padding: "0 24px" },
  trackerLabelText: { fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "#8888aa", marginBottom: 28, fontWeight: 600 },
  trackRow: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px 10px", display: "flex", alignItems: "center", justifyContent: "center" },
  trackStep: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1, maxWidth: 160, opacity: 0, transform: "translateY(15px)", transition: "all 0.5s ease" },
  trackStepShow: { opacity: 1, transform: "translateY(0)" },
  trackCircle: { width: 48, height: 48, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", background: "#111118", transition: "all 0.4s" },
  trackCircleActive: { borderColor: "#6c63ff", boxShadow: "0 0 20px rgba(108,99,255,0.4)", background: "rgba(108,99,255,0.12)" },
  trackLabel: { fontSize: "0.73rem", color: "#8888aa", textAlign: "center", fontWeight: 500 },
  trackLine: { flex: 1, height: 2, background: "rgba(255,255,255,0.08)", position: "relative", overflow: "hidden", maxWidth: 80 },
  trackLineFill: { position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", background: "linear-gradient(90deg,#6c63ff,#00e5ff)", transition: "left 0.8s ease" },
  trackLineFillActive: { left: 0 },

  sep: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "70px auto 0", padding: "0 24px", display: "flex", alignItems: "center", gap: 16 },
  sepLine: { flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" },
  sepLabel: { fontSize: "0.75rem", color: "#8888aa", textTransform: "uppercase", letterSpacing: "0.1em", whiteSpace: "nowrap" },

  features: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "50px 24px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 },
  featCard: { borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(17,17,24,0.6)", padding: 28, position: "relative", overflow: "hidden", cursor: "default", backdropFilter: "blur(8px)" },
  cardLine: { position: "absolute", top: 0, left: 0, right: 0, height: 2, borderRadius: "18px 18px 0 0" },
  featIconWrap: { width: 54, height: 54, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 },
  featTitle: { fontFamily: "'Syne',sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "#f0f0ff", marginBottom: 10, letterSpacing: "-0.01em" },
  featDesc: { fontSize: "0.875rem", color: "#8888aa", lineHeight: 1.65 },

  ctaSection: { position: "relative", zIndex: 1, maxWidth: 1200, margin: "10px auto 0", padding: "0 24px 80px" },
  ctaInner: { borderRadius: 24, border: "1px solid rgba(108,99,255,0.3)", background: "rgba(17,17,24,0.8)", padding: "64px 40px", textAlign: "center", position: "relative", overflow: "hidden", backdropFilter: "blur(20px)" },
  ctaH2: { fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#f0f0ff" },
  ctaP: { marginTop: 14, color: "#8888aa", fontSize: "1.05rem", maxWidth: 500, marginLeft: "auto", marginRight: "auto" },
  ctaBtns: { marginTop: 36, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" },

  footer: { position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(17,17,24,0.5)", padding: "32px 24px", textAlign: "center" },
  footerP: { fontSize: "0.85rem", color: "#8888aa" },
};
