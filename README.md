# Real-Time Leaderboard System

A real-time leaderboard system built with **Node.js**, **TypeScript**, and **Fastify**.

The project provides user authentication, score submission, global leaderboard updates, user rankings, real-time WebSocket notifications, and top players reporting.

This project was built as part of the roadmap.sh backend projects:

https://roadmap.sh/projects/realtime-leaderboard-system

---

## Features

### User Authentication

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected leaderboard score endpoints

### Score Submission

- Authenticated users can submit player scores
- Update existing player scores
- Automatic leaderboard recalculation
- Real-time leaderboard notifications

### Global Leaderboard

- View all players ranked by score
- Scores are sorted dynamically
- Real-time updates through WebSocket connection

### User Rankings

- Get a player's current leaderboard position
- View player rank and score information

### Top Players Report

- Generate reports for top players
- Calculate total scores
- Retrieve leaderboard statistics

### Real-Time Updates

- WebSocket connection support
- Clients receive leaderboard changes instantly after score updates

---

## Tech Stack

- Node.js
- TypeScript
- Fastify
- WebSocket
- JWT Authentication
- bcrypt
- dotenv
- ESLint
- Prettier

---

## Project Structure

```
src
├── app.ts
├── server.ts
│
├── auth
│   ├── auth.middleware.ts
│   ├── auth.routes.ts
│   ├── auth.service.ts
│   └── auth.types.ts
│
├── config
│   └── env.ts
│
├── plugins
│   └── jwt.ts
│
├── reports
│   ├── report.routes.ts
│   └── report.service.ts
│
├── routes
│   └── leaderboard.routes.ts
│
├── services
│   └── leaderboard.service.ts
│
├── types
│   └── player.ts
│
└── websocket
    └── leaderboard.socket.ts
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>

cd real-time-leaderboard
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your_secret_key
```

Example:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=my-super-secret-key
```

---

## Available Scripts

### Development mode

```bash
npm run dev
```

Starts the Fastify server with TypeScript watch mode.

---

### Build project

```bash
npm run build
```

Compiles TypeScript into JavaScript.

---

### Start production server

```bash
npm run start
```

Runs the compiled application.

---

### Type checking

```bash
npm run typecheck
```

Checks TypeScript errors without emitting files.

---

### Lint

```bash
npm run lint
```

Runs ESLint checks.

---

### Full validation

```bash
npm run check
```

Runs:

- TypeScript validation
- ESLint validation

---

## API Endpoints

## Authentication

### Register user

```
POST /auth/register
```

Request:

```json
{
  "username": "alice",
  "password": "password123"
}
```

Response:

```json
{
  "id": "user-id",
  "username": "alice"
}
```

---

### Login user

```
POST /auth/login
```

Request:

```json
{
  "username": "alice",
  "password": "password123"
}
```

Response:

```json
{
  "token": "jwt-token"
}
```

Use the token for protected routes:

```
Authorization: Bearer <token>
```

---

# Leaderboard API

## Submit player score

```
POST /players
```

Authentication required.

Request:

```json
{
  "id": "1",
  "name": "Alice",
  "score": 100
}
```

Response:

```json
{
  "id": "1",
  "name": "Alice",
  "score": 100
}
```

---

## Update player score

```
PATCH /players/:id/score
```

Authentication required.

Request:

```json
{
  "name": "Alice",
  "score": 250
}
```

Response:

```json
{
  "id": "1",
  "name": "Alice",
  "score": 250
}
```

---

## Get leaderboard

```
GET /leaderboard
```

Response:

```json
[
  {
    "id": "1",
    "name": "Alice",
    "score": 250
  }
]
```

---

## Get player ranking

```
GET /players/:id/rank
```

Response:

```json
{
  "playerId": "1",
  "rank": 1,
  "score": 250
}
```

---

# Reports API

## Get top players report

```
GET /reports/top-players
```

Response:

```json
[
  {
    "playerId": "1",
    "name": "Alice",
    "totalScore": 350
  }
]
```

---

# WebSocket

The server exposes a WebSocket endpoint:

```
ws://localhost:3000/ws
```

Connect:

```bash
wscat -c ws://localhost:3000/ws
```

Example response:

```json
{
  "event": "connected",
  "data": {
    "message": "Connected to leaderboard websocket"
  }
}
```

When leaderboard changes:

```json
{
  "event": "leaderboard.updated",
  "data": [
    {
      "id": "1",
      "name": "Alice",
      "score": 250
    }
  ]
}
```

---

# Authentication Flow

1. User registers with username and password
2. Password is hashed using bcrypt
3. User logs in
4. Server generates JWT token
5. Protected endpoints validate JWT token
6. Authorized users can submit and update scores

---

# Current Storage

The current implementation uses in-memory storage:

- Users are stored in a Map
- Players are stored in a Map

Data will be lost after server restart.

A production version could replace this with:

- PostgreSQL
- Redis
- MongoDB

---

# Validation

Before committing changes:

```bash
npm run check
npm run build
```

The project should pass:

- TypeScript compilation
- ESLint validation
- Production build

---

# Git Workflow

The project follows a feature branch workflow:

```
main
 └── dev
      ├── feature/project-setup
      ├── feature/realtime-leaderboard-updates
      ├── feature/user-authentication
      ├── feature/authentication-flow
      ├── feature/user-rankings
      └── feature/top-players-report
```

Each feature is developed separately and merged into `dev` through pull requests.

---

# Future Improvements

Possible improvements:

- Persistent database storage
- Multiple games support
- Score history tracking
- Pagination for leaderboard
- Rate limiting
- Automated tests
- Docker support
- Redis-based real-time leaderboard processing

---

# License

This project is created for educational purposes.