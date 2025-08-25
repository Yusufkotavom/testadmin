## School Management Backend (Mock, Modular, Scalable)

TypeScript Express backend scaffold for a school management system with modular components and mock data (no database required).

### Features
- Students, Parents, Teachers CRUD
- Classes and Subjects with mappings
- Grades, Attendance
- Finance: Fee structures and Invoices
- Blog/News posts
- Timetable/Schedule
- Notifications/Announcements
- Dashboard aggregates
- Mock Auth and RBAC via headers: `x-user-id`, `x-user-role` (admin, teacher, parent, student)
- Zod validation, centralized error handling

### Run

```bash
npm run dev
# or build
npm run build && npm start
```

### API Base
- Base path: `/api`
- Health: `/health`

### Examples
- List students: `GET /api/students`
- Create student: `POST /api/students`
  - Headers: `x-user-role: admin`
  - Body: `{ "name": "John", "email": "john@example.com" }`

