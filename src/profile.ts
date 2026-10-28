// Everything personal on the site lives in this file.
// Edit text here — no component changes needed.

export const profile = {
  name: "Arvind Vishwakarma",
  role: "Full-Stack Developer",
  location: "Uttar Pradesh, India · open to remote",
  headline: "I build software that keeps a business running, even when the internet doesn't.",
  intro:
    "For 2.5+ years I've designed and shipped an offline-first billing and inventory platform that pharmacies use every working day. I work across the whole stack: desktop apps in Flutter and React + Tauri, backends in Django, sync between machines and the cloud, and the installer that puts it all on a store's computer.",
  email: "arvind.20203033@gmail.com",
  github: "https://github.com/Itzarvind-2024",
  linkedin: "https://linkedin.com/in/arvind1106",
  resume: "/Arvind_Vishwakarma_Resume.pdf",
};

// Shown as the "receipt" in the hero. Only measured, defensible numbers.
export const receipt = {
  title: "Shipped to production",
  lines: [
    { item: "Medicines searchable offline", value: "450,000+" },
    { item: "Typical search time, offline", value: "~110 ms" },
    { item: "New store setup", value: "~2 h → ~7 min" },
    { item: "Automated tests on premium payments", value: "470+" },
    { item: "Desktop clients in production", value: "2" },
    { item: "Stores using it daily", value: "5+" },
  ],
  total: { item: "Years in production", value: "2.5+" },
};

export const about = [
  "I studied Mechanical Engineering at MNNIT Allahabad and joined a startup as a full-stack intern in January 2024. Within months I was owning features end to end, and today I lead a small engineering team as a Senior Full-Stack Developer.",
  "Most of my work comes from one hard constraint: a pharmacy counter cannot stop billing when the internet drops. That pushed me into problems most web developers never meet: local-first data, syncing between counters over a LAN, fast search over a huge catalog on modest hardware, and packaging a whole backend into a Windows installer.",
  "I work with AI coding agents every day. I design the system and the interfaces, the agent drafts the implementation, and I review every change before it ships. That lets me move fast without giving up correctness, and it's how I'm building our automated test suites right now.",
];

export const experience = [
  {
    title: "Senior Full-Stack Developer",
    org: "Healthcare-retail SaaS startup · Remote",
    period: "Jul 2024 – Present",
    points: [
      "Own the offline-first pharmacy POS and inventory platform end to end: architecture, backend, desktop clients, sync, deployment and production support.",
      "Co-built a React + Tauri desktop client with my team alongside the original Flutter app for lighter, keyboard-first billing; it now runs in 2+ stores, with the Flutter app in 5+.",
      "Built premium features and in-app Pinelab payments end to end, now live: every paid order unlocks exactly once, even with duplicate callbacks, crashes or offline stores.",
      "Lead a 4–6 person engineering team: task delegation, code reviews and release planning with company leadership.",
      "Mentored 6+ interns through onboarding, reviews and their first production features.",
      "Currently building automated component and end-to-end flow tests for the billing app.",
    ],
  },
  {
    title: "Full-Stack Developer Intern",
    org: "Healthcare-retail SaaS startup · Remote",
    period: "Jan 2024 – Jun 2024",
    points: [
      "Built and maintained features in Flutter and Django for the first production release.",
      "Debugged, tested and shipped fixes alongside senior developers during live store rollouts.",
    ],
  },
  {
    title: "B.Tech, Mechanical Engineering",
    org: "Motilal Nehru National Institute of Technology (MNNIT), Allahabad",
    period: "2020 – 2024",
    points: ["GPA 7.61"],
  },
];

export const skills = [
  { group: "Frontend & desktop", items: ["React", "Flutter (Windows desktop)", "Tauri", "TypeScript", "Tailwind CSS", "Provider state management"] },
  { group: "Backend", items: ["Django", "Python", "Node.js", "Express", "Socket.IO", "REST APIs"] },
  { group: "Data & search", items: ["MongoDB (replica sets, change streams, aggregation)", "SQLite", "Meilisearch", "Phonetic search"] },
  { group: "Cloud & delivery", items: ["GCP Pub/Sub", "Cloud Scheduler", "Compute Engine", "PyInstaller", "Inno Setup", "Cloudflare Tunnel"] },
  { group: "Ways of working", items: ["System design", "Code review", "Performance profiling", "AI-assisted development", "Mentoring"] },
];
