<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:include page="/WEB-INF/views/common/header.jsp" />

<div class="banner">
    <strong>Servlet Lifecycle Demonstration:</strong> Java Servlets do not have a <code>main()</code> method. Their lifecycle is completely managed by the Servlet Container (Apache Tomcat) according to the Jakarta Servlet Specification.
</div>

<div class="card">
    <h2>Live Servlet Lifecycle Telemetry</h2>
    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
        Inspecting runtime statistics for <strong>${servletName}</strong>:
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 1.25rem; border-radius: 6px; text-align: center;">
            <div style="font-size: 0.85rem; color: #166534; font-weight: 600;">1. init() Invocations</div>
            <div style="font-size: 2.2rem; font-weight: 700; color: #15803d;">${initCount}</div>
            <div style="font-size: 0.75rem; color: #166534;">Called ONCE upon load</div>
        </div>

        <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 1.25rem; border-radius: 6px; text-align: center;">
            <div style="font-size: 0.85rem; color: #1e40af; font-weight: 600;">2. service() Invocations</div>
            <div style="font-size: 2.2rem; font-weight: 700; color: #2563eb;">${serviceCount}</div>
            <div style="font-size: 0.75rem; color: #1e40af;">Incremented on each HTTP request</div>
        </div>

        <div style="background: #fff7ed; border: 1px solid #fed7aa; padding: 1.25rem; border-radius: 6px; text-align: center;">
            <div style="font-size: 0.85rem; color: #9a3412; font-weight: 600;">3. destroy() Invocations</div>
            <div style="font-size: 2.2rem; font-weight: 700; color: #c2410c;">${destroyCount}</div>
            <div style="font-size: 0.75rem; color: #9a3412;">Called ONCE upon shutdown</div>
        </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
        <a href="${pageContext.request.contextPath}/lifecycle" class="btn btn-primary">Refresh Page (Trigger service() method)</a>
    </div>

    <h3 style="margin-top: 1.5rem; margin-bottom: 0.75rem;">Lifecycle Stage Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
        <thead>
            <tr>
                <th style="width: 25%;">Lifecycle Phase</th>
                <th style="width: 25%;">Method Signature</th>
                <th>Container Action &amp; Best Practice</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>1. Initialization</strong></td>
                <td><code>public void init(ServletConfig)</code></td>
                <td>Executed when the servlet is first requested (or at container boot if <code>&lt;load-on-startup&gt;</code> is specified). Initialized at: <code>${initTimestamp}</code>.</td>
            </tr>
            <tr>
                <td><strong>2. Request Handling</strong></td>
                <td><code>protected void service(HttpServletRequest, HttpServletResponse)</code></td>
                <td>Dispatches incoming client requests (GET, POST, PUT, DELETE) to appropriate handlers in individual worker threads. Current timestamp: <code>${currentTime}</code>.</td>
            </tr>
            <tr>
                <td><strong>3. Destruction</strong></td>
                <td><code>public void destroy()</code></td>
                <td>Invoked before the servlet instance is garbage collected when Tomcat stops. Closes connections, flushes logs, and releases static handles.</td>
            </tr>
        </tbody>
    </table>
</div>

<jsp:include page="/WEB-INF/views/common/footer.jsp" />
