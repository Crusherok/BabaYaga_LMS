# NextLMS - Production-Ready Learning Management System

Welcome to NextLMS! This is a modern, high-performance Learning Management System built with a robust backend and a stunning frontend.

## 🚀 Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS (Glassmorphism & Dark Mode), Zustand (State Management), Axios, React YouTube.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: PostgreSQL (Supabase).
- **Authentication**: JWT Access & Refresh Tokens, stored securely.

---

## 📂 Folder Structure

```
learning_management_sys/
├── .env                # Central Environment Configuration
├── README.md           # Setup and instructions
├── backend/            # Express + Prisma API
│   ├── prisma/         # Schema and migrations
│   ├── src/            # Source code (controllers, routes, middleware, config, utils)
│   └── package.json
└── frontend/           # Next.js 14 Application
    ├── src/
    │   ├── app/        # Pages router (login, register, subjects, video, layout)
    │   ├── components/ # Reusable UI (Sidebar, VideoPlayer, AuthGuard)
    │   ├── lib/        # Utilities (Axios config)
    │   └── store/      # Zustand Global Stores
    ├── tailwind.config.ts
    └── package.json
```

---

## 🛠 Setup Instructions

### 1. Database Configuration
We use PostgreSQL. Update your root `.env` file with your connection strings:
1. Open the `.env` file at the root.
2. Enter your Supabase PostgreSQL transaction connection string in the `DATABASE_URL` field.
3. Enter random secure strings for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`.

### 2. Backend Setup
Execute the following commands from the root directory:
```bash
cd backend
npm install
npx prisma db push
npx prisma generate
npm run dev
```
*Your backend will start on http://localhost:5000*

### 3. Frontend Setup
In a new terminal window, run:
```bash
cd frontend
npm install
npm run dev
```
*Your frontend will start on http://localhost:3000*

---

## 💡 Key Implementation Snippets

### 1. Lock Enforcement & Video Sequencing
The backend enforces strict progress rules. Before saving a progress update, it verifies if the previous video was completed. 
*(See `backend/src/controllers/progressController.ts`)*

### 2. Real-Time UI with Zustand & React YouTube
The `VideoPlayer` component periodically polls the YouTube API utilizing intervals and handles state changes dynamically to throttle progress syncs and save exact resume durations.
*(See `frontend/src/components/VideoPlayer.tsx`)*

### 3. JWT Axios Interceptors
Our Next.js frontend catches expired access tokens via Axios interceptors and transparently fetches a new access token via the HTTP-only refresh token stored in cookies without interrupting the user's flow.
*(See `frontend/src/lib/axios.ts`)*

---

## 🎯 Features Showcase
- **Dark Mode UI**: Beautiful modern aesthetics designed utilizing TailwindCSS properties and smooth transition handling.
- **Content Tree Navigation**: Clear hierarchy tracking progress from subjects -> sections -> videos.
- **Robust State Management**: Built elegantly with Zustand separating logic from presentation.

Enjoy building upon this scalable foundation!
