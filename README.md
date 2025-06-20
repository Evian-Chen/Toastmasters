# Toastmasters Taiwan Web Platform

This is the official website project for **Toastmasters Taiwan**, aiming to provide a modern platform for:

- 🔍 Club search by region
- 📅 Activity and meeting posting
- 🔐 User login and profile management
- 📝 Article publishing with comments and likes
- 💬 Real-time chat between members

> 🚧 **This project is under active development.** Features and structure may change frequently.

---

## Tech Stack

- **Frontend:** Vue 3 + Tailwind CSS
- **Backend:** Express.js (Node.js)
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT (planned)

---

## Get Started

### 1. Clone the repository

```bash
git clone https://github.com/Evian-Chen/Toastmasters.git
cd Toastmasters
```

### 2. Build frontend and install dependencies

```bash
npm run build
```

This will:

* Install frontend dependencies under `vue-project/`
* Build the Vue 3 app into static files
* Ensure everything is ready for server to serve

### 3. Start the backend server

```bash
npm start
```

This will:

* Install server dependencies under `server/` (if not yet)
* Launch Express.js server on port **3000**
* Serve the built Vue app from `vue-project/dist`

---

## Visit the Website

* **Local:** [http://localhost:3000](http://localhost:3000)
* **Demo on Render:** [toastmasters.onrender.com](https://toastmasters.onrender.com)

---

Feel free to open issues or pull requests if you'd like to contribute!

