# CampusConnect REST API Collection (cURL Reference)

All requests assume the Spring Boot backend is running at `http://localhost:8080`.
Protected endpoints require the `Authorization: Bearer <JWT_TOKEN>` header obtained from the Login endpoint.

---

## 1. Authentication Endpoints

### 1.1 Login (Admin / Faculty / Student)
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123"
  }'
```

### 1.2 Register New Student
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "kevin_mitnick",
    "email": "kevin@campusconnect.edu",
    "password": "password123",
    "fullName": "Kevin Mitnick",
    "role": "STUDENT",
    "studentId": "STU-2024-099",
    "department": "Computer Science",
    "academicYear": 3
  }'
```

### 1.3 Current User Profile
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 2. Students API (Spring Data JPA)

### 2.1 Get All Students (Paginated & Filtered)
```bash
curl -X GET "http://localhost:8080/api/students?department=Computer%20Science&year=4&page=0&size=10" \
  -H "Authorization: Bearer <TOKEN>"
```

### 2.2 Get Student by ID
```bash
curl -X GET http://localhost:8080/api/students/1 \
  -H "Authorization: Bearer <TOKEN>"
```

### 2.3 Create Student Profile
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU-2024-050",
    "firstName": "Ada",
    "lastName": "Lovelace",
    "email": "ada.lovelace@campusconnect.edu",
    "department": "Computer Science",
    "academicYear": 4,
    "gpa": 3.98,
    "skills": "Algorithm Design, Mathematics, Java",
    "profileStatus": "ACTIVE"
  }'
```

### 2.4 Update Student Profile
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "STU-2024-001",
    "firstName": "Alex",
    "lastName": "Chen",
    "email": "alex.chen@campusconnect.edu",
    "department": "Computer Science",
    "academicYear": 4,
    "gpa": 3.90,
    "skills": "Java 17, Spring Boot, React, Docker, Kubernetes",
    "profileStatus": "ACTIVE"
  }'
```

### 2.5 Delete Student Profile (Admin Only)
```bash
curl -X DELETE http://localhost:8080/api/students/6 \
  -H "Authorization: Bearer <ADMIN_TOKEN>"
```

---

## 3. Courses & Enrollments API

### 3.1 List Courses
```bash
curl -X GET "http://localhost:8080/api/courses?department=Computer%20Science"
```

### 3.2 Create Course (Admin / Faculty)
```bash
curl -X POST http://localhost:8080/api/courses \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "courseCode": "CS-450",
    "title": "Distributed Systems & Cloud Architecture",
    "description": "Consensus protocols, gRPC, microservices, and distributed transactions.",
    "department": "Computer Science",
    "credits": 4,
    "instructorName": "Prof. Alan Turing",
    "capacity": 35,
    "semester": "Fall 2026"
  }'
```

### 3.3 Enroll Student in Course
```bash
curl -X POST http://localhost:8080/api/enrollments \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "courseId": 4,
    "grade": "IP",
    "status": "ENROLLED"
  }'
```

### 3.4 Update Enrollment Grade (Faculty / Admin)
```bash
curl -X PUT http://localhost:8080/api/enrollments/1 \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "grade": "A",
    "status": "COMPLETED"
  }'
```

---

## 4. Placement Portal API

### 4.1 List Open Placement Opportunities
```bash
curl -X GET "http://localhost:8080/api/placements/opportunities?status=OPEN"
```

### 4.2 Post Placement Drive (Admin / Faculty)
```bash
curl -X POST http://localhost:8080/api/placements/opportunities \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "NVIDIA Graphics",
    "jobRole": "CUDA & Backend Infrastructure Engineer",
    "description": "Design high-throughput parallel compute pipelines and microservice endpoints.",
    "eligibleDepartments": "Computer Science, Electronics & Comm",
    "minGpa": 3.75,
    "packageLpa": 22.00,
    "location": "Bangalore / Hybrid",
    "applicationDeadline": "2026-12-30",
    "status": "OPEN"
  }'
```

### 4.3 Submit Placement Application (Student)
```bash
curl -X POST http://localhost:8080/api/placements/applications \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "opportunityId": 1,
    "notes": "Completed multiple full-stack distributed systems projects."
  }'
```

### 4.4 Update Application Pipeline Decision (Faculty / Admin)
```bash
curl -X PATCH http://localhost:8080/api/placements/applications/1/status \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "SELECTED",
    "notes": "Offered package with 18.5 LPA. Accepted offer."
  }'
```

---

## 5. Low-Level JDBC Reporting Demonstrations

### 5.1 Department Analytics (JDBC PreparedStatement & ResultSet)
```bash
curl -X GET http://localhost:8080/api/reports/department-analytics
```

### 5.2 Salary Distribution Statistics (JDBC java.sql.Statement)
```bash
curl -X GET http://localhost:8080/api/reports/salary-stats
```

---

## 6. System Health & IoC Architecture Inspection

### 6.1 Server Health & Tomcat Telemetry
```bash
curl -X GET http://localhost:8080/api/health
```

### 6.2 Spring IoC & Dependency Injection Inspection
```bash
curl -X GET http://localhost:8080/api/dashboard/ioc-demo
```
