<div align="center">

<br />

<img src="public/brand/logo-oficial.png" alt="TortiClub" width="96" />

<br />

# TortiClub

**Parte. Comparte. Repite.**

Tortillas para compartir · Solo en Barcelona

<br />

[![Live](https://img.shields.io/badge/live-torticlubworld.vercel.app-111111?style=flat-square)](https://torticlubworld.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br />

</div>

---

## Overview

TortiClub is a product-first food brand site for Barcelona.

- Public storefront with formats **SOLO · DUO · CLUB**
- Flavour catalog and interactive order flow
- Hold-to-confirm checkout + admin panel
- Brand system: cream `#F7F3E8`, yellow `#FFD23F`, ink `#111111`

```
┌──────────────────────────────────────────┐
│  Hero · Product · Formats · Order · FAQ  │
│              Brand language              │
│         Solo Barcelona · D2C web         │
└──────────────────────────────────────────┘
```

---

## Stack

| Layer        | Choice                          |
| ------------ | ------------------------------- |
| Framework    | Next.js 16 (App Router)         |
| Language     | TypeScript                      |
| Styling      | Tailwind CSS v4                 |
| Motion       | Motion + Lenis                  |
| State        | Zustand                         |
| Auth (admin) | JWT httpOnly cookie (`jose`)    |
| Deploy       | Vercel                          |

---

## Quick start

```bash
# 1. Clone
git clone https://github.com/thedevroom/torticlub.git
cd torticlub

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# fill ADMIN_USERNAME, ADMIN_PASSWORD, AUTH_SECRET

# 4. Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Environment

Copy `.env.example` → `.env.local`:

| Variable                   | Required | Description                          |
| -------------------------- | -------- | ------------------------------------ |
| `ADMIN_USERNAME`           | yes      | Admin login                          |
| `ADMIN_PASSWORD`           | yes      | Admin password                       |
| `AUTH_SECRET`              | yes      | JWT signing secret (long random)     |
| `NEXT_PUBLIC_WHATSAPP_URL` | no       | Optional `https://wa.me/...` link    |

> Credentials live only in env files. Never commit `.env.local`.

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

---

## Project structure

```
src/
├── app/                 # routes, layouts, server actions
│   ├── admin/           # protected panel
│   ├── pedir/           # order flow
│   ├── carta/           # menu
│   └── actions/         # server mutations
├── components/
│   ├── brand/           # logo, eyes, product stage
│   ├── home/            # landing sections
│   ├── layout/          # shell, header, footer
│   ├── pages/           # page-level compositions
│   └── ui/              # primitives
├── lib/                 # auth, tokens, store helpers
├── stores/              # client state
└── middleware.ts        # admin route guard
public/brand/            # product & brand assets
```

---

## Brand

| Token   | Value     | Role        |
| ------- | --------- | ----------- |
| Surface | `#F7F3E8` | Background  |
| Primary | `#FFD23F` | Accent      |
| Ink     | `#111111` | Type / UI   |

Mantra: **Parte. Comparte. Repite.**

---

## Deploy

Connected to Vercel production:

```bash
npx vercel --prod
```

Set the same env vars in the Vercel project settings.

Live: **[torticlubworld.vercel.app](https://torticlubworld.vercel.app)**

---

## Security notes

- Admin credentials and secrets are environment-only
- Session cookies are httpOnly + `sameSite=strict`
- `/admin` is protected by middleware JWT verification
- Public UI does not expose private phone numbers

---

## License

© TortiClub · All rights reserved.

**Hecho por Cristian Querol / [thedevroom](https://github.com/thedevroom)**

<div align="center">

<br />

`parte. comparte. repite.`

<br />

</div>
