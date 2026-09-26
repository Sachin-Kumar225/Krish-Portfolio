const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_portfolio.cjs');
let code = fs.readFileSync(filePath, 'utf8');

console.log('Original code length:', code.length);

// 1. CSS FOR PROJECT DETAIL VIEW
const projectCss = `
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
`;

// Insert projectCss right before </style>
code = code.replace('  </style>', projectCss + '\n  </style>');

// 2. HTML FOR WORK SECTION
const newWorkSection = `  <!-- SELECTED WORK SECTION (#work) -->
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
  </section>`;

// Replace existing Selected Work section
const workStartMarker = '  <!-- SELECTED WORK SECTION (#work) -->';
const certStartMarker = '  <!-- CERTIFICATES SECTION (#certificates) -->';
const workStartIndex = code.indexOf(workStartMarker);
const certStartIndex = code.indexOf(certStartMarker);

if (workStartIndex === -1 || certStartIndex === -1) {
  throw new Error('Could not find work or certificates section markers');
}

code = code.substring(0, workStartIndex) + newWorkSection + '\n\n' + code.substring(certStartIndex);

// 3. HTML FOR DEDICATED PROJECT DETAIL VIEW
const projectDetailViewHtml = `
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
`;

// Insert projectDetailViewHtml right before <!-- DETAIL MODAL -->
code = code.replace('  <!-- DETAIL MODAL -->', projectDetailViewHtml + '\n  <!-- DETAIL MODAL -->');

