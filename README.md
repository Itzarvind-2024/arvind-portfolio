# Arvind Vishwakarma — Portfolio

A high-performance, minimalist personal portfolio engineered with **React 19 + TypeScript**, operating as a custom **Zero-JS Static Site Generator (SSG)**.

Rather than shipping a heavy client-side React bundle, this project uses React server rendering (`renderToStaticMarkup`) at build time to output pure, semantic HTML and CSS. The result is instant page loads, zero hydration lag, perfect SEO, and keyboard-first accessibility.

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Templating Engine** | [React 19](https://react.dev/) (`react-dom/server`) | Component-driven UI structure rendered strictly at build-time via `renderToStaticMarkup`. No client-side React runtime is shipped. |
| **Language & Runtime** | [TypeScript](https://www.typescriptlang.org/) & [tsx](https://github.com/privatenumber/tsx) | Type safety across components and schemas; executes TSX build scripts directly without pre-compilation. |
| **Content Processing** | [Marked](https://marked.js.org/) | Fast Markdown-to-HTML compilation with custom renderers for architecture diagram blocks (` ```diagram `). |
| **Client Interactions** | Vanilla JavaScript (`public/keys.js`) | Lightweight (~4KB) script handling keyboard shortcuts, dark/light mode toggle, scrollspy, and copy-to-clipboard. |
| **Styling** | Vanilla CSS (`public/styles.css`) | Custom design system using CSS variables, responsive typography, glassmorphism, dark/light themes, and mockup styling. |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/) | Static output hosting reading `vercel.json` (`dist/`). |

---

## 🔄 How It Works: The Build & Runtime Flow

```
┌────────────────────────┐      ┌───────────────────────────┐
│     src/profile.ts     │      │   content/projects/*.md   │
│ (Bio, metrics, skills) │      │  (Front matter + Markdown)│
└───────────┬────────────┘      └─────────────┬─────────────┘
            │                                 │
            │                  ┌──────────────┴──────────────┐
            │                  │       src/content.ts        │
            │                  │  • Parses front-matter      │
            │                  │  • Compiles markdown & JSON │
            │                  │    diagrams via Marked      │
            │                  └──────────────┬──────────────┘
            │                                 │
            ▼                                 ▼
   ┌─────────────────────────────────────────────────────────┐
   │                  scripts/build.tsx                      │
   │  1. Cleans dist/                                        │
   │  2. Copies public/ assets (CSS, JS, PDF) to dist/       │
   │  3. Renders <Layout><Home /></Layout>                   │
   │  4. Renders <Layout><ProjectPage /></Layout> per slug   │
   │  5. Emits <!doctype html> via renderToStaticMarkup()    │
   └────────────────────────────┬────────────────────────────┘
                                │
                                ▼
   ┌─────────────────────────────────────────────────────────┐
   │                          dist/                          │
   │  ├── index.html                                         │
   │  ├── projects/                                          │
   │  │   ├── offline-pharmacy-pos/index.html                │
   │  │   └── ...                                            │
   │  ├── styles.css                                         │
   │  ├── keys.js                                            │
   │  └── Arvind_Vishwakarma_Resume.pdf                      │
   └─────────────────────────────────────────────────────────┘
```

### 1. Build Phase (`npm run build`)
1. **Asset Copying**: `dist/` is cleaned and contents of `public/` (CSS, client JS, resume PDF) are copied directly to `dist/`.
2. **Content Ingestion** (`src/content.ts`):
   - Reads every `.md` file in `content/projects/`.
   - Parses custom front-matter (metadata: title, summary, role, stack, result, order).
   - Translates Markdown body to HTML.
   - Intercepts ```` ```diagram ```` code blocks, deserializes their JSON data, and compiles them directly into `<Diagram />` React components.
3. **Static Generation** (`scripts/build.tsx`):
   - Generates `dist/index.html` by wrapping `<Home />` in `<Layout />`.
   - Loops over all projects and generates `dist/projects/{slug}/index.html` with previous/next pagination links.
   - Writes pure HTML with `<!doctype html>` to disk.

### 2. Client Runtime Phase
- **Zero Framework Hydration**: The browser loads pre-compiled, semantic HTML immediately.
- **Theme Flash Prevention (FOUC)**: A tiny inline script in `<head>` executes before render, checking `localStorage` and `prefers-color-scheme` to set `data-theme="dark"` or `data-theme="light"`.
- **Micro-Script Enhancements (`public/keys.js`)**:
  - Global hotkeys (`1`–`5` for sections, `T` for theme, `Esc` to go back, `←`/`→` for case study navigation).
  - IntersectionObserver scrollspy highlighting the active section in the navbar.
  - One-click copy email buttons with animated visual feedback.

---

## 📁 Project Structure

```
arvind-portfolio/
├── content/
│   └── projects/                # Case studies (Markdown + YAML front-matter)
│       ├── keyboard-first-billing.md
│       ├── lan-peer-sync.md
│       ├── medical-search-engine.md
│       ├── offline-pharmacy-pos.md
│       └── supplier-bill-pipeline.md
├── public/                      # Static client assets copied to dist/
│   ├── Arvind_Vishwakarma_Resume.pdf
│   ├── keys.js                  # Client shortcuts, theme toggle, copy buttons
│   └── styles.css               # Main CSS design system & typography
├── scripts/
│   └── build.tsx                # Static Site Generator build runner
├── src/
│   ├── components/
│   │   ├── Diagram.tsx          # Architecture diagram component
│   │   ├── Home.tsx             # Main landing page component
│   │   ├── Layout.tsx           # Global HTML wrapper (head, nav, footer)
│   │   ├── ProjectMockup.tsx    # Interactive terminal/POS UI simulations
│   │   └── ProjectPage.tsx      # Case study detail layout
│   ├── content.ts               # Markdown parser & project loader
│   └── profile.ts               # Personal bio, metrics receipt, experience, skills
├── dist/                        # Production build output (generated)
├── package.json
├── tsconfig.json
└── vercel.json                  # Deployment configuration for Vercel
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- `npm` (comes with Node.js)

### Installation
```bash
# Clone the repository
git clone https://github.com/Itzarvind-2024/arvind-portfolio.git
cd arvind-portfolio

# Install dependencies
npm install
```

### Build & Preview Locally
```bash
# Build static HTML into dist/
npm run build

# Build and start a local HTTP server
npm run preview
# Serves dist/ at http://localhost:3000
```

---

## ✍️ How to Edit Content

### 1. Update Profile & Resume
Edit [`src/profile.ts`](src/profile.ts) to update:
- Personal details (name, headline, bio, contact links)
- **Hero Receipt**: The quantified production achievements in the receipt card
- **Work Experience**: Roles, organizations, dates, and bullet points
- **Skills**: Skill groups and categorized technical chips

To update your resume, replace the PDF file at:
```
public/Arvind_Vishwakarma_Resume.pdf
```

### 2. Add or Edit Case Studies
Add or modify `.md` files in `content/projects/`. Each project must have front matter:

```markdown
---
title: Offline-First Pharmacy POS
summary: Built a resilient desktop POS operating with sub-15ms search across 450k+ items.
order: 1
role: Lead Full-Stack Architect
stack: Flutter, React, Tauri, Django, SQLite
result: 10+ live pharmacy stores, 0% counter downtime
---

## The Challenge
Write case study content here using standard Markdown...

### System Architecture
```diagram
{
  "caption": "Local-first sync engine between counter and LAN server",
  "rows": [
    [{"label": "Counter Desktop (React + Tauri)", "sub": "Local SQLite cache"}],
    [{"label": "LAN Sync Service (Socket.IO + Python)", "sub": "Conflict-free resolution"}],
    [{"label": "Central Cloud API (Django)", "sub": "Async pub/sub batch worker"}]
  ]
}
```
```

### 3. Add Custom Mockups for Case Studies
Interactive UI simulations for case studies are configured in [`src/components/ProjectMockup.tsx`](src/components/ProjectMockup.tsx) based on the project's file slug (e.g. `slug === "offline-pharmacy-pos"`).

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| <kbd>1</kbd> | Jump to **Work / Projects** section |
| <kbd>2</kbd> | Jump to **About** section |
| <kbd>3</kbd> | Jump to **Experience** section |
| <kbd>4</kbd> | Jump to **Skills** section |
| <kbd>5</kbd> | Jump to **Contact** section |
| <kbd>T</kbd> | Toggle Dark / Light mode |
| <kbd>Esc</kbd> | Return to projects list from any case study |
| <kbd>←</kbd> / <kbd>→</kbd> | Navigate between previous and next case studies |

---

## 🌐 Deploying to Vercel

The portfolio is pre-configured for **[Vercel](https://vercel.com/)** using [`vercel.json`](vercel.json):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

### Part 1: First-Time Setup (Step-by-Step)

Follow these steps once to connect your repository and publish your site live:

#### Step 1: Push All Changes to GitHub
Make sure your latest local edits are committed and pushed to your remote repository:
```bash
# Check changed files
git status

# Stage all files
git add .

# Commit with a message
git commit -m "feat: design polish, section spacing, and favicon"

# Push to main branch
git push origin main
```

#### Step 2: Sign Up / Log In to Vercel
1. Go to **[vercel.com](https://vercel.com/)**.
2. Click **Sign Up** or **Log In**.
3. Select **Continue with GitHub** (this links your repositories directly).

#### Step 3: Import the Repository
1. In your Vercel Dashboard, click the blue **"Add New..."** button (top right) → select **"Project"**.
2. Under "Import Git Repository", search for `arvind-portfolio`.
3. Click the **"Import"** button next to your repository.

#### Step 4: Confirm Build Settings
Vercel automatically detects the [`vercel.json`](vercel.json) file in your repository:
- **Framework Preset**: `Other`
- **Root Directory**: `./`
- **Build Command**: `npm run build` (overridden by `vercel.json`)
- **Output Directory**: `dist` (overridden by `vercel.json`)
- **Install Command**: `npm install`

*(You do not need to change any environment variables or settings)*.

#### Step 5: Click "Deploy"
1. Click the **"Deploy"** button.
2. Vercel will install dependencies and execute `tsx scripts/build.tsx` in approximately 30 seconds.
3. You will see celebratory confetti and your live URL:
   ```
   https://arvind-portfolio.vercel.app
   ```

#### Step 6 (Optional): Connect a Custom Domain
1. In your project page on Vercel, navigate to **Settings** → **Domains**.
2. Enter your custom domain (e.g. `arvindvishwakarma.com` or `arvind.dev`).
3. Follow Vercel's instructions to add the `CNAME` or `A` record in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.). Vercel automatically provisions a free SSL/HTTPS certificate.

---

### Part 2: How Deployments Happen Automatically Later (CI/CD)

Once your first deployment is connected to GitHub, **you never need to log into the Vercel dashboard again** for routine updates.

#### 1. Instant Production Deployments on `git push`
Every time you push commits to your `main` branch:
```bash
# 1. Edit profile.ts or add a new project in content/projects/
# 2. Commit and push:
git add .
git commit -m "Add new case study"
git push origin main
```
1. GitHub instantly notifies Vercel via webhook.
2. Vercel launches a build worker, runs `npm run build`, and generates the new static pages in `dist/`.
3. Within **15–30 seconds**, your live site updates automatically with zero downtime.

#### 2. Preview Deployments for Branches & Pull Requests
If you want to experiment or review changes without affecting your live production site:
```bash
# Create and switch to a new branch
git checkout -b new-experiment

# Make changes and push to GitHub
git add .
git commit -m "Experiment with new layout"
git push origin new-experiment
```
- Vercel automatically generates a dedicated **Preview URL** (e.g. `https://arvind-portfolio-git-new-experiment-....vercel.app`).
- You can test and inspect the site on your phone or desktop.
- When satisfied, merge the branch into `main` and Vercel automatically deploys it to your live production domain.

---

### Part 3: Alternative — Deploy from Terminal (Vercel CLI)

If you prefer deploying directly from your command line without the GitHub dashboard:

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy a preview build
vercel

# 4. Deploy directly to production
vercel --prod
```

---

## 📄 License
MIT © [Arvind Vishwakarma](https://github.com/Itzarvind-2024)
