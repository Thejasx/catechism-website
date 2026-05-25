# ✝ Ernakulam Catechism Unit – Parish Website

A full-stack MERN (MongoDB, Express, React, Node.js) web application for the Ernakulam Catechism Unit parish community. Built with a responsive, modern UI featuring scroll animations, an admin dashboard, and dynamic content management.

---

## 📁 Project Structure

```
cat/
├── backend/          # Express + Node.js REST API
│   ├── models/       # Mongoose data models
│   ├── routes/       # API route handlers
│   ├── server.js     # Entry point
│   ├── seed.js       # Database seeding script
│   ├── vercel.json   # Vercel deployment config
│   └── .env          # Environment variables (not committed)
├── frontend/         # React + Vite SPA
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── App.jsx       # Root component
│   │   └── index.css     # Global styles
│   ├── vercel.json   # Vercel deployment config
│   └── index.html
├── .gitignore        # Root gitignore
└── README.md         # This file
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ernakulam-catechism.git
cd ernakulam-catechism
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Seed the database with sample data:
```bash
node seed.js
```

Start the backend server:
```bash
npm start
```
Backend runs at: `http://localhost:5000`

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 🌐 Deploying to Vercel

### Backend Deployment
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **`backend/`** folder
3. Add Environment Variables in Vercel dashboard:
   - `MONGO_URI` → your MongoDB Atlas URI
   - `JWT_SECRET` → your secret key
4. Deploy — Vercel uses `vercel.json` to route all requests to `server.js`

### Frontend Deployment
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the **`frontend/`** folder
3. Add Environment Variable:
   - `VITE_API_URL` → your deployed backend URL (e.g. `https://your-backend.vercel.app`)
4. Deploy — Vercel uses `vercel.json` to handle SPA routing

> **Note:** Update the API base URL in `frontend/src/App.jsx` from `http://localhost:5000` to your live backend URL before deploying.

---

## 🔑 Admin Panel

- Navigate to the site and click **Admin** in the header or footer
- **Default credentials:**
  - Username: `admin`
  - Password: `adminpassword`
- Change credentials after first login for security

### Admin Features
- ➕ Add / ✏️ Edit / 🗑 Delete **Announcements**
- ➕ Add / ✏️ Edit / 🗑 Delete **Upcoming Events**
- ➕ Add / ✏️ Edit / 🗑 Delete **Gallery Items**
- ➕ Add / ✏️ Edit / 🗑 Delete **Leaders / Staff**
- 📋 View **Contact Messages**
- 🙏 View **Prayer Requests**

---

## 🛠 Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Frontend   | React 18, Vite, CSS3    |
| Backend    | Node.js, Express.js     |
| Database   | MongoDB + Mongoose      |
| Auth       | JWT (JSON Web Tokens)   |
| Hosting    | Vercel                  |
| Icons      | Lucide React            |

---

## 📜 License

This project is built for the Ernakulam Catechism Unit community.  
All rights reserved © 2026 Ernakulam Catechism Unit.