// 4. JAVASCRIPT LOGIC FOR PROJECTS DATABASE & CONTROLLER
const projectJs = `
    // =========================================================================
    // EASY-TO-EDIT PROJECTS DATABASE
    // To update or replace any project's text, images, screenshots, tools, or links:
    // Simply modify the fields below in \`projectsDatabase\`.
    // To add your own screenshot image: set \`image: "https://your-image-url.com/image.jpg"\`
    // or use a base64 data URI. If left blank, a clean editorial mockup is generated.
    // =========================================================================
    const projectsDatabase = {
      'digital-marketing-campaign': {
        number: '01',
        title: 'Digital Marketing Campaign',
        tagline: 'Full-Funnel Paid Acquisition & Scaled Conversion Telemetry',
        category: 'Growth & Acquisition',
        role: 'Lead Growth Strategist & Campaign Architect',
        client: 'Aura FinTech Global',
        timeline: 'Q3-Q4 2025 · 4 Months',
        timelineBadge: '2025 · 4 Months',
        liveUrl: 'https://example.com/aurafintech-campaign',
        liveUrlText: 'View Campaign Portal',
        overview: 'Engineered a high-performing full-funnel digital marketing engine designed to scale paid subscriber acquisition while maintaining positive unit economics. Synchronized Meta Ads dynamic creative testing with high-intent Google Search capture to build a repeatable lead generation flywheel.',
        objective: 'Achieve a minimum 3.0x return on ad spend (ROAS), decrease customer acquisition cost (CAC) by 30%, and scale qualified monthly subscriber leads past 15,000 without hitting creative fatigue.',
        challenges: 'Elevated ad costs in a crowded financial niche, tightening privacy restrictions (iOS 14+ event loss), and high drop-off on legacy onboarding screens.',
        strategy: 'Deployed a 3-tier audience architecture: Cold Interest/Lookalike testing at Top of Funnel, Problem-Aware educational video carousels at Middle of Funnel, and dynamic retargeting paired with high-converting single-offer landing pages at Bottom of Funnel. Integrated server-side Conversions API (CAPI) for lossless event attribution.',
        strategyPillars: [
          { title: 'Audience Segmentation', desc: 'Segmented cold prospects by financial readiness and problem urgency to tailor creative hooks.' },
          { title: 'Dynamic Creative Testing', desc: 'Automated 12-variant copy and motion asset matrices weekly to identify breakout ad angles.' },
          { title: 'Conversion Rate Optimization', desc: 'Refined mobile checkout UX with one-tap verification and immediate proof indicators.' }
        ],
        workDone: [
          { title: 'Meta & Google Ads Campaign Architecture', desc: 'Structured multi-stage prospecting and retargeting ad sets with continuous automated budget optimization (Advantage+ & Performance Max).' },
          { title: 'Conversion Landing Page Systems', desc: 'Designed and tested 6 tailored landing page variants featuring friction-free form steps and social proof hooks.' },
          { title: 'Creative Ad Production & Copywriting', desc: 'Produced 45+ video scripts, animated motion carousels, and high-CTR static visual cards.' },
          { title: 'Server-Side Tracking & CAPI', desc: 'Configured offline conversion tracking, Google Tag Manager Server Container, and GA4 custom funnel telemetry.' }
        ],
        tools: ['Meta Ads Manager', 'Google Ads', 'Google Analytics 4', 'Looker Studio', 'Figma', 'Zapier', 'Google Tag Manager'],
        screenshots: [
          { title: 'Omnichannel Acquisition Dashboard', caption: 'Consolidated performance telemetry tracking daily ROAS, CAC, and conversion volume across Meta & Search.', badge: 'Analytics', image: '' },
          { title: 'High-Converting Mobile Funnel', caption: 'Frictionless multi-step onboarding screen designed to maximize form completions on mobile browsers.', badge: 'Mobile UX', image: '' },
          { title: 'Dynamic Video & Static Ad Variations', caption: 'Modular creative grid tested across Facebook & Instagram Feeds, Stories, and Reels.', badge: 'Creative Production', image: '' }
        ],
        results: [
          { metric: '3.4x', label: 'Average ROAS', desc: 'Exceeded initial target of 3.0x across a 4-month scale period.' },
          { metric: '18,400+', label: 'Qualified Leads', desc: 'Generated high-intent subscriber signups with 94% lead verification rate.' },
          { metric: '-42%', label: 'Reduction in CAC', desc: 'Lowered per-subscriber acquisition cost through creative iteration and funnel CRO.' },
          { metric: '2.1M', label: 'Targeted Impressions', desc: 'Reached verified target demographic with sub-1% audience saturation.' }
        ],
        ctaHeading: 'Want to scale your acquisition funnels?',
        ctaSubtext: 'Review the live campaign portal or connect directly to build a custom growth engine for your brand.'
      },

      'social-media-strategy': {
        number: '02',
        title: 'Social Media Strategy',
        tagline: 'Community Storytelling, Viral Formats & Organic Brand Authority',
        category: 'Organic Growth & Content',
        role: 'Social Strategist & Creative Content Lead',
        client: 'Nova Wellness & Lifestyle',
        timeline: '6 Months · 2025',
        timelineBadge: '2025 · 6 Months',
        liveUrl: 'https://instagram.com/krishkumar.design',
        liveUrlText: 'View Social Feed & Content',
        overview: 'Developed an organic content engine and cross-platform editorial calendar centered on relatable lifestyle narratives, snackable educational reels, and community interaction.',
        objective: 'Elevate brand awareness, grow engaged follower count from 12k to 50k+, and generate consistent inbound customer interest without relying purely on paid ads.',
        challenges: 'Algorithmic shifts prioritizing short-form video over static graphics, inconsistent initial brand tone, and low audience retention past 3 seconds.',
        strategy: 'Introduced a 3-pillar content formula: 40% Actionable Advice / Hacks, 40% Aesthetic Community Showcase, and 20% Founder Behind-the-Scenes. Implemented sharp 3-second visual hooks, audio-trend mapping, and pinned high-value carousel guides.',
        strategyPillars: [
          { title: 'Visual Pattern Interrupts', desc: 'Created recognizable high-contrast title cards and typographic treatments to freeze thumb scrolling.' },
          { title: 'Community-First DM Funnels', desc: 'Automated resource fulfillment via keyword comment triggers to capture emails instantly.' },
          { title: 'Trend Velocity Timing', desc: 'Monitored breakout audio tracks and viral formats to publish within 24 hours of inflection.' }
        ],
        workDone: [
          { title: 'Cross-Platform Editorial Calendar', desc: 'Built monthly content themes with daily scheduled deliverables across Instagram, TikTok, and LinkedIn.' },
          { title: 'Short-Form Video Production', desc: 'Scripted, edited, and captioned 60+ vertical videos with custom typography and motion pacing.' },
          { title: 'Community Management & DM Automation', desc: 'Set up ManyChat keyword triggers to instantly deliver free resources and product links upon comment request.' },
          { title: 'Influencer Co-Creation Program', desc: 'Partnered with 20 micro-creators for authentic product placements and collaborative reel posts.' }
        ],
        tools: ['Instagram Insights', 'TikTok Studio', 'CapCut Pro', 'Notion', 'Figma', 'ManyChat', 'Canva Pro'],
        screenshots: [
          { title: 'Curated 9-Grid Aesthetic Feed', caption: 'Harmonized visual style with alternate lifestyle imagery and bold typographic carousels.', badge: 'Grid System', image: '' },
          { title: 'High-Retention Video Hook Format', caption: 'Storyboarding and frame pacing engineered for 68%+ watch-through completion rates.', badge: 'Video Content', image: '' },
          { title: 'Automated DM Inbound Flow', caption: 'Seamless engagement funnel transitioning social commentary into newsletter subscribers.', badge: 'Lead Capture', image: '' }
        ],
        results: [
          { metric: '+180%', label: 'Engagement Lift', desc: 'Triple average comments, saves, and shares compared to previous brand benchmark.' },
          { metric: '58,200', label: 'Follower Growth', desc: 'Grew organic following by 380% with verified real-user demographic distribution.' },
          { metric: '4.2M+', label: 'Organic Impressions', desc: 'Accumulated viral video reach without paid media boosting.' },
          { metric: '24%', label: 'Bio Link CTR', desc: 'Turned social profile views into qualified visits to the client\\'s store.' }
        ],
        ctaHeading: 'Ready to build an authentic social community?',
        ctaSubtext: 'Browse the live social grid or get in touch to craft a viral content blueprint for your audience.'
      },

      'performance-marketing': {
        number: '03',
        title: 'Performance Marketing & Growth',
        tagline: 'High-Precision Paid Search, Display Retargeting & Unit Economics',
        category: 'Paid Media & Analytics',
        role: 'Performance Marketing Director',
        client: 'Nexus SaaS Cloud',
        timeline: '5 Months · 2025-2026',
        timelineBadge: '2025 · 5 Months',
        liveUrl: 'https://example.com/nexus-growth',
        liveUrlText: 'View Performance Portal',
        overview: 'Structured end-to-end performance marketing across Google Ads (Search, Performance Max) and LinkedIn B2B Ads to drive enterprise demo requests and free trial activations.',
        objective: 'Drive 400+ qualified B2B demos per month while reducing cost per acquisition (CPA) below $85, scaling spend efficiently across Tier 1 geographic markets.',
        challenges: 'Extremely high cost-per-click ($14-$28) on broad cloud software keywords, long B2B enterprise sales cycles, and multi-decision-maker committee buying patterns.',
        strategy: 'Focused budget on Single Keyword Ad Groups (SKAGs) and high-intent competitor displacement terms. Created matched message-scent landing pages that echoed specific ad headlines directly. Leveraged LinkedIn Matched Audiences targeting verified CTOs and VP Engineers.',
        strategyPillars: [
          { title: 'Competitor Displacement', desc: 'Captured bottom-of-funnel comparison searches with objective feature comparison grids.' },
          { title: 'Message-Scent Matching', desc: 'Synchronized exact ad keywords to customized landing page headlines to maximize Quality Scores.' },
          { title: 'Account-Based Retargeting', desc: 'Retargeted enterprise decision makers with customer video case studies and security whitepapers.' }
        ],
        workDone: [
          { title: 'Google Ads Account Restructuring', desc: 'Reorganized fragmented campaigns into clean high-intent search silos with tight negative keyword lists.' },
          { title: 'B2B LinkedIn Account-Based Advertising', desc: 'Configured ABM targeting for Fortune 1000 accounts with sponsored content and direct message ads.' },
          { title: 'Dynamic Landing Page Personalization', desc: 'Used UTM parameters to dynamically swap company logos and industry use-cases on the destination page.' },
          { title: 'Multi-Touch Attribution Modeling', desc: 'Implemented data-driven attribution in GA4 to properly credit top-of-funnel discovery vs final demo booked.' }
        ],
        tools: ['Google Ads', 'LinkedIn Campaign Manager', 'Google Analytics 4', 'Semrush', 'Figma', 'HubSpot CRM'],
        screenshots: [
          { title: 'Multi-Tier B2B Campaign Structure', caption: 'Hierarchy mapping awareness, consideration, and demo conversion layers across paid channels.', badge: 'Ad Structure', image: '' },
          { title: 'Personalized Landing Page Experience', caption: 'Dynamic headline and testimonial insertion matching search query intent seamlessly.', badge: 'CRO Page', image: '' },
          { title: 'Attribution & Pipeline Telemetry', caption: 'Closed-loop revenue dashboard connecting ad clicks to signed enterprise contracts.', badge: 'Pipeline Viz', image: '' }
        ],
        results: [
          { metric: '4.1x', label: 'Pipeline ROI', desc: 'Generated over $1.4M in pipeline value from $340k media investment.' },
          { metric: '$68', label: 'Average CPA', desc: 'Beat the $85 target cost per demo by 20%, preserving marketing margins.' },
          { metric: '+64%', label: 'Demo Show-Up Rate', desc: 'Automated SMS/email confirmation sequence improved attendance significantly.' },
          { metric: '12.8%', label: 'Landing Page CVR', desc: 'High-intent landing pages converted at more than double industry average (5.2%).' }
        ],
        ctaHeading: 'Need high-performing B2B paid acquisition?',
        ctaSubtext: 'Explore the performance strategy framework or schedule a consultation to optimize your advertising economics.'
      },

      'ui-ux-design': {
        number: '04',
        title: 'UI/UX Design System',
        tagline: 'Modular Design Tokens, Accessible Flows & Interactive Prototyping',
        category: 'Product Design',
        role: 'Lead Product & UI/UX Designer',
        client: 'Kinetix Mobile Health',
        timeline: '3 Months · 2025',
        timelineBadge: '2025 · 3 Months',
        liveUrl: 'https://figma.com/@krishkumar',
        liveUrlText: 'Inspect Figma Prototype',
        overview: 'Re-architected the complete user experience and visual design system for a mobile health and biometric tracking app, delivering 80+ validated screens and a comprehensive Figma design token library.',
        objective: 'Eliminate onboarding drop-off, make complex physiological health metrics easy to interpret at a glance, and achieve WCAG AA contrast accessibility across both Light and Dark modes.',
        challenges: 'Overwhelming medical data charts, fragmented UI components built across different years, and a steep user learning curve during initial device setup.',
        strategy: 'Conducted 16 user discovery interviews and card-sorting exercises. Replaced complicated tables with intuitive visual dials and weekly progress rings. Established an atomic design system in Figma with auto-layout 5.0 and automated color token variables.',
        strategyPillars: [
          { title: 'Progressive Disclosure', desc: 'Showed high-level vital summaries upfront with tap-to-expand granular historical charts.' },
          { title: 'Design Token Scalability', desc: 'Standardized typography, radius, spacing, and semantic color scales for seamless handoff.' },
          { title: 'Micro-Interaction Polish', desc: 'Engineered haptic feedback triggers and animated state transitions to reward daily check-ins.' }
        ],
        workDone: [
          { title: 'User Research & Heuristic Audit', desc: 'Identified friction hotspots and mapped end-to-end user journeys for 3 distinct patient personas.' },
          { title: 'Atomic Figma Design System', desc: 'Crafted 250+ responsive components with variant properties, hover/press states, and interactive variables.' },
          { title: 'High-Fidelity Interactive Prototype', desc: 'Constructed clickable micro-interactions and animated screen transitions for usability testing sessions.' },
          { title: 'Design-to-Code Developer Handoff', desc: 'Documented component specs, CSS tokens, spacing increments, and iOS/Android native guidelines.' }
        ],
        tools: ['Figma', 'FigJam', 'ProtoPie', 'Maze Usability', 'Lottie', 'Tailwind CSS'],
        screenshots: [
          { title: 'Biometric Dashboard Mobile UI', caption: 'Clean circular progress gauges and sparkline graphs visualizing heart rate and sleep cycles.', badge: 'Mobile App', image: '' },
          { title: 'Design System Component Tokens', caption: 'Complete modular component hierarchy covering typography, buttons, inputs, and states.', badge: 'Design System', image: '' },
          { title: 'Interactive Usability Prototype', caption: 'High-fidelity flow tested with 24 users yielding a 92/100 System Usability Score (SUS).', badge: 'User Testing', image: '' }
        ],
        results: [
          { metric: '-26%', label: 'Churn Reduction', desc: 'Clearer onboarding sequence increased 30-day user retention from 54% to 80%.' },
          { metric: '92/100', label: 'SUS Score', desc: 'Top-decile usability rating verified through standardized test protocols.' },
          { metric: '2.4x', label: 'Engineering Speed', desc: 'Modular design tokens cut frontend development handoff time by more than half.' },
          { metric: '100%', label: 'WCAG AA Compliant', desc: 'Passed all color contrast and screen-reader accessibility benchmarks.' }
        ],
        ctaHeading: 'Want to redesign your digital product?',
        ctaSubtext: 'Launch the interactive Figma prototype to inspect component tokens, or reach out for your next product design engagement.'
      },

      'branding-creative-design': {
        number: '05',
        title: 'Branding & Creative Design',
        tagline: 'Distinctive Visual Identity, Typographic Systems & Brand Guidelines',
        category: 'Brand Identity',
        role: 'Creative Director & Brand Designer',
        client: 'Sonder Atelier Fragrances',
        timeline: '2 Months · 2024',
        timelineBadge: '2024 · 2 Months',
        liveUrl: 'https://example.com/sonder-brand',
        liveUrlText: 'View Brand Style Guide',
        overview: 'Created an evocative, minimalist visual brand identity for a luxury fragrance and botanical house. Developed custom wordmark logo geometry, packaging embossing guidelines, and digital brand stylebooks.',
        objective: 'Establish a high-end luxury market presence, communicate sustainable botanical craftsmanship, and stand out against generic mass-market beauty brands.',
        challenges: 'Balancing ultra-minimalist modernism with timeless organic warmth, ensuring physical packaging print tolerances matched digital screen reproduction.',
        strategy: 'Paired custom high-contrast serif typography with tactile, earth-inspired monochrome palettes. Designed a modular packaging grid utilizing blind debossing and eco-conscious cotton paper textures.',
        strategyPillars: [
          { title: 'Typographic Restraint', desc: 'Employed bespoke editorial serif letterforms with generous tracking to convey exclusivity.' },
          { title: 'Tactile Materiality', desc: 'Selected FSC-certified raw cotton papers, blind deboss seals, and monochromatic foil finishes.' },
          { title: 'Digital Brand Uniformity', desc: 'Unified e-commerce storefront, packaging unboxing, and social media templates seamlessly.' }
        ],
        workDone: [
          { title: 'Logo System & Monogram Geometry', desc: 'Designed primary wordmark, secondary submarks, and responsive monograms for varied scales.' },
          { title: 'Typographic & Color System', desc: 'Established hierarchy rules, editorial pairings, and Pantone/CMYK/RGB color recipes.' },
          { title: 'Sustainable Packaging Design', desc: 'Modeled box packaging die-lines, label typography, and custom bottle silhouette specifications.' },
          { title: 'Comprehensive 64-Page Brand Bible', desc: 'Authored definitive brand guidelines covering tone of voice, photography art direction, and digital UI usage.' }
        ],
        tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Blender 3D', 'Figma'],
        screenshots: [
          { title: 'Primary Wordmark & Seal Mark', caption: 'Geometric optical adjustments ensuring legibility across small perfume bottles and billboards.', badge: 'Logo Craft', image: '' },
          { title: 'Luxury Botanical Packaging Grid', caption: 'Minimalist cotton-card packaging with blind debossed typography and tactile foil accents.', badge: 'Packaging', image: '' },
          { title: 'Editorial Brand Guidelines Book', caption: 'Definitive visual manual outlining photography moodboards, color codes, and layout margins.', badge: 'Stylebook', image: '' }
        ],
        results: [
          { metric: '3.8x', label: 'Pre-Order Target', desc: 'Initial launch collection sold out completely in 14 days, exceeding sales projections.' },
          { metric: '48+', label: 'Press Mentions', desc: 'Featured in leading international design and lifestyle publications.' },
          { metric: '100%', label: 'Sustainable Sourcing', desc: 'Packaging crafted from FSC-certified recyclable post-consumer cotton board.' },
          { metric: '+88%', label: 'Perceived Value', desc: 'Brand testing confirmed customer price tolerance was 88% higher than industry baseline.' }
        ],
        ctaHeading: 'Ready for an unforgettable brand identity?',
        ctaSubtext: 'Review the brand style guide or connect to develop a timeless visual universe for your company.'
      },

      'ai-study-assistant': {
        number: '06',
        title: 'AI Study Assistant',
        tagline: 'Intelligent Learning Roadmaps, Active Recall & Knowledge Distillation',
        category: 'AI Product & UX',
        role: 'Lead Product Designer & AI Prompt Architect',
        client: 'Cognitive Labs EdTech',
        timeline: '3 Months · 2025',
        timelineBadge: '2025 · 3 Months',
        liveUrl: 'https://example.com/ai-study-assistant',
        liveUrlText: 'Launch Interactive App',
        overview: 'Conceptualized and designed an AI-driven learning companion that ingests academic textbooks and lecture notes, converting dense study material into personalized spaced-repetition schedules and conversational flashcards.',
        objective: 'Transform passive rote reading into active retention, reduce study anxiety, and give students real-time feedback on conceptual misunderstandings using natural language models.',
        challenges: 'Preventing AI hallucinations in technical formulas, designing intuitive conversational UI patterns that don\\'t feel like a standard generic chatbot, and keeping latency low.',
        strategy: 'Built an interface where the AI operates as an ambient tutor alongside document split-views. Users can highlight confusing paragraphs to trigger Instant Socratic Explanations or Generate Exam-Simulated Quizzes.',
        strategyPillars: [
          { title: 'Ambient Intelligence', desc: 'Contextual AI helpers embedded directly in document margins rather than an intrusive side panel.' },
          { title: 'Spaced-Repetition Math', desc: 'SuperMemo SM-2 algorithm integrated with natural language quiz difficulty scoring.' },
          { title: 'Low-Latency Streaming', desc: 'Chroma token streaming animation giving immediate conversational response feedback.' }
        ],
        workDone: [
          { title: 'Cognitive UX Architecture', desc: 'Designed dual-pane split view combining interactive document reader with contextual AI inquiry cards.' },
          { title: 'Prompt Engineering & Few-Shot Templates', desc: 'Structured structured JSON prompts delivering grade-accurate quiz flashcards and spaced-repetition cues.' },
          { title: 'Progress & Mastery Analytics', desc: 'Created visual mastery heatmaps tracking student topic confidence and weak memory retention zones.' },
          { title: 'Voice & Accessibility Controls', desc: 'Integrated conversational speech-to-text input and natural text-to-speech lecture summaries.' }
        ],
        tools: ['Figma', 'Gemini API', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Vercel'],
        screenshots: [
          { title: 'Split-View Reading & Tutor HUD', caption: 'Side-by-side reading layout with instant AI margin notes and concept breakdown chips.', badge: 'Desktop UI', image: '' },
          { title: 'Spaced-Repetition Quiz Interface', caption: 'Gamified active recall flashcards with automated confidence rating algorithms.', badge: 'Quiz Engine', image: '' },
          { title: 'Topic Mastery Knowledge Graph', caption: 'Interactive nodal chart depicting learning progression and upcoming review dates.', badge: 'Analytics', image: '' }
        ],
        results: [
          { metric: '74%', label: 'Faster Study Prep', desc: 'Students reported cutting exam preparation time by nearly three-quarters.' },
          { metric: '35,000+', label: 'Flashcards Created', desc: 'Generated high-accuracy active recall decks during beta testing semester.' },
          { metric: '4.9/5', label: 'Student Rating', desc: 'Rated higher than traditional textbook study methods by 96% of surveyed cohorts.' },
          { metric: '<1.2s', label: 'Response Latency', desc: 'Streaming response delivery kept interactions instant and conversational.' }
        ],
        ctaHeading: 'Looking to innovate with applied AI?',
        ctaSubtext: 'Test the prototype interface or reach out to collaborate on next-generation intelligent applications.'
      },

      'digital-marketing-dashboard': {
        number: '07',
        title: 'Digital Marketing Dashboard',
        tagline: 'Real-Time Multi-Touch Attribution, ROAS Telemetry & Ad Spend Intelligence',
        category: 'Data Visualization & SaaS',
        role: 'UI/UX & Data Visualization Designer',
        client: 'Vanguard Media Analytics',
        timeline: '3 Months · 2025',
        timelineBadge: '2025 · 3 Months',
        liveUrl: 'https://example.com/marketing-dashboard-demo',
        liveUrlText: 'Open Dashboard Demo',
        overview: 'A high-density marketing analytics dashboard built for growth teams and media buyers. Consolidates advertising spend across Meta, Google, TikTok, and Amazon into unified ROAS telemetry and cohort retention graphs.',
        objective: 'Replace chaotic multi-tab spreadsheets with a centralized, real-time command center that flags unprofitable ad campaigns within minutes.',
        challenges: 'Visualizing high-density financial data without cognitive clutter, accommodating differing time zones and currency conversions in real-time.',
        strategy: 'Employed a modular 12-column widget grid with configurable dashboard presets (Executive Summary, Media Buyer Deep-Dive, Creative Performance). Used high-contrast monochrome tones with purposeful accent indicators for quick scanning.',
        strategyPillars: [
          { title: 'Modular Widget Grid', desc: 'Configurable drag-and-drop tiles allowing growth leads to prioritize metrics that matter most.' },
          { title: 'Real-Time Budget Pacing', desc: 'Live spend alerts calculating projected monthly burn rate against revenue targets.' },
          { title: 'Cross-Network Normalization', desc: 'Standardized terminology and currency across 5 disparate ad platform APIs.' }
        ],
        workDone: [
          { title: 'Data Hierarchy & Dashboard Architecture', desc: 'Categorized 50+ marketing KPIs into high-level summary cards, trend sparklines, and granular attribution tables.' },
          { title: 'Custom Data Viz & Chart Tokens', desc: 'Designed specialized charts for CAC-to-LTV ratios, cohort churn heatmaps, and funnel velocity bars.' },
          { title: 'Filter & Preset Controller', desc: 'Engineered date range comparators, attribution model toggle (First Click vs Data-Driven), and channel filters.' },
          { title: 'Dark Mode & High-Contrast Views', desc: 'Optimized for continuous multi-monitor viewing in command centers and agency war rooms.' }
        ],
        tools: ['Figma', 'Chart.js', 'Tailwind CSS', 'React', 'TypeScript', 'D3.js'],
        screenshots: [
          { title: 'Executive Command Center View', caption: 'Top-level summary widget showing aggregated spend, blended ROAS, and net revenue lift.', badge: 'Main View', image: '' },
          { title: 'Cohort Retention & LTV Heatmap', caption: 'Granular cohort matrices identifying which acquisition channels yield the highest lifetime customer value.', badge: 'Cohort Matrix', image: '' },
          { title: 'Creative Performance Scorecard', caption: 'Direct comparison grid scoring video hooks, CTR, and fatigue indexes for active ad creatives.', badge: 'Creative Audit', image: '' }
        ],
        results: [
          { metric: '14 hrs/wk', label: 'Time Saved', desc: 'Growth teams cut manual reporting hours from 16 hours down to under 2 hours per week.' },
          { metric: '$4.8M', label: 'Tracked Spend', desc: 'Successfully tracked monthly ad budgets across 12 enterprise brand accounts.' },
          { metric: '<300ms', label: 'Query Speed', desc: 'Optimized data aggregation components for instant filtering without UI lag.' },
          { metric: '+32%', label: 'Ad Efficiency', desc: 'Early budget reallocation away from fatigued creatives prevented ad spend waste.' }
        ],
        ctaHeading: 'Need modern analytics & dashboard UX?',
        ctaSubtext: 'Launch the interactive dashboard demo or discuss data visualization systems for your product.'
      }
    };

    // PROJECT VIEW CONTROLLER
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
          card.innerHTML = '<div class=\"strategy-step-num\">STRATEGIC PILLAR 0' + (idx + 1) + '</div>' +
            '<div class=\"strategy-step-title\">' + p.title + '</div>' +
            '<div class=\"strategy-step-desc\">' + p.desc + '</div>';
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
            visualContent = '<img src=\"' + s.image + '\" alt=\"' + s.title + '\" class=\"screenshot-img\" loading=\"lazy\" />';
          } else {
            visualContent = '<div class=\"screenshot-mockup-inner\">' +
              '<div class=\"mockup-window-top\">' +
                '<div class=\"mockup-dots\"><span></span><span></span><span></span></div>' +
                '<div class=\"mockup-address-bar\">https://krishkumar.design/work/' + (s.badge || 'preview').toLowerCase() + '</div>' +
              '</div>' +
              '<div class=\"mockup-screen-body\">' +
                '<div class=\"mockup-bar w-70\"></div>' +
                '<div class=\"mockup-bar w-90\"></div>' +
                '<div class=\"mockup-metric-preview\">' +
                  '<div class=\"mockup-metric-chip\">✦ Verified Case Study</div>' +
                  '<div class=\"mockup-metric-chip\">Live Analytics</div>' +
                '</div>' +
                '<div class=\"mockup-bar w-40\"></div>' +
              '</div>' +
            '</div>';
          }

          card.innerHTML = '<div class=\"screenshot-visual-frame\">' + visualContent + '</div>' +
            '<div class=\"screenshot-body-info\">' +
              '<span class=\"screenshot-badge\">' + (s.badge || 'Case Study Asset') + '</span>' +
              '<div class=\"screenshot-title\">' + s.title + '</div>' +
              '<div class=\"screenshot-caption\">' + s.caption + '</div>' +
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
          card.innerHTML = '<div class=\"result-metric-number\">' + r.metric + '</div>' +
            '<div class=\"result-metric-label\">' + r.label + '</div>' +
            '<div class=\"result-metric-desc\">' + r.desc + '</div>';
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
`;

