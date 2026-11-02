<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="/WEB-INF/views/common/header.jsp" />

<div class="banner">
    <strong>HTTP Session Architecture:</strong> Demonstrates stateful server-side user tracking via <code>HttpSession</code>, cookie session ID (<code>CAMPUS_LEGACY_JSESSIONID</code>), timeout intervals, and session invalidation upon logout.
</div>

<c:if test="${not empty param.loggedIn}">
    <div class="alert-success">✓ Session established! User state saved to HttpSession.</div>
</c:if>
<c:if test="${not empty param.loggedOut}">
    <div class="alert-success">✓ Session successfully invalidated via <code>session.invalidate()</code>. State cleared.</div>
</c:if>
<c:if test="${not empty param.error}">
    <div class="alert-error">Please provide a username to authenticate.</div>
</c:if>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
    <!-- Left Column: Session State / Login Form -->
    <div class="card">
        <c:choose>
            <c:when test="${isLoggedIn}">
                <h3 style="margin-bottom: 0.5rem; color: #15803d;">Active Authenticated Session</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    The server maintains state across requests using the HTTP Session.
                </p>

                <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: 6px; padding: 1rem; margin-bottom: 1.25rem; font-size: 0.9rem;">
                    <p><strong>Username:</strong> ${sessionScope.currentUser}</p>
                    <p><strong>Role:</strong> <span class="badge badge-primary">${sessionScope.userRole}</span></p>
                    <p><strong>Login Time:</strong> ${sessionScope.loginTime}</p>
                </div>

                <a href="${pageContext.request.contextPath}/logout" class="btn btn-danger">Safe Logout (session.invalidate())</a>
            </c:when>

            <c:otherwise>
                <h3 style="margin-bottom: 0.5rem;">Create Simulated Session</h3>
                <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.25rem;">
                    Submit this form to trigger <code>request.getSession(true)</code> and <code>setAttribute()</code>.
                </p>

                <form action="${pageContext.request.contextPath}/session" method="POST">
                    <div class="form-group">
                        <label for="username">Demo Username *</label>
                        <input type="text" id="username" name="username" value="prof_john" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="role">User Role</label>
                        <select id="role" name="role" class="form-control">
                            <option value="FACULTY">FACULTY</option>
                            <option value="STUDENT">STUDENT</option>
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Create Session (doPost)</button>
                </form>
            </c:otherwise>
        </c:choose>
    </div>

    <!-- Right Column: Low-Level Session Inspector -->
    <div class="card">
        <h3 style="margin-bottom: 0.5rem;">Session Metadata Inspector</h3>
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">
            Direct inspection of <code>jakarta.servlet.http.HttpSession</code> properties:
        </p>

        <c:choose>
            <c:when test="${not empty sessionId}">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.88rem;">
                    <tr>
                        <td style="font-weight: 600; width: 45%;">Session ID:</td>
                        <td><code style="word-break: break-all;">${sessionId}</code></td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Creation Time:</td>
                        <td>${creationTime}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Last Accessed:</td>
                        <td>${lastAccessedTime}</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Max Inactive Interval:</td>
                        <td>${maxInactiveInterval} seconds (5 min)</td>
                    </tr>
                    <tr>
                        <td style="font-weight: 600;">Is New Session?</td>
                        <td>${isNewSession}</td>
                    </tr>
                </table>
            </c:when>
            <c:otherwise>
                <div style="padding: 2rem; text-align: center; color: var(--text-muted); background: #f8fafc; border-radius: 6px;">
                    No active HTTP session found. Log in on the left to initialize one.
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
