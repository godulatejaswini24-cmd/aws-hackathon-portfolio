/**
 * Portfolio Data Source of Truth
 * All components read directly from this configuration.
 * Edit this file to update your portfolio content.
 */

export const portfolioData = {
  // 1. Personal & Hero Information
  personal: {
    name: "Alex Rivera",
    role: "Cloud Architect & Full-Stack Engineer",
    tagline: "Architecting resilient, serverless cloud solutions & high-performance web experiences on AWS.",
    status: "🚀 Available for Hackathon Collaboration & Cloud Roles",
    location: "Seattle, WA • Remote",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    hackathonTrack: "AWS Global Hackathon • Serverless & Edge Computing Track",
    resumeUrl: "#contact",
  },

  // 2. About / My Story Section
  about: {
    storyHeading: "Engineering scalable distributed systems with human-centered interfaces.",
    storySentences: [
      "I started coding building real-time telemetry tools, where I quickly fell in love with distributed systems and the sheer power of cloud infrastructure.",
      "Over the past 5 years, my mission has centered on eliminating server management overhead through event-driven serverless architectures on AWS.",
      "Today, I'm competing in this hackathon to push the boundaries of what is possible at the edge using Amazon CloudFront, Lambda@Edge, and modern reactive frontends."
    ],
    background: "5+ years crafting full-stack web applications and cloud architectures for startups and high-traffic platforms, with a focus on zero-downtime deployments and performance optimization.",
    education: {
      degree: "B.S. in Computer Science",
      institution: "University of Washington",
      certification: "AWS Certified Solutions Architect – Associate",
      year: "Graduated with Honors",
    },
    interests: [
      "Serverless Architecture",
      "Edge Computing & CDNs",
      "Event-Driven Systems",
      "Developer Experience (DX)",
      "Open Source Tooling",
      "Distributed Caching"
    ],
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Cloud Services Used", value: "20+" },
      { label: "Serverless Deployments", value: "100+" },
      { label: "Hackathons & Awards", value: "4x Winner" },
    ]
  },

  // 3. Technical Skills Grouped by Category
  skills: {
    languages: [
      { name: "TypeScript", level: "Expert", percentage: 95 },
      { name: "JavaScript (ES6+)", level: "Expert", percentage: 95 },
      { name: "Python", level: "Advanced", percentage: 88 },
      { name: "Go", level: "Intermediate", percentage: 75 },
      { name: "SQL", level: "Advanced", percentage: 85 },
      { name: "HTML5 & CSS3", level: "Expert", percentage: 95 },
    ],
    frameworks: [
      { name: "React", level: "Expert", percentage: 95 },
      { name: "Tailwind CSS", level: "Expert", percentage: 95 },
      { name: "Next.js", level: "Advanced", percentage: 90 },
      { name: "Node.js / Express", level: "Advanced", percentage: 90 },
      { name: "FastAPI", level: "Intermediate", percentage: 80 },
      { name: "Vite", level: "Expert", percentage: 92 },
    ],
    cloudAws: [
      { name: "Amazon S3", level: "Expert", percentage: 98, badge: "Storage" },
      { name: "Amazon CloudFront", level: "Expert", percentage: 96, badge: "CDN / Edge" },
      { name: "AWS Lambda", level: "Expert", percentage: 94, badge: "Serverless" },
      { name: "Amazon API Gateway", level: "Advanced", percentage: 90, badge: "APIs" },
      { name: "Amazon DynamoDB", level: "Advanced", percentage: 88, badge: "NoSQL" },
      { name: "AWS CDK & CloudFormation", level: "Intermediate", percentage: 82, badge: "IaC" },
    ],
    tools: [
      { name: "Git & GitHub", level: "Expert", percentage: 95 },
      { name: "Docker", level: "Intermediate", percentage: 80 },
      { name: "AWS CLI", level: "Advanced", percentage: 90 },
      { name: "Postman", level: "Advanced", percentage: 88 },
      { name: "GitHub Actions (CI/CD)", level: "Advanced", percentage: 85 },
      { name: "Amazon CloudWatch", level: "Advanced", percentage: 86 },
    ],
  },

  // 4. Projects Showcase
  projects: [
    {
      id: "project-1",
      title: "CloudVault Serverless Storage",
      description: "Zero-knowledge encrypted asset distribution engine using S3 presigned URLs, CloudFront signed cookies, and Lambda authentication.",
      tags: ["Amazon S3", "CloudFront CDN", "AWS Lambda", "Tailwind CSS"],
      badge: "Hackathon Highlight",
      featured: true,
      demoUrl: "https://example.com/demo",
      githubUrl: "https://github.com/example/cloudvault",
      metrics: "Sub-50ms Global Latency",
    },
    {
      id: "project-2",
      title: "PulseMetrics Live Observability",
      description: "Real-time streaming telemetry dashboard processing serverless logs with WebSocket API Gateway, DynamoDB streams, and reactive charts.",
      tags: ["API Gateway", "DynamoDB Streams", "React", "Chart.js"],
      badge: "Production Ready",
      featured: true,
      demoUrl: "https://example.com/pulse",
      githubUrl: "https://github.com/example/pulse-metrics",
      metrics: "10k Events / Sec",
    },
    {
      id: "project-3",
      title: "EdgeResize Media Pipeline",
      description: "On-the-fly automated responsive image optimization and WebP conversion running at the edge via CloudFront Functions.",
      tags: ["CloudFront Functions", "Amazon S3", "Python Lambda", "WebP"],
      badge: "Edge Computing",
      featured: false,
      demoUrl: "https://example.com/edgeresize",
      githubUrl: "https://github.com/example/edgeresize",
      metrics: "60% Bandwidth Saved",
    },
    {
      id: "project-4",
      title: "Serverless Auth & Rate Limiter",
      description: "Distributed token bucket rate limiter leveraging DynamoDB TTL and API Gateway authorizers to stop API abuse before hitting backends.",
      tags: ["AWS Lambda", "DynamoDB TTL", "TypeScript", "Jest"],
      badge: "Security",
      featured: false,
      demoUrl: "https://example.com/ratelimit",
      githubUrl: "https://github.com/example/serverless-ratelimiter",
      metrics: "Zero False Positives",
    },
  ],

  // 5. Creative Feature: Interactive Terminal & Real Personal Facts
  terminal: {
    systemName: "aws-sh",
    version: "2.4.0-edge",
    promptUser: "visitor@alex-aws:~$",
    banner: [
      "╔═══════════════════════════════════════════════════════════════╗",
      "║   ALEX RIVERA // INTERACTIVE CLOUD TERMINAL v2.4.0           ║",
      "║   Type 'help' for commands or tap the quick tags below.       ║",
      "╚═══════════════════════════════════════════════════════════════╝"
    ],
    quickCommands: ["help", "whoami", "facts", "hobbies", "music", "quirks", "secret", "clear"],
    
    // 10 Curated Authentic Facts & Quirks
    facts: [
      {
        tag: "01 / Keyboard Obsession",
        fact: "I build custom mechanical keyboards. My daily driver is a 65% board with lubed Holy Panda switches and a solid brass mounting plate."
      },
      {
        tag: "02 / Coffee Protocol",
        fact: "Fueled by single-origin Ethiopian Yirgacheffe pour-overs, precisely ground to 650 microns and brewed at 93°C (200°F)."
      },
      {
        tag: "03 / Cold-Start Victory",
        fact: "Once debugged an AWS Lambda cold-start bottleneck at 3 AM by slimming a 250MB Docker image down to an 18MB compiled Go binary."
      },
      {
        tag: "04 / Audio Flow State",
        fact: "Synthwave & 1980s Japanese City Pop are my coding superpower. (Casiopea's 'Mint Jams' and The Midnight are on non-stop repeat)."
      },
      {
        tag: "05 / Hackathon Veteran",
        fact: "Competed in 6 hackathons across 3 countries, consumed ~42 caffeinated beverages, and took home 'Best Serverless Architecture' twice."
      },
      {
        tag: "06 / Pacific Northwest Trails",
        fact: "When not in front of terminals, I'm scrambling up trails in the Cascades. Mount Rainier is my mental garbage-collector."
      },
      {
        tag: "07 / Sci-Fi Roots",
        fact: "Read William Gibson's 'Neuromancer' and Neal Stephenson's 'Snow Crash' in high school before writing my first line of JavaScript."
      },
      {
        tag: "08 / Terminal Aesthetics",
        fact: "I synchronize my VS Code / Terminal color themes with my room's smart ambient Philips Hue lighting."
      },
      {
        tag: "09 / Cloud Superpower",
        fact: "I can mentally evaluate AWS IAM policy evaluation logic and permission boundaries faster than the AWS Console Policy Simulator."
      },
      {
        tag: "10 / Favorite Linux Command",
        fact: "'curl -s wttr.in/Seattle' — my morning check to see if I can squeeze in a run before the rain starts."
      }
    ],

    hobbies: [
      { title: "Mountain Trail Running", desc: "Running ridges across Mount Si and Tiger Mountain." },
      { title: "Custom Mechanical Keyboards", desc: "Soldering, lubing switches, and tuning acoustics." },
      { title: "Vinyl Records & Synthwave", desc: "Collecting 80s analog synth pressings and Japanese jazz fusion." },
      { title: "Specialty Coffee Brewing", desc: "Dialing in grind distributions for V60 and AeroPress." },
      { title: "Home Lab Cloud Clusters", desc: "Running microk8s and localstack on refurbished ThinkCentres." }
    ],

    music: {
      genres: ["Synthwave / Retrowave", "Japanese City Pop", "Lo-Fi Instrumental Beats", "Atmospheric Ambient"],
      artists: ["The Midnight", "Casiopea", "Tycho", "Tatsuro Yamashita", "Gunship"],
      currentTrack: "The Midnight — 'Days of Thunder' (Infinite Loop)"
    },

    quirks: [
      "Cannot code unless browser tabs are grouped by AWS service.",
      "Uses Vim keybindings even in Google Docs and Slack.",
      "Refuses to touch microservices without distributed tracing enabled.",
      "Has a dedicated mug for each coffee origin."
    ],

    secret: {
      title: "🎉 CLASSIFIED EASTER EGG UNLOCKED!",
      message: "You discovered the hidden hackathon chamber! Fun fact: this portfolio was crafted with zero external framework dependencies, builds into 100% pure static files, and is cached globally across 450+ CloudFront edge points with instant sub-30ms TTFB worldwide. Mention 'HACKATHON_CHAMPION_2026' when contacting Alex for a secret coffee treat!"
    }
  },

  // 6. Contact & Socials
  contact: {
    heading: "Let's Build Something Exceptional",
    subheading: "Whether you're looking for a hackathon teammate, discussing cloud architecture, or exploring collaboration opportunities, my inbox is open.",
    email: "alex.rivera@example.com",
    availability: "Available for AWS Hackathon teams & remote contract/full-time opportunities.",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com",
        username: "github.com/alexrivera",
        icon: "github",
        description: "Explore my open-source repos & CDK templates"
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com",
        username: "linkedin.com/in/alexrivera",
        icon: "linkedin",
        description: "Connect professionally and view endorsements"
      },
      {
        platform: "AWS Community",
        url: "https://community.aws",
        username: "community.aws/u/alexrivera",
        icon: "aws",
        description: "Read my technical articles on serverless architectures"
      },
      {
        platform: "Twitter / X",
        url: "https://twitter.com",
        username: "@alexrivera_dev",
        icon: "twitter",
        description: "Follow my live build logs & hackathon updates"
      },
    ],
  },

  // 7. Navigation Anchor Links
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Terminal", href: "#creative-feature", badge: "▶ Try me" },
    { label: "Contact", href: "#contact" },
  ],

  // 8. Design & Theme Configuration
  theme: {
    defaultTheme: "dark",
    vibe: "minimal-techy",
  },
};
