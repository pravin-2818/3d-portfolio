/**
 * Pravin M - Ultra-Creative Coding-Themed Portfolio Engine
 * Features:
 * 1. Mouse-Move Interactive Code Glyph Particle Trail
 * 2. Interactive VS Code Simulator with multi-tabs & live "Run Code ▶" execution
 * 3. Interactive Full-Stack Architecture Pipeline
 * 4. GitHub Contribution Heatmap Generator
 * 5. Developer Command Palette (Ctrl+K / ⌘K)
 * 6. Native Web Audio API Synthesizer (Futuristic SFX)
 * 7. 3D Card Tilt, Animated Counters, Modals, Real Email Dispatch & WhatsApp Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  initAudioSFX();
  initNavbar();
  initCanvasParticles();
  initCodeParticleTrail();
  initTypingEffect();
  initVSCodeSimulator();
  initCardTilt();
  initCounters();
  initSkillsFilter();
  initArchitecturePipeline();
  initGitHubHeatmap();
  initProjectModals();
  initContactActions();
  initCommandPalette();
  initCursorSpotlight();
});

/* ==========================================================================
   1. WEB AUDIO API SYNTHESIZER (CYBER SFX)
   ========================================================================== */
let audioCtx = null;
let sfxEnabled = true;

function initAudioSFX() {
  const toggleBtn = document.getElementById('sfxToggle');
  const sfxIcon = document.getElementById('sfxIcon');
  const sfxText = document.getElementById('sfxText');

  const savedSfx = localStorage.getItem('pravin_sfx_enabled');
  if (savedSfx !== null) {
    sfxEnabled = savedSfx === 'true';
  }

  function updateUi() {
    if (toggleBtn) {
      if (sfxEnabled) {
        toggleBtn.classList.add('active');
        if (sfxIcon) sfxIcon.textContent = '🔊';
        if (sfxText) sfxText.textContent = 'SFX: ON';
      } else {
        toggleBtn.classList.remove('active');
        if (sfxIcon) sfxIcon.textContent = '🔇';
        if (sfxText) sfxText.textContent = 'SFX: OFF';
      }
    }
  }

  updateUi();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      localStorage.setItem('pravin_sfx_enabled', sfxEnabled);
      updateUi();
      if (sfxEnabled) {
        playBlip(750, 0.08);
      }
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playBlip(freq = 800, duration = 0.06, type = 'sine') {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio context may be restricted by browser policy before first interaction
  }
}

function playRunSound() {
  if (!sfxEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {}
}

/* ==========================================================================
   2. NAVBAR & ACTIVE NAVIGATION
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      playBlip(600, 0.05);
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        playBlip(900, 0.05);
      });
    });
  }
}

/* ==========================================================================
   3. BACKGROUND CONSTELLATION CANVAS
   ========================================================================== */
function initCanvasParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.6 + 0.8;
      this.color = Math.random() > 0.5 ? '#6366f1' : '#00f2fe';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const alpha = 1 - dist / 110;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.18})`;
          ctx.lineWidth = 0.7;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. MOUSE-MOVE CODE GLYPH PARTICLE TRAIL (CODING REACTIVE FX)
   ========================================================================== */
function initCodeParticleTrail() {
  const canvas = document.getElementById('codeParticleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const glyphs = ['{ }', '</>', '0', '1', '=>', 'const', 'return', 'npm', ';', '&&', '++', '[]', 'async', 'SQL'];
  const colors = ['#00f2fe', '#6366f1', '#a855f7', '#10b981', '#38bdf8', '#34d399'];
  const codeParticles = [];

  let lastX = 0;
  let lastY = 0;

  window.addEventListener('mousemove', e => {
    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
    // Emit particles when mouse travels at least 16px
    if (dist > 16) {
      lastX = e.clientX;
      lastY = e.clientY;

      // Spawn 1 to 2 code glyphs
      const count = Math.random() > 0.4 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        codeParticles.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          text: glyphs[Math.floor(Math.random() * glyphs.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.6 - 0.6, // Float upwards
          alpha: 1,
          size: Math.floor(Math.random() * 4) + 11
        });
      }
    }
  });

  function renderCodeTrail() {
    ctx.clearRect(0, 0, width, height);

    for (let i = codeParticles.length - 1; i >= 0; i--) {
      const p = codeParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.022; // Smooth fade

      if (p.alpha <= 0) {
        codeParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.font = `600 ${p.size}px 'Fira Code', monospace`;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillText(p.text, p.x, p.y);
      ctx.restore();
    }

    requestAnimationFrame(renderCodeTrail);
  }

  renderCodeTrail();
}

/* ==========================================================================
   5. DYNAMIC HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const target = document.querySelector('.typed-text');
  if (!target) return;

  const roles = [
    'Junior Full-Stack Web Developer',
    'Node.js & Express REST API Architect',
    'React.js UI & Performance Optimizer',
    'MySQL & InnoDB Indexing Specialist',
    'MCA Graduate & Problem Solver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 65;
  const backSpeed = 35;
  const pauseTime = 1600;

  function type() {
    const currentText = roles[roleIdx];

    if (!isDeleting) {
      target.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === currentText.length) {
        isDeleting = true;
        setTimeout(type, pauseTime);
        return;
      }
      setTimeout(type, typeSpeed);
    } else {
      target.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 300);
        return;
      }
      setTimeout(type, backSpeed);
    }
  }

  type();
}

/* ==========================================================================
   6. INTERACTIVE VS CODE SIMULATOR WITH LIVE RUN CODE ▶ ENGINE
   ========================================================================== */
const vscodeFiles = {
  assetpro: {
    name: 'AssetPro8.js',
    meta: 'JavaScript • UTF-8 • Express + MySQL (InnoDB)',
    lines: 14,
    codeHtml: `
