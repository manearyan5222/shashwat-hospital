package com.campusconnect.legacy.service;

import com.campusconnect.legacy.model.LegacyStudent;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

/**
 * Legacy Model / Business Service layer for the Servlet-based MVC demonstration.
 */
public class LegacyStudentService {

    private static final LegacyStudentService INSTANCE = new LegacyStudentService();
    private final List<LegacyStudent> students = new CopyOnWriteArrayList<>();
    private final AtomicLong idGenerator = new AtomicLong(100);

    private LegacyStudentService() {
        seedInitialStudents();
    }

    public static LegacyStudentService getInstance() {
        return INSTANCE;
    }

    private void seedInitialStudents() {
        students.add(new LegacyStudent(1L, "STU-LEGACY-001", "Alex", "Chen", "alex.chen@campusconnect.edu", "Computer Science", 4, new BigDecimal("3.85"), "Java, Servlets, JSP", "ACTIVE"));
        students.add(new LegacyStudent(2L, "STU-LEGACY-002", "Priya", "Sharma", "priya.sharma@campusconnect.edu", "Computer Science", 4, new BigDecimal("3.92"), "Python, SQL, JSTL", "ACTIVE"));
        students.add(new LegacyStudent(3L, "STU-LEGACY-003", "Marcus", "Vance", "marcus.vance@campusconnect.edu", "Information Technology", 3, new BigDecimal("3.45"), "HTML/CSS, MVC, JavaScript", "ACTIVE"));
        students.add(new LegacyStudent(4L, "STU-LEGACY-004", "Ananya", "Iyer", "ananya.iyer@campusconnect.edu", "Electronics", 4, new BigDecimal("3.78"), "Embedded, Java EE", "ACTIVE"));
        students.add(new LegacyStudent(5L, "STU-LEGACY-005", "David", "Kim", "david.kim@campusconnect.edu", "Computer Science", 2, new BigDecimal("3.10"), "OOP, Java", "PROBATION"));
    }

    public List<LegacyStudent> getAllStudents() {
        return new ArrayList<>(students);
    }

    public List<LegacyStudent> search(String query, String department) {
        return students.stream()
                .filter(s -> query == null || query.isBlank() ||
                        s.getFullName().toLowerCase().contains(query.toLowerCase()) ||
                        s.getStudentId().toLowerCase().contains(query.toLowerCase()) ||
                        s.getEmail().toLowerCase().contains(query.toLowerCase()))
                .filter(s -> department == null || department.isBlank() ||
                        s.getDepartment().equalsIgnoreCase(department))
                .collect(Collectors.toList());
    }

    public Optional<LegacyStudent> getById(Long id) {
        return students.stream().filter(s -> s.getId().equals(id)).findFirst();
    }

    public LegacyStudent addStudent(String studentId, String firstName, String lastName,
                                    String email, String department, int academicYear,
                                    BigDecimal gpa, String skills) {
        long newId = idGenerator.incrementAndGet();
        LegacyStudent s = new LegacyStudent(newId, studentId, firstName, lastName, email,
                department, academicYear, gpa, skills, "ACTIVE");
        students.add(0, s); // Add to top
        return s;
    }
}
