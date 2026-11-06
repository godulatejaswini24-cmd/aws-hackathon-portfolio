/**
 * Navbar Component (Mobile-First & Responsive)
 * Features sticky backdrop-blur, brand mark, navigation anchors,
 * active section observer, theme toggle button, and mobile hamburger menu.
 */

import { portfolioData } from '../data/data.js';
import { renderThemeToggle, initThemeToggleListener } from './ThemeToggle.js';

export function renderNavbar() {
  const { personal, navLinks } = portfolioData;

  return `
    <header class="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-bg-canvas)]/85 backdrop-blur-md transition-colors duration-250">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Brand Logo & Hackathon Pill -->
          <div class="flex items-center gap-3">
            <a href="#hero" class="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg p-1" aria-label="Alex Rivera Portfolio Home">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-amber-500 p-[1.5px] transition-transform group-hover:scale-105">
                <div class="w-full h-full bg-[var(--color-bg-canvas)] rounded-[7px] flex items-center justify-center">
                  <svg class="w-5 h-5 text-sky-400 group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                  </svg>
                </div>
              </div>
              <span class="font-heading font-bold text-lg tracking-tight text-[var(--color-text-primary)]">
                ${personal.name.split(' ')[0]}<span class="text-sky-400">.dev</span>
              </span>
            </a>
            
            <span class="hidden sm:inline-flex aws-pill text-[10px]">
              AWS Hackathon
            </span>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            ${navLinks.map(link => `
              <a 
                href="${link.href}" 
                data-nav-target="${link.href}"
                class="nav-anchor px-3 py-1.5 text-sm font-medium rounded-md text-[var(--color-text-secondary)] hover:text-sky-400 hover:bg-[var(--color-bg-elevated)] transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <span>${link.label}</span>
                ${link.badge ? `
                  <span class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    ${link.badge}
                  </span>
                ` : ''}
              </a>
            `).join('')}
          </nav>

          <!-- Right Action Area: Theme Toggle & Mobile Hamburger -->
          <div class="flex items-center gap-2">
            <div id="theme-toggle-container">
              ${renderThemeToggle()}
            </div>

            <!-- Mobile Hamburger Button -->
            <button 
              id="mobile-menu-btn"
              type="button"
              class="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-sky-400 hover:bg-[var(--color-bg-elevated)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
            >
              <svg id="hamburger-icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg id="close-icon" class="hidden w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu" class="hidden md:hidden border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] px-4 pt-2 pb-4 space-y-1">
        ${navLinks.map(link => `
          <a 
            href="${link.href}" 
            class="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-secondary)] hover:text-sky-400 hover:bg-[var(--color-bg-elevated)] transition-colors flex items-center justify-between"
          >
            <span>${link.label}</span>
            ${link.badge ? `
              <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                ${link.badge}
              </span>
            ` : ''}
          </a>
        `).join('')}
        <div class="pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)] flex items-center justify-between px-3">
          <span>AWS Architecture: S3 + CloudFront</span>
          <span class="aws-pill text-[9px]">Live Ready</span>
        </div>
      </div>
    </header>
  `;
}

export function initNavbarInteractivity() {
  initThemeToggleListener();

  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      if (hamburgerIcon && closeIcon) {
        hamburgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      }
    });

    // Close menu when clicking on mobile menu links
    mobileMenu.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        if (hamburgerIcon && closeIcon) {
          hamburgerIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      });
    });
  }

  // Active Anchor Observer
  initScrollSpy();
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-anchor');

  if (!sections.length || !navAnchors.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(anchor => {
          if (anchor.getAttribute('data-nav-target') === `#${id}`) {
            anchor.classList.add('text-sky-400', 'bg-[var(--color-bg-elevated)]');
            anchor.classList.remove('text-[var(--color-text-secondary)]');
          } else {
            anchor.classList.remove('text-sky-400', 'bg-[var(--color-bg-elevated)]');
            anchor.classList.add('text-[var(--color-text-secondary)]');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}
