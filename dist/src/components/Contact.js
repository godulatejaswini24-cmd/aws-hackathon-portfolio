/**
 * Contact Section Component
 * Includes direct contact cards (Email, GitHub, LinkedIn, Twitter)
 * and an accessible interactive message form with mailto fallback.
 */

import { portfolioData } from '../data/data.js';

export function renderContact() {
  const { contact } = portfolioData;

  return `
    <section 
      id="contact" 
      class="py-16 sm:py-24 border-t border-[var(--color-border)] relative"
      aria-label="Contact Information"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Section Header -->
        <div class="flex items-center gap-3 mb-3">
          <span class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400">05 / Connect</span>
          <div class="h-px bg-gradient-to-r from-sky-500/40 to-transparent flex-1 max-w-xs"></div>
        </div>
        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          ${contact.heading}
        </h2>
        <p class="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mb-12">
          ${contact.subheading}
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Direct Links Column (Email, GitHub, LinkedIn, Twitter) -->
          <div class="lg:col-span-5 space-y-4">
            
            <!-- Quick Email Card -->
            <a 
              href="mailto:${contact.email}"
              class="glass-panel p-5 rounded-2xl block group hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              aria-label="Send direct email to ${contact.email}"
            >
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <span class="block text-xs font-mono text-[var(--color-text-muted)] uppercase">Direct Email</span>
                  <span class="font-heading font-semibold text-base text-[var(--color-text-primary)] group-hover:text-sky-400 transition-colors">
                    ${contact.email}
                  </span>
                </div>
              </div>
            </a>

            <!-- Social Links Grid -->
            ${contact.socialLinks.map(social => `
              <a 
                href="${social.url}"
                target="_blank"
                rel="noopener noreferrer"
                class="glass-panel p-4 rounded-xl flex items-center justify-between group hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                aria-label="Connect on ${social.platform} (opens in new tab)"
              >
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)] group-hover:text-sky-400 transition-colors">
                    ${getSocialIcon(social.icon)}
                  </div>
                  <div>
                    <h4 class="font-heading font-semibold text-sm text-[var(--color-text-primary)] group-hover:text-sky-400 transition-colors">
                      ${social.platform}
                    </h4>
                    <p class="text-xs text-[var(--color-text-muted)] font-mono">${social.username}</p>
                  </div>
                </div>

                <svg class="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            `).join('')}

            <!-- Availability Note -->
            <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>${contact.availability}</span>
            </div>

          </div>

          <!-- Interactive Contact Form -->
          <div class="lg:col-span-7">
            <div class="glass-panel p-6 sm:p-8 rounded-2xl">
              <h3 class="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-2">
                Send a Message
              </h3>
              <p class="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-6">
                Fill out the form below to initiate an email dispatch.
              </p>

              <form id="portfolio-contact-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-name" class="block text-xs font-mono text-[var(--color-text-secondary)] mb-1.5">
                      Your Name <span class="text-amber-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      name="name" 
                      required 
                      placeholder="Jane Doe"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                    >
                  </div>

                  <div>
                    <label for="contact-email" class="block text-xs font-mono text-[var(--color-text-secondary)] mb-1.5">
                      Your Email <span class="text-amber-400">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      name="email" 
                      required 
                      placeholder="jane@example.com"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                    >
                  </div>
                </div>

                <div>
                  <label for="contact-subject" class="block text-xs font-mono text-[var(--color-text-secondary)] mb-1.5">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="contact-subject" 
                    name="subject" 
                    placeholder="AWS Hackathon Collaboration / Project Query"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors"
                  >
                </div>

                <div>
                  <label for="contact-message" class="block text-xs font-mono text-[var(--color-text-secondary)] mb-1.5">
                    Message <span class="text-amber-400">*</span>
                  </label>
                  <textarea 
                    id="contact-message" 
                    name="message" 
                    rows="4" 
                    required 
                    placeholder="Tell me about your project, idea, or role..."
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors resize-y"
                  ></textarea>
                </div>

                <div class="flex items-center justify-between pt-2">
                  <span class="text-xs text-[var(--color-text-muted)] font-mono">
                    Direct Mailto Trigger
                  </span>

                  <button 
                    type="submit" 
                    class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all duration-200 shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    <span>Send Message</span>
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                </div>

                <div id="contact-form-feedback" class="hidden p-3 rounded-lg text-xs font-mono"></div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  `;
}

function getSocialIcon(iconType) {
  if (iconType === 'github') {
    return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`;
  }
  if (iconType === 'linkedin') {
    return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>`;
  }
  if (iconType === 'aws') {
    return `<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
  }
  // Default/Twitter
  return `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
}

export function initContactFormInteractivity() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('contact-form-feedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const subject = document.getElementById('contact-subject').value || 'Portfolio Contact Inquiry';
      const message = document.getElementById('contact-message').value;

      // Construct mailto link
      const mailtoUrl = `mailto:${portfolioData.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Alex,\n\n${message}\n\nFrom: ${name} (${email})`)}`;
      
      feedback.className = 'p-3 rounded-lg text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400';
      feedback.textContent = `Preparing dispatch to ${portfolioData.contact.email}... Opening your email client.`;
      feedback.classList.remove('hidden');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }
}
