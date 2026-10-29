# Ekklesia Monitoring

The Vue frontend connects to the Laravel backend through `/api`.

## Run locally

Start Laravel in one terminal:

```powershell
cd backend
php artisan serve --host=127.0.0.1 --port=8000
```

Start Vue in another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite. The home page checks `GET /api/health` and displays the connection status. Vite forwards `/api` requests to `http://127.0.0.1:8000`.

## Configuration and usage

Defaults work without a frontend environment file. To customize them, copy `frontend/.env.example` to `frontend/.env.local` and restart Vite. Set `API_PROXY_TARGET` to your backend server address, including its path if serving Laravel through XAMPP. The server document root must point to `backend/public`.

Use `apiRequest` from `frontend/src/services/api.js` for further endpoints:

```js
import { apiRequest } from '@/services/api'

const data = await apiRequest('/health')
// For a future POST endpoint:
// await apiRequest('/members', { method: 'POST', body: { name: 'Example' } })
```

The helper sends JSON, parses JSON responses, and exposes Laravel validation errors through `ApiError.data`.

For production, configure your web server to forward `/api` to Laravel while serving the frontend build. Vite's development proxy is not included in the build. If using a separate API origin, set `VITE_API_BASE_URL` to its full API URL before building and configure Laravel CORS for that frontend origin. Authentication and application-specific endpoints can be added separately; the health endpoint is public and does not access the database.
