package com.campusconnect.legacy.servlet;

import com.campusconnect.legacy.model.LegacyStudent;
import com.campusconnect.legacy.service.LegacyStudentService;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StudentServletTest {

    private StudentServlet servlet;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private RequestDispatcher requestDispatcher;

    @BeforeEach
    void setUp() {
        servlet = new StudentServlet();
    }

    @Test
    @DisplayName("doGet on /students should populate students attribute and forward to students.jsp")
    void testDoGet_ListStudents() throws Exception {
        when(request.getServletPath()).thenReturn("/students");
        when(request.getParameter("query")).thenReturn(null);
        when(request.getParameter("department")).thenReturn(null);
        when(request.getRequestDispatcher("/WEB-INF/views/students.jsp")).thenReturn(requestDispatcher);

        servlet.doGet(request, response);

        verify(request).setAttribute(eq("students"), anyList());
        verify(requestDispatcher).forward(request, response);
    }

    @Test
    @DisplayName("doGet on /students/new should forward to student-form.jsp")
    void testDoGet_StudentForm() throws Exception {
        when(request.getServletPath()).thenReturn("/students/new");
        when(request.getRequestDispatcher("/WEB-INF/views/student-form.jsp")).thenReturn(requestDispatcher);

        servlet.doGet(request, response);

        verify(requestDispatcher).forward(request, response);
    }

    @Test
    @DisplayName("doPost with invalid input should set errors attribute and forward back to form")
    void testDoPost_ValidationFailure() throws Exception {
        when(request.getParameter("studentId")).thenReturn(""); // Empty ID
        when(request.getParameter("firstName")).thenReturn("Bob");
        when(request.getParameter("lastName")).thenReturn("Smith");
        when(request.getParameter("email")).thenReturn("invalid-email");
        when(request.getParameter("department")).thenReturn("");
        when(request.getParameter("academicYear")).thenReturn("5"); // Invalid year
        when(request.getParameter("gpa")).thenReturn("5.50"); // Invalid GPA
        when(request.getRequestDispatcher("/WEB-INF/views/student-form.jsp")).thenReturn(requestDispatcher);

        servlet.doPost(request, response);

        verify(request).setAttribute(eq("errors"), any(List.class));
        verify(requestDispatcher).forward(request, response);
        verify(response, never()).sendRedirect(anyString());
    }

    @Test
    @DisplayName("doPost with valid parameters should add student and redirect to /students?success=true")
    void testDoPost_SuccessRedirect() throws Exception {
        when(request.getContextPath()).thenReturn("/legacy");
        when(request.getParameter("studentId")).thenReturn("STU-TEST-999");
        when(request.getParameter("firstName")).thenReturn("Alan");
        when(request.getParameter("lastName")).thenReturn("Turing");
        when(request.getParameter("email")).thenReturn("alan.t@campusconnect.edu");
        when(request.getParameter("department")).thenReturn("Computer Science");
        when(request.getParameter("academicYear")).thenReturn("3");
        when(request.getParameter("gpa")).thenReturn("3.95");
        when(request.getParameter("skills")).thenReturn("Cryptography, Java");

        servlet.doPost(request, response);

        verify(response).sendRedirect("/legacy/students?success=true");

        // Verify student exists in service
        LegacyStudentService service = LegacyStudentService.getInstance();
        List<LegacyStudent> results = service.search("STU-TEST-999", null);
        assertFalse(results.isEmpty());
    }
}
