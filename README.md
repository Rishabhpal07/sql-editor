.

🧠 SQL Practice Platform

A full-stack SQL learning platform where users can practice real SQL queries, execute them against a live PostgreSQL database, and receive AI-powered hints.

Built with a modern production-ready architecture.

🚀 Live Demo
[https://your-frontend.vercel.app](https://sql-editor-lsop.vercel.app)

✨ Features

📚 Browse SQL problems by difficulty (Easy, Medium, Hard)

🧾 View database schema and sample data

💻 Write and execute SQL queries

⚡ Real-time query execution

📊 Display results in table format

⏱ Execution time tracking

💡 AI-powered hints

🌐 Fully deployed (Frontend + Backend + Cloud DB)

🏗️ Tech Stack
Frontend

React

React Router

SCSS

Monaco SQL Editor

Backend

Node.js

Express.js

PostgreSQL (cloud)

MongoDB (for assignments)

CORS enabled

Deployment

Frontend → Vercel

Backend → Render

Database → Render PostgreSQL

📂 Project Structure
sql-editor/
│
├── frontend/        # React app
│   ├── src/
│   └── package.json
│
├── backend/         # Express API
│   ├── src/
│   ├── db/
│   └── package.json
│
└── README.md
⚙️ Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/sql-editor.git
cd sql-editor
2️⃣ Backend Setup
cd backend
npm install

Create .env:

PORT=5001
DATABASE_URL=your_postgres_connection_string
MONGODB_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:3000

Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install

Create .env:

REACT_APP_API_URL=http://localhost:5001

Run frontend:

npm start

App runs at:

http://localhost:3000
🌍 Production Environment Variables
Frontend (Vercel)
REACT_APP_API_URL=https://your-backend.onrender.com
Backend (Render)
DATABASE_URL=postgres_connection_string
MONGODB_URI=mongodb_connection_string
FRONTEND_URL=https://your-frontend.vercel.app
🔐 CORS Configuration (Backend)
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));
📊 API Endpoints
Get All Assignments
GET /api/assignments
Get Single Assignment
GET /api/assignments/:id
Execute SQL Query
POST /api/execute
Get AI Hint
POST /api/hint
🧠 What This Project Demonstrates

Full-stack architecture

Cloud deployment workflow

Environment variable management

PostgreSQL integration

REST API design

React hooks best practices

Production CI debugging

CORS handling

Real-world error handling

🎯 Future Improvements

User authentication

Submission tracking

Leaderboard

Saved queries

Query validation engine

Dockerized deployment

CI/CD pipeline

👨‍💻 Author

Rishabh Pal
Full-stack developer | Building real-world projects
