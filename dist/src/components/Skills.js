/**
 * Skills Section Component
 * Groups skills by Languages, Frameworks, Cloud/AWS, and Tools
 * with visual percentage bars, proficiency badges, and categories.
 */

import { portfolioData } from '../data/data.js';

export function renderSkills() {
  const { skills } = portfolioData;

  const categories = [
    {
      title: "Cloud & AWS",
      key: "cloudAws",
      accent: "amber",
      icon: `
        <svg class="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      `,
      description: "Serverless architectures, edge delivery, and cloud infrastructure.",
    },
    {
      title: "Languages",
      key: "languages",
      accent: "sky",
      icon: `
        <svg class="w-5 h-5 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
        </svg>
      `,
      description: "Core programming and scripting languages.",
    },
    {
      title: "Frameworks & UI",
      key: "frameworks",
      accent: "cyan",
      icon: `
        <svg class="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
      `,
      description: "Frontend libraries, backend runtimes, and styling frameworks.",
    },
    {
      title: "Developer Tools",
      key: "tools",
      accent: "emerald",
      icon: `
        <svg class="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      `,
      description: "DevOps pipelines, observability, containers, and CLI tools.",
    },
  ];

  return `
    <section 
      id="skills" 
      class="py-16 sm:py-24 border-t border-[var(--color-border)] relative"
      aria-label="Technical Skills and Proficiencies"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">02 / Competencies</span>
          <div class="h-px bg-gradient-to-r from-sky-500/40 to-transparent flex-1 max-w-xs"></div>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          Technical Skills & Stack
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mb-12">
          Specialized in cloud-native serverless systems, responsive frontends, and developer-first workflows with production-proven expertise.
        </p>

        <!-- Categories Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          ${categories.map(cat => {
            const list = skills[cat.key] || [];
            return `
              <div class="glass-panel p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
                <div>
                  <!-- Category Header -->
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2.5">
                      <div class="p-2 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)]">
                        ${cat.icon}
                      </div>
                      <h3 class="font-heading text-lg font-bold text-[var(--color-text-primary)]">
                        ${cat.title}
                      </h3>
                    </div>
                    <span class="text-xs font-mono text-[var(--color-text-muted)]">${list.length} Items</span>
                  </div>

                  <p class="text-xs text-[var(--color-text-secondary)] mb-6">
                    ${cat.description}
                  </p>

                  <!-- Skills List with Visual Indicators -->
                  <div class="space-y-4">
                    ${list.map(skill => `
                      <div>
                        <div class="flex items-center justify-between text-xs mb-1.5">
                          <div class="flex items-center gap-2">
                            <span class="font-medium text-[var(--color-text-primary)]">${skill.name}</span>
                            ${skill.badge ? `
                              <span class="aws-pill text-[9px] py-0 px-1.5 font-mono">${skill.badge}</span>
                            ` : ''}
                          </div>
                          <div class="flex items-center gap-2">
                            <span class="text-[var(--color-text-muted)] font-mono text-[11px]">${skill.level}</span>
                            <span class="text-sky-400 font-mono font-semibold text-[11px]">${skill.percentage}%</span>
                          </div>
                        </div>

                        <!-- Progress Bar Visual Indicator -->
                        <div 
                          class="w-full h-2 rounded-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] overflow-hidden"
                          role="progressbar" 
                          aria-valuenow="${skill.percentage}" 
                          aria-valuemin="0" 
                          aria-valuemax="100"
                          aria-label="${skill.name} proficiency: ${skill.percentage}%"
                        >
                          <div 
                            class="h-full rounded-full transition-all duration-500 ${
                              cat.accent === 'amber' 
                                ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                                : cat.accent === 'emerald'
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                : 'bg-gradient-to-r from-sky-500 to-cyan-400'
                            }"
                            style="width: ${skill.percentage}%"
                          ></div>
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

      </div>
    </section>
  `;
}
