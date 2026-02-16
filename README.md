# Task Fans CRM

## Requirements

- Node.js 22+
- Docker + Docker Compose

## Installation

```bash
git clone git@github.com:HolikovOleksandr/task_fans_crm.git
cd task_fans_crm
```

## Environment

Create `.env` in `api/`:

```env
PORT=3001
MONGO_URI=mongodb://root:rootpass@127.0.0.1:27017/yourdb?authSource=admin
AUTH_API_KEY=super-secret-api-key
JWT_ACCESS_SECRET=super-secret-jwt-key
JWT_EXPIRES=30m
```

## Run (Docker)

```bash
docker compose up -d --build
```

## After the app is running

> Note: If you use a different `PORT`, replace accordingly.

- **API Docs (Swagger):** [http://localhost:3001/swagger](http://localhost:3001/swagger)
- **Web client:** [http://localhost:5173](http://localhost:5173)

## Notes

- All `/users` endpoints are protected with JWT (`Bearer` token).
- Use `POST /auth/token` with header `x-api-key: <AUTH_API_KEY>` to get an access token (if implemented in this project).
