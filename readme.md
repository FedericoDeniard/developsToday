# 🕵️ Spy Cats Agency – Fullstack App

This is a fullstack application built as part of a technical assessment for DevelopsToday. It allows the Spy Cat Agency to manage its secret agent cats.

---

## 📦 Tech Stack

- **Backend:** Python + FastAPI
- **Frontend:** Next.js + React
- **Database:** PostgreSQL

---

## 🚀 Getting Started

### 1. Clone the repository and configure your environment

Make sure you have a running PostgreSQL database and properly set up environment variables (e.g. in a `.env` file) for both backend and frontend.

---

### 2. Start the backend

In one terminal:

```bash
cd backend
pip install -r requirements.txt
fastapi dev main.py
```

---

### 3. Start the frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) or the next available port.

---

## 📌 Notes

- Make sure the backend and database are running before starting the frontend.
- Python dependencies are listed in `requirements.txt`.
- If you run into any issues, feel free to check your environment variables and server logs.
