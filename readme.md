# Product Management Dashboard — Backend

A secure, real-time product management backend built with Node.js, Express, and Firebase Firestore, designed to power a modern admin dashboard with JWT-based authentication and RESTful APIs.

## 🚀 Features

- 🔐 JWT Authentication with HTTP-only cookies
- 🗃️ Firebase Firestore integration for product data
- 🛡️ Secure by default: Helmet, CORS, cookie security
- 🐳 Docker-ready for local development and deployment
- 📦 Clean REST API for product CRUD operations
- 🧪 TypeScript for type safety and maintainability

## 🧰 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js 20 |
| **Framework** | Express.js |
| **Database** | Firebase Firestore (NoSQL) |
| **Auth** | JWT + HTTP-only cookies |
| **Language** | TypeScript |
| **Build Tool** | tsc (TypeScript Compiler) |
| **Containerization** | Docker & Docker Compose |
| **Reverse Proxy** | Nginx (for local dev simulation) |
| **Security** | Helmet, CORS, bcrypt, cookie-parser |

## 📁 Project Structure
```
product-dashboard-backend/
├── src/
│   ├── config/          # Firebase Admin SDK setup
│   ├── controllers/     # Business logic (auth, products)
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API route definitions
│   ├── types/           # TypeScript interfaces
│   └── index.ts         # Express server entrypoint
├── dist/                # Compiled JS (generated on build)
├── nginx.conf           # Nginx reverse proxy config
├── docker-compose.yml   # Multi-container orchestration
├── Dockerfile           # Backend container build spec
├── package.json
├── tsconfig.json
└── .env.example
```

## 🛠️ Local Setup

### Prerequisites

- Node.js v18+
- Docker Desktop (running)
- Firebase Project with Admin SDK credentials

### Step 1: Clone & Install
```bash
git clone <your-repo-url>
cd product-dashboard-backend
npm install
```

> 💡 This installs all dependencies for local development (e.g., ts-node, nodemon).

### Step 2: Set Up Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open **Project Settings** → **Service Accounts**
3. Click **"Generate new private key"**
4. Copy the JSON content

### Step 3: Configure Environment

Create a `.env` file from the example:
```bash
cp .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_strong_random_secret_here
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
NODE_ENV=development
```

> 🔒 Never commit `.env` — it's in `.gitignore`.

💡 **Generate a strong JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Run Locally (Without Docker)

For development with hot-reload:
```bash
npm run dev
```

Server runs at: `http://localhost:5000`

### Step 5: Run with Docker (Recommended for Prod-like Env)
```bash
docker-compose up --build
```

This starts:
- **Backend:** `http://localhost:5000` (or mapped port if changed)
- **Nginx Proxy:** `http://localhost` (reverse proxies to backend)

✅ Use `http://localhost/health` to test via Nginx.

To stop:
```bash
docker-compose down
```

## 🌐 API Endpoints

All endpoints return JSON. Authentication is required for all product routes.

### 🔑 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login with demo credentials (`demo@example.com` / `demo123`) |
| `POST` | `/api/auth/logout` | Clear auth cookie |
| `GET` | `/api/auth/verify` | Verify current session |

**Login Request Body:**
```json
{
  "email": "demo@example.com",
  "password": "demo123"
}
```

**Success Response:**
```json
{
  "message": "Login successful",
  "user": {
    "email": "demo@example.com"
  }
}
```

✅ Sets an HTTP-only `token` cookie.

### 📦 Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/:id` | Update product |
| `DELETE` | `/api/products/:id` | Delete product |

**Product Schema:**
```typescript
{
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: imageUrl,
  stock: number;
  status: 'active' | 'inactive';
}
```

**Example Create Request (POST `/api/products`):**
```json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 1200,
  "category": "Electronics",
  "imageUrl": "imageUrl",
  "stock": 10,
  "status": "active"
}
```

**Response:**
```json
{
  "id": "abc123",
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 1200,
  "category": "Electronics",
  "imageUrl": "imageUrl",
  "stock": 10,
  "status": "active",
  "createdAt": "2025-10-21T15:00:00.000Z",
  "updatedAt": "2025-10-21T15:00:00.000Z"
}
```

### 🩺 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Public health check (no auth needed) |

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-21T15:00:00.000Z"
}
```

## 🤝 Demo Credentials

- **Email:** `demo@demo.com`
- **Password:** `demo112233`

> Hardcoded in `src/controllers/authController.ts` — no database required.

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run with `ts-node` + hot reload |
| `npm run build` | Compile TS → JS (`dist/`) |
| `npm start` | Run compiled app (`node dist/index.js`) |
| `docker-compose up --build` | Build and run containers |

