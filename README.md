# BhuSampada

This repository now centers on the live-site local mirror and the long-term `Next.js + FastAPI` rebuild:

- `backend/`: FastAPI service that serves the exact local mirror and owns backend integrations
- `frontend/`: Next.js rebuild workspace for replacing proxied pages with native implementation
- `content/live/api/`: captured public API snapshot used for seeding and reconstruction
- `scripts/`: capture and import utilities for the live site
- `docs/`: architecture and discovery notes
- `HANDOFF.md`: session-state reference for continuing the rebuild later

## Target Stack

- Frontend: Next.js, React, Tailwind CSS
- Backend: FastAPI, Pydantic, PyMongo
- Database: MongoDB
- Media storage: Cloudinary
- Auth: JWT with secure cookies
- Maps: Google Maps JavaScript API

## Repository Layout

```text
backend/            FastAPI mirror and backend services
frontend/           Next.js rebuild app
content/live/api/   captured public API data
scripts/            live capture utilities
docs/               architecture and discovery notes
HANDOFF.md          resume notes for future sessions
```

## Development Flow

1. Serve the exact live site locally through the FastAPI mirror.
2. Seed and normalize captured public data in MongoDB.
3. Rebuild pages in `frontend/` route by route.
4. Replace proxied flows with native `Next.js + FastAPI` implementations.
5. Move media management to Cloudinary as routes are rebuilt.

## Local Mirror Commands

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The exact local mirror is then available at `http://127.0.0.1:8000`.

## Frontend Commands

```bash
npm install --prefix frontend
npm run dev:frontend
```

## Environment Files

- `frontend/.env.example`
- `backend/.env.example`

## Current Priorities

1. Keep the local mirror working at `:8000`
2. Expand MongoDB seeding from captured API data
3. Rebuild homepage and key public routes in `frontend/`
4. Replace media URLs with Cloudinary-backed assets
5. Recreate auth, dashboard, lead, and subscription flows

## Live Site Capture

The repository includes capture scripts for refreshing the public API snapshot and discovery data from the live site you own.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\capture-live-site.ps1
```

To download the referenced internal JS and CSS bundles:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\download-live-assets.ps1
```

To capture the public JSON data exposed by the live site:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\capture-live-api.ps1
```

This will write:

- `content/live/api/web-settings.json`
- `content/live/api/homepage-data.json`
- `content/live/api/categories.json`
- `content/live/api/cities.json`
- `content/live/api/properties/`
- `content/live/api/projects/`
- `content/live/api/articles/`
- `content/live/api/agents/`
- `content/live/api/services/`
- `content/live/api/media/`
- `content/live/api/summary.json`
