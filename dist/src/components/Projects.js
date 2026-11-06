/**
 * Projects Section Component
 * Renders responsive project cards with title, 1-2 line description,
 * tech tags, live demo & GitHub links, and hackathon highlights.
 */

import { portfolioData } from '../data/data.js';

export function renderProjects() {
  const { projects } = portfolioData;

  return `
    <section 
      id="projects" 
      class="py-16 sm:py-24 border-t border-[var(--color-border)] relative"
      aria-label="Projects Showcase"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">03 / Works</span>
          <div class="h-px bg-gradient-to-r from-sky-500/40 to-transparent flex-1 max-w-xs"></div>
        </div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <h2 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Featured Projects
            </h2>
            <p class="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Production-grade serverless applications and hackathon innovations built on AWS.
            </p>
          </div>
          <span class="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/30 px-3 py-1.5 rounded-full self-start md:self-auto">
            ${projects.length} Architectures Built
          </span>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          ${projects.map((proj, idx) => `
            <article 
              class="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
              aria-labelledby="proj-title-${idx}"
            >
              <!-- Card Top Decoration Glow -->
              <div class="absolute -top-16 -right-16 w-32 h-32 bg-sky-500/5 group-hover:bg-sky-500/15 rounded-full blur-2xl transition-all duration-300 pointer-events-none"></div>

              <div>
                <!-- Badge Row -->
                <div class="flex items-center justify-between gap-2 mb-4">
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-mono text-sky-400 font-bold">0${idx + 1}</span>
                    ${proj.badge ? `
                      <span class="aws-pill text-[10px] py-0.5 px-2">
                        ${proj.badge}
                      </span>
                    ` : ''}
                  </div>

                  ${proj.metrics ? `
                    <span class="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      ${proj.metrics}
                    </span>
                  ` : ''}
                </div>

                <!-- Project Title -->
                <h3 
                  id="proj-title-${idx}"
                  class="font-heading text-xl sm:text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-sky-400 transition-colors mb-3"
                >
                  ${proj.title}
                </h3>

                <!-- 1-2 Line Description -->
                <p class="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  ${proj.description}
                </p>

                <!-- Tech Tags -->
                <div class="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                  ${proj.tags.map(tag => `
                    <span class="tech-chip text-xs">
                      ${tag}
                    </span>
                  `).join('')}
                </div>
              </div>

              <!-- Action Links: Live Demo & GitHub -->
              <div class="pt-6 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
                <a 
                  href="${proj.githubUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--color-text-secondary)] hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md p-1"
                  aria-label="View source code for ${proj.title} on GitHub (opens in new tab)"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  <span>Source Code</span>
                </a>

                <a 
                  href="${proj.demoUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all duration-200 hover:shadow-md hover:shadow-sky-400/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  aria-label="View live deployment of ${proj.title} (opens in new tab)"
                >
                  <span>Live App</span>
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </article>
          `).join('')}
        </div>

      </div>
    </section>
  `;
}