<div class="code-line"><span class="code-keyword">const</span> express = <span class="code-fn">require</span>(<span class="code-str">'express'</span>);</div>
<div class="code-line"><span class="code-keyword">const</span> helmet = <span class="code-fn">require</span>(<span class="code-str">'helmet'</span>);</div>
<div class="code-line"><span class="code-keyword">const</span> pool = <span class="code-fn">require</span>(<span class="code-str">'./db/mysqlPool'</span>);</div>
<div class="code-line"><span class="code-keyword">const</span> app = <span class="code-fn">express</span>();</div>
<div class="code-line">app.<span class="code-fn">use</span>(<span class="code-fn">helmet</span>()); <span class="code-comm">// Enforce production security headers</span></div>
<div class="code-line"></div>
<div class="code-line"><span class="code-comm">// GET Asset Records with InnoDB B-Tree Indexing</span></div>
<div class="code-line">app.<span class="code-fn">get</span>(<span class="code-str">'/api/v1/assets'</span>, <span class="code-keyword">async</span> (req, res) => {</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-keyword">const</span> sql = <span class="code-str">'SELECT id, name, category, status FROM assets WHERE active = 1 ORDER BY id DESC LIMIT 500'</span>;</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-keyword">const</span> [assets] = <span class="code-keyword">await</span> pool.<span class="code-fn">query</span>(sql);</div>
<div class="code-line">&nbsp;&nbsp;res.<span class="code-fn">status</span>(<span class="code-num">200</span>).<span class="code-fn">json</span>({ <span class="code-obj">success</span>: <span class="code-keyword">true</span>, <span class="code-obj">count</span>: assets.length, <span class="code-obj">data</span>: assets });</div>
<div class="code-line">});</div>
<div class="code-line"></div>
<div class="code-line">app.<span class="code-fn">listen</span>(<span class="code-num">5000</span>, () => console.<span class="code-fn">log</span>(<span class="code-str">'🚀 AssetPro8 Server listening on port 5000'</span>));
`,
    executionLogs: [
      { tag: '[nodemon]', class: 'term-tag-info', msg: 'v3.1.0 starting `node AssetPro8.server.js`' },
      { tag: '[security]', class: 'term-tag-route', msg: 'Helmet.js headers, rate-limiting & CORS initialized' },
      { tag: '[database]', class: 'term-tag-success', msg: 'Connected to MySQL via InnoDB (Pool size: 10, B-Tree indexed)' },
      { tag: '[router]', class: 'term-tag-info', msg: 'Mounted 20+ REST API endpoints (Admin/Staff RBAC)' },
      { tag: '[request]', class: 'term-tag-route', msg: 'GET /api/v1/assets -> 200 OK (11ms) • 500+ records retrieved' },
      { tag: '[cache]', class: 'term-tag-success', msg: 'KPI Dashboard cache refreshed in 4ms (reporting effort -70%)' }
    ]
  },
  chat: {
    name: 'PrivacyChat.jsx',
    meta: 'React 18 • UTF-8 • Real-time WebSockets',
    lines: 13,
    codeHtml: `
