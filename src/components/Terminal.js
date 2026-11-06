/**
 * Interactive Cloud Terminal Component (Creative Feature)
 * Fully interactive end-to-end CLI featuring:
 * - Real personal facts, hobbies, music, quirks, and secret Easter eggs
 * - Touch-friendly quick command chips for mobile
 * - Dual mode: Embedded in page & Fullscreen Modal Drawer
 * - Keyboard shortcuts: '~' or '`' to toggle, 'Esc' to close, Up/Down for command history, Tab to auto-complete
 * - Error handling with helpful suggestions
 */

import { portfolioData } from '../data/data.js';
import { toggleTheme, applyTheme } from './ThemeToggle.js';

// Global state for command history and modal visibility
const commandHistory = [];
let historyIndex = -1;
let isModalOpen = false;

export function renderTerminal(isModal = false) {
  const { terminal } = portfolioData;

  const idPrefix = isModal ? 'modal-term' : 'embed-term';

  return `
    <div 
      id="${idPrefix}-container" 
      class="w-full rounded-2xl bg-slate-950/95 border border-slate-800 text-slate-100 font-mono shadow-2xl overflow-hidden flex flex-col ${isModal ? 'h-[85vh] max-h-[700px]' : 'h-[520px]'}"
    >
      <!-- Terminal Header / Title Bar -->
      <div class="px-4 py-3 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between select-none">
        
        <!-- Window Traffic Light Buttons -->
        <div class="flex items-center gap-2">
          <button 
            type="button" 
            class="term-btn-close w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors focus:outline-none" 
            title="${isModal ? 'Close Modal (Esc)' : 'Clear Terminal'}"
            aria-label="${isModal ? 'Close Modal Terminal' : 'Clear Terminal'}"
          ></button>
          <button 
            type="button" 
            class="term-btn-minimize w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors focus:outline-none" 
            title="Clear Output"
            aria-label="Clear Output"
          ></button>
          <button 
            type="button" 
            class="term-btn-maximize w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors focus:outline-none" 
            title="${isModal ? 'Restore View' : 'Open in Fullscreen Modal'}"
            aria-label="${isModal ? 'Restore View' : 'Open in Fullscreen Modal'}"
          ></button>
        </div>

        <!-- Terminal Title -->
        <div class="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <svg class="w-3.5 h-3.5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span class="truncate">bash: alex@aws-cloud:~ (${terminal.version})</span>
        </div>

        <!-- Status & Mode Badge -->
        <div class="flex items-center gap-2 text-[11px]">
          <span class="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
            Online
          </span>
          ${isModal ? `
            <button 
              type="button" 
              class="modal-close-icon text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
              aria-label="Close terminal modal (Esc)"
              title="Close (Esc)"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          ` : ''}
        </div>

      </div>

      <!-- Quick Command Bar (Mobile & Click friendly) -->
      <div class="px-3 py-2 bg-slate-900/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
        <span class="text-slate-400 font-semibold uppercase text-[10px] pl-1 tracking-wider whitespace-nowrap">Tap:</span>
        ${terminal.quickCommands.map(cmd => `
          <button 
            type="button"
            data-cmd="${cmd}"
            class="term-chip px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-sky-500 hover:text-slate-950 text-sky-300 font-mono transition-all duration-150 border border-slate-700/60 hover:border-sky-400 whitespace-nowrap active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            title="Click to execute '${cmd}'"
          >
            ${cmd}
          </button>
        `).join('')}
      </div>

      <!-- Terminal Output Screen -->
      <div 
        id="${idPrefix}-output" 
        class="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs sm:text-sm leading-relaxed scroll-smooth"
        tabindex="0"
        role="log"
        aria-live="polite"
        aria-atomic="false"
        aria-label="Terminal output log"
      >
        <!-- Initial Welcome Banner -->
        <div class="text-sky-400/90 whitespace-pre font-mono text-[11px] sm:text-xs select-none">
${terminal.banner.join('\n')}
        </div>
        <p class="text-slate-300 text-xs sm:text-sm">
          👋 Welcome! I am <strong class="text-sky-400">Alex's Cloud Agent</strong>. You can ask me about my <span class="text-amber-400 font-semibold">facts</span>, <span class="text-amber-400 font-semibold">hobbies</span>, <span class="text-amber-400 font-semibold">music</span>, <span class="text-amber-400 font-semibold">projects</span>, or unlock the <span class="text-emerald-400 font-semibold">secret</span> Easter egg.
        </p>
        <p class="text-slate-400 text-xs">
          Type <code class="text-amber-300 font-bold bg-slate-800 px-1.5 py-0.5 rounded">help</code> to list all commands, or click any chip above.
        </p>
      </div>

      <!-- Input Command Line -->
      <div class="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <label for="${idPrefix}-input" class="text-sky-400 font-bold whitespace-nowrap text-xs sm:text-sm select-none">
          ${terminal.promptUser}
        </label>
        
        <div class="relative flex-1 flex items-center">
          <input 
            type="text" 
            id="${idPrefix}-input" 
            autocomplete="off" 
            autocorrect="off" 
            autocapitalize="off" 
            spellcheck="false"
            placeholder="Type 'help', 'facts', 'secret'..."
            class="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs sm:text-sm border-none p-0 focus:ring-0"
            aria-label="Terminal command input"
          >
          <span class="term-cursor inline-block w-2 h-4 bg-sky-400 animate-pulse ml-0.5" aria-hidden="true"></span>
        </div>

        <button 
          type="button" 
          id="${idPrefix}-submit"
          class="sm:hidden px-3 py-1 bg-sky-500 text-slate-950 font-bold text-xs rounded hover:bg-sky-400 active:scale-95 transition-transform"
          aria-label="Submit Command"
        >
          Run
        </button>
      </div>

    </div>
  `;
}

