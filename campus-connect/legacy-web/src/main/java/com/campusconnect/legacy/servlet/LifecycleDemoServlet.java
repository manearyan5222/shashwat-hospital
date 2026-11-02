package com.campusconnect.legacy.servlet;

import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * ============================================================================
 * SERVLET LIFECYCLE DEMONSTRATION SERVLET
 * ============================================================================
 * 
 * Demonstrates the canonical Java Servlet Lifecycle managed by the Servlet Container:
 * 
 * 1. Loading & Instantiation:
 *    - Container loads the Servlet class and creates an instance via default constructor.
 * 
 * 2. Initialization: init(ServletConfig config)
 *    - Called EXACTLY ONCE by the container after instantiation and before any requests
 *      are processed.
 *    - Used to initialize expensive resources (e.g., database pools, configurations).
 * 
 * 3. Request Handling: service(ServletRequest, ServletResponse)
 *    - Invoked for EVERY incoming client request in its own thread.
 *    - Inspects HTTP method and delegates to doGet(), doPost(), doPut(), etc.
 * 
 * 4. Destruction: destroy()
 *    - Called EXACTLY ONCE by the container before removing the servlet instance from service
 *      (e.g., server shutdown or context undeployment).
 *    - Used to release held resources (close sockets, connections, clean temp files).
 * ============================================================================
 */
@WebServlet(name = "LifecycleDemoServlet", urlPatterns = {"/lifecycle"})
public class LifecycleDemoServlet extends HttpServlet {

    private static final AtomicInteger initCount = new AtomicInteger(0);
    private static final AtomicInteger serviceCount = new AtomicInteger(0);
    private static final AtomicInteger destroyCount = new AtomicInteger(0);

    private String initTimestamp;
    private String servletName;

    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        initCount.incrementAndGet();
        this.initTimestamp = LocalDateTime.now().toString();
        this.servletName = config.getServletName();
        System.out.println("[Servlet Lifecycle] init() executed for " + servletName + " at " + initTimestamp);
    }

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        int currentCount = serviceCount.incrementAndGet();
        System.out.println("[Servlet Lifecycle] service() invoked (#" + currentCount + ") for method: " + req.getMethod());
        // Delegate to super.service which dispatches to doGet(), doPost(), etc.
        super.service(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setAttribute("servletName", servletName);
        request.setAttribute("initTimestamp", initTimestamp);
        request.setAttribute("initCount", initCount.get());
        request.setAttribute("serviceCount", serviceCount.get());
        request.setAttribute("destroyCount", destroyCount.get());
        request.setAttribute("currentTime", LocalDateTime.now().toString());

        request.getRequestDispatcher("/WEB-INF/views/lifecycle-demo.jsp").forward(request, response);
    }

    @Override
    public void destroy() {
        destroyCount.incrementAndGet();
        System.out.println("[Servlet Lifecycle] destroy() invoked for " + servletName + ". Releasing resources.");
        super.destroy();
    }
}