// Insert projectJs into <script> before the closing popstate handler
// Let's find where servicesDatabase starts
const servicesDbMarker = '    const servicesDatabase = {';
const servicesDbIndex = code.indexOf(servicesDbMarker);
if (servicesDbIndex === -1) {
  throw new Error('Could not find servicesDatabase marker');
}

code = code.substring(0, servicesDbIndex) + projectJs + '\n\n' + code.substring(servicesDbIndex);

// Update popstate, DOMContentLoaded, and keydown listeners to handle both projects and services
const oldPopstate = `    // Handle browser popstate / back button
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.service && servicesDatabase[e.state.service]) {
        openServiceView(e.state.service);
      } else {
        if (serviceDetailView && serviceDetailView.classList.contains('active')) {
          closeServiceView();
        }
      }
    });

    // Check if URL has hash on initial load
    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && servicesDatabase[hash]) {
        openServiceView(hash);
      }
    });

    // Allow escape key to close service view
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (serviceDetailView && serviceDetailView.classList.contains('active')) {
          closeServiceView();
        }
      }
    });`;

const newPopstate = `    // Handle browser popstate / back button for both projects & services
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.project && projectsDatabase[e.state.project]) {
        openProjectView(e.state.project);
      } else if (e.state && e.state.service && servicesDatabase[e.state.service]) {
        openServiceView(e.state.service);
      } else {
        if (projectDetailView && projectDetailView.classList.contains('active')) {
          closeProjectView();
        }
        if (serviceDetailView && serviceDetailView.classList.contains('active')) {
          closeServiceView();
        }
      }
    });

    // Check if URL has hash on initial load (supports #project-... and service hashes)
    window.addEventListener('DOMContentLoaded', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('project-')) {
        const prjId = hash.replace('project-', '');
        if (projectsDatabase[prjId]) openProjectView(prjId);
      } else if (projectsDatabase[hash]) {
        openProjectView(hash);
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
    });`;

if (code.includes(oldPopstate)) {
  code = code.replace(oldPopstate, newPopstate);
} else {
  console.log('Warning: old popstate string not found exactly, will check popstate occurrence');
  // Fallback replacement for popstate section
  const popstateIdx = code.indexOf('    // Handle browser popstate / back button');
  if (popstateIdx !== -1) {
    const endScriptIdx = code.indexOf('  </script>', popstateIdx);
    code = code.substring(0, popstateIdx) + newPopstate + '\n' + code.substring(endScriptIdx);
  }
}

// Write the updated code back to build_portfolio.cjs
fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated build_portfolio.cjs! New length:', code.length);
