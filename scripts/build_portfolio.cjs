const fs = require('fs');
const path = require('path');

const heroB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_hero_opt.jpg')).toString('base64');
const aboutB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_about_opt.jpg')).toString('base64');
const brandB64 = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, '../src/assets/images/krish_brand_opt.jpg')).toString('base64');

const projectsData = require('../src/data/projects.json');
const servicesData = require('../src/data/services.json');
const blogData = require('../src/data/blog.json');

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

    /* DEDICATED SERVICE DETAIL VIEW & CLICKABLE SKILLS */
    body.service-view-open {
      overflow: hidden !important;
    }

    .skill-card {
      cursor: pointer !important;
      user-select: none;
      display: flex;
      flex-direction: column;
    }

    .skill-card:hover {
      border-color: rgba(17, 17, 17, 0.4) !important;
      box-shadow: var(--shadow-hover);
    }

    .skill-card:focus-visible {
      outline: 2px solid var(--ink);
      outline-offset: 3px;
    }

    .skill-card-action {
      margin-top: 16px;
      padding-top: 12px;
      border-top: 1px solid var(--line-light);
      font-size: 12px;
      font-weight: 700;
      color: var(--ink);
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: color 0.2s ease;
    }

    .skill-card-action .skill-arrow {
      transition: transform 0.25s var(--ease-out-expo);
      font-size: 14px;
    }

    .skill-card:hover .skill-card-action .skill-arrow {
      transform: translateX(4px);
    }

    .service-detail-view {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1500;
      background: var(--bg);
      overflow-y: auto;
      overflow-x: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(28px) scale(0.995);
      transition: opacity 0.32s var(--ease-out-expo), transform 0.32s var(--ease-out-expo), visibility 0.32s;
      padding-bottom: 90px;
    }

    .service-detail-view.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    .service-nav-bar {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 max(24px, env(safe-area-inset-left)) 0 max(24px, env(safe-area-inset-right));
      z-index: 20;
    }

    .service-nav-brand {
      font-size: 15px;
      font-weight: 700;
      color: var(--ink);
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .service-header-hero {
      background: linear-gradient(180deg, var(--bg2) 0%, #FFFFFF 100%);
      border-radius: var(--radius-lg);
      padding: 44px 40px;
      margin-top: 24px;
      border: 1px solid var(--line);
      position: relative;
    }

    .service-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--sub);
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-bottom: 20px;
    }

    .service-title-wrap {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }

    .service-icon-large {
      width: 68px;
      height: 68px;
      border-radius: 18px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 34px;
      box-shadow: var(--shadow-sm);
      flex-shrink: 0;
    }

    .service-title {
      font-size: clamp(30px, 4.5vw, 50px);
      font-weight: 800;
      color: var(--ink);
      line-height: 1.12;
      letter-spacing: -0.03em;
    }

    .service-tagline {
      font-size: 15px;
      font-weight: 600;
      color: var(--sub);
      margin-top: 4px;
    }

    .service-lead-desc {
      font-size: 18px;
      line-height: 1.65;
      color: var(--sub);
      max-width: 860px;
      margin-top: 12px;
    }

    /* Service Section Blocks */
    .service-section-block {
      padding: 48px 0;
      border-bottom: 1px solid var(--line-light);
    }

    .service-subhead {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--ink);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .service-subhead::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ink);
    }

    /* Offerings Grid */
    .services-offered-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .offering-card {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 24px;
      transition: transform 0.25s var(--ease-out-expo), box-shadow 0.25s var(--ease-out-expo);
    }

    .offering-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
      border-color: rgba(0,0,0,0.25);
    }

    .offering-num {
      font-size: 12px;
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--sub);
      margin-bottom: 8px;
    }

    .offering-card h4 {
      font-size: 17px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .offering-card p {
      font-size: 14px;
      color: var(--sub);
      line-height: 1.6;
    }

    /* Tools Pills */
    .tools-pills-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .tool-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-pill);
      font-size: 14px;
      font-weight: 600;
      color: var(--ink);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .tool-badge:hover {
      transform: translateY(-2px);
      border-color: var(--ink);
    }

    /* Example / Work Section */
    .service-work-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      padding: 36px;
      box-shadow: var(--shadow-card);
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 36px;
      align-items: center;
    }

    .service-work-info h3 {
      font-size: 24px;
      font-weight: 800;
      color: var(--ink);
      margin-bottom: 12px;
    }

    .service-work-info p {
      font-size: 15px;
      line-height: 1.65;
      color: var(--sub);
      margin-bottom: 20px;
    }

    .service-deliverables-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .deliverable-chip {
      font-size: 12px;
      font-weight: 600;
      background: var(--bg2);
      border: 1px solid var(--line);
      padding: 6px 12px;
      border-radius: var(--radius-pill);
      color: var(--ink);
    }

    .service-work-metric-box {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 28px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .metric-big-num {
      font-size: clamp(38px, 4.5vw, 54px);
      font-weight: 800;
      font-family: var(--font-display);
      color: var(--ink);
      line-height: 1;
      margin-bottom: 8px;
    }

    .metric-big-label {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--sub);
    }

    /* Service CTA Banner */
    .service-cta-banner {
      margin-top: 52px;
      background: var(--ink);
      color: #FFFFFF;
      border-radius: var(--radius-lg);
      padding: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 28px;
      flex-wrap: wrap;
      box-shadow: 0 20px 48px rgba(17, 17, 17, 0.2);
    }

    .service-cta-banner h3 {
      color: #FFFFFF;
      font-size: clamp(22px, 3vw, 30px);
      font-weight: 800;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }

    .service-cta-banner p {
      color: #B5B5B5;
      font-size: 15px;
      max-width: 540px;
      line-height: 1.6;
    }

    .service-cta-banner .btn-white {
      background: #FFFFFF;
      color: var(--ink);
      border: 1px solid #FFFFFF;
      font-weight: 700;
    }

    .service-cta-banner .btn-white:hover {
      background: #EFEFEF;
      transform: translateY(-2px);
    }

    @media (max-width: 900px) {
      .services-offered-grid {
        grid-template-columns: 1fr;
      }
      .service-work-card {
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .service-header-hero {
        padding: 28px 24px;
      }
      .service-cta-banner {
        padding: 32px 24px;
        flex-direction: column;
        align-items: flex-start;
      }
      .service-cta-banner .btn {
        width: 100%;
      }
    }


    /* =========================================================================
       PROJECT DETAIL VIEW (DEDICATED FULL-PAGE VIEW)
       ========================================================================= */
    .project-detail-view {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1600;
      background: var(--bg);
      overflow-y: auto;
      overflow-x: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(28px) scale(0.995);
      transition: opacity 0.32s var(--ease-out-expo), transform 0.32s var(--ease-out-expo), visibility 0.32s;
      padding-bottom: 100px;
      -webkit-overflow-scrolling: touch;
    }

    .project-detail-view.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    body.project-view-open {
      overflow: hidden;
    }

    .project-nav-bar {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 max(24px, env(safe-area-inset-left)) 0 max(24px, env(safe-area-inset-right));
      z-index: 30;
    }

    .project-nav-brand {
      font-size: 15px;
      font-weight: 700;
      color: var(--ink);
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .project-header-hero {
      background: linear-gradient(180deg, var(--bg2) 0%, #FFFFFF 100%);
      border-radius: var(--radius-lg);
      padding: 44px 40px;
      margin-top: 24px;
      border: 1px solid var(--line);
      position: relative;
    }

    .project-eyebrow-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 18px;
      flex-wrap: wrap;
    }

    .project-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--sub);
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
    }

    .project-status-pill {
      font-size: 12px;
      font-weight: 600;
      color: var(--ink);
      background: rgba(0, 0, 0, 0.04);
      border: 1px solid var(--line-light);
      padding: 4px 12px;
      border-radius: var(--radius-pill);
    }

    .project-view-title {
      font-size: clamp(32px, 5vw, 52px);
      font-weight: 800;
      color: var(--ink);
      line-height: 1.12;
      letter-spacing: -0.03em;
      margin-bottom: 10px;
    }

    .project-view-tagline {
      font-size: clamp(16px, 2.2vw, 20px);
      font-weight: 600;
      color: var(--sub);
      margin-bottom: 28px;
      line-height: 1.45;
    }

    .project-meta-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      padding: 22px 26px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
    }

    .project-meta-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .project-meta-label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--sub);
    }

    .project-meta-val {
      font-size: 14px;
      font-weight: 700;
      color: var(--ink);
      word-break: break-word;
    }

    .project-section-block {
      padding: 50px 0;
      border-bottom: 1px solid var(--line-light);
    }

    .project-subhead {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--ink);
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-subhead::before {
      content: '';
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ink);
    }

    .project-overview-text {
      font-size: 17px;
      line-height: 1.7;
      color: var(--ink);
      max-width: 920px;
    }

    .project-dual-cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }

    .project-info-card {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 30px;
    }

    .project-info-card h4 {
      font-size: 18px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .project-info-card p {
      font-size: 15px;
      line-height: 1.65;
      color: var(--sub);
    }

    .project-strategy-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .project-strategy-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 26px;
      box-shadow: var(--shadow-sm);
    }

    .strategy-step-num {
      font-family: var(--font-display);
      font-size: 12px;
      font-weight: 800;
      color: var(--sub);
      letter-spacing: 0.1em;
      margin-bottom: 10px;
    }

    .strategy-step-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .strategy-step-desc {
      font-size: 14px;
      line-height: 1.6;
      color: var(--sub);
    }

    .project-work-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    .project-work-item {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 24px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .project-work-item:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .project-work-item h4 {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .project-work-item p {
      font-size: 14px;
      line-height: 1.6;
      color: var(--sub);
    }

    .project-tool-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 10px 18px;
      border-radius: var(--radius-pill);
      font-size: 13px;
      font-weight: 700;
      color: var(--ink);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .project-tool-pill:hover {
      transform: translateY(-2px);
      border-color: var(--ink);
    }

    .screenshots-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .screenshot-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo);
      display: flex;
      flex-direction: column;
    }

    .screenshot-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
    }

    .screenshot-visual-frame {
      height: 220px;
      background: linear-gradient(145deg, #F8F8FA 0%, #EAEAEF 100%);
      position: relative;
      border-bottom: 1px solid var(--line-light);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .screenshot-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .screenshot-mockup-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 12px 16px;
      justify-content: space-between;
    }

    .mockup-window-top {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 6px;
      padding: 6px 10px;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .mockup-address-bar {
      font-size: 11px;
      font-weight: 600;
      color: var(--sub);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .mockup-screen-body {
      background: #FFFFFF;
      border-radius: 8px;
      padding: 14px;
      border: 1px solid rgba(0, 0, 0, 0.04);
      display: flex;
      flex-direction: column;
      gap: 10px;
      box-shadow: 0 4px 14px rgba(0,0,0,0.03);
    }

    .mockup-metric-preview {
      display: flex;
      gap: 8px;
    }

    .mockup-metric-chip {
      font-size: 10px;
      font-weight: 800;
      background: var(--bg2);
      border: 1px solid var(--line);
      padding: 3px 8px;
      border-radius: 4px;
      color: var(--ink);
    }

    .screenshot-body-info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .screenshot-badge {
      display: inline-block;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--sub);
      background: var(--bg2);
      padding: 3px 8px;
      border-radius: 4px;
      margin-bottom: 8px;
      align-self: flex-start;
    }

    .screenshot-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
      margin-bottom: 6px;
    }

    .screenshot-caption {
      font-size: 13px;
      line-height: 1.55;
      color: var(--sub);
    }

    .project-results-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
    }

    .result-metric-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 28px 24px;
      box-shadow: var(--shadow-sm);
      text-align: left;
    }

    .result-metric-number {
      font-family: var(--font-display);
      font-size: clamp(32px, 4vw, 46px);
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.04em;
      line-height: 1;
      margin-bottom: 6px;
    }

    .result-metric-label {
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--sub);
      margin-bottom: 10px;
    }

    .result-metric-desc {
      font-size: 13px;
      line-height: 1.5;
      color: var(--sub);
    }

    .project-live-banner {
      background: var(--ink);
      color: #FFFFFF;
      border-radius: var(--radius-lg);
      padding: 48px 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
      margin-top: 56px;
    }

    .project-live-banner h3 {
      color: #FFFFFF;
      font-size: clamp(24px, 3.5vw, 36px);
      font-weight: 800;
      margin-bottom: 8px;
    }

    .project-live-banner p {
      color: rgba(255, 255, 255, 0.75);
      font-size: 16px;
      max-width: 560px;
    }

    .btn-white {
      background: #FFFFFF;
      color: var(--ink);
      border: 1px solid #FFFFFF;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    }

    .btn-white:hover {
      background: #F2F2F4;
      transform: translateY(-1px);
    }

    .project-bottom-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 40px 0 20px 0;
      border-top: 1px solid var(--line);
      margin-top: 48px;
      flex-wrap: wrap;
    }

    @media (max-width: 1024px) {
      .project-meta-strip {
        grid-template-columns: repeat(2, 1fr);
      }
      .project-strategy-steps {
        grid-template-columns: 1fr;
      }
      .screenshots-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .project-results-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .project-header-hero {
        padding: 30px 22px;
      }
      .project-meta-strip {
        grid-template-columns: 1fr;
      }
      .project-dual-cards {
        grid-template-columns: 1fr;
      }
      .project-work-grid {
        grid-template-columns: 1fr;
      }
      .screenshots-grid {
        grid-template-columns: 1fr;
      }
      .project-results-grid {
        grid-template-columns: 1fr;
      }
      .project-live-banner {
        padding: 32px 24px;
        flex-direction: column;
        align-items: flex-start;
      }
      .project-live-banner .btn {
        width: 100%;
      }
      .project-bottom-nav {
        flex-direction: column;
        align-items: stretch;
      }
      .project-bottom-nav > div {
        width: 100%;
        justify-content: space-between;
      }
    }


    /* =========================================================================
       BLOG PAGE VIEW & ARTICLE PAGE VIEW (DEDICATED FULL-PAGE EXPERIENCES)
       ========================================================================= */
    .blog-page-view,
    .article-page-view {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1700;
      background: var(--bg);
      overflow-y: auto;
      overflow-x: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(28px) scale(0.995);
      transition: opacity 0.32s var(--ease-out-expo), transform 0.32s var(--ease-out-expo), visibility 0.32s;
      padding-bottom: 100px;
      -webkit-overflow-scrolling: touch;
    }

    .blog-page-view.active,
    .article-page-view.active {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }

    body.blog-view-open,
    body.article-view-open {
      overflow: hidden;
    }

    .blog-nav-bar {
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      height: 72px;
      background: rgba(255, 255, 255, 0.94);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 max(24px, env(safe-area-inset-left)) 0 max(24px, env(safe-area-inset-right));
      z-index: 30;
    }

    .blog-nav-brand {
      font-size: 15px;
      font-weight: 700;
      color: var(--ink);
      letter-spacing: -0.01em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .blog-hero-header {
      background: linear-gradient(180deg, var(--bg2) 0%, #FFFFFF 100%);
      border-radius: var(--radius-lg);
      padding: 48px 44px;
      margin-top: 24px;
      border: 1px solid var(--line);
      position: relative;
    }

    .blog-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--sub);
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-bottom: 18px;
    }

    .blog-view-title {
      font-size: clamp(34px, 5.2vw, 54px);
      font-weight: 800;
      color: var(--ink);
      line-height: 1.1;
      letter-spacing: -0.035em;
      margin-bottom: 12px;
    }

    .blog-view-tagline {
      font-size: clamp(16px, 2.2vw, 20px);
      font-weight: 500;
      color: var(--sub);
      max-width: 820px;
      line-height: 1.55;
      margin-bottom: 32px;
    }

    /* Search & Filter Controls */
    .blog-controls-wrap {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 10px;
    }

    .blog-search-box {
      position: relative;
      max-width: 520px;
      width: 100%;
    }

    .blog-search-input {
      width: 100%;
      height: 48px;
      padding: 0 18px 0 46px;
      border-radius: var(--radius-pill);
      border: 1px solid var(--line);
      background: #FFFFFF;
      font-size: 14px;
      font-family: inherit;
      color: var(--ink);
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }

    .blog-search-input:focus {
      border-color: var(--ink);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
    }

    .blog-search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      color: var(--sub);
      pointer-events: none;
    }

    .blog-categories-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .cat-filter-btn {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-pill);
      padding: 7px 16px;
      font-size: 12px;
      font-weight: 700;
      color: var(--sub);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .cat-filter-btn:hover {
      border-color: var(--ink);
      color: var(--ink);
    }

    .cat-filter-btn.active {
      background: var(--ink);
      color: #FFFFFF;
      border-color: var(--ink);
    }

    /* Featured Post Card */
    .featured-post-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      overflow: hidden;
      margin: 40px 0 50px 0;
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo), border-color 0.3s;
      cursor: pointer;
    }

    .featured-post-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(0,0,0,0.25);
    }

    .featured-cover-visual {
      background: linear-gradient(135deg, #111116 0%, #2A2A38 100%);
      min-height: 340px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }

    .featured-cover-visual::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
      pointer-events: none;
    }

    .featured-badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      align-self: flex-start;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .featured-cover-pattern {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .pattern-bar-faint {
      height: 6px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }

    .featured-content-body {
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .post-meta-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 12px;
      font-weight: 700;
      color: var(--sub);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 14px;
    }

    .post-meta-dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--line);
    }

    .featured-post-title {
      font-size: clamp(22px, 2.5vw, 30px);
      font-weight: 800;
      color: var(--ink);
      line-height: 1.22;
      letter-spacing: -0.02em;
      margin-bottom: 14px;
    }

    .featured-post-desc {
      font-size: 15px;
      line-height: 1.65;
      color: var(--sub);
      margin-bottom: 24px;
    }

    .post-tags-list {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      margin-bottom: 24px;
    }

    .post-tag-chip {
      font-size: 11px;
      font-weight: 700;
      color: var(--sub);
      background: var(--bg2);
      border: 1px solid var(--line);
      padding: 3px 10px;
      border-radius: var(--radius-pill);
    }

    .read-blog-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: var(--ink);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: transform 0.2s ease, color 0.2s ease;
    }

    .read-blog-btn:hover {
      transform: translateX(4px);
    }

    /* Blog Articles Grid */
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 28px;
      margin-bottom: 60px;
    }

    .article-card {
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-sm);
      transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s var(--ease-out-expo), border-color 0.3s;
      cursor: pointer;
    }

    .article-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-hover);
      border-color: rgba(0,0,0,0.25);
    }

    .article-cover-frame {
      height: 190px;
      background: linear-gradient(135deg, #1C1C24 0%, #353545 100%);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .article-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .article-card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--ink);
      line-height: 1.35;
      letter-spacing: -0.015em;
      margin-bottom: 10px;
    }

    .article-card-desc {
      font-size: 13.5px;
      line-height: 1.6;
      color: var(--sub);
      margin-bottom: 20px;
      flex-grow: 1;
    }

    /* Article Single View Styles */
    .reading-progress-bar {
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: var(--ink);
      width: 0%;
      z-index: 100;
      transition: width 0.1s linear;
    }

    .article-container-inner {
      max-width: 820px;
      margin: 0 auto;
      padding-top: 32px;
    }

    .article-category-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--sub);
      background: #FFFFFF;
      border: 1px solid var(--line);
      padding: 6px 14px;
      border-radius: var(--radius-pill);
      margin-bottom: 20px;
    }

    .article-single-title {
      font-size: clamp(32px, 5vw, 50px);
      font-weight: 800;
      color: var(--ink);
      line-height: 1.14;
      letter-spacing: -0.035em;
      margin-bottom: 16px;
    }

    .article-single-tagline {
      font-size: clamp(17px, 2.2vw, 21px);
      font-weight: 500;
      color: var(--sub);
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .article-author-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding: 18px 24px;
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      margin-bottom: 36px;
      flex-wrap: wrap;
    }

    .author-info-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .author-avatar-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--ink);
      color: #FFFFFF;
      font-weight: 800;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #FFFFFF;
      box-shadow: var(--shadow-sm);
    }

    .author-name-text {
      font-size: 15px;
      font-weight: 800;
      color: var(--ink);
    }

    .author-role-text {
      font-size: 12px;
      color: var(--sub);
      font-weight: 600;
    }

    .article-hero-banner {
      width: 100%;
      min-height: 280px;
      background: linear-gradient(135deg, #111116 0%, #2A2A38 100%);
      border-radius: var(--radius-md);
      border: 1px solid var(--line);
      padding: 40px;
      margin-bottom: 48px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: relative;
      overflow: hidden;
    }

    /* Article Content Typography */
    .article-body-content {
      font-size: 18px;
      line-height: 1.78;
      color: var(--ink);
    }

    .article-body-content .lead-p {
      font-size: 21px;
      line-height: 1.68;
      font-weight: 500;
      color: var(--ink);
      margin-bottom: 36px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--line-light);
    }

    .article-body-content h2 {
      font-size: clamp(24px, 3.2vw, 32px);
      font-weight: 800;
      color: var(--ink);
      letter-spacing: -0.025em;
      line-height: 1.25;
      margin: 48px 0 20px 0;
    }

    .article-body-content h3 {
      font-size: 22px;
      font-weight: 800;
      color: var(--ink);
      margin: 36px 0 16px 0;
    }

    .article-body-content p {
      margin-bottom: 24px;
      color: #2D2D35;
    }

    .article-callout-box {
      background: var(--bg2);
      border-left: 3px solid var(--ink);
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      padding: 24px 28px;
      margin: 36px 0;
    }

    .callout-title {
      font-size: 13px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--ink);
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .callout-body {
      font-size: 15.5px;
      line-height: 1.65;
      color: var(--sub);
      margin: 0;
    }

    .article-quote-box {
      margin: 44px 0;
      padding: 32px 36px;
      background: #FFFFFF;
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      text-align: center;
    }

    .article-quote-box blockquote {
      font-family: var(--font-display);
      font-size: clamp(20px, 2.6vw, 26px);
      font-weight: 700;
      line-height: 1.4;
      color: var(--ink);
      margin: 0 0 16px 0;
    }

    .article-quote-box cite {
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--sub);
      font-style: normal;
    }

    .article-bullets {
      margin: 24px 0 36px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .article-bullets li {
      font-size: 16.5px;
      line-height: 1.65;
      color: #2D2D35;
    }

    .article-footer-meta {
      margin-top: 56px;
      padding-top: 36px;
      border-top: 1px solid var(--line);
    }

    .share-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      margin-bottom: 40px;
    }

    .next-article-card {
      background: var(--bg2);
      border: 1px solid var(--line);
      border-radius: var(--radius-md);
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-top: 40px;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }

    .next-article-card:hover {
      border-color: var(--ink);
      box-shadow: var(--shadow-sm);
    }

    @media (max-width: 1024px) {
      .blog-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      .featured-post-card {
        grid-template-columns: 1fr;
      }
      .featured-cover-visual {
        min-height: 220px;
      }
    }

    @media (max-width: 768px) {
      .blog-grid {
        grid-template-columns: 1fr;
      }
      .blog-hero-header {
        padding: 32px 24px;
      }
      .featured-content-body {
        padding: 28px 24px;
      }
      .article-author-card {
        flex-direction: column;
        align-items: flex-start;
      }
      .next-article-card {
        flex-direction: column;
        align-items: flex-start;
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
      <li><a href="/blog" class="nav-blog-btn" onclick="event.preventDefault(); openBlogView();">Blog</a></li>
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
    <a href="/blog" class="mobile-nav-link" onclick="event.preventDefault(); openBlogView();">Blog</a>
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

      <!-- 4-column grid (responsive to 2 then 1) with hover 3D tilt & click to open dedicated detail view -->
      <div class="skills-grid">
        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('digital-marketing')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('digital-marketing')" aria-label="Open detailed view for Digital Marketing">
          <div class="skill-icon-wrap">🎯</div>
          <h3 class="skill-title">Digital Marketing</h3>
          <p class="skill-desc">Omnichannel growth strategies, multi-tier funnel optimization and data-backed user acquisition.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('social-media-marketing')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('social-media-marketing')" aria-label="Open detailed view for Social Media Marketing">
          <div class="skill-icon-wrap">📱</div>
          <h3 class="skill-title">Social Media Marketing</h3>
          <p class="skill-desc">High-engagement editorial calendars, community storytelling, and viral social campaign planning.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('performance-marketing')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('performance-marketing')" aria-label="Open detailed view for Performance Marketing">
          <div class="skill-icon-wrap">⚡</div>
          <h3 class="skill-title">Performance Marketing</h3>
          <p class="skill-desc">Targeted paid acquisition across Meta & Google Ads with rigorous CAC/ROAS telemetry.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('seo')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('seo')" aria-label="Open detailed view for SEO">
          <div class="skill-icon-wrap">🔍</div>
          <h3 class="skill-title">SEO</h3>
          <p class="skill-desc">Technical search audits, high-intent keyword mapping, and evergreen content architecture.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('content-strategy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('content-strategy')" aria-label="Open detailed view for Content Strategy">
          <div class="skill-icon-wrap">✍️</div>
          <h3 class="skill-title">Content Strategy</h3>
          <p class="skill-desc">Audience persona research, brand voice guidelines, and distribution narratives that convert.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('ui-ux-design')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('ui-ux-design')" aria-label="Open detailed view for UI/UX Design">
          <div class="skill-icon-wrap">✨</div>
          <h3 class="skill-title">UI/UX Design</h3>
          <p class="skill-desc">User-centered interface systems, intuitive interaction flows, and high-fidelity clickable prototypes.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('figma')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('figma')" aria-label="Open detailed view for Figma">
          <div class="skill-icon-wrap">🎨</div>
          <h3 class="skill-title">Figma</h3>
          <p class="skill-desc">Design token architecture, auto-layout mastery, interactive states, and component libraries.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('branding')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('branding')" aria-label="Open detailed view for Branding">
          <div class="skill-icon-wrap">🏷️</div>
          <h3 class="skill-title">Branding</h3>
          <p class="skill-desc">Distinctive visual identities, typographic hierarchies, color systems, and brand stylebooks.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('web-design')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('web-design')" aria-label="Open detailed view for Web Design">
          <div class="skill-icon-wrap">💻</div>
          <h3 class="skill-title">Web Design</h3>
          <p class="skill-desc">Responsive layouts, spatial math, semantic accessibility standards, and micro-interactions.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('ai-tools')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('ai-tools')" aria-label="Open detailed view for AI Tools">
          <div class="skill-icon-wrap">🤖</div>
          <h3 class="skill-title">AI Tools</h3>
          <p class="skill-desc">Prompt engineering, generative visual workflows, automated research, and content pipelines.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('creative-strategy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('creative-strategy')" aria-label="Open detailed view for Creative Strategy">
          <div class="skill-icon-wrap">💡</div>
          <h3 class="skill-title">Creative Strategy</h3>
          <p class="skill-desc">Bridging business metrics with boundary-pushing creative execution and concept ideation.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
        </div>

        <div class="skill-card tilt-card reveal-item" onclick="openServiceView('analytics-cro')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openServiceView('analytics-cro')" aria-label="Open detailed view for Analytics & CRO">
          <div class="skill-icon-wrap">📊</div>
          <h3 class="skill-title">Analytics & CRO</h3>
          <p class="skill-desc">Conversion rate experiments, behavioral heatmaps, and event tracking that drive measurable ROI.</p>
          <div class="skill-card-action"><span>Explore Service</span><span class="skill-arrow">→</span></div>
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

      <!-- 2-column grid of project cards -->
      <div class="work-grid">
        <!-- 01 Digital Marketing Campaign -->
        <article class="project-card reveal-item" onclick="openProjectView('digital-marketing-campaign')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('digital-marketing-campaign')" aria-label="Open detailed case study for Digital Marketing Campaign">
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
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('digital-marketing-campaign');">View Project →</button>
          </div>
        </article>

        <!-- 02 Social Media Strategy -->
        <article class="project-card reveal-item" onclick="openProjectView('social-media-strategy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('social-media-strategy')" aria-label="Open detailed case study for Social Media Strategy">
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
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('social-media-strategy');">View Project →</button>
          </div>
        </article>

        <!-- 03 Performance Marketing -->
        <article class="project-card reveal-item" onclick="openProjectView('performance-marketing')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('performance-marketing')" aria-label="Open detailed case study for Performance Marketing">
          <div class="project-visual">
            <div class="project-num-faint">03</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Paid Search & ROAS</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">03 Performance Marketing</h3>
            <p class="project-desc">High-precision paid search, display retargeting, and rigorous unit economics.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Google Ads · LinkedIn · SEMrush
            </div>
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('performance-marketing');">View Project →</button>
          </div>
        </article>

        <!-- 04 UI/UX Design -->
        <article class="project-card reveal-item" onclick="openProjectView('ui-ux-design')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('ui-ux-design')" aria-label="Open detailed case study for UI/UX Design">
          <div class="project-visual">
            <div class="project-num-faint">04</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Design System</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-70"></div>
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">04 UI/UX Design System</h3>
            <p class="project-desc">User-centered interface design from wireframes through polished, tested screens.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Figma · Prototyping · Tokens
            </div>
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('ui-ux-design');">View Project →</button>
          </div>
        </article>

        <!-- 05 Branding & Creative Design -->
        <article class="project-card reveal-item" onclick="openProjectView('branding-creative-design')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('branding-creative-design')" aria-label="Open detailed case study for Branding & Creative Design">
          <div class="project-visual">
            <div class="project-num-faint">05</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">Visual Identity</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
                <div class="mockup-bar w-40"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">05 Branding & Creative Design</h3>
            <p class="project-desc">Visual identity systems — logo, typography and comprehensive brand guidelines.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> Illustrator · Photoshop · Brand Systems
            </div>
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('branding-creative-design');">View Project →</button>
          </div>
        </article>

        <!-- 06 AI Study Assistant -->
        <article class="project-card reveal-item" onclick="openProjectView('ai-study-assistant')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') openProjectView('ai-study-assistant')" aria-label="Open detailed case study for AI Study Assistant">
          <div class="project-visual">
            <div class="project-num-faint">06</div>
            <div class="project-preview-mockup">
              <div class="mockup-header">
                <div class="mockup-dots"><span></span><span></span><span></span></div>
                <span class="mockup-badge">AI Assistant HUD</span>
              </div>
              <div class="mockup-content-bars">
                <div class="mockup-bar w-40"></div>
                <div class="mockup-bar w-90"></div>
                <div class="mockup-bar w-70"></div>
              </div>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">06 AI Study Assistant</h3>
            <p class="project-desc">An AI-powered tool concept to help students plan, memorize, and master complex subjects.</p>
            <div class="project-tools">
              <span class="project-tools-label">Tools:</span> AI Tools · UX Design · Prompt Flow
            </div>
            <button type="button" class="project-link" onclick="event.stopPropagation(); openProjectView('ai-study-assistant');">View Project →</button>
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

  <!-- DEDICATED SERVICE DETAIL VIEW (FULL-PAGE SMOOTH OVERLAY) -->
  <div class="service-detail-view" id="serviceDetailView" aria-hidden="true" role="dialog" aria-modal="true">
    <!-- Top Nav Bar -->
    <div class="service-nav-bar">
      <button class="btn btn-outline magnetic" onclick="closeServiceView()" aria-label="Return to portfolio">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Portfolio
      </button>
      <div class="service-nav-brand">
        Krish Kumar <span style="color:var(--sub); font-weight:400; font-size:13px; margin-left:4px;">· Service Detail</span>
      </div>
      <a href="#contact" id="serviceNavContactBtn" onclick="closeServiceViewAndScrollContact()" class="btn btn-dark magnetic">
        Contact Me
      </a>
    </div>

    <div class="container" style="padding-top: 20px;">
      <!-- Hero Header for Service -->
      <div class="service-header-hero">
        <div class="service-eyebrow" id="srvEyebrow">✦ Core Service Capability</div>
        <div class="service-title-wrap">
          <div class="service-icon-large" id="srvIcon">🎯</div>
          <div>
            <h1 class="service-title" id="srvTitle">Digital Marketing</h1>
            <div class="service-tagline" id="srvTagline">Performance & Brand Growth</div>
          </div>
        </div>
        <p class="service-lead-desc" id="srvDesc">
          Full-funnel digital marketing strategies combining audience segmentation, organic reach, paid performance, and conversion rate optimization.
        </p>
      </div>

      <!-- 1. Services Offered -->
      <div class="service-section-block">
        <div class="service-subhead">Services Offered & Deliverables</div>
        <div class="services-offered-grid" id="srvOfferings"></div>
      </div>

      <!-- 2. Relevant Tools -->
      <div class="service-section-block">
        <div class="service-subhead">Relevant Tools & Technology</div>
        <div class="tools-pills-wrap" id="srvTools"></div>
      </div>

      <!-- 3. Example / Work Case Study -->
      <div class="service-section-block">
        <div class="service-subhead">Featured Case Study & Measurable Impact</div>
        <div class="service-work-card" id="srvWorkCard">
          <div class="service-work-info">
            <h3 id="srvWorkTitle">Project Name</h3>
            <p id="srvWorkDesc">Description of the project outcome.</p>
            <div class="service-deliverables-list" id="srvDeliverables"></div>
          </div>
          <div class="service-work-metric-box">
            <div class="metric-big-num" id="srvMetricVal">3.4x</div>
            <div class="metric-big-label" id="srvMetricLabel">Average ROAS</div>
          </div>
        </div>
      </div>

      <!-- 4. Contact Banner -->
      <div class="service-cta-banner">
        <div>
          <h3 id="srvCtaHeading">Ready to scale with this service?</h3>
          <p>Let's collaborate to build high-converting systems, memorable brand identities, and modern digital products.</p>
        </div>
        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <button class="btn btn-outline" style="color: #FFFFFF; border-color: rgba(255, 255, 255, 0.35);" onclick="closeServiceView()">
            ← Back to Portfolio
          </button>
          <a href="#contact" id="srvContactBtn" onclick="closeServiceViewAndScrollContact()" class="btn btn-white magnetic">
            Contact Me →
          </a>
        </div>
      </div>
    </div>
  </div>


  <!-- DEDICATED PROJECT DETAIL VIEW (FULL-PAGE SMOOTH OVERLAY) -->
  <div class="project-detail-view" id="projectDetailView" aria-hidden="true" role="dialog" aria-modal="true">
    <!-- Top Sticky Nav Bar -->
    <div class="project-nav-bar">
      <button class="btn btn-outline magnetic" onclick="closeProjectView()" aria-label="Return to selected work">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Projects
      </button>

      <div class="project-nav-brand">
        Krish Kumar <span style="color:var(--sub); font-weight:400; font-size:13px; margin-left:4px;">· Case Study</span>
      </div>

      <div class="project-nav-actions" style="display: flex; gap: 10px; align-items: center;">
        <a id="navLiveProjectBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-outline magnetic" style="font-size: 13px; padding: 10px 18px;">
          Live Site ↗
        </a>
        <a href="#contact" onclick="closeProjectViewAndScrollContact()" class="btn btn-dark magnetic" style="font-size: 13px; padding: 10px 18px;">
          Let's Talk
        </a>
      </div>
    </div>

    <div class="container" style="padding-top: 24px;">
      <!-- Project Header / Hero -->
      <div class="project-header-hero">
        <div class="project-eyebrow-wrap">
          <div class="project-eyebrow">
            <span id="prjNum">01</span> / <span id="prjCategory">Growth & Acquisition</span>
          </div>
          <span class="project-status-pill" id="prjTimelineBadge">2025 · 4 Months</span>
        </div>

        <h1 class="project-view-title" id="prjTitle">Digital Marketing Campaign</h1>
        <div class="project-view-tagline" id="prjTagline">Full-Funnel Paid Acquisition & Scaled Conversion Telemetry</div>

        <!-- Metadata Strip: Role, Client/Domain, Timeline, Live Link -->
        <div class="project-meta-strip">
          <div class="project-meta-item">
            <span class="project-meta-label">Role</span>
            <span class="project-meta-val" id="prjRole">Lead Growth Strategist</span>
          </div>
          <div class="project-meta-item">
            <span class="project-meta-label">Client / Industry</span>
            <span class="project-meta-val" id="prjClient">FinTech Global</span>
          </div>
          <div class="project-meta-item">
            <span class="project-meta-label">Timeline</span>
            <span class="project-meta-val" id="prjTimeline">Q3-Q4 2025</span>
          </div>
          <div class="project-meta-item">
            <span class="project-meta-label">Live Link</span>
            <a id="prjHeaderLiveLink" href="#" target="_blank" rel="noopener noreferrer" class="project-meta-val" style="color: var(--ink); text-decoration: underline; display: flex; align-items: center; gap: 4px;">
              <span id="prjHeaderLiveText">Visit Website</span> ↗
            </a>
          </div>
        </div>
      </div>

      <!-- Section 1: Project Overview -->
      <div class="project-section-block">
        <div class="project-subhead">Project Overview</div>
        <p class="project-overview-text" id="prjOverview">
          Detailed overview of the case study...
        </p>
      </div>

      <!-- Section 2: Objective & Core Challenges -->
      <div class="project-section-block">
        <div class="project-subhead">Objectives & Challenges</div>
        <div class="project-dual-cards">
          <div class="project-info-card">
            <h4>
              <span style="font-size: 18px;">🎯</span> Project Objective
            </h4>
            <p id="prjObjective">Core targets and goals...</p>
          </div>
          <div class="project-info-card">
            <h4>
              <span style="font-size: 18px;">⚡</span> Core Challenges
            </h4>
            <p id="prjChallenges">Bottlenecks and design problems overcome...</p>
          </div>
        </div>
      </div>

      <!-- Section 3: Strategy & Execution Framework -->
      <div class="project-section-block">
        <div class="project-subhead">Strategic Approach & Execution</div>
        <p class="project-overview-text" id="prjStrategy" style="margin-bottom: 24px;">Strategic framework...</p>
        <div class="project-strategy-steps" id="prjStrategyPillars">
          <!-- Dynamically populated 3-pillar cards -->
        </div>
      </div>

      <!-- Section 4: Services / Work Done -->
      <div class="project-section-block">
        <div class="project-subhead">Services / Work Done</div>
        <div class="project-work-grid" id="prjWorkDone">
          <!-- Dynamically populated deliverable cards -->
        </div>
      </div>

      <!-- Section 5: Tools Used -->
      <div class="project-section-block">
        <div class="project-subhead">Tools & Technologies Used</div>
        <div class="tools-pills-wrap" id="prjTools">
          <!-- Dynamically populated tool pills -->
        </div>
      </div>

      <!-- Section 6: Images / Screenshots Showcase -->
      <div class="project-section-block">
        <div class="project-subhead">Visual Showcase & Screenshots</div>
        <p style="color: var(--sub); font-size: 14px; margin-bottom: 24px;">
          High-fidelity design screens, campaign creative variations, and performance dashboards.
        </p>
        <div class="screenshots-grid" id="prjScreenshots">
          <!-- Dynamically populated screenshot cards with device chrome and captions -->
        </div>
      </div>

      <!-- Section 7: Results & Key Metrics -->
      <div class="project-section-block">
        <div class="project-subhead">Results & Measurable Impact</div>
        <div class="project-results-grid" id="prjResults">
          <!-- Dynamically populated stat metric cards -->
        </div>
      </div>

      <!-- Section 8: Live Project / Website Link & CTA Banner -->
      <div class="project-live-banner">
        <div>
          <span style="display:inline-block; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.16em; opacity:0.8; margin-bottom:8px;">Experience The Work</span>
          <h3 id="prjCtaHeading">Ready to explore the live project?</h3>
          <p id="prjCtaSubtext">Check out the live deployment or interactive prototype to see the full experience in action.</p>
        </div>
        <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
          <a id="prjLiveBannerBtn" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-white magnetic">
            <span id="prjLiveBannerBtnText">Visit Live Website ↗</span>
          </a>
          <a href="#contact" onclick="closeProjectViewAndScrollContact()" class="btn btn-outline" style="color: #FFFFFF; border-color: rgba(255, 255, 255, 0.4);">
            Discuss Similar Project →
          </a>
        </div>
      </div>

      <!-- Bottom Navigation: Back to Projects & Prev/Next Switcher -->
      <div class="project-bottom-nav">
        <button class="btn btn-outline magnetic" onclick="closeProjectView()">
          ← Back to Selected Work
        </button>

        <div style="display: flex; gap: 12px; align-items: center;">
          <button class="btn btn-outline magnetic" id="prjPrevBtn" onclick="navigateProject('prev')">
            ← Previous Project
          </button>
          <button class="btn btn-dark magnetic" id="prjNextBtn" onclick="navigateProject('next')">
            Next Project →
          </button>
        </div>
      </div>
    </div>
  </div>


  <!-- =========================================================================
       DEDICATED BLOG PAGE VIEW (/blog)
       ========================================================================= -->
  <div class="blog-page-view" id="blogPageView" aria-hidden="true" role="dialog" aria-modal="true">
    <!-- Sticky Blog Top Nav Bar -->
    <div class="blog-nav-bar">
      <button class="btn btn-outline magnetic" onclick="closeBlogView()" aria-label="Return to portfolio">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Portfolio
      </button>

      <div class="blog-nav-brand">
        Krish Kumar <span style="color:var(--sub); font-weight:400; font-size:13px; margin-left:4px;">· Blog & Insights</span>
      </div>

      <div style="display: flex; gap: 10px; align-items: center;">
        <a href="#contact" onclick="closeBlogViewAndScrollContact()" class="btn btn-dark magnetic" style="font-size: 13px; padding: 10px 18px;">
          Let's Talk
        </a>
      </div>
    </div>

    <div class="container" style="padding-top: 24px;">
      <!-- Blog Hero Header -->
      <div class="blog-hero-header">
        <div class="blog-eyebrow">✦ Thoughts, Case Studies & Insights</div>
        <h1 class="blog-view-title">Articles & Publications</h1>
        <p class="blog-view-tagline">
          Perspectives on scaling high-ROAS paid media funnels, architecting design tokens in Figma, practical AI workflows for marketing teams, and frictionless mobile conversion rates.
        </p>

        <!-- Search & Category Filters -->
        <div class="blog-controls-wrap">
          <div class="blog-search-box">
            <span class="blog-search-icon">🔍</span>
            <input type="text" id="blogSearchInput" class="blog-search-input" placeholder="Search articles by title, topic, or keyword..." oninput="searchBlogArticles(this.value)" />
          </div>

          <div class="blog-categories-bar" id="blogCategoryFilters">
            <button class="cat-filter-btn active" data-cat="all" onclick="filterBlogByCategory('all')">All Articles</button>
            <button class="cat-filter-btn" data-cat="Growth & Acquisition" onclick="filterBlogByCategory('Growth & Acquisition')">Growth & Acquisition</button>
            <button class="cat-filter-btn" data-cat="UI/UX & Systems" onclick="filterBlogByCategory('UI/UX & Systems')">UI/UX & Systems</button>
            <button class="cat-filter-btn" data-cat="AI Tools & Strategy" onclick="filterBlogByCategory('AI Tools & Strategy')">AI Tools & Strategy</button>
            <button class="cat-filter-btn" data-cat="Conversion Optimization" onclick="filterBlogByCategory('Conversion Optimization')">Conversion & CRO</button>
            <button class="cat-filter-btn" data-cat="Branding & Creative" onclick="filterBlogByCategory('Branding & Creative')">Branding & Creative</button>
          </div>
        </div>
      </div>

      <!-- Featured / Latest Article Container -->
      <div id="blogFeaturedWrap">
        <!-- Dynamically injected featured article -->
      </div>

      <!-- All Articles Grid -->
      <div style="margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between;">
        <h3 style="font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sub);" id="blogGridHeading">
          All Articles
        </h3>
        <span style="font-size: 13px; font-weight: 600; color: var(--sub);" id="blogArticleCount">Showing 5 articles</span>
      </div>

      <div class="blog-grid" id="blogGrid">
        <!-- Dynamically injected article cards -->
      </div>

      <!-- Collaboration Banner -->
      <div class="project-live-banner" style="margin-top: 30px;">
        <div>
          <span style="display:inline-block; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.16em; opacity:0.8; margin-bottom:8px;">Collaboration & Inquiries</span>
          <h3 style="font-size: clamp(24px, 3.2vw, 36px); margin-bottom: 8px;">Have a project or campaign in mind?</h3>
          <p style="font-size: 15px; color: rgba(255,255,255,0.75);">Let's collaborate to build high-converting growth systems, memorable branding, and modern digital interfaces.</p>
        </div>
        <div style="display: flex; gap: 14px; align-items: center;">
          <a href="#contact" onclick="closeBlogViewAndScrollContact()" class="btn btn-white magnetic">
            Get in Touch →
          </a>
        </div>
      </div>

      <!-- Bottom Back Button -->
      <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--line); display: flex; justify-content: flex-start;">
        <button class="btn btn-outline magnetic" onclick="closeBlogView()">
          ← Back to Portfolio
        </button>
      </div>
    </div>
  </div>

  <!-- =========================================================================
       DEDICATED ARTICLE PAGE VIEW (/blog/:slug)
       ========================================================================= -->
  <div class="article-page-view" id="articlePageView" aria-hidden="true" role="dialog" aria-modal="true">
    <!-- Reading Progress Bar -->
    <div class="reading-progress-bar" id="articleProgressBar"></div>

    <!-- Sticky Article Top Nav Bar -->
    <div class="blog-nav-bar">
      <button class="btn btn-outline magnetic" onclick="backToBlog()" aria-label="Return to all blog articles">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Blog
      </button>

      <div class="blog-nav-brand" id="artNavTitle" style="max-width: 400px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        Krish Kumar <span style="color:var(--sub); font-weight:400; font-size:13px; margin-left:4px;">· Article</span>
      </div>

      <div style="display: flex; gap: 10px; align-items: center;">
        <button class="btn btn-outline magnetic" id="shareArticleBtn" onclick="copyArticleLink()" style="font-size: 13px; padding: 10px 16px;">
          <span id="shareBtnText">Share ↗</span>
        </button>
        <button class="btn btn-dark magnetic" onclick="closeArticleViewToPortfolio()" style="font-size: 13px; padding: 10px 16px;">
          Portfolio
        </button>
      </div>
    </div>

    <div class="container">
      <article class="article-container-inner">
        <!-- Article Header -->
        <div style="margin-top: 10px;">
          <div class="article-category-badge" id="artCategoryBadge">Growth & Acquisition</div>
          <h1 class="article-single-title" id="artTitle">Article Headline</h1>
          <p class="article-single-tagline" id="artTagline">Article Tagline and thesis statement.</p>

          <!-- Author Card -->
          <div class="article-author-card">
            <div class="author-info-left">
              <div class="author-avatar-circle" id="artAuthorAvatar">KK</div>
              <div>
                <div class="author-name-text" id="artAuthorName">Krish Kumar</div>
                <div class="author-role-text" id="artAuthorRole">Digital Marketer & Creative Strategist</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 700; color: var(--sub); text-transform: uppercase;">
              <span id="artDate">October 18, 2025</span>
              <span>·</span>
              <span id="artReadTime">7 min read</span>
            </div>
          </div>

          <!-- Cover Banner Visual -->
          <div class="article-hero-banner" id="artCoverBanner">
            <div class="featured-badge-pill" id="artCoverBadge">Paid Media Strategy</div>
          </div>
        </div>

        <!-- Article Rich Content Body -->
        <div class="article-body-content" id="artBody">
          <!-- Dynamically populated formatted content -->
        </div>

        <!-- Tags List -->
        <div class="article-footer-meta">
          <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sub); margin-bottom: 12px;">Tags</div>
          <div class="post-tags-list" id="artTags">
            <!-- Dynamically populated tags -->
          </div>

          <!-- Share & Back row -->
          <div class="share-row">
            <button class="btn btn-outline magnetic" onclick="backToBlog()">
              ← Back to All Articles
            </button>
            <button class="btn btn-dark magnetic" onclick="copyArticleLink()">
              <span id="shareBtnTextBottom">Copy Article Link ↗</span>
            </button>
          </div>

          <!-- Next Article Recommendation Card -->
          <div class="next-article-card" id="artNextCard" onclick="openNextArticle()">
            <div>
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--sub); margin-bottom: 6px;">Next Article</div>
              <h4 style="font-size: 18px; font-weight: 800; color: var(--ink); margin-bottom: 4px;" id="artNextTitle">Next Article Title</h4>
              <p style="font-size: 13px; color: var(--sub); margin: 0;" id="artNextMeta">Category · Read Time</p>
            </div>
            <span style="font-size: 18px; font-weight: 700; color: var(--ink); flex-shrink: 0;">Read Article →</span>
          </div>

          <!-- In-Article Consultation Banner -->
          <div class="project-live-banner" style="margin-top: 48px;">
            <div>
              <span style="display:inline-block; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.16em; opacity:0.8; margin-bottom:8px;">Ready to Elevate Your Brand?</span>
              <h3 style="font-size: clamp(22px, 3vw, 32px); margin-bottom: 8px;">Let's build your next growth campaign.</h3>
              <p style="font-size: 14.5px; color: rgba(255,255,255,0.75);">From full-funnel digital marketing to scalable Figma design systems and AI workflows.</p>
            </div>
            <div style="display: flex; gap: 14px; align-items: center;">
              <a href="#contact" onclick="closeArticleViewAndScrollContact()" class="btn btn-white magnetic">
                Contact Me →
              </a>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>

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
    function initMagneticButtons() {
      const magneticBtns = document.querySelectorAll('.magnetic:not([data-magnetic-init])');
      magneticBtns.forEach(btn => {
        btn.setAttribute('data-magnetic-init', 'true');
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const moveX = x * 0.3;
          const moveY = y * 0.3;
          btn.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = 'translate(0px, 0px)';
        });
      });
    }
    initMagneticButtons();

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


    // 9. DEDICATED SERVICE DETAIL PAGES & SMOOTH TRANSITIONS

    
    // =========================================================================
    // BLOG DATABASE & CONTROLLER LOGIC (/blog and /blog/:slug)
    // =========================================================================
    const blogDatabase = ${JSON.stringify(blogData, null, 2)};

    const blogPageView = document.getElementById('blogPageView');
    const articlePageView = document.getElementById('articlePageView');
    const articleProgressBar = document.getElementById('articleProgressBar');

    let currentArticleSlug = '';
    let currentBlogCategory = 'all';
    let currentBlogSearch = '';

    // Track scroll in article view to update reading progress bar
    if (articlePageView) {
      articlePageView.addEventListener('scroll', () => {
        const totalHeight = articlePageView.scrollHeight - articlePageView.clientHeight;
        if (totalHeight > 0) {
          const progress = (articlePageView.scrollTop / totalHeight) * 100;
          if (articleProgressBar) {
            articleProgressBar.style.width = Math.min(100, Math.max(0, progress)) + '%';
          }
        }
      }, { passive: true });
    }

    // Render Blog Articles into Grid and Featured Hero
    function renderBlogGrid(category = 'all', searchQuery = '') {
      currentBlogCategory = category;
      currentBlogSearch = searchQuery.toLowerCase().trim();

      const featuredContainer = document.getElementById('blogFeaturedWrap');
      const gridContainer = document.getElementById('blogGrid');
      const countEl = document.getElementById('blogArticleCount');
      if (!gridContainer) return;

      const allSlugs = Object.keys(blogDatabase);
      const filtered = allSlugs.filter(slug => {
        const item = blogDatabase[slug];
        const matchCategory = category === 'all' || item.category === category;
        const matchSearch = !currentBlogSearch ||
          item.title.toLowerCase().includes(currentBlogSearch) ||
          item.shortDescription.toLowerCase().includes(currentBlogSearch) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(currentBlogSearch)));
        return matchCategory && matchSearch;
      });

      if (countEl) {
        countEl.textContent = 'Showing ' + filtered.length + ' article' + (filtered.length === 1 ? '' : 's');
      }

      // If no search and category is 'all', show first article as Featured
      if (category === 'all' && !currentBlogSearch && filtered.length > 0) {
        const featSlug = filtered[0];
        const feat = blogDatabase[featSlug];
        if (featuredContainer) {
          featuredContainer.innerHTML = '<article class="featured-post-card" data-slug="' + featSlug + '" onclick="openArticleView(this.dataset.slug)" role="button" tabindex="0" onkeydown="if(event.keyCode===13||event.keyCode===32) openArticleView(this.dataset.slug)" aria-label="Read featured article: ' + feat.title.replace(/"/g, '&quot;') + '">' +
              '<div class="featured-cover-visual" style="background: ' + (feat.coverGradient || 'linear-gradient(135deg, #111116 0%, #2A2A38 100%)') + '">' +
                '<span class="featured-badge-pill">✦ Featured · ' + (feat.coverBadge || feat.category) + '</span>' +
                '<div class="featured-cover-pattern">' +
                  '<div class="pattern-bar-faint" style="width: 80%;"></div>' +
                  '<div class="pattern-bar-faint" style="width: 50%;"></div>' +
                  '<div class="pattern-bar-faint" style="width: 65%;"></div>' +
                '</div>' +
              '</div>' +
              '<div class="featured-content-body">' +
                '<div class="post-meta-row">' +
                  '<span>' + feat.date + '</span>' +
                  '<span class="post-meta-dot"></span>' +
                  '<span>' + feat.readTime + '</span>' +
                '</div>' +
                '<h2 class="featured-post-title">' + feat.title + '</h2>' +
                '<p class="featured-post-desc">' + feat.shortDescription + '</p>' +
                '<div class="post-tags-list">' +
                  (feat.tags || []).map(function(t) { return '<span class="post-tag-chip">#' + t + '</span>'; }).join('') +
                '</div>' +
                '<button type="button" class="read-blog-btn" data-slug="' + featSlug + '" onclick="event.stopPropagation(); openArticleView(this.dataset.slug);">' +
                  'Read Blog →' +
                '</button>' +
              '</div>' +
            '</article>';
        }
        // Remaining articles in grid
        const remaining = filtered.slice(1);
        gridContainer.innerHTML = '';
        if (remaining.length === 0) {
          gridContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 30px; text-align: center; color: var(--sub);">No additional articles in this view.</div>';
        } else {
          remaining.forEach(slug => {
            gridContainer.appendChild(createArticleCardElement(slug, blogDatabase[slug]));
          });
        }
      } else {
        // Hide or clear featured container if filtering
        if (featuredContainer) featuredContainer.innerHTML = '';
        gridContainer.innerHTML = '';
        if (filtered.length === 0) {
          gridContainer.innerHTML = '<div style="grid-column: 1/-1; padding: 48px; text-align: center; color: var(--sub); background: var(--bg2); border-radius: var(--radius-md); border: 1px dashed var(--line);">No articles found matching your criteria. Try another keyword or category.</div>';
        } else {
          filtered.forEach(slug => {
            gridContainer.appendChild(createArticleCardElement(slug, blogDatabase[slug]));
          });
        }
      }
    }

    function createArticleCardElement(slug, post) {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Read article: ' + post.title);
      card.onclick = () => openArticleView(slug);
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') openArticleView(slug);
      };

      const tagsHtml = (post.tags || []).slice(0, 3).map(t => '<span class="post-tag-chip">#' + t + '</span>').join('');

      card.innerHTML = '<div class="article-cover-frame" style="background: ' + (post.coverGradient || 'linear-gradient(135deg, #1C1C24 0%, #353545 100%)') + '">' +
          '<span class="featured-badge-pill" style="font-size: 10px; padding: 4px 10px;">' + (post.coverBadge || post.category) + '</span>' +
          '<div style="display: flex; gap: 6px;">' +
            '<div style="height: 4px; width: 40px; background: rgba(255,255,255,0.2); border-radius: 2px;"></div>' +
            '<div style="height: 4px; width: 24px; background: rgba(255,255,255,0.15); border-radius: 2px;"></div>' +
          '</div>' +
        '</div>' +
        '<div class="article-card-body">' +
          '<div class="post-meta-row" style="margin-bottom: 10px;">' +
            '<span>' + post.date + '</span>' +
            '<span class="post-meta-dot"></span>' +
            '<span>' + post.readTime + '</span>' +
          '</div>' +
          '<h3 class="article-card-title">' + post.title + '</h3>' +
          '<p class="article-card-desc">' + post.shortDescription + '</p>' +
          '<div class="post-tags-list" style="margin-bottom: 18px;">' +
            tagsHtml +
          '</div>' +
          '<button type="button" class="read-blog-btn" data-slug="' + slug + '" onclick="event.stopPropagation(); openArticleView(this.dataset.slug);">' +
            'Read Blog →' +
          '</button>' +
        '</div>';
      return card;
    }

    function filterBlogByCategory(cat) {
      document.querySelectorAll('.cat-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cat') === cat);
      });
      renderBlogGrid(cat, currentBlogSearch);
    }

    function searchBlogArticles(val) {
      renderBlogGrid(currentBlogCategory, val);
    }

    // OPEN BLOG VIEW (/blog)
    function openBlogView(pushState = true) {
      // Close other modals if open
      if (projectDetailView && projectDetailView.classList.contains('active')) closeProjectView(false);
      if (serviceDetailView && serviceDetailView.classList.contains('active')) closeServiceView();
      if (articlePageView && articlePageView.classList.contains('active')) articlePageView.classList.remove('active');

      renderBlogGrid(currentBlogCategory, currentBlogSearch);

      document.body.classList.add('blog-view-open');
      document.body.classList.remove('article-view-open');
      blogPageView.setAttribute('aria-hidden', 'false');
      blogPageView.classList.add('active');
      blogPageView.scrollTop = 0;

      if (pushState) {
        window.history.pushState({ view: 'blog' }, '', '/blog');
      }
      initMagneticButtons();
    }

    function closeBlogView(pushState = true) {
      if (!blogPageView) return;
      blogPageView.classList.remove('active');
      blogPageView.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('blog-view-open');

      if (pushState) {
        window.history.pushState(null, '', '/');
      }
    }

    function closeBlogViewAndScrollContact() {
      closeBlogView(false);
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // OPEN ARTICLE VIEW (/blog/:slug)
    function openArticleView(slug, pushState = true) {
      const article = blogDatabase[slug];
      if (!article) {
        openBlogView(pushState);
        return;
      }

      currentArticleSlug = slug;

      // Close blog listing view overlay
      if (blogPageView) blogPageView.classList.remove('active');
      if (projectDetailView) projectDetailView.classList.remove('active');

      // Populate Article Details
      document.getElementById('artNavTitle').innerHTML = 'Krish Kumar <span style="color:var(--sub); font-weight:400; font-size:13px; margin-left:4px;">· ' + article.title + '</span>';
      document.getElementById('artCategoryBadge').textContent = article.category;
      document.getElementById('artTitle').textContent = article.title;
      document.getElementById('artTagline').textContent = article.tagline;

      document.getElementById('artAuthorAvatar').textContent = (article.author && article.author.avatar) || 'KK';
      document.getElementById('artAuthorName').textContent = (article.author && article.author.name) || 'Krish Kumar';
      document.getElementById('artAuthorRole').textContent = (article.author && article.author.role) || 'Digital Marketer & Creative Strategist';

      document.getElementById('artDate').textContent = article.date;
      document.getElementById('artReadTime').textContent = article.readTime;
      document.getElementById('artCoverBadge').textContent = article.coverBadge || article.category;

      const coverBanner = document.getElementById('artCoverBanner');
      if (coverBanner) {
        coverBanner.style.background = article.coverGradient || 'linear-gradient(135deg, #111116 0%, #2A2A38 100%)';
      }

      // Render Rich Content
      const bodyContainer = document.getElementById('artBody');
      bodyContainer.innerHTML = '';

      if (article.content && Array.isArray(article.content)) {
        article.content.forEach(block => {
          if (block.type === 'lead') {
            const p = document.createElement('p');
            p.className = 'lead-p';
            p.innerHTML = block.text;
            bodyContainer.appendChild(p);
          } else if (block.type === 'heading') {
            const h = document.createElement(block.level === 3 ? 'h3' : 'h2');
            h.textContent = block.text;
            bodyContainer.appendChild(h);
          } else if (block.type === 'paragraph') {
            const p = document.createElement('p');
            p.innerHTML = block.text;
            bodyContainer.appendChild(p);
          } else if (block.type === 'callout') {
            const box = document.createElement('div');
            box.className = 'article-callout-box';
            box.innerHTML = '<div class="callout-title">✦ ' + block.title + '</div><p class="callout-body">' + block.text + '</p>';
            bodyContainer.appendChild(box);
          } else if (block.type === 'quote') {
            const qBox = document.createElement('div');
            qBox.className = 'article-quote-box';
            qBox.innerHTML = '<blockquote>“' + block.quote + '”</blockquote>' + (block.author ? '<cite>— ' + block.author + '</cite>' : '');
            bodyContainer.appendChild(qBox);
          } else if (block.type === 'list') {
            const ul = document.createElement('ul');
            ul.className = 'article-bullets';
            block.items.forEach(item => {
              const li = document.createElement('li');
              li.innerHTML = item;
              ul.appendChild(li);
            });
            bodyContainer.appendChild(ul);
          }
        });
      }

      // Populate Tags
      const tagsContainer = document.getElementById('artTags');
      tagsContainer.innerHTML = '';
      (article.tags || []).forEach(t => {
        const chip = document.createElement('span');
        chip.className = 'post-tag-chip';
        chip.textContent = '#' + t;
        tagsContainer.appendChild(chip);
      });

      // Next Article Recommendation
      const allSlugs = Object.keys(blogDatabase);
      const currentIndex = allSlugs.indexOf(slug);
      const nextIndex = (currentIndex + 1) % allSlugs.length;
      const nextSlug = allSlugs[nextIndex];
      const nextPost = blogDatabase[nextSlug];

      const nextCard = document.getElementById('artNextCard');
      if (nextCard && nextPost) {
        document.getElementById('artNextTitle').textContent = nextPost.title;
        document.getElementById('artNextMeta').textContent = nextPost.category + ' · ' + nextPost.readTime;
        nextCard.setAttribute('data-next-slug', nextSlug);
      }

      // Reset Share button text
      const shareBtnText = document.getElementById('shareBtnText');
      if (shareBtnText) shareBtnText.textContent = 'Share ↗';
      const shareBtnTextBottom = document.getElementById('shareBtnTextBottom');
      if (shareBtnTextBottom) shareBtnTextBottom.textContent = 'Copy Article Link ↗';

      // Reset reading progress bar
      if (articleProgressBar) articleProgressBar.style.width = '0%';

      // Show view
      document.body.classList.add('article-view-open');
      document.body.classList.remove('blog-view-open');
      articlePageView.setAttribute('aria-hidden', 'false');
      articlePageView.classList.add('active');
      articlePageView.scrollTop = 0;

      if (pushState) {
        window.history.pushState({ view: 'article', slug }, '', '/blog/' + slug);
      }
      initMagneticButtons();
    }

    function openNextArticle() {
      const nextCard = document.getElementById('artNextCard');
      const nextSlug = nextCard ? nextCard.getAttribute('data-next-slug') : '';
      if (nextSlug) {
        openArticleView(nextSlug, true);
      }
    }

    function backToBlog() {
      if (articlePageView) {
        articlePageView.classList.remove('active');
        articlePageView.setAttribute('aria-hidden', 'true');
      }
      openBlogView(true);
    }

    function closeArticleViewToPortfolio() {
      if (articlePageView) {
        articlePageView.classList.remove('active');
        articlePageView.setAttribute('aria-hidden', 'true');
      }
      document.body.classList.remove('article-view-open');
      window.history.pushState(null, '', '/');
    }

    function closeArticleViewAndScrollContact() {
      closeArticleViewToPortfolio();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    function copyArticleLink() {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          const shareBtnText = document.getElementById('shareBtnText');
          if (shareBtnText) shareBtnText.textContent = 'Copied! ✓';
          const shareBtnTextBottom = document.getElementById('shareBtnTextBottom');
          if (shareBtnTextBottom) shareBtnTextBottom.textContent = 'Link Copied to Clipboard! ✓';
          setTimeout(() => {
            if (shareBtnText) shareBtnText.textContent = 'Share ↗';
            if (shareBtnTextBottom) shareBtnTextBottom.textContent = 'Copy Article Link ↗';
          }, 3000);
        }).catch(() => {});
      }
    }

    // Global Window bindings for Blog & Article Views
    window.openBlogView = openBlogView;
    window.closeBlogView = closeBlogView;
    window.closeBlogViewAndScrollContact = closeBlogViewAndScrollContact;
    window.openArticleView = openArticleView;
    window.openNextArticle = openNextArticle;
    window.backToBlog = backToBlog;
    window.closeArticleViewToPortfolio = closeArticleViewToPortfolio;
    window.closeArticleViewAndScrollContact = closeArticleViewAndScrollContact;
    window.filterBlogByCategory = filterBlogByCategory;
    window.searchBlogArticles = searchBlogArticles;
    window.copyArticleLink = copyArticleLink;


    // =========================================================================
    // EASY-TO-EDIT PROJECTS DATABASE
    // To update or replace any project's text, images, screenshots, tools, or links:
    // Simply modify the fields below in projectsDatabase.
    // To add your own screenshot image: set image: "https://your-image-url.com/image.jpg"
    // or use a base64 data URI. If left blank, a clean editorial mockup is generated.
    // =========================================================================
    const projectsDatabase = ${JSON.stringify(projectsData, null, 2)};

    const projectDetailView = document.getElementById('projectDetailView');
    let currentOpenProjectId = null;
    let previousProjectScrollPosition = 0;

    function openProjectView(projectId) {
      const data = projectsDatabase[projectId];
      if (!data || !projectDetailView) return;

      currentOpenProjectId = projectId;
      previousProjectScrollPosition = window.scrollY;

      // Populate Header
      document.getElementById('prjNum').textContent = data.number || '01';
      document.getElementById('prjCategory').textContent = data.category || 'Featured Case Study';
      document.getElementById('prjTimelineBadge').textContent = data.timelineBadge || data.timeline || '2025';
      document.getElementById('prjTitle').textContent = data.title;
      document.getElementById('prjTagline').textContent = data.tagline;
      document.getElementById('prjRole').textContent = data.role;
      document.getElementById('prjClient').textContent = data.client;
      document.getElementById('prjTimeline').textContent = data.timeline;

      // Live links
      const liveUrl = data.liveUrl || '#';
      const liveUrlText = data.liveUrlText || 'Visit Live Project';
      const prjHeaderLiveLink = document.getElementById('prjHeaderLiveLink');
      const prjHeaderLiveText = document.getElementById('prjHeaderLiveText');
      const navLiveProjectBtn = document.getElementById('navLiveProjectBtn');
      const prjLiveBannerBtn = document.getElementById('prjLiveBannerBtn');
      const prjLiveBannerBtnText = document.getElementById('prjLiveBannerBtnText');

      if (prjHeaderLiveLink) prjHeaderLiveLink.href = liveUrl;
      if (prjHeaderLiveText) prjHeaderLiveText.textContent = liveUrlText;
      if (navLiveProjectBtn) {
        navLiveProjectBtn.href = liveUrl;
        navLiveProjectBtn.style.display = liveUrl && liveUrl !== '#' ? 'inline-flex' : 'none';
      }
      if (prjLiveBannerBtn) prjLiveBannerBtn.href = liveUrl;
      if (prjLiveBannerBtnText) prjLiveBannerBtnText.textContent = liveUrlText + ' ↗';

      // Section 1: Overview
      document.getElementById('prjOverview').textContent = data.overview;

      // Section 2: Objectives & Challenges
      document.getElementById('prjObjective').textContent = data.objective;
      document.getElementById('prjChallenges').textContent = data.challenges;

      // Section 3: Strategy & Execution
      document.getElementById('prjStrategy').textContent = data.strategy;
      const pillarsContainer = document.getElementById('prjStrategyPillars');
      pillarsContainer.innerHTML = '';
      if (data.strategyPillars && data.strategyPillars.length > 0) {
        data.strategyPillars.forEach((p, idx) => {
          const card = document.createElement('div');
          card.className = 'project-strategy-card';
          card.innerHTML = '<div class="strategy-step-num">STRATEGIC PILLAR 0' + (idx + 1) + '</div>' +
            '<div class="strategy-step-title">' + p.title + '</div>' +
            '<div class="strategy-step-desc">' + p.desc + '</div>';
          pillarsContainer.appendChild(card);
        });
      }

      // Section 4: Services / Work Done
      const workDoneContainer = document.getElementById('prjWorkDone');
      workDoneContainer.innerHTML = '';
      if (data.workDone && data.workDone.length > 0) {
        data.workDone.forEach(w => {
          const card = document.createElement('div');
          card.className = 'project-work-item';
          card.innerHTML = '<h4>' + w.title + '</h4><p>' + w.desc + '</p>';
          workDoneContainer.appendChild(card);
        });
      }

      // Section 5: Tools Used
      const toolsContainer = document.getElementById('prjTools');
      toolsContainer.innerHTML = '';
      if (data.tools && data.tools.length > 0) {
        data.tools.forEach(t => {
          const pill = document.createElement('div');
          pill.className = 'project-tool-pill';
          pill.innerHTML = '<span>✦</span> <span>' + t + '</span>';
          toolsContainer.appendChild(pill);
        });
      }

      // Section 6: Screenshots
      const screenshotsContainer = document.getElementById('prjScreenshots');
      screenshotsContainer.innerHTML = '';
      if (data.screenshots && data.screenshots.length > 0) {
        data.screenshots.forEach(s => {
          const card = document.createElement('div');
          card.className = 'screenshot-card';

          let visualContent = '';
          if (s.image) {
            visualContent = '<img src="' + s.image + '" alt="' + s.title + '" class="screenshot-img" loading="lazy" />';
          } else {
            visualContent = '<div class="screenshot-mockup-inner">' +
              '<div class="mockup-window-top">' +
                '<div class="mockup-dots"><span></span><span></span><span></span></div>' +
                '<div class="mockup-address-bar">https://krishkumar.design/work/' + (s.badge || 'preview').toLowerCase() + '</div>' +
              '</div>' +
              '<div class="mockup-screen-body">' +
                '<div class="mockup-bar w-70"></div>' +
                '<div class="mockup-bar w-90"></div>' +
                '<div class="mockup-metric-preview">' +
                  '<div class="mockup-metric-chip">✦ Verified Case Study</div>' +
                  '<div class="mockup-metric-chip">Live Analytics</div>' +
                '</div>' +
                '<div class="mockup-bar w-40"></div>' +
              '</div>' +
            '</div>';
          }

          card.innerHTML = '<div class="screenshot-visual-frame">' + visualContent + '</div>' +
            '<div class="screenshot-body-info">' +
              '<span class="screenshot-badge">' + (s.badge || 'Case Study Asset') + '</span>' +
              '<div class="screenshot-title">' + s.title + '</div>' +
              '<div class="screenshot-caption">' + s.caption + '</div>' +
            '</div>';
          screenshotsContainer.appendChild(card);
        });
      }

      // Section 7: Results
      const resultsContainer = document.getElementById('prjResults');
      resultsContainer.innerHTML = '';
      if (data.results && data.results.length > 0) {
        data.results.forEach(r => {
          const card = document.createElement('div');
          card.className = 'result-metric-card';
          card.innerHTML = '<div class="result-metric-number">' + r.metric + '</div>' +
            '<div class="result-metric-label">' + r.label + '</div>' +
            '<div class="result-metric-desc">' + r.desc + '</div>';
          resultsContainer.appendChild(card);
        });
      }

      // Section 8: CTA Heading & Subtext
      if (data.ctaHeading) {
        document.getElementById('prjCtaHeading').textContent = data.ctaHeading;
      }
      if (data.ctaSubtext) {
        document.getElementById('prjCtaSubtext').textContent = data.ctaSubtext;
      }

      // Activate View
      document.body.classList.add('project-view-open');
      projectDetailView.setAttribute('aria-hidden', 'false');
      projectDetailView.classList.add('active');
      projectDetailView.scrollTop = 0;

      // Re-bind magnetic hover buttons
      if (typeof initMagneticButtons === 'function') {
        initMagneticButtons();
      }

      // Push history state so browser back button returns to portfolio
      if (window.location.hash !== '#project-' + projectId) {
        window.history.pushState({ project: projectId }, '', '#project-' + projectId);
      }
    }

    function closeProjectView() {
      if (!projectDetailView) return;
      projectDetailView.classList.remove('active');
      projectDetailView.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('project-view-open');
      currentOpenProjectId = null;

      if (window.location.hash && window.location.hash.startsWith('#project-')) {
        window.history.pushState(null, '', window.location.pathname + '#work');
      }

      window.scrollTo({ top: previousProjectScrollPosition, behavior: 'instant' });
    }

    function closeProjectViewAndScrollContact() {
      closeProjectView();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    function navigateProject(direction) {
      const projectKeys = Object.keys(projectsDatabase);
      if (!currentOpenProjectId || projectKeys.length <= 1) return;
      const currentIndex = projectKeys.indexOf(currentOpenProjectId);
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % projectKeys.length;
      } else {
        newIndex = (currentIndex - 1 + projectKeys.length) % projectKeys.length;
      }
      openProjectView(projectKeys[newIndex]);
    }

    // Expose functions globally on window
    window.openProjectView = openProjectView;
    window.closeProjectView = closeProjectView;
    window.closeProjectViewAndScrollContact = closeProjectViewAndScrollContact;
    window.navigateProject = navigateProject;


    const servicesDatabase = ${JSON.stringify(servicesData, null, 2)};

    const serviceDetailView = document.getElementById('serviceDetailView');
    let previousScrollPosition = 0;

    function openServiceView(serviceId) {
      const data = servicesDatabase[serviceId];
      if (!data || !serviceDetailView) return;

      previousScrollPosition = window.scrollY;

      // Populate Data
      document.getElementById('srvEyebrow').textContent = data.eyebrow;
      document.getElementById('srvIcon').textContent = data.icon;
      document.getElementById('srvTitle').textContent = data.title;
      document.getElementById('srvTagline').textContent = data.tagline;
      document.getElementById('srvDesc').textContent = data.desc;
      document.getElementById('srvCtaHeading').textContent = data.ctaHeading;

      // Update Contact CTA link subject
      const contactUrl = 'mailto:sachinkumar629076@gmail.com?subject=' + encodeURIComponent('Inquiry: ' + data.title + ' Project with Krish Kumar');
      const srvContactBtn = document.getElementById('srvContactBtn');
      if (srvContactBtn) {
        srvContactBtn.href = contactUrl;
      }

      // Populate Services Offered
      const offeringsContainer = document.getElementById('srvOfferings');
      offeringsContainer.innerHTML = '';
      data.servicesOffered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'offering-card';
        card.innerHTML = '<div class="offering-num">' + item.num + '</div>' +
          '<h4>' + item.title + '</h4>' +
          '<p>' + item.desc + '</p>';
        offeringsContainer.appendChild(card);
      });

      // Populate Tools
      const toolsContainer = document.getElementById('srvTools');
      toolsContainer.innerHTML = '';
      data.tools.forEach(tool => {
        const badge = document.createElement('div');
        badge.className = 'tool-badge';
        badge.innerHTML = '<span>✦</span> <span>' + tool + '</span>';
        toolsContainer.appendChild(badge);
      });

      // Populate Work
      document.getElementById('srvWorkTitle').textContent = data.work.title;
      document.getElementById('srvWorkDesc').textContent = data.work.desc;
      document.getElementById('srvMetricVal').textContent = data.work.metricVal;
      document.getElementById('srvMetricLabel').textContent = data.work.metricLabel;

      const deliverablesContainer = document.getElementById('srvDeliverables');
      deliverablesContainer.innerHTML = '';
      data.work.deliverables.forEach(d => {
        const chip = document.createElement('span');
        chip.className = 'deliverable-chip';
        chip.textContent = d;
        deliverablesContainer.appendChild(chip);
      });

      // Show View with smooth animation
      document.body.classList.add('service-view-open');
      serviceDetailView.setAttribute('aria-hidden', 'false');
      serviceDetailView.classList.add('active');
      serviceDetailView.scrollTop = 0;

      // Re-bind magnetic buttons for newly visible elements
      initMagneticButtons();

      // Push history state so browser back button works
      if (window.location.hash !== '#' + serviceId) {
        window.history.pushState({ service: serviceId }, '', '#' + serviceId);
      }
    }

    function closeServiceView() {
      if (!serviceDetailView) return;
      serviceDetailView.classList.remove('active');
      serviceDetailView.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('service-view-open');

      if (window.location.hash && servicesDatabase[window.location.hash.replace('#', '')]) {
        window.history.pushState(null, '', window.location.pathname);
      }

      // Restore scroll position
      window.scrollTo({ top: previousScrollPosition, behavior: 'instant' });
    }

    window.openServiceView = openServiceView;
    window.closeServiceView = closeServiceView;
    window.closeServiceViewAndScrollContact = closeServiceViewAndScrollContact;

    function closeServiceViewAndScrollContact() {
      closeServiceView();
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }

    // Handle browser popstate / back button for projects, services, blog & articles
    window.addEventListener('popstate', (e) => {
      const pathname = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (e.state && e.state.view === 'article' && e.state.slug && blogDatabase[e.state.slug]) {
        openArticleView(e.state.slug, false);
      } else if (e.state && e.state.view === 'blog') {
        openBlogView(false);
      } else if (pathname.startsWith('/blog/')) {
        const rawSlug = pathname.replace('/blog/', '');
        const slug = rawSlug.endsWith('/') ? rawSlug.slice(0, -1) : rawSlug;
        if (blogDatabase[slug]) openArticleView(slug, false);
      } else if (pathname === '/blog' || hash === 'blog' || hash === '/blog') {
        openBlogView(false);
      } else if (e.state && e.state.project && projectsDatabase[e.state.project]) {
        openProjectView(e.state.project, false);
      } else if (e.state && e.state.service && servicesDatabase[e.state.service]) {
        openServiceView(e.state.service);
      } else {
        // Return to main portfolio view
        if (articlePageView && articlePageView.classList.contains('active')) {
          articlePageView.classList.remove('active');
          document.body.classList.remove('article-view-open');
        }
        if (blogPageView && blogPageView.classList.contains('active')) {
          closeBlogView(false);
        }
        if (projectDetailView && projectDetailView.classList.contains('active')) {
          closeProjectView(false);
        }
        if (serviceDetailView && serviceDetailView.classList.contains('active')) {
          closeServiceView();
        }
      }
    });

    // Router on initial page load (supports /blog, /blog/:slug, hashes, and project IDs)
    window.addEventListener('DOMContentLoaded', () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash.replace('#', '');

      if (pathname.startsWith('/blog/')) {
        const rawSlug = pathname.replace('/blog/', '');
        const slug = rawSlug.endsWith('/') ? rawSlug.slice(0, -1) : rawSlug;
        if (blogDatabase[slug]) {
          openArticleView(slug, false);
          return;
        }
      } else if (pathname === '/blog' || hash === 'blog' || hash === '/blog') {
        openBlogView(false);
        return;
      } else if (hash.startsWith('/blog/')) {
        const rawHashSlug = hash.replace('/blog/', '');
        const slug = rawHashSlug.endsWith('/') ? rawHashSlug.slice(0, -1) : rawHashSlug;
        if (blogDatabase[slug]) {
          openArticleView(slug, false);
          return;
        }
      } else if (hash.startsWith('project-')) {
        const prjId = hash.replace('project-', '');
        if (projectsDatabase[prjId]) openProjectView(prjId, false);
      } else if (projectsDatabase[hash]) {
        openProjectView(hash, false);
      } else if (servicesDatabase[hash]) {
        openServiceView(hash);
      }
    });

    // Allow escape key to close project view or service view
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (projectDetailView && projectDetailView.classList.contains('active')) {
          closeProjectView();
        }
        if (serviceDetailView && serviceDetailView.classList.contains('active')) {
          closeServiceView();
        }
      }
    });

    window.openModal = openModal;
    window.closeModal = closeModal;

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
