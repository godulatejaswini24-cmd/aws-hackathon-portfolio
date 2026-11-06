/**
 * Creative Feature Section Component
 * Hosts the embedded interactive cloud terminal with full CLI capabilities,
 * personal facts, music, hobbies, and Easter eggs.
 */

import { portfolioData } from '../data/data.js';
import { renderTerminal } from './Terminal.js';

export function renderCreativeSlot() {
  const { terminal } = portfolioData;

  return `
    <section 
      id="creative-feature" 
      class="py-16 sm:py-24 border-t border-[var(--color-border)] relative"
      aria-label="Creative Feature: Interactive Cloud Terminal"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">04 / Interactive Creative Feature</span>
          <div class="h-px bg-gradient-to-r from-sky-500/40 to-transparent flex-1 max-w-xs"></div>
        </div>

        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-3">
              <span>Interactive Cloud Terminal</span>
              <span class="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/30 px-2.5 py-1 rounded-full font-normal">
                ${terminal.version}
              </span>
            </h2>
            <p class="text-sm sm:text-base text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
              Step inside my virtual shell! Type real commands like <code class="text-amber-400 font-mono font-semibold">whoami</code>, <code class="text-amber-400 font-mono font-semibold">facts</code>, <code class="text-amber-400 font-mono font-semibold">hobbies</code>, <code class="text-amber-400 font-mono font-semibold">music</code>, and <code class="text-emerald-400 font-mono font-semibold">secret</code> to uncover what drives my code.
            </p>
          </div>

          <!-- Hotkey Tip & Fullscreen Trigger -->
          <div class="flex items-center gap-3 self-start md:self-auto">
            <div class="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--color-bg-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-muted)] font-mono">
              <span>Toggle anytime:</span>
              <kbd class="px-1.5 py-0.5 rounded bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sky-400 font-bold">~</kbd>
            </div>
          </div>
        </div>

        <!-- The Designated Creative Canvas Container Mounting the Terminal -->
        <div id="creative-feature-mount" class="relative">
          ${renderTerminal(false)}
        </div>

      </div>
    </section>
  `;
}
