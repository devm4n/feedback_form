# 🚀 Django-React Feedback System

A full-stack application featuring a **React (Vite)** frontend and a **Django REST Framework** backend. Background tasks (like email confirmations) are handled asynchronously using **Celery** and **Redis**.

## 📂 Project Structure
- `/backend`: Django API, Celery Workers, and Redis (Dockerized).
- `/frontend`: React + Vite application (Node.js).

---

## 🛠️ Backend Setup (Docker)

The backend uses Docker Compose to orchestrate the API, the Redis broker, and the Celery worker.

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a `.env` file:**
   Create a file named `.env` in the `/backend` folder and add your credentials:
    ```bash
    cp .env_example -r .env
    ```
   ```env
   EMAIL_HOST_USER=your-email@gmail.com
   EMAIL_HOST_PASSWORD=your-google-app-password
   ```

3. **Start the services:**
   ```bash
   docker-compose up --build
   ```

4. **Apply Migrations:**
   In a new terminal window, run:
   ```bash
   docker-compose exec web python manage.py migrate
   ```

---

## 🎨 Frontend Setup (Local)

The frontend is a standard Vite-based React app.

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```
2. **Create a `.env` file:**
   Create a file named `.env` in the `/frontend` folder and add your credentials:
    ```bash
    cp .env_example -r .env
    ```
3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The app will typically be available at `http://localhost:5173`.*

---

## 📧 Workflow
1. **Submit:** User submits the feedback form in the React UI.
2. **Process:** React sends a POST request to the Django API.
3. **Queue:** Django saves the data and pushes an email task to **Redis**.
4. **Execute:** The **Celery** worker (running in its own Docker container) picks up the task and sends the SMTP email.
5. **Instant UI:** The user receives a success message immediately without waiting for the email to send.

---

## 🔒 Security
- **.env**: The environment file is excluded via `.gitignore` to protect SMTP credentials.
- **App Passwords**: This project requires a Google App Password if using Gmail for SMTP.

---

## 🛠️ Troubleshooting
- **Broker Connection Error:** Ensure `CELERY_BROKER_URL` uses the service name `redis` (as defined in `docker-compose.yml`) instead of `localhost`.
- **CORS Issues:** Verify `django-cors-headers` is installed and `CORS_ALLOWED_ORIGINS` includes the React dev server URL.
