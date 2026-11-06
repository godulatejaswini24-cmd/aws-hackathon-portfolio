/**
 * Hero Section Component
 * Displays developer name, tagline, availability status,
 * AWS Hackathon badge, interactive terminal hint, and action buttons.
 */

import { portfolioData } from '../data/data.js';

export function renderHero() {
  const { personal } = portfolioData;

  return `
    <section 
      id="hero" 
      class="relative pt-8 pb-16 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36 overflow-hidden" 
      aria-label="Introduction and Summary"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          
          <!-- Live Status Badges & Visible Terminal Hint (Responsive wrap) -->
          <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 backdrop-blur-sm">
              <span class="relative flex h-2 w-2" aria-hidden="true">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span class="truncate">${personal.status}</span>
            </div>

            <!-- Visible Creative Feature Terminal Hint -->
            <button 
              id="hero-terminal-hint-btn"
              type="button"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 transition-all cursor-pointer group shadow-sm shadow-sky-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              title="Click to launch interactive cloud terminal (or press ~)"
            >
              <span class="flex h-1.5 w-1.5 relative">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
              </span>
              <span class="font-semibold text-amber-300">▶ Try terminal</span>
              <span class="text-slate-400 group-hover:text-slate-200 transition-colors hidden sm:inline">(Press <kbd class="px-1 py-0.5 rounded bg-slate-800 text-sky-300 font-bold text-[10px]">~</kbd>)</span>
            </button>
          </div>

          <!-- Hackathon Track Pill -->
          <div class="flex items-center gap-2 mb-4">
            <span class="aws-pill text-[11px]">
              <svg class="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
              <span class="truncate">${personal.hackathonTrack}</span>
            </span>
          </div>

          <!-- Developer Name & Title -->
          <h1 class="font-heading text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-5 sm:mb-6 leading-[1.12]">
            Hi, I'm <span class="bg-gradient-to-r from-sky-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">${personal.name}</span>
          </h1>

          <!-- Tagline -->
          <p class="font-body text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] mb-8 sm:mb-10 leading-relaxed font-normal max-w-2xl">
            ${personal.tagline}
          </p>

          <!-- Action Buttons: View Projects & Contact (Full width on 360px mobile, inline on sm+) -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
            <a 
              href="#projects" 
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 transition-all duration-200 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 text-center"
              aria-label="Navigate to Projects Section"
            >
              <span>View Projects</span>
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
              </svg>
            </a>

            <a 
              href="#contact" 
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm sm:text-base text-[var(--color-text-primary)] bg-[var(--color-bg-surface)] hover:bg-[var(--color-bg-elevated)] border border-[var(--color-border)] hover:border-sky-400/50 transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 text-center"
              aria-label="Navigate to Contact Section"
            >
              <span>Get in Touch</span>
              <svg class="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </a>
          </div>

          <!-- Micro Spec Summary Bar -->
          <div class="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[var(--color-border)] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[var(--color-text-muted)] font-mono">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-sky-400 flex-shrink-0"></span>
              <span>Hosting: AWS S3 + CloudFront</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"></span>
              <span>Stack: Modular ES6 + Tailwind</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
              <span>Location: ${personal.location}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
