package com.campusconnect.legacy.servlet;

import com.campusconnect.legacy.model.LegacyStudent;
import com.campusconnect.legacy.service.LegacyStudentService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * ============================================================================
 * CLASSIC MVC CONTROLLER DEMONSTRATION: StudentServlet
 * ============================================================================
 * 
 * Demonstrates:
 * - Controller Role in MVC: Intercepts HTTP request, delegates to Model/Service,
 *   populates request scope attributes, and selects the JSP View.
 * - HttpServlet doGet() and doPost() method handling.
 * - HttpServletRequest parameter extraction & validation.
 * - RequestDispatcher.forward() for view forwarding.
 * - HttpServletResponse.sendRedirect() for PRG (Post-Redirect-Get) pattern.
 * ============================================================================
 */
@WebServlet(name = "StudentServlet", urlPatterns = {"/students", "/students/new"})
public class StudentServlet extends HttpServlet {

    private final LegacyStudentService studentService = LegacyStudentService.getInstance();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String path = request.getServletPath();

        if ("/students/new".equals(path)) {
            // Forward to student creation form JSP
            request.getRequestDispatcher("/WEB-INF/views/student-form.jsp").forward(request, response);
            return;
        }

        // List view with optional search and department filter
        String query = request.getParameter("query");
        String department = request.getParameter("department");

        List<LegacyStudent> studentList = studentService.search(query, department);

        // Populate Model data into HttpServletRequest attribute for JSP View rendering
        request.setAttribute("students", studentList);
        request.setAttribute("query", query);
        request.setAttribute("department", department);

        // Forward to JSP View
        request.getRequestDispatcher("/WEB-INF/views/students.jsp").forward(request, response);
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // 1. Parameter Extraction via HttpServletRequest
        String studentId = request.getParameter("studentId");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String email = request.getParameter("email");
        String department = request.getParameter("department");
        String academicYearStr = request.getParameter("academicYear");
        String gpaStr = request.getParameter("gpa");
        String skills = request.getParameter("skills");

        List<String> errors = new ArrayList<>();

        // 2. Request Validation
        if (studentId == null || studentId.trim().isEmpty()) {
            errors.add("Student ID is required (e.g., STU-2024-001)");
        }
        if (firstName == null || firstName.trim().isEmpty()) {
            errors.add("First Name is required");
        }
        if (lastName == null || lastName.trim().isEmpty()) {
            errors.add("Last Name is required");
        }
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            errors.add("Valid email address is required");
        }
        if (department == null || department.trim().isEmpty()) {
            errors.add("Department must be selected");
        }

        int academicYear = 1;
        try {
            academicYear = Integer.parseInt(academicYearStr);
            if (academicYear < 1 || academicYear > 4) {
                errors.add("Academic year must be between 1 and 4");
            }
        } catch (NumberFormatException e) {
            errors.add("Academic year must be a valid number (1-4)");
        }

        BigDecimal gpa = BigDecimal.ZERO;
        try {
            gpa = new BigDecimal(gpaStr != null ? gpaStr.trim() : "0.00");
            if (gpa.compareTo(BigDecimal.ZERO) < 0 || gpa.compareTo(new BigDecimal("4.00")) > 0) {
                errors.add("GPA must be between 0.00 and 4.00");
            }
        } catch (Exception e) {
            errors.add("GPA must be a valid decimal number");
        }

        // 3. Conditional Flow: Return to View if validation fails
        if (!errors.isEmpty()) {
            request.setAttribute("errors", errors);
            // Retain entered values for user convenience
            request.setAttribute("studentId", studentId);
            request.setAttribute("firstName", firstName);
            request.setAttribute("lastName", lastName);
            request.setAttribute("email", email);
            request.setAttribute("department", department);
            request.setAttribute("academicYear", academicYearStr);
            request.setAttribute("gpa", gpaStr);
            request.setAttribute("skills", skills);

            request.getRequestDispatcher("/WEB-INF/views/student-form.jsp").forward(request, response);
            return;
        }

        // 4. Update Model via Service
        studentService.addStudent(studentId.trim(), firstName.trim(), lastName.trim(),
                email.trim(), department.trim(), academicYear, gpa, skills != null ? skills.trim() : "");

        // 5. Post-Redirect-Get (PRG) Pattern via sendRedirect
        response.sendRedirect(request.getContextPath() + "/students?success=true");
    }
}
