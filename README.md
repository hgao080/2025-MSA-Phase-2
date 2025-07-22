# Cobweb: Student Networking Platform

## Introduction
Cobweb is a modern web application designed to help students connect, collaborate, and grow their academic networks. Inspired by the idea of weaving connections through "web" projects, Cobweb enables users to find, join and collaborate on projects. The platform features project management, real-time chat, and a beautiful, responsive UI.

## How Cobweb Relates to the Theme
The theme for this project is **networking**. Cobweb embodies this by providing a digital space where students can:
- Discover and join projects or study groups
- Connect with others based on shared interests
- Communicate in real-time
- Build a personal network that hopefully extends beyond the classroom

Cobweb directly addresses the networking theme, making it easy for students to find opportunities

## Unique & Interesting Features
Cobweb stands out from other student networking apps with:
- **Animations**: Animations using framer motion on all pages
- **Search & Filter**: Search and filter functionalities when browsing projects
- **User account system**: Use of JWTs with .NET Identity to securely authenticate users
- **React Hot Toasts**: System notications on actions for better user experience e.g. after apply buttons when logged in or when connecting to messaging
- **Local Docker container hot reloading/rebuilding**: Docker is setup for local development and supports frontend hot reloading of code changes and modules with the backend supporting reloading when code changes by running docker compose with watch enabled


## Advanced Features Checklist
- [x] **State management with Zustand**
- [x] **Dockerized for local development**
- [x] **WebSockets (real-time chat with SignalR)**
- [x] **Theme switching (light/dark mode)** (Mark above if only marking 3)

## Running Locally with Docker

To run Cobweb locally using Docker:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hgao080/2025-MSA-Phase-2.git
   cd 2025-MSA-Phase-2
   ```
2. **Build and start the containers:**
   ```bash
   docker compose up
   ```
3. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

> Make sure Docker Desktop is running on your machine. The first build may take a few minutes as dependencies are installed.

To stop the app, press `Ctrl+C` in your terminal then enter to remove the container:
```bash
docker compose down
```
> **Note:**
> You must create a `.env` file in the `backend` folder before running Docker. This file should contain your database connection string, environment, and JWT secret. Example:
>
> ```env
> # Database Connection
> ConnectionStrings__AZURE_SQL_CONNECTIONSTRING=Server=...;Initial Catalog=...;User ID=...;Password=...;
>
> # Environment
> ASPNETCORE_ENVIRONMENT=Development
>
> # JWT Secret
> JWT_SECRET_KEY=your-very-long-random-secret-key
> ```
> 