<div class="code-line"><span class="code-keyword">import</span> React, { useState, useEffect } <span class="code-keyword">from</span> <span class="code-str">'react'</span>;</div>
<div class="code-line"><span class="code-keyword">import</span> { io } <span class="code-keyword">from</span> <span class="code-str">'socket.io-client'</span>;</div>
<div class="code-line"></div>
<div class="code-line"><span class="code-keyword">export default function</span> <span class="code-fn">PrivacyChat</span>({ user }) {</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-keyword">const</span> [messages, setMessages] = <span class="code-fn">useState</span>([]);</div>
<div class="code-line">&nbsp;&nbsp;useEffect(() => {</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">const</span> socket = <span class="code-fn">io</span>(<span class="code-str">'wss://chat.pravin.dev'</span>);</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;socket.<span class="code-fn">on</span>(<span class="code-str">'message'</span>, (msg) => setMessages((prev) => [...prev, msg]));</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> () => socket.<span class="code-fn">disconnect</span>();</div>
<div class="code-line">&nbsp;&nbsp;}, []);</div>
<div class="code-line"></div>
<div class="code-line">&nbsp;&nbsp;<span class="code-keyword">return</span> &lt;<span class="code-tag">ChatRoom</span> <span class="code-obj">concurrentUsers</span>={<span class="code-num">50</span>} <span class="code-obj">status</span>=<span class="code-str">"ZeroDataLeak"</span> /&gt;;</div>
<div class="code-line">}</div>
`,
    executionLogs: [
      { tag: '[vite]', class: 'term-tag-info', msg: 'v5.2.0 dev server active at http://localhost:3000' },
      { tag: '[react]', class: 'term-tag-success', msg: 'Component render optimized: page load time reduced by 35%' },
      { tag: '[socket]', class: 'term-tag-route', msg: 'WebSocket connected with 50+ concurrent users' },
      { tag: '[cipher]', class: 'term-tag-success', msg: 'Client session token validated with zero leak privacy' }
    ]
  },
  iot: {
    name: 'SmartStick.py',
    meta: 'Python 3.12 • Raspberry Pi • Ultrasonic Hardware',
    lines: 13,
    codeHtml: `
<div class="code-line"><span class="code-keyword">import</span> RPi.GPIO <span class="code-keyword">as</span> GPIO</div>
<div class="code-line"><span class="code-keyword">import</span> time</div>
<div class="code-line">TRIG, ECHO = <span class="code-num">23</span>, <span class="code-num">24</span></div>
<div class="code-line">GPIO.<span class="code-fn">setup</span>(TRIG, GPIO.OUT)</div>
<div class="code-line">GPIO.<span class="code-fn">setup</span>(ECHO, GPIO.IN)</div>
<div class="code-line"></div>
<div class="code-line"><span class="code-keyword">def</span> <span class="code-fn">measure_distance</span>():</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;GPIO.<span class="code-fn">output</span>(TRIG, <span class="code-keyword">True</span>)</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;time.<span class="code-fn">sleep</span>(<span class="code-num">0.00001</span>)</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;GPIO.<span class="code-fn">output</span>(TRIG, <span class="code-keyword">False</span>)</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;dist_cm = pulse_duration * <span class="code-num">17150</span></div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">if</span> dist_cm &lt; <span class="code-num">40</span>: trigger_haptic_buzzer()</div>
<div class="code-line">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">return</span> dist_cm</div>
`,
    executionLogs: [
      { tag: '[gpio]', class: 'term-tag-info', msg: 'Initializing Raspberry Pi GPIO pin 23 (TRIG) and 24 (ECHO)' },
      { tag: '[calibrate]', class: 'term-tag-success', msg: 'Speed of sound synchronized to 343 m/s' },
      { tag: '[ultrasonic]', class: 'term-tag-route', msg: 'Distance registered: 26cm -> Obstacle in proximity' },
      { tag: '[feedback]', class: 'term-tag-warn', msg: 'Piezo buzzer activated & haptic vibration pulsing (+40% safety)' }
    ]
  },
  config: {
    name: 'Pravin.json',
    meta: 'JSON • Developer Profile Specs & Achievements',
    lines: 11,
    codeHtml: `
