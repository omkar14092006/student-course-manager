# Student & Course Manager

A React CRUD application for managing students and courses, using Bootstrap for styling and JSON Server as a mock backend.

## Technologies
- HTML (index.html), CSS (Bootstrap + src/styles.css), JavaScript (ES6)
- React 18 (Vite) with components, props, state and event handlers
- Bootstrap 5 (CDN) for layout, forms, tables and buttons
- JSON Server (mock REST API, data stored in db.json)

## Prerequisites
Node.js 18+ and npm.

## Setup and run
```
npm install
npm start        # runs JSON Server (http://localhost:3001) and the React app (http://localhost:5173)
```
Or in two terminals: `npm run server` and `npm run dev`.

## API endpoints (base URL http://localhost:3001)
| Operation | Method | Endpoint |
|-----------|--------|----------|
| List      | GET    | /students, /courses |
| Create    | POST   | /students, /courses |
| Update    | PUT    | /students/:id, /courses/:id |
| Delete    | DELETE | /students/:id, /courses/:id |

## Known limitations
Mock data only: no authentication, no real database, no business rules.
