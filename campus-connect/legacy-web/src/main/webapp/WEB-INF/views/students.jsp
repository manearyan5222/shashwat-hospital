<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<%-- =========================================================================
     JSP DECLARATIONS DEMONSTRATION (<%! ... %>)
     Class-level fields or methods declared directly in the generated Servlet class.
     Note: In modern development, state should NEVER be maintained in JSP class fields!
     ========================================================================= --%>
<%! 
    private int pageVisitCounter = 0; 
    public String getFormattedDate() {
        return new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new java.util.Date());
    }
%>

<jsp:include page="/WEB-INF/views/common/header.jsp" />

<%-- =========================================================================
     SCRIPTLETS DEMONSTRATION (<% ... %>) - WITH PROMINENT EDUCATIONAL WARNING
     ========================================================================= --%>
<%
    // SCRIPTLET CODE (Legacy approach - embedding Java in HTML)
    int currentRender = ++pageVisitCounter;
    String hostAddress = request.getRemoteAddr();
    String serverSoftware = application.getServerInfo();
%>

<div class="banner">
    <div style="font-weight: 700; color: #b45309; margin-bottom: 0.25rem;">
        ⚠️ SCRIPTLET &amp; DECLARATION PEDAGOGICAL DEMONSTRATION:
    </div>
    <div style="font-size: 0.88rem; color: #78350f;">
        <strong>JSP Declarations (<code>&lt;%! ... %&gt;</code>):</strong> Page render count = 
        <strong><%= currentRender %></strong> (rendered on <em><%= getFormattedDate() %></em>).<br>
        <strong>JSP Expression (<code>&lt;%= ... %&gt;</code>):</strong> Host = <code><%= hostAddress %></code> | Server = <code><%= serverSoftware %></code><br>
        <div style="margin-top: 0.5rem; padding: 0.5rem; background: #fffbeb; border-radius: 4px; border: 1px solid #fde68a;">
            <strong>Best Practice Note:</strong> Direct scriptlets (<code>&lt;% ... %&gt;</code>) violate MVC separation by embedding imperative code into presentation templates. They are shown here strictly as legacy academic examples. For clean production code, use JSTL tags and Expression Language (EL) below!
        </div>
    </div>
</div>

<c:if test="${not empty param.success}">
    <div class="alert-success">
        ✓ Student successfully registered and persisted into the legacy store!
    </div>
</c:if>

<div class="card">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
        <div>
            <h2>Student Roster (Classic MVC &amp; JSTL)</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">
                Rendered using <code>&lt;c:forEach&gt;</code>, <code>&lt;c:if&gt;</code>, and <code>&lt;c:choose&gt;</code>.
            </p>
        </div>
        <a href="${pageContext.request.contextPath}/students/new" class="btn btn-primary">+ Register New Student</a>
    </div>

    <!-- Search & Filter Form (doGet) -->
    <form action="${pageContext.request.contextPath}/students" method="GET" style="display: flex; gap: 0.75rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <input type="text" name="query" value="${query}" placeholder="Search by name, ID, or email..." class="form-control" style="flex: 2; min-width: 200px;">
        <select name="department" class="form-control" style="flex: 1; min-width: 160px;">
            <option value="">All Departments</option>
            <option value="Computer Science" ${department == 'Computer Science' ? 'selected' : ''}>Computer Science</option>
            <option value="Information Technology" ${department == 'Information Technology' ? 'selected' : ''}>Information Technology</option>
            <option value="Electronics" ${department == 'Electronics' ? 'selected' : ''}>Electronics</option>
        </select>
        <button type="submit" class="btn btn-secondary">Filter</button>
        <c:if test="${not empty query or not empty department}">
            <a href="${pageContext.request.contextPath}/students" class="btn btn-neutral" style="padding: 0.5rem 0.75rem; font-size: 0.85rem;">Clear</a>
        </c:if>
    </form>

    <!-- Student Table -->
    <div class="table-responsive">
        <table>
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>GPA</th>
                    <th>Honor Status (&lt;c:choose&gt;)</th>
                    <th>Skills</th>
                </tr>
            </thead>
            <tbody>
                <c:choose>
                    <c:when test="${empty students}">
                        <tr>
                            <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                                No students match the filter criteria.
                            </td>
                        </tr>
                    </c:when>
                    <c:otherwise>
                        <c:forEach var="student" items="${students}">
                            <tr>
                                <td><strong>${student.studentId}</strong></td>
                                <td>${student.fullName}</td>
                                <td>${student.email}</td>
                                <td><span class="badge badge-neutral">${student.department}</span></td>
                                <td>Year ${student.academicYear}</td>
                                <td><strong>${student.gpa}</strong></td>
                                <td>
                                    <%-- Demonstration of JSTL <c:choose>, <c:when>, <c:otherwise> --%>
                                    <c:choose>
                                        <c:when test="${student.gpa >= 3.80}">
                                            <span class="badge badge-success">Dean's List ★</span>
                                        </c:when>
                                        <c:when test="${student.gpa >= 3.50}">
                                            <span class="badge badge-primary">Honor Roll</span>
                                        </c:when>
                                        <c:when test="${student.gpa < 3.20}">
                                            <span class="badge badge-warning">Advising Needed</span>
                                        </c:when>
                                        <c:otherwise>
                                            <span class="badge badge-neutral">Good Standing</span>
                                        </c:otherwise>
                                    </c:choose>
                                </td>
                                <td style="font-size: 0.82rem; color: var(--text-muted);">${student.skills}</td>
                            </tr>
                        </c:forEach>
                    </c:otherwise>
                </c:choose>
            </tbody>
        </table>
    </div>
</div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
