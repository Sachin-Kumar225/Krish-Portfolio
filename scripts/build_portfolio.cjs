const fs = require('fs');
const path = require('path');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_hero_opt.jpg')).toString('base64');
const aboutB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_about_opt.jpg')).toString('base64');
const brandB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_brand_opt.jpg')).toString('base64');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Krish Kumar — Digital Marketer, UI/UX Designer & Creative Strategist</title>
  <meta name="description" content="Personal portfolio of Krish Kumar — Digital Marketer, UI/UX Designer & Creative Strategist. Building digital experiences, modern visual designs and high-impact campaigns." />
  <meta property="og:title" content="Krish Kumar — Portfolio" />
  <meta property="og:description" content="Digital Marketer · UI/UX Designer · Creative Strategist" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#ffffff" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  
  <!-- Three.js r128 pinned from CDN as specified -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <style>
    /* CSS Custom Properties as specified */
    :root {
      --bg: #FFFFFF;
      --bg2: #F7F7F7;
      --ink: #111111;
      --sub: #666666;
      --line: #D9D9D9;
      --line-light: rgba(0, 0, 0, 0.08);
      --font-main: 'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-display: 'Space Grotesk', 'Manrope', sans-serif;
      --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --radius-sm: 8px;
      --radius-md: 14px;
      --radius-lg: 20px;
      --radius-pill: 9999px;
      --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
      --shadow-card: 0 12px 32px -8px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03);
      --shadow-hover: 0 24px 48px -12px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.05);
      --shadow-float: 0 16px 36px rgba(0, 0, 0, 0.1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
      background-color: var(--bg);
      color: var(--ink);
      font-family: var(--font-main);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    body {
      background-color: var(--bg);
      color: var(--ink);
      font-size: 16px;
      line-height: 1.6;
      overflow-x: hidden;
      position: relative;
      min-height: 100vh;
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }

    /* Page-wide Subtle SVG feTurbulence Grain Overlay (opacity ~0.035, mix-blend-mode: multiply, position: fixed) */
    .grain-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 999;
      opacity: 0.035;
      mix-blend-mode: multiply;
    }

    /* Typography */
    h1, h2, h3, h4, .font-display {
      font-family: var(--font-main);
      font-weight: 700;
      letter-spacing: -0.03em;
      color: var(--ink);
      text-wrap: balance;
    }

    p {
      color: var(--sub);
      font-weight: 400;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    /* Magnetic CTA Buttons */
    .magnetic {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      cursor: pointer;
      user-select: none;
      transition: transform 0.22s var(--ease-out-expo), box-shadow 0.22s var(--ease-out-expo), background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
      will-change: transform;
    }

    .btn {
      font-family: var(--font-main);
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.01em;
      padding: 12px 24px;
      border-radius: var(--radius-pill);
      white-space: nowrap;
      text-decoration: none;
      gap: 8px;
    }

    .btn-dark {
      background: var(--ink);
      color: #FFFFFF;
      border: 1px solid var(--ink);
      box-shadow: 0 4px 14px rgba(17, 17, 17, 0.15);
    }

    .btn-dark:hover {
      background: #2a2a2a;
      box-shadow: 0 8px 24px rgba(17, 17, 17, 0.22);
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: var(--ink);
      border: 1px solid var(--line);
    }

    .btn-outline:hover {
      border-color: var(--ink);
      background: rgba(0, 0, 0, 0.03);
      transform: translateY(-1px);
    }

    /* Section Tag */
    .section-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--sub);
      margin-bottom: 12px;
    }

    .section-tag::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      background: var(--ink);
      border-radius: 50%;
    }

    .section-title {
      font-size: clamp(28px, 4.5vw, 48px);
      line-height: 1.15;
      font-weight: 700;
      margin-bottom: 24px;
    }

    /* Scroll Reveal Animation: translateY(28px), opacity: 0 -> visible */
    .reveal-item {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.75s var(--ease-out-expo), transform 0.75s var(--ease-out-expo);
      will-change: opacity, transform;
    }

    .reveal-item.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* Fixed Glass Nav Bar with Blur */
    nav.fixed-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 max(24px, env(safe-area-inset-left)) 0 max(24px, env(safe-area-inset-right));
      z-index: 100;
      background: rgba(255, 255, 255, 0.82);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.3s ease, background 0.3s ease, height 0.3s ease;
    }

    nav.fixed-nav.scrolled {
      border-bottom-color: var(--line);
      background: rgba(255, 255, 255, 0.94);
    }

    .nav-logo {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 32px;
      list-style: none;
    }

    .nav-links a {
      font-size: 14px;
      font-weight: 500;
      color: var(--sub);
      transition: color 0.2s ease;
      position: relative;
    }

    .nav-links a:hover {
      color: var(--ink);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0%;
      height: 1.5px;
      background: var(--ink);
      transition: width 0.25s var(--ease-out-expo);
    }

    .nav-links a:hover::after {
      width: 100%;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      color: var(--ink);
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed;
      top: 72px;
      left: 0;
      width: 100%;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--line);
      padding: 24px;
      display: none;
      flex-direction: column;
      gap: 16px;
      z-index: 99;
      transform: translateY(-20px);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .mobile-drawer.open {
      display: flex;
      transform: translateY(0);
      opacity: 1;
    }

    .mobile-drawer a {
      font-size: 17px;
      font-weight: 600;
      color: var(--ink);
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
    }

    /* Layout Containers */
    .container {
      width: 100%;
      max-width: 1220px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
    }

    section {
      position: relative;
      padding: 110px 0;
    }

    .bg2 {
      background-color: var(--bg2);
    }

    /* Decorative 3D-Styled CSS Shapes scattered with radial glossy highlights + inset/drop shadows */
    .deco-shape {
      position: absolute;
      pointer-events: none;
      z-index: 1;
      will-change: transform;
    }

    /* 3D Ring */
    .shape-ring {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(220,220,225,0.4) 60%, rgba(180,180,190,0.6) 100%);
      border: 10px solid #FFFFFF;
      box-shadow: 
        0 16px 32px rgba(0, 0, 0, 0.08),
        inset 0 3px 6px rgba(255, 255, 255, 0.9),
        inset 0 -4px 8px rgba(0, 0, 0, 0.12);
    }

    /* 3D Morphing Blob */
    .shape-blob {
      width: 110px;
      height: 110px;
      border-radius: 60% 40% 50% 50% / 40% 50% 50% 60%;
      background: radial-gradient(circle at 30% 30%, #FFFFFF 0%, #ECECEC 45%, #D4D4D8 100%);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.07),
        inset 0 6px 12px rgba(255, 255, 255, 0.95),
        inset 0 -8px 16px rgba(0, 0, 0, 0.15);
      animation: morphBlob 14s ease-in-out infinite alternate;
    }

    @keyframes morphBlob {
      0% { border-radius: 60% 40% 50% 50% / 40% 50% 50% 60%; }
      50% { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; }
      100% { border-radius: 50% 50% 40% 60% / 40% 60% 50% 50%; }
    }

    /* 3D Tumbling Cube */
    .shape-cube-wrap {
      width: 60px;
      height: 60px;
      perspective: 300px;
    }

    .shape-cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      animation: cubeTumble 18s linear infinite;
    }

    .cube-face {
      position: absolute;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(230, 230, 235, 0.8));
      border: 1px solid rgba(255, 255, 255, 0.9);
      box-shadow: inset 0 2px 5px rgba(255, 255, 255, 0.8), inset 0 -2px 6px rgba(0,0,0,0.08);
      border-radius: 8px;
    }

    .face-front  { transform: rotateY(0deg) translateZ(30px); }
    .face-back   { transform: rotateY(180deg) translateZ(30px); }
    .face-right  { transform: rotateY(90deg) translateZ(30px); background: #E5E5EA; }
    .face-left   { transform: rotateY(-90deg) translateZ(30px); background: #DCDCDE; }
    .face-top    { transform: rotateX(90deg) translateZ(30px); background: #F8F8FA; }
    .face-bottom { transform: rotateX(-90deg) translateZ(30px); background: #C8C8CC; }

    @keyframes cubeTumble {
      0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
      100% { transform: rotateX(360deg) rotateY(720deg) rotateZ(360deg); }
    }

    /* HERO SECTION */
    #hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      padding-top: 100px;
      padding-bottom: 60px;
      overflow: hidden;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: 60px;
      position: relative;
      z-index: 2;
    }

    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--sub);
      background: rgba(0, 0, 0, 0.04);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-bottom: 24px;
    }

    .hero-eyebrow span.dot {
      width: 6px;
      height: 6px;
      background: #10B981;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    }

    .hero-title {
      font-size: clamp(38px, 6vw, 68px);
      line-height: 1.08;
      font-weight: 800;
      letter-spacing: -0.04em;
      margin-bottom: 18px;
      color: var(--ink);
    }

    .hero-subrole {
      font-size: clamp(17px, 2.2vw, 22px);
      font-weight: 600;
      color: var(--ink);
      letter-spacing: -0.01em;
      margin-bottom: 20px;
    }

    .hero-intro {
      font-size: 17px;
      line-height: 1.65;
      color: var(--sub);
      max-width: 520px;
      margin-bottom: 36px;
    }

    .hero-ctas {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    /* Hero Right Visual Stack */
    .hero-visual-wrapper {
      position: relative;
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
      perspective: 1200px;
    }

    /* Three.js Canvas Container behind/around portrait */
    .three-canvas-container {
      position: absolute;
      top: -15%;
      left: -15%;
      width: 130%;
      height: 130%;
      z-index: 1;
      pointer-events: none;
    }

    .three-canvas-container canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    /* Hero Portrait Tilt Container */
    .portrait-card {
      position: relative;
      z-index: 2;
      border-radius: 28px;
      overflow: hidden;
      background: #FFFFFF;
      box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.16), 0 10px 24px -6px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.8);
      transform-style: preserve-3d;
      transition: transform 0.15s ease-out;
      will-change: transform;
    }

    .portrait-card img {
      width: 100%;
      height: auto;
      aspect-ratio: 3 / 4;
      object-fit: cover;
      display: block;
      transition: transform 0.6s var(--ease-out-expo);
    }

    /* Floating Glassmorphic Label Cards */
    .hero-tag-wrap {
      position: absolute;
      z-index: 4;
      pointer-events: auto;
      will-change: transform;
    }

    .glass-pill {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.95);
      box-shadow: var(--shadow-float);
      padding: 10px 18px;
      border-radius: var(--radius-pill);
      font-size: 13px;
      font-weight: 700;
      color: var(--ink);
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* Keyframe Float animations on inner elements */
    .float-anim-1 {
      animation: floatMotion1 5.5s ease-in-out infinite alternate;
    }
    .float-anim-2 {
      animation: floatMotion2 6.8s ease-in-out infinite alternate;
    }
    .float-anim-3 {
      animation: floatMotion3 6.2s ease-in-out infinite alternate;
    }

    @keyframes floatMotion1 {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-14px) rotate(1.5deg); }
    }
    @keyframes floatMotion2 {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-18px) rotate(-2deg); }
    }
    @keyframes floatMotion3 {
      0% { transform: translateY(0px) rotate(0deg); }
      100% { transform: translateY(-12px) rotate(1deg); }
    }

    /* Specific Tag Positions */
    .hero-tag-1 {
      top: 10%;
      left: -30px;
    }
    .hero-tag-2 {
      bottom: 22%;
      right: -35px;
    }
    .hero-tag-3 {
      top: 50%;
      left: -20px;
    }

    /* Small CSS-3D Accent shapes with slow spin animation */
    .hero-accent-circle {
      position: absolute;
      top: -15px;
      right: 20px;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #FFFFFF, #E2E2E6 65%, #C2C2CB);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1), inset 0 2px 4px #FFFFFF;
      animation: spinAccent 10s linear infinite;
      z-index: 3;
    }

    .hero-accent-square {
      position: absolute;
      bottom: -15px;
      left: 30px;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      background: radial-gradient(circle at 30% 30%, #FFFFFF, #E5E5E8 65%, #B8B8C2);
      box-shadow: 0 10px 20px rgba(0,0,0,0.12), inset 0 2px 4px #FFFFFF;
      animation: spinAccentReverse 14s linear infinite;
      z-index: 3;
    }

    @keyframes spinAccent {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes spinAccentReverse {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    /* Bottom-center Scroll Cue */
    .hero-scroll-cue {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--sub);
      z-index: 5;
    }

    .scroll-indicator-line {
      width: 1.5px;
      height: 28px;
      background: var(--line);
      position: relative;
      overflow: hidden;
      border-radius: 2px;
    }

    .scroll-indicator-line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 40%;
      background: var(--ink);
      animation: scrollPulse 1.8s cubic-bezier(0.65, 0, 0.35, 1) infinite;
    }

    @keyframes scrollPulse {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(300%); }
    }

    /* MARQUEE STRIP (full-bleed, border-top/bottom, bg2 background) */
    .marquee-strip {
      width: 100%;
      overflow: hidden;
      background: var(--bg2);
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      padding: 22px 0;
      white-space: nowrap;
      position: relative;
      user-select: none;
    }

    .marquee-track {
      display: inline-flex;
      animation: marqueeScroll 28s linear infinite;
      will-change: transform;
    }

    .marquee-content {
      display: inline-flex;
      align-items: center;
      gap: 32px;
      padding-right: 32px;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.04em;
      color: var(--ink);
      text-transform: uppercase;
    }

    .marquee-content span.glyph {
      color: var(--sub);
      font-size: 14px;
    }

    @keyframes marqueeScroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* ABOUT SECTION (#about) */
    .about-grid {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 64px;
      align-items: center;
    }

    .about-photo-wrapper {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-card);
      border: 1px solid var(--line-light);
    }

    .about-photo-wrapper img {
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 3;
      object-fit: cover;
      display: block;
    }

    .about-lead {
      font-size: 20px;
      line-height: 1.55;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 18px;
    }

    .about-body {
      font-size: 16px;
      line-height: 1.7;
      color: var(--sub);
      margin-bottom: 32px;
    }

    /* Pill tags below About */
    .about-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .about-pill {
      font-size: 13px;
      font-weight: 600;
      color: var(--ink);
      background: var(--bg2);
      border: 1px solid var(--line);
      padding: 8px 16px;
      border-radius: var(--radius-pill);
      transition: all 0.2s ease;
    }

    .about-pill:hover {
      background: var(--ink);
      color: #FFFFFF;
      border-color: var(--ink);
      transform: translateY(-2px);
    }

    /* SKILLS SECTION (#skills, bg2 background) */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .skill-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 24px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s var(--ease-out-expo), border-color 0.2s ease;
      cursor: default;
      will-change: transform;
    }

    .skill-card:hover {
      box-shadow: var(--shadow-hover);
      border-color: rgba(0,0,0,0.2);
    }

    .skill-icon-wrap {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: var(--bg2);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      font-size: 20px;
      border: 1px solid var(--line-light);
    }

    .skill-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 6px;
    }

    .skill-desc {
      font-size: 13px;
      color: var(--sub);
      line-height: 1.5;
    }

    /* SELECTED WORK SECTION (#work) */
    .work-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 32px;
    }

    .project-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo);
      cursor: pointer;
    }

    .project-card:hover {
      transform: translateY(-6px);
      box-shadow: var(--shadow-hover);
    }

    .project-visual {
      height: 220px;
      background: linear-gradient(135deg, #F8F8FA 0%, #EBEBED 100%);
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-bottom: 1px solid var(--line-light);
    }

    .project-num-faint {
      position: absolute;
      right: 20px;
      bottom: -15px;
      font-size: 120px;
      font-weight: 800;
      color: rgba(0, 0, 0, 0.04);
      font-family: var(--font-display);
      user-select: none;
      line-height: 1;
    }

    .project-preview-mockup {
      width: 82%;
      height: 82%;
      background: #FFFFFF;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      padding: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 2;
      transition: transform 0.3s var(--ease-out-expo);
    }

    .project-card:hover .project-preview-mockup {
      transform: scale(1.03);
    }

    .mockup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .mockup-dots {
      display: flex;
      gap: 5px;
    }

    .mockup-dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #E5E5E7;
    }

    .mockup-badge {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--sub);
      background: var(--bg2);
      padding: 3px 8px;
      border-radius: 4px;
    }

    .mockup-content-bars {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .mockup-bar {
      height: 8px;
      border-radius: 4px;
      background: #F0F0F2;
    }

    .mockup-bar.w-70 { width: 70%; }
    .mockup-bar.w-90 { width: 90%; }
    .mockup-bar.w-40 { width: 40%; background: var(--ink); opacity: 0.7; }

    .project-body {
      padding: 28px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .project-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 10px;
    }

    .project-desc {
      font-size: 14px;
      line-height: 1.6;
      color: var(--sub);
      margin-bottom: 20px;
      flex-grow: 1;
    }

    .project-tools {
      font-size: 12px;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-tools-label {
      color: var(--sub);
      font-weight: 500;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      font-weight: 700;
      color: var(--ink);
      transition: gap 0.2s ease;
      align-self: flex-start;
    }

    .project-card:hover .project-link {
      gap: 10px;
    }

    /* CERTIFICATES SECTION (#certificates) */
    .certificates-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .certificate-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 24px;
      display: flex;
      flex-direction: column;
      transition: transform 0.28s var(--ease-out-expo), box-shadow 0.28s var(--ease-out-expo);
      cursor: pointer;
    }

    .certificate-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
    }

    .cert-badge-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #FFFFFF, #EAEAEA 70%, #D5D5DB 100%);
      box-shadow: 0 4px 10px rgba(0,0,0,0.08), inset 0 2px 4px #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--ink);
      font-size: 16px;
      margin-bottom: 20px;
      border: 1px solid rgba(255,255,255,0.8);
    }

    .cert-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
      line-height: 1.35;
      margin-bottom: 12px;
      flex-grow: 1;
    }

    .cert-meta {
      font-size: 13px;
      color: var(--sub);
      margin-bottom: 18px;
    }

    .cert-link {
      font-size: 13px;
      font-weight: 700;
      color: var(--ink);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: gap 0.2s ease;
    }

    .certificate-card:hover .cert-link {
      gap: 8px;
    }

    /* WORK PROCESS SECTION (#process, bg2 background) */
    .process-timeline {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 16px;
      margin-top: 40px;
    }

    .process-step {
      background: #FFFFFF;
      border-top: 3px solid var(--line);
      border-radius: 0 0 var(--radius-sm) var(--radius-sm);
      padding: 24px 16px;
      transition: border-color 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo), box-shadow 0.4s var(--ease-out-expo);
      box-shadow: var(--shadow-sm);
    }

    /* Process step gained dark top border + slight lift when scrolled into view */
    .process-step.is-active {
      border-top-color: var(--ink);
      transform: translateY(-6px);
      box-shadow: var(--shadow-card);
    }

    .process-step-num {
      font-size: 14px;
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--sub);
      margin-bottom: 12px;
      transition: color 0.3s ease;
    }

    .process-step.is-active .process-step-num {
      color: var(--ink);
    }

    .process-step-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .process-step-desc {
      font-size: 13px;
      line-height: 1.5;
      color: var(--sub);
    }

    /* PERSONAL BRAND SECTION (#brand) */
    .brand-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 60px;
      align-items: center;
    }

    .brand-headline {
      font-size: clamp(32px, 4.8vw, 56px);
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.03em;
      margin-bottom: 36px;
    }

    .brand-headline span {
      display: block;
    }

    .keyword-cloud {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      max-width: 520px;
    }

    .keyword-chip {
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 10px 20px;
      border-radius: var(--radius-pill);
      background: #FFFFFF;
      border: 1px solid var(--line);
      box-shadow: var(--shadow-sm);
      color: var(--ink);
      transition: all 0.25s ease;
      will-change: transform;
    }

    .keyword-chip:hover {
      background: var(--ink);
      color: #FFFFFF;
      border-color: var(--ink);
      transform: scale(1.06) !important;
    }

    /* Staggered floaty keyframe animation for keyword cloud chips */
    .chip-1 { animation: floatMotion1 5s ease-in-out infinite alternate; animation-delay: 0s; }
    .chip-2 { animation: floatMotion2 6s ease-in-out infinite alternate; animation-delay: 0.6s; }
    .chip-3 { animation: floatMotion3 5.5s ease-in-out infinite alternate; animation-delay: 1.2s; }
    .chip-4 { animation: floatMotion1 6.5s ease-in-out infinite alternate; animation-delay: 1.8s; }
    .chip-5 { animation: floatMotion2 5.8s ease-in-out infinite alternate; animation-delay: 2.4s; }
    .chip-6 { animation: floatMotion3 6.2s ease-in-out infinite alternate; animation-delay: 3s; }

    .brand-circle-frame {
      width: 320px;
      height: 320px;
      border-radius: 50%;
      border: 4px solid #FFFFFF;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255,255,255,0.8);
      overflow: hidden;
      margin: 0 auto;
      position: relative;
    }

    .brand-circle-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(15%);
      transition: filter 0.4s ease, transform 0.4s var(--ease-out-expo);
    }

    .brand-circle-frame:hover img {
      filter: grayscale(0%);
      transform: scale(1.04);
    }

    /* CONTACT SECTION (#contact, centered) */
    #contact {
      text-align: center;
      padding: 120px 0;
    }

    .contact-container {
      max-width: 680px;
      margin: 0 auto;
    }

    .contact-headline {
      font-size: clamp(32px, 5vw, 54px);
      line-height: 1.15;
      font-weight: 800;
      margin-bottom: 16px;
    }

    .contact-subline {
      font-size: 18px;
      color: var(--sub);
      margin-bottom: 40px;
    }

    .contact-buttons {
      display: flex;
      justify-content: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    /* Quick Interactive Modal for Project/Certificates inspection */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(8px);
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .modal-overlay.active {
      display: flex;
      opacity: 1;
    }

    .modal-box {
      background: #FFFFFF;
      border-radius: var(--radius-lg);
      max-width: 580px;
      width: 100%;
      padding: 36px;
      box-shadow: 0 30px 70px rgba(0, 0, 0, 0.2);
      border: 1px solid var(--line);
      position: relative;
      transform: translateY(20px);
      transition: transform 0.3s var(--ease-out-expo);
    }

    .modal-overlay.active .modal-box {
      transform: translateY(0);
    }

    .modal-close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--bg2);
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--ink);
      transition: background 0.2s ease;
    }

    .modal-close-btn:hover {
      background: var(--line);
    }

    /* FOOTER */
    footer {
      border-top: 1px solid var(--line);
      padding: 36px 0;
      font-size: 14px;
      color: var(--sub);
      background: var(--bg);
    }

    .footer-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .back-to-top {
      font-size: 13px;
      font-weight: 600;
      color: var(--ink);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: transform 0.2s ease;
    }

    .back-to-top:hover {
      transform: translateY(-2px);
    }

    /* RESPONSIVE BREAKPOINTS */
    @media (max-width: 1024px) {
      .skills-grid {
        grid-template-columns: repeat(3, 1fr);
      }
      .certificates-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .process-timeline {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 900px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 48px;
        text-align: left;
      }
      .hero-visual-wrapper {
        max-width: 360px;
      }
      .about-grid {
        grid-template-columns: 1fr;
        gap: 40px;
      }
      .brand-grid {
        grid-template-columns: 1fr;
        gap: 48px;
      }
      .brand-circle-frame {
        width: 260px;
        height: 260px;
      }
      .work-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 700px) {
      .nav-links, .nav-actions .btn {
        display: none;
      }
      .mobile-menu-btn {
        display: block;
      }
      .skills-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .certificates-grid {
        grid-template-columns: 1fr;
      }
      .process-timeline {
        grid-template-columns: 1fr;
      }
      .hero-tag-1 {
        left: 0;
      }
      .hero-tag-2 {
        right: 0;
      }
      .hero-tag-3 {
        left: 10px;
      }
    }

    @media (max-width: 520px) {
      .skills-grid {
        grid-template-columns: 1fr;
      }
      .hero-title {
        font-size: 34px;
      }
      .hero-ctas {
        width: 100%;
      }
      .hero-ctas .btn {
        width: 100%;
      }
      .contact-buttons .btn {
        width: 100%;
      }
    }
  </style>

  <!-- Schema.org Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Krish Kumar",
    "jobTitle": "Digital Marketer, UI/UX Designer, Creative Strategist",
    "url": "https://krishkumar.design",
    "sameAs": [
      "https://linkedin.com",
      "https://instagram.com"
    ],
    "knowsAbout": [
      "Digital Marketing",
      "UI/UX Design",
      "Brand Strategy",
      "Performance Marketing",
      "Figma",
      "AI-Powered Creativity"
    ]
  }
  </script>