<div class="code-line">{</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"name"</span>: <span class="code-str">"Pravin M"</span>,</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"title"</span>: <span class="code-str">"Junior Full-Stack Web Developer"</span>,</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"degree"</span>: <span class="code-str">"Master of Computer Applications (MCA - 77.2%)"</span>,</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"internship"</span>: <span class="code-str">"Legendary One (Dec 2025 – Mar 2026)"</span>,</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"coreStack"</span>: [<span class="code-str">"Node.js"</span>, <span class="code-str">"Express.js"</span>, <span class="code-str">"MySQL"</span>, <span class="code-str">"React.js"</span>],</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"certifications"</span>: [<span class="code-str">"IIT Bombay Kotlin"</span>, <span class="code-str">"IIT Bombay Bootstrap"</span>],</div>
<div class="code-line">&nbsp;&nbsp;<span class="code-str">"openToWork"</span>: <span class="code-keyword">true</span></div>
<div class="code-line">}</div>
`,
    executionLogs: [
      { tag: '[profile]', class: 'term-tag-info', msg: 'Loaded candidate profile for Pravin M' },
      { tag: '[academics]', class: 'term-tag-success', msg: 'MCA: 77.2% | B.Sc CS: 72.6% | HSC: 85.6% | SSLC: 83.4%' },
      { tag: '[impact]', class: 'term-tag-route', msg: '500+ Assets • 20+ REST APIs • 40% Query Boost • 70% Automation' },
      { tag: '[status]', class: 'term-tag-success', msg: 'Ready for interviews, junior web developer & software roles!' }
    ]
  }
};

function initVSCodeSimulator() {
  const tabs = document.querySelectorAll('.vscode-tab');
  const lineNumbersContainer = document.getElementById('ideLineNumbers');
  const codeDisplay = document.getElementById('ideCodeContent');
  const fileMeta = document.getElementById('ideFileMeta');
  const runBtn = document.getElementById('btnRunCode');
  const terminalOutput = document.getElementById('ideTerminalOutput');

  if (!codeDisplay) return;

  let currentKey = 'assetpro';

  function renderFile(key) {
    const file = vscodeFiles[key];
    if (!file) return;

    currentKey = key;

    // Generate line numbers
    let lineNums = '';
    for (let i = 1; i <= file.lines; i++) {
      lineNums += `${i}<br>`;
    }
    if (lineNumbersContainer) lineNumbersContainer.innerHTML = lineNums;

    codeDisplay.innerHTML = file.codeHtml;
    if (fileMeta) fileMeta.textContent = file.meta;

    tabs.forEach(t => {
      if (t.getAttribute('data-tab') === key) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  // Tab click handler
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-tab');
      if (key && key !== currentKey) {
        playBlip(750, 0.05);
        renderFile(key);
      }
    });
  });

  // Run Code ▶ Execution handler
  if (runBtn && terminalOutput) {
    runBtn.addEventListener('click', () => {
      playRunSound();

      const file = vscodeFiles[currentKey];
      if (!file) return;

      runBtn.disabled = true;
      runBtn.innerHTML = `<span>Executing...</span> ⏳`;

      terminalOutput.innerHTML = `<div class="term-log-line"><span class="term-tag-info">[exec]</span> Running <code>${file.name}</code> in Node runtime...</div>`;

      let logIdx = 0;

      function printNextLog() {
        if (logIdx < file.executionLogs.length) {
          const item = file.executionLogs[logIdx];
          const line = document.createElement('div');
          line.className = 'term-log-line';
          line.innerHTML = `<span class="${item.class}">${item.tag}</span> <span>${item.msg}</span>`;
          terminalOutput.appendChild(line);
          terminalOutput.scrollTop = terminalOutput.scrollHeight;

          playBlip(950 + logIdx * 60, 0.04);

          logIdx++;
          setTimeout(printNextLog, 240);
        } else {
          runBtn.disabled = false;
          runBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg> <span>Run Code ▶</span>`;
        }
      }

      setTimeout(printNextLog, 200);
    });
  }

  // Initial render
  renderFile('assetpro');
}

/* ==========================================================================
   7. INTERACTIVE FULL-STACK ARCHITECTURE PIPELINE
   ========================================================================== */
