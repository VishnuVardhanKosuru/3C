# CreatorHQ 🚀

> Your creator command center — a Gen Z-focused dashboard for content creators.

![CreatorHQ](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-00D9FF?style=flat-square)

## ✨ Features

- 🔐 **Authentication UI** — Login & Register with glassmorphism design, smooth slide transitions, floating labels
- 🏠 **Dashboard** — Welcome screen, stat cards, YouTube & Instagram growth charts (Recharts), AI Assistant mini-chat, IdeaVault quick-entry
- 💡 **IdeaVault** — Save, search & delete content ideas persisted in `localStorage`
- 🤖 **AI Assistant** — Mock AI chat with pre-scripted creator growth responses and typing indicator
- 📺 **YouTube & Instagram Analytics** — Stub pages with mock charts ready for real API data
- 🗂️ **Collapsible Sidebar** — Animated, icon-based sidebar with mobile drawer on small screens
- 🎨 **Neo-Glass UI** — Dark theme, glassmorphism panels, neon glow effects, animated background orbs

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 19 + Vite 8 | App framework |
| Tailwind CSS v4 | Utility styling |
| Framer Motion | Page & component animations |
| Recharts | Mock analytics charts |
| Lucide React | Icons |
| React Router v7 | Hash-based routing (GitHub Pages compatible) |
| localStorage | Idea persistence (no backend needed) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Button, Input, Card
│   ├── Sidebar.jsx   # Collapsible sidebar + mobile drawer
│   ├── Layout.jsx    # Shared page wrapper
│   ├── GrowthChart.jsx
│   ├── AIAssistant.jsx
│   └── IdeaCard.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   └── useIdeas.js
├── pages/
│   ├── AuthPage.jsx
│   ├── DashboardPage.jsx
│   ├── IdeaVaultPage.jsx
│   ├── YouTubePage.jsx
│   ├── InstagramPage.jsx
│   ├── AIPage.jsx
│   └── SettingsPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## 🌐 Deploying to GitHub Pages

Since the app uses **hash-based routing** (`/#/dashboard`), it works on GitHub Pages with zero server config.

```bash
# Build
npm run build

# The dist/ folder is ready to deploy
# Push dist/ to your gh-pages branch or use GitHub Actions
```

## 📌 Notes

- This is a **UI-only MVP** — no real backend or API calls
- Authentication is mocked; user data stored in `localStorage`
- Ideas saved to `localStorage` (persist across refreshes)
- V2 will include: real auth, API integration, AI backend, scheduling tools

---

Built with ❤️ for Gen Z creators ✨