/**
 * Executes a terminal command and returns formatted HTML output
 */
export function executeCommand(rawCommand) {
  const cmd = rawCommand.trim().toLowerCase();
  const { terminal, personal, projects } = portfolioData;

  if (!cmd) {
    return '';
  }

  // Save to history
  if (commandHistory[commandHistory.length - 1] !== cmd) {
    commandHistory.push(cmd);
  }
  historyIndex = commandHistory.length;

  switch (cmd) {
    case 'help':
      return `
        <div class="space-y-1.5 text-xs sm:text-sm">
          <div class="text-amber-400 font-bold mb-2">⚡ AVAILABLE COMMANDS:</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
            <div><span class="text-sky-400 font-bold">whoami</span> - Identity, philosophy & role</div>
            <div><span class="text-sky-400 font-bold">facts</span> - All 10 personal quirks & stories</div>
            <div><span class="text-sky-400 font-bold">fact</span> - Get a single random fact</div>
            <div><span class="text-sky-400 font-bold">hobbies</span> - What I do outside of coding</div>
            <div><span class="text-sky-400 font-bold">music</span> - Current playlist & audio fuel</div>
            <div><span class="text-sky-400 font-bold">quirks</span> - Weird developer habits</div>
            <div><span class="text-sky-400 font-bold">projects</span> - Flagship hackathon builds</div>
            <div><span class="text-sky-400 font-bold">skills</span> - Cloud & stack overview</div>
            <div><span class="text-sky-400 font-bold">aws</span> - Architecture of this portfolio</div>
            <div><span class="text-sky-400 font-bold">secret</span> - Unlock classified Easter egg</div>
            <div><span class="text-sky-400 font-bold">coffee</span> - ASCII coffee ritual</div>
            <div><span class="text-sky-400 font-bold">matrix</span> - Digital rain Easter egg</div>
            <div><span class="text-sky-400 font-bold">theme</span> - Toggle light / dark mode</div>
            <div><span class="text-sky-400 font-bold">clear</span> - Clear terminal screen</div>
          </div>
          <div class="text-slate-400 text-xs mt-3">
            💡 <em>Tip: Tap command chips, use Up/Down arrows for history, or Tab for auto-completion.</em>
          </div>
        </div>
      `;

    case 'whoami':
      return `
        <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
          <div class="text-sky-400 font-bold font-heading text-base">${personal.name}</div>
          <div class="text-amber-400 text-xs">${personal.role}</div>
          <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">${personal.bio}</p>
          <div class="text-xs text-slate-400 pt-1 border-t border-slate-800 flex flex-wrap gap-4 font-mono">
            <span>📍 Location: ${personal.location}</span>
            <span>🚀 Status: Hackathon Ready</span>
          </div>
        </div>
      `;

    case 'facts':
      return `
        <div class="space-y-2.5">
          <div class="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            🎯 10 AUTHENTIC FACTS & QUIRKS ABOUT ALEX:
          </div>
          ${terminal.facts.map(item => `
            <div class="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80 text-xs">
              <span class="text-sky-400 font-semibold font-mono block mb-0.5">${item.tag}</span>
              <span class="text-slate-200">${item.fact}</span>
            </div>
          `).join('')}
        </div>
      `;

    case 'fact': {
      const randomFact = terminal.facts[Math.floor(Math.random() * terminal.facts.length)];
      return `
        <div class="p-3 rounded-lg bg-slate-900 border border-sky-500/30 text-xs sm:text-sm">
          <span class="text-amber-400 font-bold block mb-1">🎲 RANDOM FACT [${randomFact.tag}]:</span>
          <p class="text-slate-100">${randomFact.fact}</p>
        </div>
      `;
    }

    case 'hobbies':
      return `
        <div class="space-y-2">
          <div class="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
            🏔️ HOBBIES & LIFE OUTSIDE MONITORS:
          </div>
          ${terminal.hobbies.map(h => `
            <div class="flex items-start gap-2.5 text-xs sm:text-sm p-2 rounded bg-slate-900/60">
              <span class="text-sky-400 font-bold mt-0.5">▹</span>
              <div>
                <strong class="text-slate-100">${h.title}:</strong>
                <span class="text-slate-400 ml-1">${h.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `;

    case 'music':
      return `
        <div class="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs sm:text-sm">
          <div class="text-sky-400 font-bold flex items-center gap-2">
            <svg class="w-4 h-4 text-amber-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
            </svg>
            CODING AUDIO FLOW STATE
          </div>
          <div><span class="text-slate-400">Current Loop:</span> <span class="text-emerald-400 font-mono font-semibold">${terminal.music.currentTrack}</span></div>
          <div><span class="text-slate-400">Favorite Genres:</span> <span class="text-slate-200">${terminal.music.genres.join(', ')}</span></div>
          <div><span class="text-slate-400">Top Artists:</span> <span class="text-slate-200">${terminal.music.artists.join(' • ')}</span></div>
        </div>
      `;

    case 'quirks':
      return `
        <div class="space-y-1.5 text-xs sm:text-sm">
          <div class="text-amber-400 font-bold mb-2">⚡ DEVELOPER QUIRKS & HABITS:</div>
          ${terminal.quirks.map(q => `
            <div class="p-2 rounded bg-slate-900/60 border border-slate-800/60 text-slate-200">
              <span class="text-sky-400 font-mono mr-1.5">⚡</span> ${q}
            </div>
          `).join('')}
        </div>
      `;

    case 'projects':
      return `
        <div class="space-y-2 text-xs sm:text-sm">
          <div class="text-amber-400 font-bold mb-1">🚀 HACKATHON SHOWCASE PROJECTS:</div>
          ${projects.map((p, i) => `
            <div class="p-2.5 rounded bg-slate-900 border border-slate-800">
              <div class="flex items-center justify-between mb-1">
                <span class="text-sky-400 font-bold">0${i + 1}. ${p.title}</span>
                <span class="text-[10px] text-amber-400 font-mono px-1.5 rounded bg-amber-500/10">${p.badge}</span>
              </div>
              <p class="text-slate-300 text-xs mb-1.5">${p.description}</p>
              <div class="text-xs text-slate-400 font-mono">
                Tags: ${p.tags.join(', ')}
              </div>
            </div>
          `).join('')}
          <div class="text-xs text-sky-400">
            👉 Scroll down to <a href="#projects" class="underline hover:text-white">#projects</a> for live demo buttons!
          </div>
        </div>
      `;

    case 'skills':
      return `
        <div class="space-y-2 text-xs sm:text-sm">
          <div class="text-sky-400 font-bold">☁️ CLOUD & TECH COMPETENCIES:</div>
          <div class="p-2 rounded bg-slate-900 border border-slate-800 space-y-1 text-slate-300 font-mono text-xs">
            <div><span class="text-amber-400">AWS:</span> S3, CloudFront CDN, Lambda, API Gateway, DynamoDB, CDK</div>
            <div><span class="text-sky-400">Frontend:</span> React, Tailwind CSS, Vite, JavaScript ES6+, HTML5/CSS3</div>
            <div><span class="text-emerald-400">Backend:</span> Node.js, Python, REST APIs, GraphQL, FastAPI</div>
            <div><span class="text-purple-400">DevOps:</span> Git/GitHub, Docker, GitHub Actions CI/CD, CloudWatch</div>
          </div>
        </div>
      `;

    case 'aws':
      return `
        <div class="p-3 rounded-lg bg-slate-900 border border-amber-500/30 text-xs sm:text-sm font-mono space-y-2">
          <div class="text-amber-400 font-bold">☁️ LIVE AWS ARCHITECTURE PIPELINE:</div>
          <div class="text-slate-300 leading-normal">
            [User Browser]<br>
            &nbsp;&nbsp;│<br>
            &nbsp;&nbsp;▼ HTTPS (TLS 1.3 / Route 53)<br>
            [Amazon CloudFront CDN (450+ Edge PoPs)]<br>
            &nbsp;&nbsp;│<br>
            &nbsp;&nbsp;▼ Origin Access Control (OAC)<br>
            [Amazon S3 Static Bucket (Pure Static HTML/CSS/JS)]
          </div>
          <div class="text-emerald-400 text-xs pt-2 border-t border-slate-800">
            ✓ Cache Hit Ratio: 99.4% • Global TTFB: &lt; 35ms
          </div>
        </div>
      `;

    case 'secret':
    case 'cat secret.txt':
    case 'easteregg':
      return `
        <div class="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-purple-500/20 border-2 border-amber-400 text-xs sm:text-sm space-y-2 animate-pulse">
          <div class="text-amber-300 font-bold font-heading text-base">
            ${terminal.secret.title}
          </div>
          <p class="text-slate-100 leading-relaxed font-normal">
            ${terminal.secret.message}
          </p>
          <div class="p-2 rounded bg-black/60 font-mono text-[11px] text-emerald-400 border border-emerald-500/40">
            AUTH_TOKEN: AWS_HACKATHON_SUPERSTAR_2026_VERIFIED
          </div>
        </div>
      `;

    case 'coffee':
      return `
        <div class="text-amber-300 font-mono text-xs whitespace-pre select-none leading-none py-1">
       (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
       &lt;_____________&gt; ___
       |             |/ _ \\
       |   FRESH     | | | |
       |   BREW      |\\___/
       |_____________|
        </div>
        <p class="text-slate-300 text-xs mt-1">
          ☕ Single-origin Ethiopian Yirgacheffe freshly brewed! Grind: 650μm, Temp: 93°C. Ready for coding.
        </p>
      `;

    case 'sudo':
    case 'sudo su':
      return `
        <div class="p-2.5 rounded bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
          <strong>Permission Denied:</strong> User 'visitor' is not in the sudoers file. This incident has been logged and forwarded to Amazon CloudWatch Alarm: <span class="font-mono underline">arn:aws:cloudwatch:hackathon-alert</span>.
        </div>
      `;

    case 'matrix':
      return `
        <div class="text-emerald-400 font-mono text-xs whitespace-pre leading-tight py-1 bg-black/80 p-2 rounded border border-emerald-500/30">
01000001 01001100 01000101 01011000 // WAKE UP, VISITOR...
01010011 01000101 01010010 01010110 // THE CLOUD HAS YOU.
01000101 01010010 01001100 01000101 // FOLLOW THE LAMBDA FUNCTION.
01010011 01010011 00100000 01000011 // KNOCK, KNOCK, CLOUDFRONT.
        </div>
      `;

    case 'theme': {
      const nextTheme = toggleTheme();
      return `
        <div class="text-sky-400 text-xs">
          🎨 Theme toggled successfully! Current mode: <strong class="uppercase text-amber-400">${nextTheme}</strong>.
        </div>
      `;
    }

    case 'theme dark':
      applyTheme('dark');
      return `<div class="text-sky-400 text-xs">🌙 Theme switched to <strong>DARK</strong>.</div>`;

    case 'theme light':
      applyTheme('light');
      return `<div class="text-sky-400 text-xs">☀️ Theme switched to <strong>LIGHT</strong>.</div>`;

    case 'clear':
    case 'cls':
      return '__CLEAR__';

    default:
      return `
        <div class="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span class="text-rose-400 font-mono">bash: command not found: "${rawCommand}"</span>
          <p class="text-slate-400 text-[11px] mt-1">
            💡 Did you mean: <code class="text-sky-400 font-bold">help</code>, <code class="text-sky-400 font-bold">whoami</code>, <code class="text-sky-400 font-bold">facts</code>, <code class="text-sky-400 font-bold">hobbies</code>, <code class="text-sky-400 font-bold">music</code>, or <code class="text-sky-400 font-bold">secret</code>?
          </p>
        </div>
      `;
  }
}

/**
 * Initializes listeners for embedded terminal and modal terminal
 */
export function initTerminalInteractivity() {
  setupTerminalInstance('embed-term');
  setupModalDrawer();
  setupGlobalShortcuts();
}

/**
 * Sets up an individual terminal instance (input, submit, click chips)
 */
function setupTerminalInstance(prefix) {
  const container = document.getElementById(`${prefix}-container`);
  if (!container) return;

  const input = document.getElementById(`${prefix}-input`);
  const output = document.getElementById(`${prefix}-output`);
  const submitBtn = document.getElementById(`${prefix}-submit`);
  const clearBtn = container.querySelector('.term-btn-minimize');
  const closeBtn = container.querySelector('.term-btn-close');
  const maxBtn = container.querySelector('.term-btn-maximize');

  // Handle command submission
  const handleRun = (cmdString) => {
    const raw = cmdString !== undefined ? cmdString : input.value;
    if (!raw.trim()) return;

    // Render user command entry
    const userPromptHtml = `
      <div class="flex items-center gap-2 text-xs sm:text-sm mt-3 pt-2 border-t border-slate-800/60">
        <span class="text-sky-400 font-bold font-mono">${portfolioData.terminal.promptUser}</span>
        <span class="text-white font-mono font-medium">${escapeHtml(raw)}</span>
      </div>
    `;

    const resultHtml = executeCommand(raw);

    if (resultHtml === '__CLEAR__') {
      output.innerHTML = `
        <div class="text-slate-400 text-xs font-mono py-2">
          Terminal cleared. Type 'help' for commands.
        </div>
      `;
    } else {
      output.insertAdjacentHTML('beforeend', userPromptHtml + resultHtml);
    }

    if (input) {
      input.value = '';
    }

    // Auto-scroll output to bottom
    output.scrollTop = output.scrollHeight;
  };

  // Input keydown handlers (Enter, Arrow Up, Arrow Down, Tab)
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          input.value = commandHistory[historyIndex];
        } else {
          historyIndex = commandHistory.length;
          input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const current = input.value.toLowerCase().trim();
        if (current) {
          const match = portfolioData.terminal.quickCommands.find(c => c.startsWith(current));
          if (match) {
            input.value = match;
          }
        }
      }
    });
  }

  // Submit button click for mobile
  if (submitBtn) {
    submitBtn.addEventListener('click', () => handleRun());
  }

  // Quick Command Chips Click
  container.querySelectorAll('.term-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      handleRun(cmd);
      if (input) input.focus();
    });
  });

  // Clear button (yellow button)
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      output.innerHTML = `
        <div class="text-slate-400 text-xs font-mono py-2">
          Terminal cleared. Type 'help' for available commands.
        </div>
      `;
      if (input) input.focus();
    });
  }

  // Maximize button (green button) toggles modal view
  if (maxBtn) {
    maxBtn.addEventListener('click', () => {
      toggleTerminalModal();
    });
  }

  // Close button (red button)
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (prefix.startsWith('modal')) {
        closeTerminalModal();
      } else {
        output.innerHTML = `
          <div class="text-slate-500 text-xs font-mono py-2">
            Terminal reset. Click any chip to restart.
          </div>
        `;
      }
    });
  }
}

/**
 * Sets up the Global Modal Drawer and Floating Launcher
 */
function setupModalDrawer() {
  const modal = document.getElementById('terminal-modal');
  const backdrop = document.getElementById('terminal-modal-backdrop');
  const launcher = document.getElementById('terminal-floating-launcher');
  const heroTrigger = document.getElementById('hero-terminal-hint-btn');

  // Floating Launcher Click
  if (launcher) {
    launcher.addEventListener('click', () => {
      toggleTerminalModal();
    });
  }

  // Hero Hint Button Click
  if (heroTrigger) {
    heroTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openTerminalModal();
    });
  }

  // Backdrop click closes modal
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeTerminalModal();
    });
  }

  // Close icons inside modal
  document.querySelectorAll('.modal-close-icon').forEach(btn => {
    btn.addEventListener('click', () => closeTerminalModal());
  });

  // Setup the modal's terminal instance
  setupTerminalInstance('modal-term');
}

/**
 * Sets up global keyboard shortcuts (~ and Esc)
 */
function setupGlobalShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Esc closes modal
    if (e.key === 'Escape' && isModalOpen) {
      closeTerminalModal();
      return;
    }

    // Tilde / Backquote opens modal if not actively typing in an input/textarea
    if ((e.key === '`' || e.key === '~') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      toggleTerminalModal();
    }
  });
}

export function openTerminalModal() {
  const modal = document.getElementById('terminal-modal');
  if (modal) {
    modal.classList.remove('hidden');
    isModalOpen = true;
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      const input = document.getElementById('modal-term-input');
      if (input) input.focus();
    }, 100);
  }
}

export function closeTerminalModal() {
  const modal = document.getElementById('terminal-modal');
  if (modal) {
    modal.classList.add('hidden');
    isModalOpen = false;
    document.body.classList.remove('overflow-hidden');
  }
}

export function toggleTerminalModal() {
  if (isModalOpen) {
    closeTerminalModal();
  } else {
    openTerminalModal();
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
