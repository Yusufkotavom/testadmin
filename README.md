## School Management Backend (Mock, Modular, Scalable)

TypeScript Express backend scaffold for a school management system with modular components and mock data (no database required).

### Features
- Students, Parents, Teachers CRUD
- Classes and Subjects with mappings
- Enrollments (student-to-class/subject)
- Grades, Attendance
- Finance: Fee structures and Invoices
- Blog/News posts
- Timetable/Schedule
- Notifications/Announcements
- Dashboard aggregates
- Role-aware `/api/me` endpoint (admin/teacher/parent/student views)
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

### Quick Start (dev)

```bash
npm ci
npm run dev
```

Mock data is auto-seeded on startup.

### Auth (Mock)

- Send headers:
  - `x-user-id`: the id of the current user (any string)
  - `x-user-role`: one of `admin | teacher | parent | student`

### Key Endpoints

- Students: `GET/POST/PUT/DELETE /api/students`
- Teachers: `GET/POST/PUT/DELETE /api/teachers`
- Parents: `GET/POST/PUT/DELETE /api/parents`
- Classes: `GET/POST/PUT/DELETE /api/classes`
- Subjects: `GET/POST/PUT/DELETE /api/subjects`
- Enrollments: `GET/POST/PUT/DELETE /api/enrollments`
- Grades: `GET/POST/PUT/DELETE /api/grades`
- Attendance: `GET/POST/PUT/DELETE /api/attendance`
- Finance: `GET/POST/PUT/DELETE /api/finance/fees`, `GET/POST/PUT/DELETE /api/finance/invoices`
- Blog: `GET/POST/PUT/DELETE /api/blog`
- Timetable: `GET/POST/PUT/DELETE /api/timetable`
- Notifications: `GET/POST/PUT/DELETE /api/notifications`
- Dashboard: `GET /api/dashboard`
- Me (role-aware): `GET /api/me`

### Examples

- List students: `GET /api/students`
- Create student: `POST /api/students`
  - Headers: `x-user-role: admin`
  - Body: `{ "name": "John", "email": "john@example.com" }`
- Get my view (as parent): `GET /api/me`
  - Headers: `x-user-role: parent`, `x-user-id: <parentId>`

### Examples
- List students: `GET /api/students`
- Create student: `POST /api/students`
  - Headers: `x-user-role: admin`
  - Body: `{ "name": "John", "email": "john@example.com" }`

