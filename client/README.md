# BuildCraft: Frontend (React + Vite + Tailwind)

## Run it

```bash
cd client
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm run dev               # http://localhost:5173
```

`.env` has two switches:

| Variable | Value | Meaning |
|---|---|---|
| `VITE_USE_MOCK` | `true` | Runs without a backend, using built-in demo data (default). |
| `VITE_USE_MOCK` | `false` | Calls the real Express API at `VITE_API_BASE_URL`. |
| `VITE_API_BASE_URL` | `http://localhost:5000/api` | Backend base URL (must end in `/api`). |

Restart `npm run dev` after editing `.env`.

**Demo admin login** (mock mode only): `admin@buildcraft.com` / `Admin@123` at `/admin/login`.

## Build for production

```bash
npm run build     # outputs client/dist
npm run preview   # test the production build locally
```

Deploying to Vercel or Netlify: root directory `client`, build command `npm run build`,
output directory `dist`, and set `VITE_API_BASE_URL` (and `VITE_USE_MOCK=false`) in the dashboard.
`vercel.json` and `public/_redirects` are included so refreshing a deep link doesn't 404.
