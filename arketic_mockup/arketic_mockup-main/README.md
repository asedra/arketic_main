# Arketic AI Platform - Analytics Dashboard

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Customization](#customization)
- [License](#license)

---

## Overview

**Arketic AI Platform** is a comprehensive analytics dashboard and AI assistant platform. It provides advanced analytics, data visualization, and multi-model AI assistant management in a modern, responsive UI.

---

## Features
- Multi-model AI assistant management (ChatGPT, Claude, Gemini, custom models)
- Advanced analytics and data visualization (charts, usage, cost breakdown)
- Knowledge base and document management
- Workflow and template management
- Modern, responsive UI with dark mode support
- Built with Next.js 15, React 19, Tailwind CSS, and Radix UI

---

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS, Radix UI, shadcn/ui
- **Charts:** Recharts
- **State Management:** React hooks
- **Icons:** Lucide

---

## Getting Started

### 1. Clone the repository
```sh
$ git clone <repo-url>
$ cd arketic
```

### 2. Install dependencies
```sh
$ pnpm install
```
> If you don't have pnpm:
```sh
$ npm install -g pnpm
```

### 3. Run the development server
```sh
$ pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Scripts
| Command       | Description                |
|---------------|----------------------------|
| `pnpm dev`    | Start development server   |
| `pnpm build`  | Build for production       |
| `pnpm start`  | Start production server    |
| `pnpm lint`   | Run linter                 |

---

## Project Structure
```
arketic/
├── app/            # Next.js app directory (pages, layouts, main UI)
│   ├── chat/       # Chat module
│   ├── knowledge/  # Knowledge base module
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Main dashboard page
│   └── globals.css # Global styles
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility libraries
├── public/         # Static assets (images, logos)
├── styles/         # Additional styles
├── tailwind.config.ts # Tailwind CSS config
├── next.config.mjs    # Next.js config
├── package.json       # Project manifest
└── tsconfig.json      # TypeScript config
```

---

## Customization
- **Theme:** Edit `app/globals.css` and `tailwind.config.ts` for custom colors and styles.
- **Components:** Add or modify UI in `components/` and `app/`.
- **Environment Variables:** If needed, create a `.env` file in the root. (No required variables by default.)

---

## License
This project is for demonstration and internal use. Add your license as needed. 