</head>
<body>

  <!-- Subtle SVG feTurbulence Grain Overlay (opacity ~0.035, mix-blend-mode: multiply, position:fixed) -->
  <svg class="grain-overlay" aria-hidden="true">
    <filter id="grainFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grainFilter)" />
  </svg>

  <!-- FIXED GLASS NAV BAR -->
  <nav class="fixed-nav" id="mainNav">
    <a href="#hero" class="nav-logo">Krish Kumar</a>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#certificates">Certificates</a></li>
      <li><a href="#process">Process</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div class="nav-actions">
      <a href="#contact" class="btn btn-dark magnetic">Let's Talk</a>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle Navigation Menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>
  </nav>

  <!-- Mobile Drawer Menu -->
  <div class="mobile-drawer" id="mobileDrawer">
    <a href="#about" class="mobile-nav-link">About</a>
    <a href="#skills" class="mobile-nav-link">Skills</a>
    <a href="#work" class="mobile-nav-link">Work</a>
    <a href="#certificates" class="mobile-nav-link">Certificates</a>
    <a href="#process" class="mobile-nav-link">Process</a>
    <a href="#contact" class="mobile-nav-link">Contact</a>
    <a href="#contact" class="btn btn-dark mobile-nav-link" style="margin-top: 12px; text-align: center;">Let's Talk</a>
  </div>

  <!-- HERO SECTION -->
  <header id="hero">
    <!-- Decorative 3D Parallax Shapes in Hero -->
    <div class="deco-shape shape-ring" data-speed="0.25" style="top: 15%; left: 4%;"></div>
    <div class="deco-shape shape-blob" data-speed="-0.18" style="bottom: 12%; left: 8%;"></div>

    <div class="container">
      <div class="hero-grid">
        <!-- Hero Text -->
        <div class="hero-text-content reveal-item">
          <div class="hero-eyebrow">
            <span class="dot"></span>
            Portfolio 2026
          </div>
          <h1 class="hero-title">Hi, I'm Krish Kumar.</h1>
          <div class="hero-subrole">Digital Marketer · UI/UX Designer · Creative Strategist</div>
          <p class="hero-intro">
            I create digital experiences, marketing strategies and modern visual designs that connect brands with people.
          </p>
          <div class="hero-ctas">
            <a href="#work" class="btn btn-dark magnetic">View My Work</a>
            <a href="#contact" class="btn btn-outline magnetic">Let's Connect</a>
          </div>
        </div>

        <!-- Hero Visual Stack -->
        <div class="hero-visual-wrapper reveal-item" id="heroVisualWrapper">
          <!-- WebGL Three.js Scene Container -->
          <div class="three-canvas-container" id="threeCanvasContainer"></div>

          <!-- Mouse-Tilt Portrait Card -->
          <div class="portrait-card" id="portraitCard">
            <img src="${heroB64}" alt="Portrait of Krish Kumar — Creative Strategist & UI/UX Designer" width="440" height="586" />
          </div>

          <!-- Floating Glassmorphic Pill Cards with Mouse Parallax + Keyframe Floats -->
          <div class="hero-tag-wrap hero-tag-1" data-speed="0.3">
            <div class="float-anim-1">
              <div class="glass-pill">UI / UX Design</div>
            </div>
          </div>

          <div class="hero-tag-wrap hero-tag-2" data-speed="-0.25">
            <div class="float-anim-2">
              <div class="glass-pill">Digital Marketing</div>
            </div>
          </div>

          <div class="hero-tag-wrap hero-tag-3" data-speed="0.2">
            <div class="float-anim-3">
              <div class="glass-pill">★ Creative Strategy</div>
            </div>
          </div>

          <!-- Small CSS-3D Accent shapes on parallax wrappers -->
          <div class="hero-tag-wrap" data-speed="0.4" style="top: -10px; right: 20px;">
            <div class="hero-accent-circle"></div>
          </div>
          <div class="hero-tag-wrap" data-speed="-0.3" style="bottom: -10px; left: 20px;">
            <div class="hero-accent-square"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom-center Scroll Cue -->
    <div class="hero-scroll-cue">
      <span>Scroll</span>
      <div class="scroll-indicator-line"></div>
    </div>
  </header>

  <!-- MARQUEE STRIP (full-bleed, border-top/bottom, bg2 background) -->
  <div class="marquee-strip" aria-hidden="true">
    <div class="marquee-track">
      <div class="marquee-content">
        <span>Digital Marketing</span><span class="glyph">✦</span>
        <span>UI/UX Design</span><span class="glyph">✦</span>
        <span>Branding</span><span class="glyph">✦</span>
        <span>Content Strategy</span><span class="glyph">✦</span>
        <span>AI-Powered Creativity</span><span class="glyph">✦</span>
        <span>Web Design</span><span class="glyph">✦</span>
      </div>
      <div class="marquee-content">
        <span>Digital Marketing</span><span class="glyph">✦</span>
        <span>UI/UX Design</span><span class="glyph">✦</span>
        <span>Branding</span><span class="glyph">✦</span>
        <span>Content Strategy</span><span class="glyph">✦</span>
        <span>AI-Powered Creativity</span><span class="glyph">✦</span>
        <span>Web Design</span><span class="glyph">✦</span>
      </div>
    </div>
  </div>

  <!-- ABOUT SECTION (#about) -->
  <section id="about">
    <div class="deco-shape shape-ring" data-speed="-0.2" style="top: 20%; right: 5%;"></div>
    
    <div class="container">
      <div class="reveal-item" style="margin-bottom: 40px;">
        <span class="section-tag">About</span>
        <h2 class="section-title">More than just marketing.</h2>
      </div>

      <div class="about-grid">
        <!-- Portrait Photo on Left -->
        <div class="about-photo-wrapper reveal-item">
          <img src="${aboutB64}" alt="Krish Kumar in creative design studio working on digital strategy" width="560" height="420" />
        </div>

        <!-- Copy on Right -->
        <div class="about-text-content reveal-item">
          <p class="about-lead">
            I'm a creative professional working across digital marketing, UI/UX design, and brand strategy — building experiences that are equal parts thoughtful and effective.
          </p>
          <p class="about-body">
            My approach blends performance-driven marketing thinking with a designer's eye for detail, using AI-powered tools to move faster without losing craft.
          </p>

          <!-- Pill tags below -->
          <div class="about-pills">
            <span class="about-pill">Digital Marketing</span>
            <span class="about-pill">Social Media Marketing</span>
            <span class="about-pill">UI/UX Design</span>
            <span class="about-pill">Branding</span>
            <span class="about-pill">Content Strategy</span>
            <span class="about-pill">AI-Powered Creativity</span>
            <span class="about-pill">Web Design</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SKILLS SECTION (#skills, bg2 background) -->
  <section id="skills" class="bg2">
    <!-- Decorative 3D Cube tumbling in background -->
    <div class="deco-shape shape-cube-wrap" data-speed="0.22" style="top: 10%; right: 6%;">
      <div class="shape-cube">
        <div class="cube-face face-front"></div>
        <div class="cube-face face-back"></div>
        <div class="cube-face face-right"></div>
        <div class="cube-face face-left"></div>
        <div class="cube-face face-top"></div>
        <div class="cube-face face-bottom"></div>
      </div>
    </div>

    <div class="container">
      <div class="reveal-item" style="margin-bottom: 48px;">
        <span class="section-tag">Skills</span>
        <h2 class="section-title">What I bring to the table.</h2>
      </div>

      <!-- 4-column grid (responsive to 2 then 1) with hover 3D tilt -->
      <div class="skills-grid">
        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">🎯</div>
          <h3 class="skill-title">Digital Marketing</h3>
          <p class="skill-desc">Omnichannel growth strategies, multi-tier funnel optimization and data-backed user acquisition.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">📱</div>
          <h3 class="skill-title">Social Media Marketing</h3>
          <p class="skill-desc">High-engagement editorial calendars, community storytelling, and viral social campaign planning.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">⚡</div>
          <h3 class="skill-title">Performance Marketing</h3>
          <p class="skill-desc">Targeted paid acquisition across Meta & Google Ads with rigorous CAC/ROAS telemetry.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">🔍</div>
          <h3 class="skill-title">SEO</h3>
          <p class="skill-desc">Technical search audits, high-intent keyword mapping, and evergreen content architecture.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">✍️</div>
          <h3 class="skill-title">Content Strategy</h3>
          <p class="skill-desc">Audience persona research, brand voice guidelines, and distribution narratives that convert.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">✨</div>
          <h3 class="skill-title">UI/UX Design</h3>
          <p class="skill-desc">User-centered interface systems, intuitive interaction flows, and high-fidelity clickable prototypes.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">🎨</div>
          <h3 class="skill-title">Figma</h3>
          <p class="skill-desc">Design token architecture, auto-layout mastery, interactive states, and component libraries.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">🏷️</div>
          <h3 class="skill-title">Branding</h3>
          <p class="skill-desc">Distinctive visual identities, typographic hierarchies, color systems, and brand stylebooks.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">💻</div>
          <h3 class="skill-title">Web Design</h3>
          <p class="skill-desc">Responsive layouts, spatial math, semantic accessibility standards, and micro-interactions.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">🤖</div>
          <h3 class="skill-title">AI Tools</h3>
          <p class="skill-desc">Prompt engineering, generative visual workflows, automated research, and content pipelines.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">💡</div>
          <h3 class="skill-title">Creative Strategy</h3>
          <p class="skill-desc">Bridging business metrics with boundary-pushing creative execution and concept ideation.</p>
        </div>

        <div class="skill-card tilt-card reveal-item">
          <div class="skill-icon-wrap">📊</div>
          <h3 class="skill-title">Analytics & CRO</h3>
          <p class="skill-desc">Conversion rate experiments, behavioral heatmaps, and event tracking that drive measurable ROI.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SELECTED WORK SECTION (#work) -->
  <section id="work">
    <div class="deco-shape shape-blob" data-speed="0.18" style="top: 30%; left: 3%;"></div>

    <div class="container">
      <div class="reveal-item" style="margin-bottom: 48px;">
        <span class="section-tag">Portfolio</span>
        <h2 class="section-title">Selected Work</h2>
      </div>

      <!-- 2-column grid of 6 project cards -->
      <div class="work-grid">
        <!-- 01 -->
        <article class="project-card reveal-item" onclick="openModal('Digital Marketing Campaign', 'End-to-end campaign strategy and execution designed to grow reach and engagement. Achieved a 3.4x ROAS and scaled paid subscriber base through synchronized Meta Ads and Google Search campaigns.', 'Meta Ads · Google Ads · Analytics · Attribution')">
          <div class="project-visual">
            <div class="project-num-faint">01</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Campaign Performance</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-70"></div>
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-40"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">01 Digital Marketing Campaign</h3>
            <p class="project-desc">End-to-end campaign strategy and execution designed to grow reach and engagement.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Meta Ads · Google Ads · Analytics
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>

        <!-- 02 -->
        <article class="project-card reveal-item" onclick="openModal('Social Media Strategy', 'Content calendars and platform-specific strategy built around audience growth. Spearheaded organic creative carousels and reels, elevating community engagement by 180% in 90 days.', 'Instagram · TikTok · Content Planning · Notion')">
          <div class="project-visual">
            <div class="project-num-faint">02</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Editorial Grid</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-70"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">02 Social Media Strategy</h3>
            <p class="project-desc">Content calendars and platform-specific strategy built around audience growth.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Instagram · Content Planning
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>

        <!-- 03 -->
        <article class="project-card reveal-item" onclick="openModal('UI/UX Design', 'User-centered interface design from wireframes through polished, tested screens. Conducted usability interviews and structured a frictionless onboarding flow that lowered churn by 26%.', 'Figma · Prototyping · Usability Testing · Design Tokens')">
          <div class="project-visual">
            <div class="project-num-faint">03</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Component System</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">03 UI/UX Design</h3>
            <p class="project-desc">User-centered interface design from wireframes through polished, tested screens.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Figma · Prototyping
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>

        <!-- 04 -->
        <article class="project-card reveal-item" onclick="openModal('Branding & Creative Design', 'Visual identity systems — logo, typography and brand guidelines. Crafted an authentic aesthetic language across digital touchpoints, packaging, and marketing collateral.', 'Illustrator · Photoshop · Brand Systems · Typography')">
          <div class="project-visual">
            <div class="project-num-faint">04</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Visual Identity</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-70"></div>
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">04 Branding & Creative Design</h3>
            <p class="project-desc">Visual identity systems — logo, typography and brand guidelines.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Illustrator · Brand Systems
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>

        <!-- 05 -->
        <article class="project-card reveal-item" onclick="openModal('AI Study Assistant', 'An AI-powered tool concept to help students plan and track their learning. Features adaptive study schedules, active recall flashcards, and natural language knowledge query models.', 'AI Tools · UX Design · LLM Workflows · Wireframing')">
          <div class="project-visual">
            <div class="project-num-faint">05</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">AI Assistant HUD</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
                <div class="mockup-bar w-40"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">05 AI Study Assistant</h3>
            <p class="project-desc">An AI-powered tool concept to help students plan and track their learning.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> AI Tools · UX Design
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>

        <!-- 06 -->
        <article class="project-card reveal-item" onclick="openModal('Digital Marketing Dashboard', 'A clean analytics dashboard concept for tracking campaign performance. Synthesizes multi-channel spend, attribution paths, and conversion milestones into intuitive visual charts.', 'Figma · Data Viz · Analytics UI · Modular Grid')">
          <div class="project-visual">
            <div class="project-num-faint">06</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Analytics Core</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">06 Digital Marketing Dashboard</h3>
            <p class="project-desc">A clean analytics dashboard concept for tracking campaign performance.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Figma · Data Viz
            </div>
            <span class="project-link">View Project →</span>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- CERTIFICATES SECTION (#certificates) -->
  <section id="certificates">
    <div class="container">
      <div class="reveal-item" style="margin-bottom: 48px;">
        <span class="section-tag">Credentials</span>
        <h2 class="section-title">Certificates</h2>
      </div>

      <!-- 4-column grid (responsive to 2 then 1) -->
      <div class="certificates-grid">
        <div class="certificate-card reveal-item" onclick="openModal('Google Digital Marketing & E-Commerce', 'Verified credential in multi-channel digital marketing, audience building, attribution, and e-commerce optimization.', 'Google · 2025 · ID: GOOG-DM-88492')">
          <div class="cert-badge-icon">✦</div>
          <h3 class="cert-title">Google Digital Marketing & E-Commerce</h3>
          <div class="cert-meta">Google · 2025</div>
          <span class="cert-link">View Certificate →</span>
        </div>

        <div class="certificate-card reveal-item" onclick="openModal('Meta Certified Digital Marketing Associate', 'Certified mastery in Meta Ads Manager, creative strategy, cross-platform audience targeting, and analytics telemetry.', 'Meta · 2025 · ID: META-DMA-10924')">
          <div class="cert-badge-icon">✦</div>
          <h3 class="cert-title">Meta Certified Digital Marketing Associate</h3>
          <div class="cert-meta">Meta · 2025</div>
          <span class="cert-link">View Certificate →</span>
        </div>

        <div class="certificate-card reveal-item" onclick="openModal('Advanced UI/UX Design Specialization', 'Specialized credential covering human-computer interaction, heuristic evaluation, rapid prototyping, and user testing frameworks.', 'IxDF · 2024 · ID: IXDF-UXD-55102')">
          <div class="cert-badge-icon">✦</div>
          <h3 class="cert-title">Advanced UI/UX Design Specialization</h3>
          <div class="cert-meta">IxDF · 2024</div>
          <span class="cert-link">View Certificate →</span>
        </div>

        <div class="certificate-card reveal-item" onclick="openModal('HubSpot Inbound Marketing & Content Strategy', 'Certified methodology in content inbound funnels, lead nurturing, organic authority building, and persona segmentation.', 'HubSpot Academy · 2024 · ID: HS-INB-77291')">
          <div class="cert-badge-icon">✦</div>
          <h3 class="cert-title">Inbound Marketing & Content Strategy</h3>
          <div class="cert-meta">HubSpot · 2024</div>
          <span class="cert-link">View Certificate →</span>
        </div>
      </div>
    </div>
  </section>

  <!-- WORK PROCESS SECTION (#process, bg2 background) -->
  <section id="process" class="bg2">
    <div class="container">
      <div class="reveal-item" style="margin-bottom: 24px;">
        <span class="section-tag">How I Work</span>
        <h2 class="section-title">Work Process</h2>
      </div>

      <!-- 6-column horizontal timeline (responsive to 3 then 1) -->
      <div class="process-timeline">
        <div class="process-step" data-step="01">
          <div class="process-step-num">01</div>
          <h3 class="process-step-title">Discover</h3>
          <p class="process-step-desc">Uncovering root business goals, target audience mindsets, and brand touchpoints.</p>
        </div>

        <div class="process-step" data-step="02">
          <div class="process-step-num">02</div>
          <h3 class="process-step-title">Research</h3>
          <p class="process-step-desc">Competitive landscape analysis, search intent data, and qualitative user behavioral patterns.</p>
        </div>

        <div class="process-step" data-step="03">
          <div class="process-step-num">03</div>
          <h3 class="process-step-title">Strategize</h3>
          <p class="process-step-desc">Crafting the unified roadmap, messaging architecture, channel distribution, and KPI baselines.</p>
        </div>

        <div class="process-step" data-step="04">
          <div class="process-step-num">04</div>
          <h3 class="process-step-title">Design</h3>
          <p class="process-step-desc">Developing high-impact visuals, wireframes, component design systems, and engaging campaign assets.</p>
        </div>

        <div class="process-step" data-step="05">
          <div class="process-step-num">05</div>
          <h3 class="process-step-title">Execute</h3>
          <p class="process-step-desc">Flawless deployment across media channels, responsive development, and coordinated launches.</p>
        </div>

        <div class="process-step" data-step="06">
          <div class="process-step-num">06</div>
          <h3 class="process-step-title">Optimize</h3>
          <p class="process-step-desc">Continuous A/B split-testing, funnel refinement, and data-driven iterations for sustainable growth.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PERSONAL BRAND SECTION (#brand) -->
  <section id="brand">
    <div class="deco-shape shape-ring" data-speed="0.28" style="top: 15%; right: 10%;"></div>

    <div class="container">
      <div class="brand-grid">
        <!-- Left Side: Copy and Floating Keyword Cloud -->
        <div class="brand-text-side reveal-item">
          <span class="section-tag">Personal Brand</span>
          <h2 class="brand-headline">
            <span>Creative mind.</span>
            <span>Digital-first.</span>
            <span>Always learning.</span>
          </h2>

          <div class="keyword-cloud">
            <span class="keyword-chip chip-1">DIGITAL</span>
            <span class="keyword-chip chip-2">DESIGN</span>
            <span class="keyword-chip chip-3">MARKETING</span>
            <span class="keyword-chip chip-4">AI</span>
            <span class="keyword-chip chip-5">CREATIVE</span>
            <span class="keyword-chip chip-6">STRATEGY</span>
          </div>
        </div>

        <!-- Right Side: Circular Cropped Portrait Photo (grayscale 15%) in bordered, shadowed circle frame -->
        <div class="brand-visual-side reveal-item">
          <div class="brand-circle-frame">
            <img src="${brandB64}" alt="Krish Kumar circular portrait" width="320" height="320" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTACT SECTION (#contact, centered) -->
  <section id="contact">
    <div class="container contact-container reveal-item">
      <span class="section-tag" style="justify-content: center;">Contact</span>
      <h2 class="contact-headline">Let's create something meaningful.</h2>
      <p class="contact-subline">Have a project, idea, or collaboration in mind? Let's talk.</p>

      <div class="contact-buttons">
        <a href="mailto:sachinkumar629076@gmail.com?subject=Project%20Collaboration%20with%20Krish%20Kumar" class="btn btn-dark magnetic">
          Email Me
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline magnetic">
          LinkedIn
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline magnetic">
          Instagram
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <div class="footer-inner">
        <div>© 2026 Krish Kumar</div>
        <div>Designed & crafted by Krish Kumar</div>
        <div class="back-to-top" onclick="window.scrollTo({top:0, behavior:'smooth'})">
          Back to top ↑
        </div>
      </div>
    </div>
  </footer>

  <!-- DETAIL MODAL -->
  <div class="modal-overlay" id="detailModal">
    <div class="modal-box">
      <button class="modal-close-btn" onclick="closeModal()" aria-label="Close dialog">✕</button>
      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--sub); margin-bottom: 8px;" id="modalTag">Overview</div>
      <h3 style="font-size: 24px; font-weight: 700; color: var(--ink); margin-bottom: 16px;" id="modalTitle">Project Title</h3>
      <p style="font-size: 15px; line-height: 1.65; color: var(--sub); margin-bottom: 24px;" id="modalDescription">Detailed information about this work or credential.</p>
      <div style="padding-top: 16px; border-top: 1px solid var(--line); font-size: 13px; font-weight: 600; color: var(--ink);" id="modalMeta">Key Highlights</div>
      <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
        <button class="btn btn-dark" onclick="closeModal()">Close</button>
      </div>
    </div>
  </div>

  <!-- JAVASCRIPT: Interactive Features, Three.js Hero Scene, Parallax, Tilt & Observers -->
  <script>
    // 1. FIXED GLASS NAV BAR BORDER ON SCROLL
    const mainNav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Navigation Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('open');
        });
      });
    }

    // 2. SCROLL REVEAL OBSERVER (starts translateY(28px)/opacity:0, ~15% threshold)
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });
    revealItems.forEach(item => revealObserver.observe(item));

    // 3. WORK PROCESS OBSERVER (at 50% threshold, gains dark top border + slight lift)
    const processSteps = document.querySelectorAll('.process-step');
    const processObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    }, {
      threshold: 0.5
    });
    processSteps.forEach(step => processObserver.observe(step));

    // 4. "MAGNETIC" BUTTONS
    // Every CTA (.magnetic class) tracks mousemove within its bounding box and translates up to ~30%
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        btn.style.transform = \`translate(\${moveX}px, \${moveY}px)\`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });

    // 5. 3D TILT ON SKILL CARDS & PORTRAIT PHOTO
    // Hero Portrait Photo mouse-tilt (rotateX/rotateY based on cursor position relative to viewport)
    const portraitCard = document.getElementById('portraitCard');
    const heroVisualWrapper = document.getElementById('heroVisualWrapper');
    let heroTargetRotateX = 0;
    let heroTargetRotateY = 0;
    let heroCurrentRotateX = 0;
    let heroCurrentRotateY = 0;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      heroTargetRotateY = dx * 14;
      heroTargetRotateX = -dy * 14;
    });

    function updateHeroTilt() {
      if (portraitCard && window.innerWidth > 768) {
        heroCurrentRotateX += (heroTargetRotateX - heroCurrentRotateX) * 0.08;
        heroCurrentRotateY += (heroTargetRotateY - heroCurrentRotateY) * 0.08;
        portraitCard.style.transform = \`rotateX(\${heroCurrentRotateX.toFixed(2)}deg) rotateY(\${heroCurrentRotateY.toFixed(2)}deg)\`;
      }
      requestAnimationFrame(updateHeroTilt);
    }
    updateHeroTilt();

    // Skill cards subtle 3D tilt on hover
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = -((y - cy) / cy) * 8;
        const rotY = ((x - cx) / cx) * 8;
        card.style.transform = \`perspective(600px) rotateX(\${rotX.toFixed(2)}deg) rotateY(\${rotY.toFixed(2)}deg) translateY(-6px)\`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });

    // 6. SCROLL PARALLAX FOR DECORATIVE 3D SHAPES & HERO TAGS
    const parallaxElements = document.querySelectorAll('[data-speed]');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function onScrollParallax() {
      const scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.1;
        const offset = scrollY * speed;
        // Keep existing non-translate transforms if present
        el.style.transform = \`translateY(\${offset.toFixed(1)}px)\`;
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScrollParallax);
        ticking = true;
      }
    }, { passive: true });

    // 7. REAL WEBGL THREE.JS HERO SCENE
    // Specification:
    // - Transparent canvas, absolutely positioned, inset -15%
    // - Glass icosahedron (MeshPhysicalMaterial: clearcoat 1, roughness 0.12, opacity 0.35, transparent)
    // - Wireframe icosahedron outline (MeshBasicMaterial wireframe, opacity 0.35)
    // - Dark metallic torus (MeshStandardMaterial, metalness 0.4, roughness 0.35)
    // - Small glass sphere that bobs on a sine wave
    // - Lighting: one directional key light, one directional fill light, one ambient light
    // - The whole group's rotation eases toward mouse position each frame (lerp ~0.04); individual meshes self-rotate
    // - Resize handling
    (function initThreeScene() {
      const container = document.getElementById('threeCanvasContainer');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // Transparent
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);

      // Main Group to ease rotation with mouse
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. Glass Icosahedron
      const icoGeometry = new THREE.IcosahedronGeometry(1.8, 0);
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        metalness: 0.1,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.7,
        opacity: 0.35,
        transparent: true,
        reflectivity: 0.9,
      });
      const glassIco = new THREE.Mesh(icoGeometry, glassMaterial);
      mainGroup.add(glassIco);

      // Wireframe Outline (slightly larger)
      const wireGeometry = new THREE.IcosahedronGeometry(1.82, 0);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x111111,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const wireIco = new THREE.Mesh(wireGeometry, wireMaterial);
      glassIco.add(wireIco);

      // 2. Dark Metallic Torus
      const torusGeometry = new THREE.TorusGeometry(2.6, 0.22, 16, 100);
      const torusMaterial = new THREE.MeshStandardMaterial({
        color: 0x222225,
        metalness: 0.4,
        roughness: 0.35
      });
      const darkTorus = new THREE.Mesh(torusGeometry, torusMaterial);
      darkTorus.rotation.x = Math.PI * 0.35;
      mainGroup.add(darkTorus);

      // 3. Small Glass Sphere that bobs on a sine wave
      const sphereGeometry = new THREE.SphereGeometry(0.45, 32, 32);
      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.15,
        clearcoat: 1.0,
        opacity: 0.45,
        transparent: true,
      });
      const bobbingSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      bobbingSphere.position.set(2.4, 1.2, 0.8);
      mainGroup.add(bobbingSphere);

      // 4. Lighting: Key light, fill light, ambient light
      const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.85);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
      keyLight.position.set(5, 6, 7);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xD8D8E0, 0.7);
      fillLight.position.set(-6, -4, 4);
      scene.add(fillLight);

      // Mouse Lerp Tracking
      let mouseX = 0;
      let mouseY = 0;
      let targetRotX = 0;
      let targetRotY = 0;

      window.addEventListener('mousemove', (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = -(e.clientY / window.innerHeight) * 2 + 1;
        targetRotY = nx * 0.7;
        targetRotX = -ny * 0.6;
      });

      // Animation Loop
      let clock = new THREE.Clock();
      function animate() {
        requestAnimationFrame(animate);

        const elapsedTime = clock.getElapsedTime();

        // Ease main group rotation toward mouse (lerp ~0.04)
        mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.04;
        mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.04;

        // Individual meshes self-rotate continuously
        glassIco.rotation.y += 0.005;
        glassIco.rotation.x += 0.003;

        darkTorus.rotation.z += 0.004;
        darkTorus.rotation.y += 0.003;

        // Small sphere bobs on sine wave
        bobbingSphere.position.y = 1.2 + Math.sin(elapsedTime * 2.2) * 0.35;
        bobbingSphere.position.x = 2.4 + Math.cos(elapsedTime * 1.5) * 0.2;

        renderer.render(scene, camera);
      }
      animate();

      // Window Resize Handler
      function onWindowResize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener('resize', onWindowResize);
    })();

    // 8. MODAL DETAIL POPUP
    const detailModal = document.getElementById('detailModal');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalMeta = document.getElementById('modalMeta');

    function openModal(title, desc, meta) {
      if (!detailModal) return;
      modalTitle.textContent = title;
      modalDescription.textContent = desc;
      modalMeta.textContent = meta || '';
      modalTag.textContent = title.includes('Certificate') || meta.includes('202') ? 'Credential Details' : 'Project Case Study';
      detailModal.classList.add('active');
    }

    function closeModal() {
      if (!detailModal) return;
      detailModal.classList.remove('active');
    }

    if (detailModal) {
      detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
          closeModal();
        }
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    }
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '../index.html'), htmlContent, 'utf8');
console.log('Successfully generated index.html with embedded base64 photos!');
