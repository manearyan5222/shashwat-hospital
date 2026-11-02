<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="/WEB-INF/views/common/header.jsp" />

<div class="banner">
    <strong>Educational Architecture Note:</strong> This module runs independently on its own embedded Apache Tomcat instance, demonstrating classic server-side Model-View-Controller (MVC) using Jakarta Servlets, JavaServer Pages (JSP), Expression Language (EL), and the Standard Tag Library (JSTL).
</div>

<div class="card">
    <h2 style="margin-bottom: 0.5rem;">Legacy Java Web Architecture Modules</h2>
    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
        Explore each runnable demonstration illustrating how enterprise Java web development evolved before the advent of REST APIs and single-page React applications.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
        <!-- Card 1 -->
        <div style="border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; background: #fafafa;">
            <div class="badge badge-primary" style="margin-bottom: 0.5rem;">MVC &amp; JSTL</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem;">Student Roster MVC</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                Servlet controller retrieves Model data and forwards to JSP view rendering tables with <code>&lt;c:forEach&gt;</code>, <code>&lt;c:if&gt;</code>, and <code>&lt;c:choose&gt;</code>.
            </p>
            <a href="${pageContext.request.contextPath}/students" class="btn btn-primary" style="font-size: 0.85rem;">View Student Roster &rarr;</a>
        </div>

        <!-- Card 2 -->
        <div style="border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; background: #fafafa;">
            <div class="badge badge-success" style="margin-bottom: 0.5rem;">doGet &amp; doPost</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem;">Form &amp; Request Validation</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                HTML form dispatching to <code>StudentServlet.doPost()</code>, validating input parameters, error-binding, and Post-Redirect-Get pattern.
            </p>
            <a href="${pageContext.request.contextPath}/students/new" class="btn btn-primary" style="font-size: 0.85rem;">Open Add Student Form &rarr;</a>
        </div>

        <!-- Card 3 -->
        <div style="border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; background: #fafafa;">
            <div class="badge badge-warning" style="margin-bottom: 0.5rem;">Lifecycle</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem;">Servlet Lifecycle Inspection</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                Inspect container-managed <code>init()</code>, <code>service()</code>, and <code>destroy()</code> execution counters and timing live.
            </p>
            <a href="${pageContext.request.contextPath}/lifecycle" class="btn btn-secondary" style="font-size: 0.85rem;">Inspect Lifecycle &rarr;</a>
        </div>

        <!-- Card 4 -->
        <div style="border: 1px solid var(--border); border-radius: 6px; padding: 1.25rem; background: #fafafa;">
            <div class="badge badge-neutral" style="margin-bottom: 0.5rem;">State Management</div>
            <h3 style="font-size: 1.1rem; margin-bottom: 0.4rem;">HttpSession &amp; Invalidation</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 1rem;">
                Stateful authentication demo using <code>HttpSession.setAttribute()</code>, <code>setMaxInactiveInterval()</code>, and safe logout via <code>invalidate()</code>.
            </p>
            <a href="${pageContext.request.contextPath}/session" class="btn btn-secondary" style="font-size: 0.85rem;">Test HttpSession &rarr;</a>
        </div>
    </div>
</div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
