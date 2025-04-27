# TaskManagementDashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


# Angular Task Management Dashboard

A responsive Kanban-style task manager with drag-and-drop functionality, powered by Angular and JSON Server.

 Key Features
- **JSON Server API** - Mock backend with full CRUD support
- **Drag-and-Drop** - Move tasks between columns (To Do/In Progress/Done)
- **Clean UI** - Built with Angular Material/Bootstrap
- **Real-Time Updates** - Instant UI feedback with RxJS

##  Technologies
- Angular 13
- JSON Server (Mock API)
- Angular CDK (Drag and Drop)
- RxJS (State Management)
- Bootstrap 5 (Styling)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/task-management-dashboard.git
cd task-management-dashboard

## Install Dependencies
npm install

## Start the Application
# Start Angular dev server
ng serve

# Start JSON Server (mock API)
npm run api

#extra Install JSON Server globally:
npm install -g json-server

{
  "tasks": [
    {
      "id": 1,
      "title": "Design dashboard",
      "status": "Done",
      "createdAt": "2023-05-01"
    }
  ]
}

#API Endpoints:

GET /tasks - Fetch all tasks

POST /tasks - Add new task

PATCH /tasks/:id - Update task status

DELETE /tasks/:id - Remove task


s vrc/
├── app/
│   ├── components/          # All UI components
│   ├── services/            # TaskService handles API calls
│   └── models/              # TypeScript interfaces
db.json                      # Mock database