const pipelineSteps = {
  ui: {
    icon: '💻',
    title: '1. Client Layer — Responsive Single Page Interface',
    text: 'Engineered with clean semantic HTML5, reactive Vanilla JS, and optimized React components. Includes client-side input sanitation, debounced requests, and asynchronous JSON payloads reducing page rendering time by 35%.'
  },
  security: {
    icon: '🛡️',
    title: '2. Web Security & Policy Enforcement',
    text: 'Every HTTP transaction is shielded using Helmet.js security headers (CSP, HSTS, X-Frame-Options), strict CORS origins, rate limiting to protect endpoints against brute force, and Joi / express-validator schemas for input hygiene.'
  },
  api: {
    icon: '⚙️',
    title: '3. Node.js & Express REST API Engine',
    text: 'Architected following the MVC (Model-View-Controller) design pattern. Manages 20+ REST endpoints handling asset CRUD workflows, role-based access control (Admin vs Staff), session authentication, and transactional audit trails.'
  },
  database: {
    icon: '🗄️',
    title: '4. MySQL Database with InnoDB Normalization & Indexing',
    text: 'Structured across 10+ normalized relational tables adhering to 3NF. Transactional atomicity handled with InnoDB ACID compliance. B-Tree indexes on search keys boosted query retrieval speed by 40% across 500+ corporate assets.'
  },
  services: {
    icon: '📨',
    title: '5. Background Asynchronous Workers & Reports',
    text: 'Integrated third-party microservices: Nodemailer for instant email dispatch triggers on asset assignment, PDFKit for automated PDF reports, and node-cron for scheduled maintenance tasks—cutting manual reporting by 70%.'
  }
};

function initArchitecturePipeline() {
  const nodeBoxes = document.querySelectorAll('.pipeline-node-box');
  const explIcon = document.getElementById('pipelineIcon');
  const explTitle = document.getElementById('pipelineTitle');
  const explText = document.getElementById('pipelineText');

  nodeBoxes.forEach(box => {
    box.addEventListener('click', () => {
      nodeBoxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');

      const stepKey = box.getAttribute('data-step');
      const data = pipelineSteps[stepKey];

      if (data && explIcon && explTitle && explText) {
        playBlip(700, 0.05);
        explIcon.textContent = data.icon;
        explTitle.textContent = data.title;
        explText.textContent = data.text;
      }
    });
  });
}

/* ==========================================================================
   8. GITHUB CONTRIBUTION HEATMAP GENERATOR
   ========================================================================== */
function initGitHubHeatmap() {
  const heatmapGrid = document.getElementById('heatmapGrid');
  if (!heatmapGrid) return;

  const totalCols = 52;
  const daysPerCol = 7;
  const totalDays = totalCols * daysPerCol;

  const fragment = document.createDocumentFragment();

  // Generate realistic commit patterns (higher density in internship Dec 2025 - Mar 2026)
  for (let i = 0; i < totalDays; i++) {
    const cell = document.createElement('div');
    cell.className = 'heatmap-cell';

    // Probability weighting: higher activity in recent 180 days
    const isRecent = i > totalDays - 150;
    const rand = Math.random();

    let level = 0;
    let commits = 0;

    if (isRecent) {
      if (rand > 0.8) { level = 4; commits = Math.floor(Math.random() * 5) + 6; }
      else if (rand > 0.5) { level = 3; commits = Math.floor(Math.random() * 3) + 3; }
      else if (rand > 0.25) { level = 2; commits = 2; }
      else if (rand > 0.1) { level = 1; commits = 1; }
    } else {
      if (rand > 0.85) { level = 3; commits = 4; }
      else if (rand > 0.65) { level = 2; commits = 2; }
      else if (rand > 0.4) { level = 1; commits = 1; }
    }

    cell.classList.add(`cell-lvl-${level}`);
    cell.setAttribute('title', commits > 0 ? `${commits} contributions on day ${i + 1}` : 'No contributions on this day');

    cell.addEventListener('mouseenter', () => {
      if (commits > 0) playBlip(1200 + commits * 50, 0.03);
    });

    fragment.appendChild(cell);
  }

  heatmapGrid.appendChild(fragment);
}

/* ==========================================================================
   9. 3D CARD TILT EFFECT
   ========================================================================== */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   10. ANIMATED METRIC IMPACT COUNTERS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 1800;
            const startTime = performance.now();

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 4);
              const currentVal = Math.floor(easeProgress * target);

              counter.textContent = currentVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target + suffix;
              }
            }

            requestAnimationFrame(updateCounter);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.metrics-section');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   11. FILTERABLE SKILLS MATRIX
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playBlip(720, 0.05);
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   12. PROJECT MODAL DIALOG VIEWER
   ========================================================================== */
