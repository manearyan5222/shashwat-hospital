<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="/WEB-INF/views/common/header.jsp" />

<div class="card" style="max-width: 680px; margin: 0 auto;">
    <h2 style="margin-bottom: 0.35rem;">Add Student (doPost Demonstration)</h2>
    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
        This form submits an HTTP POST request to <code>StudentServlet.doPost()</code>, triggering server-side parameter validation and error-binding.
    </p>

    <!-- Error Display using JSTL <c:if> and <c:forEach> -->
    <c:if test="${not empty errors}">
        <div class="alert-error">
            <strong>Please correct the following errors:</strong>
            <ul style="margin-left: 1.5rem; margin-top: 0.4rem;">
                <c:forEach var="err" items="${errors}">
                    <li>${err}</li>
                </c:forEach>
            </ul>
        </div>
    </c:if>

    <form action="${pageContext.request.contextPath}/students" method="POST">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
                <label for="studentId">Student ID *</label>
                <input type="text" id="studentId" name="studentId" value="${studentId}" placeholder="e.g. STU-2024-099" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="email">Institutional Email *</label>
                <input type="email" id="email" name="email" value="${email}" placeholder="e.g. student@campusconnect.edu" class="form-control" required>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" value="${firstName}" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" value="${lastName}" class="form-control" required>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem;">
            <div class="form-group">
                <label for="department">Department *</label>
                <select id="department" name="department" class="form-control" required>
                    <option value="">Select Department</option>
                    <option value="Computer Science" ${department == 'Computer Science' ? 'selected' : ''}>Computer Science</option>
                    <option value="Information Technology" ${department == 'Information Technology' ? 'selected' : ''}>Information Technology</option>
                    <option value="Electronics" ${department == 'Electronics' ? 'selected' : ''}>Electronics</option>
                </select>
            </div>
            <div class="form-group">
                <label for="academicYear">Academic Year *</label>
                <select id="academicYear" name="academicYear" class="form-control" required>
                    <option value="1" ${academicYear == '1' ? 'selected' : ''}>Year 1</option>
                    <option value="2" ${academicYear == '2' ? 'selected' : ''}>Year 2</option>
                    <option value="3" ${academicYear == '3' ? 'selected' : ''}>Year 3</option>
                    <option value="4" ${academicYear == '4' ? 'selected' : ''}>Year 4</option>
                </select>
            </div>
            <div class="form-group">
                <label for="gpa">Cumulative GPA (0.00-4.00) *</label>
                <input type="number" step="0.01" min="0" max="4" id="gpa" name="gpa" value="${gpa != null ? gpa : '3.50'}" class="form-control" required>
            </div>
        </div>

        <div class="form-group">
            <label for="skills">Technical Skills (Comma-separated)</label>
            <input type="text" id="skills" name="skills" value="${skills}" placeholder="e.g. Java, Servlets, JSP, MySQL" class="form-control">
        </div>

        <div style="display: flex; gap: 0.75rem; margin-top: 1.5rem;">
            <button type="submit" class="btn btn-primary" style="flex: 1;">Submit (HTTP POST)</button>
            <a href="${pageContext.request.contextPath}/students" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
