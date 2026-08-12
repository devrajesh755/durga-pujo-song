# Kolkata Sondhya — Cinematic Music Dashboard

A cinematic, full-screen music dashboard inspired by a hand-painted Bengali
evening street scene: a Durga Puja pandal at dusk, warm terracotta and red
tones, lanterns, and a crowd gathered under a marigold-draped arch. Large
Bengali typography sits over the artwork, with a dynamic clock, a live
"online" indicator, external music-service links, and a fully working
floating audio player — all built as a real React + Express application,
not a static mockup.

## Architecture

```
                  Browser
                     |
                     v
              ┌─────────────┐
              │   Nginx     │   ← serves the built React app
              │ React App   │      and proxies /api/* to Express
              │ Port 80     │
              └──────┬──────┘
                     |
                  /api
                     |
                     v
              ┌─────────────┐
              │   Express   │   ← REST API (songs, online users, health)
              │ Port 5000   │      not reachable directly from the browser
              └─────────────┘
```

- **frontend/** — React 18 + Vite + Tailwind CSS. Talks to the backend only
  through `VITE_API_URL` (`/api` in production, proxied by Nginx or Vite's
  dev server).
- **backend/** — Node.js + Express REST API. No database yet; song data
  lives in `backend/src/data/songs.js` so a database can be dropped in
  later without touching the route/controller layout.

## Requirements

- Node.js 18+ and npm (for local development)
- Docker + Docker Compose (for containerized runs)

## Local development (no Docker)

```bash
# Terminal 1 — backend
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:5000

# Terminal 2 — frontend
cd frontend
cp .env.example .env # set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev           # http://localhost:5173
```

## Development with Docker (hot reload)

```bash
docker compose -f docker-compose.dev.yml up
```

- Frontend (Vite dev server): http://localhost:5173
- Backend (Express): http://localhost:5000

## Production with Docker

```bash
docker compose build
docker compose up
```

Then open:

```
http://localhost
```

Stop containers:

```bash
docker compose down
```

Rebuild after changes:

```bash
docker compose up --build
```

## REST API

| Method | Endpoint             | Description                     |
|--------|-----------------------|----------------------------------|
| GET    | `/api/health`          | Service health check            |
| GET    | `/api/songs`           | List all songs                  |
| GET    | `/api/songs/:id`       | Get a single song by id         |
| GET    | `/api/users/online`    | Current online-listener count   |

## Replacing placeholder assets

- **Background image**: `frontend/public/assets/hero-background.jpg` — the
  reference artwork is included here. Swap in your own licensed illustration
  or photograph at the same path (or update `Background.jsx`) to change the
  scene.
- **Album artwork**: `frontend/public/assets/album-placeholder-*.svg` —
  replace with real cover art, or point `backend/src/data/songs.js` at your
  own image files.
- **Audio**: `backend/src/data/songs.js` currently points at royalty-free
  demo tracks from a public CDN purely so the player is functional out of
  the box. Replace the `audio` field with paths to your own **legally
  licensed** audio files (e.g. served from `frontend/public/assets/`) before
  shipping to production. Do not use copyrighted commercial tracks without a
  license.

## Frontend structure

```
frontend/src/
├── components/   Background, TopBar, OnlineStatus, MusicServices,
│                 HeroTitle, MusicPlayer, ProgressBar, PlayerControls
├── hooks/        useAudioPlayer.js — wraps the HTML5 Audio API
├── services/     api.js — typed fetch wrappers around the Express API
├── data/         songs.js (offline fallback), musicServices.js (config)
├── App.jsx
└── main.jsx
```

## Backend structure

```
backend/src/
├── controllers/  songController.js, userController.js
├── routes/       songRoutes.js, userRoutes.js
├── middleware/   errorHandler.js (404 + centralized error handling)
├── data/         songs.js
└── server.js
```

## Error handling

- Frontend shows explicit states for: loading songs, backend unavailable
  (falls back to an offline track list), and no songs available.
- Backend returns proper HTTP status codes, a JSON 404 handler for unknown
  routes, and a centralized error handler for invalid ids and unexpected
  failures.

## Deploying to production

**Single EC2 instance (simplest):**
1. Provision an Ubuntu EC2 instance, install Docker and the Docker Compose
   plugin.
2. Copy this repository to the instance (`git clone` or `scp`).
3. Run `docker compose up --build -d`.
4. Point a domain at the instance and put it behind a TLS-terminating
   reverse proxy (e.g. Caddy, or an ALB/NLB) — Nginx here serves plain HTTP.

**Kubernetes-ready path:**
The two containers (`frontend`, `backend`) are already isolated, stateless,
and configured entirely through environment variables, so they map directly
onto two Deployments + Services: expose `frontend` via an Ingress/LoadBalancer
on port 80, keep `backend` as a ClusterIP-only Service on port 5000, and set
`CORS_ORIGIN`/`VITE_API_URL` via ConfigMaps. Add a database later as a
separate StatefulSet or managed service (RDS/Mongo Atlas) without changing
the existing controller structure.

## Accessibility

Semantic landmarks, `aria-label`s on all icon-only controls, a visible
focus ring, sufficient contrast against the darkened background overlay,
and full keyboard support for the player (native `<input type="range">`
for seeking, standard tab order for play/pause/next/previous).
