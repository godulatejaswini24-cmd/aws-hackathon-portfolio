/**
 * Theme Toggle Component & Controller
 * Manages Dark/Light mode persistence, system preference syncing,
 * and renders an accessible toggle button with micro-interactions.
 */

const STORAGE_KEY = 'aws_portfolio_theme';

export function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    return saved;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}

export function toggleTheme() {
  const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function renderThemeToggle() {
  const isDark = document.documentElement.classList.contains('dark');
  
  return `
    <button 
      id="theme-toggle-btn"
      type="button"
      aria-label="Toggle dark/light theme"
      class="inline-flex items-center justify-center p-2 rounded-lg text-sm transition-all duration-200 border border-slate-700/50 hover:border-sky-400/50 bg-slate-900/40 dark:bg-slate-800/60 text-slate-300 hover:text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
      title="Toggle theme (Current: ${isDark ? 'Dark' : 'Light'})"
    >
      <span class="sr-only">Toggle theme</span>
      ${isDark ? `
        <!-- Moon Icon -->
        <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      ` : `
        <!-- Sun Icon -->
        <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      `}
    </button>
  `;
}

export function initThemeToggleListener() {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      toggleTheme();
      const parent = btn.parentElement;
      if (parent) {
        parent.innerHTML = renderThemeToggle();
        initThemeToggleListener();
      }
    });
  }
}
