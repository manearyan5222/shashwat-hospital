package com.campusconnect.legacy;

import com.campusconnect.legacy.servlet.LifecycleDemoServlet;
import com.campusconnect.legacy.servlet.SessionAuthServlet;
import com.campusconnect.legacy.servlet.StudentServlet;
import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;

import java.io.File;

/**
 * Embedded Apache Tomcat Server Launcher for the Legacy Web Module.
 * 
 * Allows the entire Servlet/JSP/JSTL module to be run with a single command:
 *   mvn compile exec:java
 * 
 * Without requiring any external Tomcat installation or manual WAR deployments!
 */
public class LegacyTomcatServer {

    public static void main(String[] args) throws Exception {
        int port = 8085;
        String portProp = System.getProperty("legacy.port", System.getenv("LEGACY_PORT"));
        if (portProp != null && !portProp.isBlank()) {
            port = Integer.parseInt(portProp);
        }

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(port);
        tomcat.getConnector(); // Triggers default HTTP connector creation

        // Webapp directory containing WEB-INF and JSP files
        File webappDir = new File("src/main/webapp");
        if (!webappDir.exists()) {
            // Fallback for execution from root directory
            webappDir = new File("legacy-web/src/main/webapp");
        }

        File baseDir = new File(System.getProperty("java.io.tmpdir"), "tomcat-legacy-" + port);
        tomcat.setBaseDir(baseDir.getAbsolutePath());

        Context context = tomcat.addWebapp("", webappDir.getAbsolutePath());

        // CRITICAL FOR EMBEDDED TOMCAT & JASPER JSP COMPILATION:
        // Ensures the webapp class loader has access to the application classpath containing JspServlet & JSTL
        context.setParentClassLoader(LegacyTomcatServer.class.getClassLoader());

        // Explicitly register servlets
        Tomcat.addServlet(context, "StudentServlet", new StudentServlet());
        context.addServletMappingDecoded("/students", "StudentServlet");
        context.addServletMappingDecoded("/students/new", "StudentServlet");

        Tomcat.addServlet(context, "LifecycleDemoServlet", new LifecycleDemoServlet());
        context.addServletMappingDecoded("/lifecycle", "LifecycleDemoServlet");

        Tomcat.addServlet(context, "SessionAuthServlet", new SessionAuthServlet());
        context.addServletMappingDecoded("/session", "SessionAuthServlet");
        context.addServletMappingDecoded("/logout", "SessionAuthServlet");

        System.out.println("=================================================================");
        System.out.println("  CampusConnect Legacy Web (Servlet / JSP / JSTL) Server Running ");
        System.out.println("  URL: http://localhost:" + port + "/");
        System.out.println("  Student Roster:   http://localhost:" + port + "/students");
        System.out.println("  Lifecycle Demo:   http://localhost:" + port + "/lifecycle");
        System.out.println("  Session Demo:     http://localhost:" + port + "/session");
        System.out.println("=================================================================");

        tomcat.start();
        tomcat.getServer().await();
    }
}