const projectDetails = {
  assetpro8: {
    title: 'AssetPro8 — Full-Stack IT Asset Management System',
    subtitle: 'Node.js, Express.js, MySQL (InnoDB), HTML5, CSS3, JavaScript, REST API',
    description: `A scalable, enterprise-grade IT Asset Management platform built with strict role-based access control (Admin / Staff) currently managing 500+ corporate hardware and software assets.`,
    highlights: [
      'Engineered 20+ secure REST API endpoints covering asset lifecycle, assignments, and detailed audit trails.',
      'Designed a normalized MySQL relational schema (8+ tables) with strategic B-Tree indexing, accelerating query performance by 40%.',
      'Automated email dispatch triggers with Nodemailer upon asset assignment and warranty expiration.',
      'Integrated real-time KPI metrics dashboard reducing manual inventory reporting efforts by 70%.'
    ],
    github: 'https://github.com/pravin-2818'
  },
  privacychat: {
    title: 'Privacy Chat — Real-Time Encrypted Messaging Platform',
    subtitle: 'React.js, Node.js, Express.js, WebSockets, CSS3, REST API',
    description: `A responsive, high-performance real-time messaging web application architected for 50+ concurrent users with zero-leak privacy controls and encrypted message delivery.`,
    highlights: [
      'Developed optimized React component hierarchies, improving overall client-side rendering and reducing load time by 35%.',
      'Built resilient Node/Express backend handlers for message dispatch, dynamic routing, and protected session tokens.',
      'Implemented responsive UI layout with custom CSS and instant user typing and presence indicators.'
    ],
    github: 'https://github.com/pravin-2818'
  },
  smartstick: {
    title: 'Smart Blind Stick (IoT Assistive Safety Device)',
    subtitle: 'Python, Raspberry Pi, Ultrasonic Sensors, IoT Hardware Feedback',
    description: `An intelligent assistive mobility device engineered for visually impaired individuals to safely navigate indoor and outdoor spaces using sensory perception.`,
    highlights: [
      'Designed and deployed an embedded Raspberry Pi and Python controller processing distance metrics from ultrasonic sensors in real-time.',
      'Integrated dual sensory feedback (piezo buzzer alarm + variable vibration haptic motor) based on obstacle distance.',
      'Field testing showed a 40% enhancement in obstacle detection and user navigation safety.'
    ],
    github: 'https://github.com/pravin-2818'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalHighlights = document.getElementById('modalHighlights');
  const modalGithub = document.getElementById('modalGithub');

  if (!modalOverlay) return;

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      playBlip(800, 0.06);
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalDesc.textContent = data.description;
      modalGithub.setAttribute('href', data.github);

      modalHighlights.innerHTML = data.highlights
        .map(h => `<li style="margin-bottom:8px; color:#cbd5e1;"><span style="color:#00f2fe; margin-right:8px;">▹</span>${h}</li>`)
        .join('');

      modalOverlay.classList.add('active');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      playBlip(550, 0.05);
    });
  }

  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });
}

/* ==========================================================================
   13. CONTACT FORM DISPATCH, REAL EMAIL & WHATSAPP SYNC
   ========================================================================== */
