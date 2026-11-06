/**
 * About / My Story Component
 * Renders the 3-sentence origin story, professional background,
 * education, cloud certifications, technical interests, and stats.
 */

import { portfolioData } from '../data/data.js';

export function renderAbout() {
  const { about, personal } = portfolioData;

  return `
    <section 
      id="about" 
      class="py-16 sm:py-24 border-t border-[var(--color-border)] relative"
      aria-label="About Me and My Story"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">01 / Background</span>
          <div class="h-px bg-gradient-to-r from-sky-500/40 to-transparent flex-1 max-w-xs"></div>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          About & My Story
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mb-12">
          ${about.storyHeading}
        </p>

        <!-- Stats Counter Row (Tested responsive: 2 cols on mobile, 4 on desktop) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12">
          ${about.stats.map(stat => `
            <div class="glass-panel p-4 sm:p-5 rounded-2xl text-center">
              <span class="block font-heading text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-400 to-amber-400 bg-clip-text text-transparent mb-1">
                ${stat.value}
              </span>
              <span class="text-xs sm:text-sm text-[var(--color-text-secondary)] font-medium">
                ${stat.label}
              </span>
            </div>
          `).join('')}
        </div>

        <!-- Story & Background Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Portrait Card + The 3-Sentence Narrative Story & Background -->
          <div class="lg:col-span-7 space-y-6">
            <div class="glass-panel p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              <div class="absolute -right-12 -top-12 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <!-- Profile Portrait Card with Lazy-Loaded Optimized Image -->
              <div class="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--color-border)]">
                <img 
                  src="${personal.avatar}" 
                  alt="Portrait photo of ${personal.name}" 
                  width="80" 
                  height="80" 
                  loading="lazy" 
                  decoding="async" 
                  class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-sky-400/30 shadow-md shadow-sky-500/10 flex-shrink-0"
                >
                <div class="min-w-0">
                  <h3 class="font-heading font-bold text-lg text-[var(--color-text-primary)] truncate">
                    ${personal.name}
                  </h3>
                  <p class="text-xs text-sky-400 font-mono truncate">${personal.role}</p>
                  <p class="text-xs text-[var(--color-text-muted)] font-mono mt-0.5 truncate">📍 ${personal.location}</p>
                </div>
              </div>

              <div class="flex items-center gap-2 text-xs font-mono text-sky-400 uppercase tracking-wider mb-4">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                The 3-Sentence Story
              </div>

              <div class="space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
                ${about.storySentences.map((sentence, index) => `
                  <div class="flex gap-3">
                    <span class="font-mono text-xs text-sky-400 font-bold mt-1 flex-shrink-0">0${index + 1}</span>
                    <p class="text-sm sm:text-base text-[var(--color-text-primary)] font-normal">${sentence}</p>
                  </div>
                `).join('')}
              </div>

              <div class="mt-6 pt-6 border-t border-[var(--color-border)]">
                <span class="block text-xs font-mono uppercase text-[var(--color-text-muted)] tracking-wider mb-2">Professional Background</span>
                <p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  ${about.background}
                </p>
              </div>
            </div>
          </div>

          <!-- Right Column: Education, Certification & Interests -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Education & AWS Certification Card -->
            <div class="glass-panel p-6 rounded-2xl">
              <div class="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-4">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                </svg>
                Education & Credentials
              </div>

              <div class="space-y-4">
                <div class="p-3.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-heading font-semibold text-sm text-[var(--color-text-primary)]">${about.education.degree}</span>
                    <span class="text-xs text-sky-400 font-mono">${about.education.year}</span>
                  </div>
                  <p class="text-xs text-[var(--color-text-muted)]">${about.education.institution}</p>
                </div>

                <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-heading font-semibold text-sm text-amber-300">AWS Certified</span>
                    <span class="aws-pill text-[9px]">Verified</span>
                  </div>
                  <p class="text-xs text-[var(--color-text-secondary)] font-mono">${about.education.certification}</p>
                </div>
              </div>
            </div>

            <!-- Core Interests & Specializations -->
            <div class="glass-panel p-6 rounded-2xl">
              <div class="text-xs font-mono text-sky-400 uppercase tracking-wider mb-3">
                Interests & Focus Areas
              </div>
              <div class="flex flex-wrap gap-2">
                ${about.interests.map(interest => `
                  <span class="tech-chip text-xs hover:border-sky-400/50 hover:text-sky-400 transition-colors">
                    ${interest}
                  </span>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `;
}
