# 🚀 BabaYaga LMS - Render Deployment Guide

Congratulations on finishing Phase 2! Follow these exact steps to host your platform on Render.

## 1. 📂 GitHub Final Push
I have prepared everything (Git init, remote origin, monorepo unity). Run this final command in your terminal to push the code:
```bash
git push -u origin main
```
---

## 2. 🗄️ Step 1: Database Setup
Render's Web Services need a PostgreSQL database.
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **PostgreSQL**.
3. Name it `lms-db`, choose the **Free** tier (or paid if you prefer).
4. After creation, copy the **Internal Database URL** (for backend) and **External Database URL** (for your initial migration if needed).

---

## 3. ⚙️ Step 2: Backend Service (Web Service)
1. Click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. **Settings**:
   - **Name**: `lms-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install; npx prisma generate; npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `PORT`: `5000`
   - `DATABASE_URL`: (Paste your Render Postgres URL)
   - `JWT_SECRET`: (Random string, e.g., `babayaga_secret_123`)
   - `GEMINI_API_KEY`: (Your Google Gemini Key)
   - `CORS_ORIGIN`: (Leave blank for now, update later with Frontend URL)

---

## 4. 🌐 Step 3: Frontend Service (Web Service)
*Note: We use "Web Service" instead of "Static Site" because Next.js uses server-side features for the AI components.*
1. Click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. **Settings**:
   - **Name**: `lms-frontend`
   - **Root Directory**: `frontend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install; npm run build`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_BASE_URL`: (Your backend URL + /api, e.g., `https://lms-backend.onrender.com/api`)

---

## 🏁 Final Polish
Once the Frontend is live (e.g., `lms-frontend.onrender.com`), go back to the **Backend** environment variables and set:
- `CORS_ORIGIN`: `https://lms-frontend.onrender.com`

Your platform is now live! 🎓✨
