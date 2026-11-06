/**
 * Footer Component
 * Semantic footer with back-to-top button, quick navigation anchors,
 * AWS Hackathon acknowledgement, and copyright.
 */

import { portfolioData } from '../data/data.js';

export function renderFooter() {
  const { personal, navLinks } = portfolioData;
  const currentYear = new Date().getFullYear();

  return `
    <footer 
      class="border-t border-[var(--color-border)] bg-[var(--color-bg-canvas)] py-12 relative"
      aria-label="Footer"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[var(--color-border)]">
          
          <!-- Brand & Bio Summary -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-amber-500 p-[1.5px]">
              <div class="w-full h-full bg-[var(--color-bg-canvas)] rounded-[6.5px] flex items-center justify-center">
                <svg class="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
              </div>
            </div>
            <div>
              <span class="font-heading font-bold text-base text-[var(--color-text-primary)]">
                ${personal.name}
              </span>
              <span class="text-xs text-[var(--color-text-muted)] block font-mono">
                ${personal.role}
              </span>
            </div>
          </div>

          <!-- Quick Navigation Anchors -->
          <nav class="flex flex-wrap items-center justify-center gap-4 text-xs font-mono" aria-label="Footer Navigation">
            ${navLinks.map(link => `
              <a 
                href="${link.href}"
                class="text-[var(--color-text-secondary)] hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 p-1 rounded"
              >
                ${link.label}
              </a>
            `).join('')}
          </nav>

          <!-- Back to Top Button -->
          <button 
            id="back-to-top-btn"
            type="button"
            class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Scroll back to top of the page"
          >
            <span>Back to Top</span>
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
            </svg>
          </button>

        </div>

        <!-- Copyright & AWS Hosting Credits -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>© ${currentYear} ${personal.name}. Built for the AWS Global Hackathon.</p>
          <div class="flex items-center gap-3 font-mono text-[11px]">
            <span class="inline-flex items-center gap-1.5 text-sky-400">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Amazon CloudFront CDN
            </span>
            <span>•</span>
            <span class="inline-flex items-center gap-1.5 text-amber-400">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Amazon S3 Static Origin
            </span>
          </div>
        </div>

      </div>
    </footer>
  `;
}

export function initFooterInteractivity() {
  const topBtn = document.getElementById('back-to-top-btn');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
