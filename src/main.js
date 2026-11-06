/**
 * Application Bootstrap & Main Entry Point
 * Renders all sections and wires the interactive Terminal Creative Feature.
 */

import { portfolioData } from './data/data.js';
import { getInitialTheme, applyTheme } from './components/ThemeToggle.js';
import { renderNavbar, initNavbarInteractivity } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderAbout } from './components/About.js';
import { renderSkills } from './components/Skills.js';
import { renderProjects } from './components/Projects.js';
import { renderCreativeSlot } from './components/CreativeSlot.js';
import { renderContact, initContactFormInteractivity } from './components/Contact.js';
import { renderFooter, initFooterInteractivity } from './components/Footer.js';
import { renderTerminal, initTerminalInteractivity, openTerminalModal } from './components/Terminal.js';

function initApp() {
  // 1. Initialize Theme Engine (dark mode by default or stored user preference)
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // 2. Mount Application Shell
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('Fatal: #app root element not found in DOM.');
    return;
  }

  appContainer.innerHTML = `
    <div class="min-h-screen flex flex-col relative bg-tech-grid overflow-x-hidden">
      <!-- Ambient Top Background Glow -->
      <div class="tech-ambient-glow" aria-hidden="true"></div>
      
      <!-- Sticky Navigation Bar -->
      <div id="navbar-slot">
        ${renderNavbar()}
      </div>

      <!-- Main Semantic Content Area -->
      <main id="main-content" class="flex-1">
        ${renderHero()}
        ${renderAbout()}
        ${renderSkills()}
        ${renderProjects()}
        ${renderCreativeSlot()}
        ${renderContact()}
      </main>

      <!-- Semantic Accessible Footer -->
      <div id="footer-slot">
        ${renderFooter()}
      </div>

      <!-- Floating Terminal Launcher Pill (Visible but not intrusive, dismissible) -->
      <div 
        id="terminal-floating-wrapper" 
        class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center transition-opacity duration-300"
      >
        <div class="relative group flex items-center bg-slate-900/90 hover:bg-slate-800 rounded-full border border-sky-400/35 shadow-xl shadow-sky-500/15 backdrop-blur-md p-1 pr-3">
          <button 
            id="terminal-floating-launcher"
            type="button"
            class="inline-flex items-center gap-2 pl-2 text-sky-400 font-mono text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            title="Open interactive terminal (~ or click)"
            aria-label="Open interactive terminal modal"
          >
            <span class="relative flex h-2 w-2" aria-hidden="true">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span class="font-bold">&gt;_ Terminal</span>
            <span class="text-[10px] text-slate-400 font-mono px-1 rounded bg-slate-800 border border-slate-700 hidden sm:inline">~</span>
          </button>

          <!-- Dismiss button so hint is never annoying -->
          <button 
            id="dismiss-terminal-pill"
            type="button"
            class="ml-2 text-slate-500 hover:text-slate-300 p-0.5 rounded-full hover:bg-slate-700/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            title="Dismiss launcher badge"
            aria-label="Dismiss launcher badge"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Fullscreen / Modal Drawer for Interactive Terminal -->
      <div 
        id="terminal-modal" 
        class="hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10" 
        role="dialog" 
        aria-modal="true" 
        aria-label="Interactive Cloud Terminal Modal"
      >
        <!-- Backdrop -->
        <div id="terminal-modal-backdrop" class="absolute inset-0 bg-slate-950/80 backdrop-blur-md"></div>
        
        <!-- Modal Window Container -->
        <div class="relative z-10 w-full max-w-4xl">
          ${renderTerminal(true)}
        </div>
      </div>

    </div>
  `;

  // 3. Bind Interactivity & Event Handlers
  initNavbarInteractivity();
  initTerminalInteractivity();
  initContactFormInteractivity();
  initFooterInteractivity();

  // Floating Launcher Dismiss Logic
  const floatingWrapper = document.getElementById('terminal-floating-wrapper');
  const dismissBtn = document.getElementById('dismiss-terminal-pill');
  if (sessionStorage.getItem('terminal_pill_dismissed') === 'true' && floatingWrapper) {
    floatingWrapper.classList.add('hidden');
  }
  if (dismissBtn && floatingWrapper) {
    dismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingWrapper.classList.add('hidden');
      sessionStorage.setItem('terminal_pill_dismissed', 'true');
    });
  }

  // 4. Expose Portfolio Data for quick console debugging/inspection
  window.__PORTFOLIO_DATA__ = portfolioData;

  console.log(
    '%c AWS Portfolio %c Production Ready %c Terminal Active %c',
    'background: #ff9900; color: #000; font-weight: bold; padding: 2px 6px; border-radius: 3px;',
    'background: #0284c7; color: #fff; padding: 2px 6px; border-radius: 3px;',
    'background: #10b981; color: #000; padding: 2px 6px; border-radius: 3px;',
    ''
  );
}

// Ensure DOM is ready before bootstrapping
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
