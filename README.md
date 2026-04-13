# FOSSEE — Workshop Booking (UI/UX Shell)

This repository contains the Django backend for the FOSSEE Workshop Booking system and a small React-based frontend that serves as a UI shell. The frontend is intentionally a presentation layer only — it delegates all data and workflow handling to the existing Django views and templates.

## Overview

Recent work focuses on improving the UI/UX while preserving backend behavior. The React frontend provides a clean, mobile-first interface that links directly to Django routes and submits forms via standard HTML POST (no client-side data fetching).

## Key points

- The backend remains unchanged; do NOT convert it to an API.
- The frontend must not use `fetch()`/`axios`; navigation uses links or full-page redirects.
- Authentication is handled by Django endpoints (login/logout/redirects are processed server-side).

## Design & approach

- Mobile-first responsive design.
- Tailwind CSS for utilities and consistent spacing/typography.
- Clean cards, clear typographic hierarchy, and touch-friendly form controls.

## How to run

1) Backend (Django)

Make sure your Python virtual environment is active and dependencies are installed from `requirements.txt`. Then run:

```powershell
python manage.py runserver
```

2) Frontend (React)

Open another terminal and run:

```powershell
cd frontend
npm install
npm start
```

Notes

- The frontend is a UI shell — all validation, redirects and data handling happen on the server.
- The Django routes of interest include `/workshop/propose/`, `/workshop/status`, and `/workshop/logout/`.
- See `docs/Getting_Started.md` for additional setup details.

If you'd like screenshots added or a deployment section, tell me how you'd like the README extended and I will update it.
