package com.campusconnect.legacy.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

/**
 * ============================================================================
 * HTTP SESSION MANAGEMENT DEMONSTRATION SERVLET
 * ============================================================================
 * 
 * Demonstrates stateful web session management using Jakarta Servlet HttpSession:
 * 1. getSession(true): Retrieves existing session or creates a new one.
 * 2. getSession(false): Retrieves existing session without auto-creating.
 * 3. setAttribute(name, value): Stores user state across multiple HTTP requests.
 * 4. setMaxInactiveInterval(seconds): Sets automatic session expiration timeout.
 * 5. invalidate(): Safely purges session state upon user logout to prevent session fixation.
 * 6. sendRedirect(): Post-Redirect-Get pattern after login/logout actions.
 * ============================================================================
 */
@WebServlet(name = "SessionAuthServlet", urlPatterns = {"/session", "/logout"})
public class SessionAuthServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String path = request.getServletPath();

        // Safe Logout Flow
        if ("/logout".equals(path)) {
            HttpSession session = request.getSession(false); // Do not create if doesn't exist
            if (session != null) {
                String user = (String) session.getAttribute("currentUser");
                System.out.println("[Session Management] Invalidating session for user: " + user);
                session.invalidate(); // Destroy session and release all associated attributes
            }
            // sendRedirect() example
            response.sendRedirect(request.getContextPath() + "/session?loggedOut=true");
            return;
        }

        // View Session State
        HttpSession session = request.getSession(false);
        boolean isLoggedIn = (session != null && session.getAttribute("currentUser") != null);

        if (session != null) {
            request.setAttribute("sessionId", session.getId());
            request.setAttribute("creationTime",
                    LocalDateTime.ofInstant(Instant.ofEpochMilli(session.getCreationTime()), ZoneId.systemDefault()).toString());
            request.setAttribute("lastAccessedTime",
                    LocalDateTime.ofInstant(Instant.ofEpochMilli(session.getLastAccessedTime()), ZoneId.systemDefault()).toString());
            request.setAttribute("maxInactiveInterval", session.getMaxInactiveInterval());
            request.setAttribute("isNewSession", session.isNew());
        }

        request.setAttribute("isLoggedIn", isLoggedIn);
        request.getRequestDispatcher("/WEB-INF/views/session-demo.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String role = request.getParameter("role");

        if (username == null || username.trim().isEmpty()) {
            response.sendRedirect(request.getContextPath() + "/session?error=missing_username");
            return;
        }

        // 1. Obtain or create session
        HttpSession session = request.getSession(true);

        // 2. Set Session Expiration Interval (300 seconds = 5 minutes)
        session.setMaxInactiveInterval(300);

        // 3. Store attributes into Session scope
        session.setAttribute("currentUser", username.trim());
        session.setAttribute("userRole", role != null ? role.trim() : "FACULTY");
        session.setAttribute("loginTime", LocalDateTime.now().toString());

        System.out.println("[Session Management] Created session " + session.getId() + " for " + username);

        // 4. Redirect after POST
        response.sendRedirect(request.getContextPath() + "/session?loggedIn=true");
    }
}
