# CampusConnect - Vercel & Cloud Deployment Architecture

## 1. Architectural Distinction: Vercel vs. Full-Stack Java
- **Vercel** is optimized for serverless frontend web applications (React, Next.js, static sites, Edge functions). It does not natively run persistent long-lived Java Virtual Machine (JVM) processes like Spring Boot embedded Tomcat or MySQL daemons.
- Therefore, the recommended production pattern for full-stack Java is:
  1. **Frontend (React SPA):** Deployed on **Vercel**.
  2. **Backend (Spring Boot + Tomcat):** Deployed on **Railway / Render / AWS / GCP / DigitalOcean**.
  3. **Database (MySQL):** Managed MySQL on **Railway / Supabase / PlanetScale / AWS RDS**.

---

## 2. Deploying the React Frontend to Vercel (CLI or GitHub)

### Option A: Direct Deployment via Vercel CLI

1. Open your terminal in the frontend directory:
   ```bash
   cd campus-connect/frontend
   ```

2. Log in and deploy:
   ```bash
   npx vercel
   ```

3. Follow the interactive prompts:
   - **Set up and deploy?** `Y`
   - **Which scope?** *(Select your Vercel account)*
   - **Link to existing project?** `N`
   - **What’s your project’s name?** `campus-connect-frontend`
   - **In which directory is your code located?** `./`
   - **Want to modify build settings?** `N` *(Vite is automatically detected, outputting to `dist`)*

4. For production release:
   ```bash
   npx vercel --prod
   ```

---

### Option B: Deploying via GitHub to Vercel (Git Push Integration)

1. Push the `campus-connect` repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of CampusConnect"
   git remote add origin https://github.com/your-username/campus-connect.git
   git push -u origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Set the **Root Directory** to `campus-connect/frontend`.
5. Framework preset will automatically detect **Vite**.
6. Click **Deploy**.

---

## 3. Connecting Vercel Frontend to the Spring Boot Backend

In [`frontend/vercel.json`](file:///campus-connect/frontend/vercel.json), the SPA rewrite rules and `/api/*` reverse proxy are configured:

```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://YOUR_BACKEND_URL/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Replace `https://YOUR_BACKEND_URL` with your deployed Spring Boot URL (from Railway, Render, or Docker VM).