function initContactActions() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('senderName');
  const emailInput = document.getElementById('senderEmail');
  const messageInput = document.getElementById('senderMessage');
  const submitBtn = document.getElementById('submitBtn');
  const submitBtnText = document.getElementById('submitBtnText');
  const formStatus = document.getElementById('formStatus');

  const btnGmail = document.getElementById('btnQuickGmail');
  const btnWhatsApp = document.getElementById('btnQuickWhatsApp');
  const btnMailto = document.getElementById('btnQuickMailto');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      playBlip(880, 0.06);

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied to clipboard: "${textToCopy}"`);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = '#10b981';
        btn.style.color = '#34d399';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      });
    });
  });

  function syncQuickLinks() {
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const msg = messageInput ? messageInput.value.trim() : '';

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Prospective Employer'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);

    if (btnGmail) {
      btnGmail.href = `https://mail.google.com/mail/?view=cm&fs=1&to=pravinchiku18@gmail.com&su=${subject}&body=${body}`;
    }
    if (btnWhatsApp) {
      const waText = encodeURIComponent(`Hi Pravin, I'm ${name || 'reaching out from your portfolio website'}.${msg ? `\n\nMessage: ${msg}` : ''}${email ? `\n\nReply email: ${email}` : ''}`);
      btnWhatsApp.href = `https://wa.me/919976979524?text=${waText}`;
    }
    if (btnMailto) {
      btnMailto.href = `mailto:pravinchiku18@gmail.com?subject=${subject}&body=${body}`;
    }
  }

  [nameInput, emailInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        inp.classList.remove('input-error');
        syncQuickLinks();
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      let hasError = false;

      if (!name) {
        if (nameInput) nameInput.classList.add('input-error');
        hasError = true;
      }
      if (!email || !email.includes('@')) {
        if (emailInput) emailInput.classList.add('input-error');
        hasError = true;
      }
      if (!message) {
        if (messageInput) messageInput.classList.add('input-error');
        hasError = true;
      }

      if (hasError) {
        playBlip(320, 0.12, 'square');
        if (formStatus) {
          formStatus.className = 'form-status-box error';
          formStatus.style.display = 'flex';
          formStatus.innerHTML = `<span>⚠️ Please fill in all fields (Name, valid Email, and Message) before sending.</span>`;
        }
        showToast('Please complete all fields with a valid email.', '#ef4444');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = 'Sending Message... ⏳';

      playBlip(700, 0.08);

      if (formStatus) {
        formStatus.className = 'form-status-box loading';
        formStatus.style.display = 'flex';
        formStatus.innerHTML = `<span>⏳ Delivering message directly to pravinchiku18@gmail.com...</span>`;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/pravinchiku18@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Message from ${name} (${email})`,
            _template: 'table'
          })
        });

        if (response.ok) {
          playRunSound();
          if (formStatus) {
            formStatus.className = 'form-status-box success';
            formStatus.style.display = 'flex';
            formStatus.innerHTML = `<span>✅ Message sent successfully! Delivered straight to Pravin's inbox (pravinchiku18@gmail.com).</span>`;
          }
          showToast(`Message sent successfully to Pravin!`);
          contactForm.reset();
          syncQuickLinks();
        } else {
          throw new Error('Server returned non-200');
        }
      } catch (err) {
        console.warn('Direct fetch failed, launching mailto fallback:', err);
        const mailtoUrl = `mailto:pravinchiku18@gmail.com?subject=${encodeURIComponent('Portfolio Message from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoUrl;

        if (formStatus) {
          formStatus.className = 'form-status-box success';
          formStatus.style.display = 'flex';
          formStatus.innerHTML = `<span>📬 Opened your email client to send to pravinchiku18@gmail.com. You can also message via WhatsApp!</span>`;
        }
        showToast('Opened mail client for message dispatch.', '#38bdf8');
      } finally {
        setTimeout(() => {
          if (submitBtn) submitBtn.disabled = false;
          if (submitBtnText) submitBtnText.textContent = 'Send Message Directly';
        }, 2000);
      }
    });
  }
}

function showToast(message, color = '#10b981') {
  let toast = document.getElementById('liveToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'liveToast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon" style="color:${color}">✔</span>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   14. DEVELOPER COMMAND PALETTE (CTRL + K / ⌘K)
   ========================================================================== */
function initCommandPalette() {
  const overlay = document.getElementById('commandPalette');
  const input = document.getElementById('paletteSearchInput');
  const list = document.getElementById('paletteList');
  const triggerBtn = document.getElementById('paletteTrigger');

  if (!overlay || !input || !list) return;

  const commands = [
    { name: 'Jump to Hero', section: '#hero', icon: '⚡', category: 'Navigation' },
    { name: 'Jump to About & Education', section: '#about', icon: '🎓', category: 'Navigation' },
    { name: 'Jump to Experience (Legendary One)', section: '#experience', icon: '💼', category: 'Navigation' },
    { name: 'Jump to Technical Skills Matrix', section: '#skills', icon: '🛠️', category: 'Navigation' },
    { name: 'Jump to Featured Projects', section: '#projects', icon: '🚀', category: 'Navigation' },
    { name: 'Inspect System Architecture Pipeline', section: '#architecture', icon: '🏛️', category: 'Architecture' },
    { name: 'View GitHub Contribution Heatmap', section: '#github-activity', icon: '🐙', category: 'GitHub' },
    { name: 'Jump to IIT Bombay Certifications', section: '#certifications', icon: '📜', category: 'Navigation' },
    { name: 'Jump to Contact Section', section: '#contact', icon: '✉️', category: 'Navigation' },
    { name: 'Run VS Code Simulator Engine', action: 'run_vscode', icon: '▶️', category: 'Interactive' },
    { name: 'Download Resume (PDF)', action: 'download_resume', icon: '📥', category: 'Action' },
    { name: 'Copy Email Address', action: 'copy_email', icon: '📋', category: 'Action' },
    { name: 'Chat on WhatsApp (+91-9976979524)', action: 'open_whatsapp', icon: '💬', category: 'Action' },
    { name: 'Toggle Cyber SFX Audio', action: 'toggle_sfx', icon: '🔊', category: 'Preference' }
  ];

  let selectedIdx = 0;

  function renderList(query = '') {
    const filter = query.toLowerCase().trim();
    const filtered = commands.filter(c => c.name.toLowerCase().includes(filter) || c.category.toLowerCase().includes(filter));

    list.innerHTML = '';
    selectedIdx = 0;

    if (filtered.length === 0) {
      list.innerHTML = `<li style="padding:16px; color:#64748b; text-align:center;">No matching commands found.</li>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const li = document.createElement('li');
      li.className = `palette-item ${idx === 0 ? 'active' : ''}`;
      li.innerHTML = `
        <div class="palette-item-left">
          <span class="palette-item-icon">${cmd.icon}</span>
          <span>${cmd.name}</span>
        </div>
        <span class="kbd-badge">${cmd.category}</span>
      `;

      li.addEventListener('click', () => executeCmd(cmd));
      list.appendChild(li);
    });
  }

  function executeCmd(cmd) {
    playBlip(880, 0.05);
    closePalette();

    if (cmd.section) {
      const el = document.querySelector(cmd.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'run_vscode') {
      const el = document.getElementById('hero');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      const runBtn = document.getElementById('btnRunCode');
      if (runBtn) setTimeout(() => runBtn.click(), 400);
    } else if (cmd.action === 'download_resume') {
      window.open('Pravin_M_Resume.pdf', '_blank');
    } else if (cmd.action === 'copy_email') {
      navigator.clipboard.writeText('pravinchiku18@gmail.com');
      showToast('Copied email: pravinchiku18@gmail.com');
    } else if (cmd.action === 'open_whatsapp') {
      window.open('https://wa.me/919976979524?text=Hi%20Pravin,%20I%20saw%20your%20portfolio!', '_blank');
    } else if (cmd.action === 'toggle_sfx') {
      const sfxBtn = document.getElementById('sfxToggle');
      if (sfxBtn) sfxBtn.click();
    }
  }

  function openPalette() {
    overlay.classList.add('active');
    input.value = '';
    renderList();
    setTimeout(() => input.focus(), 50);
    playBlip(650, 0.06);
  }

  function closePalette() {
    overlay.classList.remove('active');
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', openPalette);
  }

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closePalette();
  });

  input.addEventListener('input', e => {
    renderList(e.target.value);
  });

  window.addEventListener('keydown', e => {
    // Open on Ctrl+K or Cmd+K
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
      return;
    }

    if (!overlay.classList.contains('active')) return;

    const items = list.querySelectorAll('.palette-item');

    if (e.key === 'Escape') {
      closePalette();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) {
        items[selectedIdx].classList.remove('active');
        selectedIdx = (selectedIdx + 1) % items.length;
        items[selectedIdx].classList.add('active');
        items[selectedIdx].scrollIntoView({ block: 'nearest' });
        playBlip(780, 0.03);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0) {
        items[selectedIdx].classList.remove('active');
        selectedIdx = (selectedIdx - 1 + items.length) % items.length;
        items[selectedIdx].classList.add('active');
        items[selectedIdx].scrollIntoView({ block: 'nearest' });
        playBlip(780, 0.03);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items.length > 0) {
        items[selectedIdx].click();
      }
    }
  });
}

/* ==========================================================================
   15. CURSOR SPOTLIGHT EFFECT
   ========================================================================== */
function initCursorSpotlight() {
  const spotlight = document.querySelector('.cursor-spotlight');
  if (!spotlight) return;

  window.addEventListener('mousemove', e => {
    spotlight.style.left = `${e.clientX}px`;
    spotlight.style.top = `${e.clientY}px`;
  });
}
