'use client';

import { useState, useEffect } from 'react';

const LAUNCH_DATE = new Date('2026-07-31T00:00:00');

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calculate() {
      const now = new Date();
      const diff = LAUNCH_DATE - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    calculate();
    const id = setInterval(calculate, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center countdown-card">
          <span className="text-3xl md:text-4xl font-bold text-white tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs uppercase tracking-widest text-slate-400 font-medium">{label}</span>
    </div>
  );
}

export default function ComingSoon() {
  const timeLeft = useCountdown();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #060d1a;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }

        .page-wrapper {
          min-height: 100vh;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          overflow: hidden;
        }

        /* Atmospheric background orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(30,90,180,0.22) 0%, transparent 70%);
          top: -120px; left: -100px;
        }
        .orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%);
          top: 40%; left: 60%;
        }

        /* Subtle grid overlay */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(30,80,160,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,80,160,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          z-index: 0;
        }

        .content {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* Logo / wordmark */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 3rem;
          animation: fadeUp 0.7s ease both;
        }
        .logo-mark {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #1e5ab4 0%, #0ea5e9 100%);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 20px; font-weight: 800;
          color: white; letter-spacing: -1px;
        }
        .logo-text {
          font-family: 'Syne', sans-serif;
          font-size: 26px; font-weight: 800;
          color: white; letter-spacing: -0.5px;
        }
        .logo-dot {
          color: #0ea5e9;
        }

        /* Badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: rgba(14,165,233,0.1);
          border: 1px solid rgba(14,165,233,0.25);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7dd3fc;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #0ea5e9;
          animation: pulse 2s infinite;
        }

        /* Headline */
        .headline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.4rem, 7vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          text-align: center;
          color: white;
          letter-spacing: -1.5px;
          margin-bottom: 1.25rem;
          animation: fadeUp 0.7s 0.2s ease both;
        }
        .headline-accent {
          background: linear-gradient(90deg, #0ea5e9, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subheadline */
        .subheadline {
          font-size: 1.05rem;
          font-weight: 300;
          color: #94a3b8;
          text-align: center;
          line-height: 1.7;
          max-width: 480px;
          margin-bottom: 3rem;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        /* Countdown */
        .countdown-wrap {
          display: flex;
          gap: 1.25rem;
          margin-bottom: 3rem;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .countdown-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
        }
        .countdown-sep {
          font-family: 'Syne', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #334155;
          align-self: center;
          margin-top: -1.2rem;
        }

        /* Email form */
        .form-wrap {
          width: 100%;
          max-width: 460px;
          margin-bottom: 2.5rem;
          animation: fadeUp 0.7s 0.5s ease both;
        }
        .form-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 0.75rem;
          text-align: center;
        }
        .form-inner {
          display: flex;
          gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 6px 6px 6px 16px;
          transition: border-color 0.2s;
        }
        .form-inner:focus-within {
          border-color: rgba(14,165,233,0.5);
        }
        .form-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: white;
          min-width: 0;
        }
        .form-input::placeholder { color: #475569; }
        .form-btn {
          background: linear-gradient(135deg, #1e5ab4, #0ea5e9);
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: white;
          cursor: pointer;
          white-space: nowrap;
          transition: opacity 0.2s, transform 0.15s;
        }
        .form-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .form-btn:active { transform: scale(0.98); }
        .form-success {
          text-align: center;
          font-size: 13px;
          color: #4ade80;
          margin-top: 0.6rem;
          font-weight: 500;
        }

        /* App store buttons */
        .store-wrap {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 3rem;
          animation: fadeUp 0.7s 0.6s ease both;
        }
        .store-label {
          width: 100%;
          text-align: center;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 0.25rem;
        }
        .store-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: white;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          cursor: not-allowed;
          opacity: 0.7;
        }
        .store-btn:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(14,165,233,0.3);
          transform: translateY(-1px);
        }
        .store-icon { font-size: 22px; line-height: 1; }
        .store-info { display: flex; flex-direction: column; }
        .store-sub { font-size: 10px; color: #64748b; font-weight: 400; letter-spacing: 0.02em; }
        .store-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; }
        .store-soon {
          font-size: 10px;
          padding: 2px 8px;
          background: rgba(14,165,233,0.15);
          border-radius: 999px;
          color: #7dd3fc;
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-left: 4px;
          vertical-align: middle;
        }

        /* Social links */
        .social-wrap {
          display: flex;
          gap: 14px;
          align-items: center;
          animation: fadeUp 0.7s 0.7s ease both;
        }
        .social-label {
          font-size: 11px;
          color: #334155;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .social-link {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #64748b;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .social-link:hover {
          color: #0ea5e9;
          border-color: rgba(14,165,233,0.3);
          transform: translateY(-2px);
        }

        /* Footer */
        .footer {
          position: relative; z-index: 1;
          margin-top: 3rem;
          font-size: 12px;
          color: #1e293b;
          text-align: center;
          animation: fadeUp 0.7s 0.8s ease both;
        }
        .footer a { color: #334155; text-decoration: none; }
        .footer a:hover { color: #0ea5e9; }

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @media (max-width: 480px) {
          .countdown-wrap { gap: 0.75rem; }
          .countdown-unit-box { width: 68px !important; height: 68px !important; }
          .store-wrap { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="page-wrapper">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="grid-overlay" />

        <div className="content">

          {/* Logo */}
          <div className="logo-wrap">
            <div className="logo-mark">R</div>
            <span className="logo-text">rehbar<span className="logo-dot">.io</span></span>
          </div>

          {/* Badge */}
          <div className="badge">
            <span className="badge-dot" />
            Launching July 2026
          </div>

          {/* Headline */}
          <h1 className="headline">
            Your AI guide to<br />
            <span className="headline-accent">Pakistan's top engineering universities</span>
          </h1>

          {/* Subheadline */}
          <p className="subheadline">
            Smart MCQ practice, mock tests, and an AI mentor that explains every wrong answer —
            built for students preparing for NUST, UET, NED, GIKI & PIEAS.
          </p>

          {/* Countdown */}
          <div className="countdown-wrap">
            <CountdownUnit value={timeLeft.days} label="Days" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={timeLeft.hours} label="Hours" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={timeLeft.minutes} label="Minutes" />
            <span className="countdown-sep">:</span>
            <CountdownUnit value={timeLeft.seconds} label="Seconds" />
          </div>

          {/* Email Capture */}
          <div className="form-wrap">
            <label className="form-label">Get early access — notify me on launch</label>
            <form onSubmit={handleSubmit}>
              <div className="form-inner">
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button className="form-btn" type="submit">
                  Notify Me
                </button>
              </div>
            </form>
            {status === 'success' && (
              <p className="form-success">You&apos;re on the list! We&apos;ll notify you at launch.</p>
            )}
          </div>

          {/* App Store Buttons */}
          <div className="store-wrap">
            <p className="store-label">Coming soon on</p>
            <a className="store-btn" href="#" aria-label="Google Play Store">
              <span className="store-icon">▶</span>
              <span className="store-info">
                <span className="store-sub">Get it on</span>
                <span className="store-name">Google Play <span className="store-soon">Soon</span></span>
              </span>
            </a>
            <a className="store-btn" href="#" aria-label="Apple App Store">
              <span className="store-icon"></span>
              <span className="store-info">
                <span className="store-sub">Download on the</span>
                <span className="store-name">App Store <span className="store-soon">Soon</span></span>
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className="social-wrap">
            <span className="social-label">Follow us</span>
            <a
              className="social-link"
              href="https://instagram.com/rehbar.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              IG
            </a>
            <a
              className="social-link"
              href="https://linkedin.com/company/rehbario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a
              className="social-link"
              href="https://twitter.com/rehbario"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
            >
              𝕏
            </a>
          </div>

        </div>

        {/* Footer */}
        <p className="footer">
          © 2026 Rehbar &nbsp;·&nbsp; <a href="mailto:hello@rehbar.io">hello@rehbar.io</a>
        </p>
      </div>
    </>
  );
}