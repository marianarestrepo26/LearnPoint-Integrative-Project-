# 📘 LearnPoint - Integrative Project

## 📌 General Description  
**LearnPoint** is an academic management platform designed to handle subjects, reservations, calendars, requests, and users.  
The project was developed as an **integrative academic work**, combining **frontend, backend, and database** into a functional web application.  

---

## 🌍 Deployment  

You can access the deployed project here:  
👉 [Backend](https://learnpoint-integrative-project-1.onrender.com ) 
👉 [Frontend](https://learnpoint-integrative-project-1.onrender.com ) 

---

## 🛠️ Technologies Used  


- **Frontend:**  
  - HTML5, CSS3, JavaScript  
  - Lottie Animations (`.json`)  
  - FullCalendar (Core, DayGrid, TimeGrid, Interaction)  v."^6.1.19",

- **Backend:**  
  - Node.js  
  - Express.js                                           v."5.1.0"
  - CORS (Cross-Origin Resource Sharing)                 v."2.8.5"
  - Dotenv (environment variables management)            v."17.2.1"
  - Nodemon (development auto-reload)                    v."3.1.10"

- **Database:**  
  - MySQL  
  - mysql2 (Node.js connector for MySQL)  

- **Others:**  
  - Git & GitHub for version control 

---

## ⚙️ How to Run the Project  

### 🔹 1. Clone the repository  
```bash
git clone https://github.com/San1000-Ark/LearnPoint-Integrative-Project-.git
cd LearnPoint-Integrative-Project
```

### 🔹 2. Backend Setup  
1. Navigate to the backend folder:  
   ```bash
   cd backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Create a .env file with your database credentials:  
   ```env
   DB_HOST=localhost
   DB_USER=your_user
   DB_PASS=your_password
   DB_NAME=learnpoint
   DB_PORT=3306
   PORT=3000
   ```
   ```
   backend/src/config/db.js
   ```
4. Import the SQL database from:  
   ```
   data/LearnPoint.sql
   ```
5. Start the backend server:  
   ```bash
   npm start
   ```

### 🔹 3. Frontend Setup  
1. Navigate to the frontend folder:  
   ```bash
   cd ../frontend
   ```
2. Open `index.html` directly in your browser.  

---

## 🌟 Features  

✅ User management (register, login, CRUD).  
✅ Subjects and course management.  
✅ Reservation and requests system.  
✅ Reviews and comments module.  
✅ Academic calendar integration.  
✅ Relational database model with MySQL.  

---

## 📂 Project Structure
```
📦 LearnPoint
 ┣ 📂 backend
 ┣ 📂 frontend
 ┣ 📂 data
 ┗ README.md
```
---

## 👥 Team Credits  

- **Gómez López, Vanessa**  
- **Henao Zuleta, Karina Andrea**  
- **Hernández Vargas, Juan José**  
- **Restrepo Acevedo, Mariana**  
- **Restrepo Arismendy, Santiago**  

---

## 📌 Version  

- **Version 0.0.1** – Initial integrative project release  
