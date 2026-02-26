# Task Manager App

## Backend Setup
1. cd backend
2. npm install
3. npm run dev (runs on port 4000)

## Frontend Setup
1. cd frontend
2. npm install
3. npm run dev (runs on port 3000)

## API Endpoints
- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

## Design Decisions and Assumptions
- Backend Structure: Organized in a layered architecture:
  1. Routes: Handle API endpoints
  2. Controllers: Handle requests and responses
  3. Services: Contain business logic and interact with the database
- Frontend Structure:
  1. Axios requests are in a dedicated service folder (taskService.js)
  2. Components (TaskList, TaskItem, TaskForm, TaskFilter) call the service methods
  3. App.jsx orchestrates all components and manages state

## Time spent on each part
- backend: 70 minutes
- Frontend: 120 minutes
- styling: 30 minutes
- testing: 40 mintues
