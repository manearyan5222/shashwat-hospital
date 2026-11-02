package com.campusconnect.config;

import com.campusconnect.repository.UserRepository;
import com.campusconnect.service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * ============================================================================
 * SPRING DEPENDENCY INJECTION (DI) & INVERSION OF CONTROL (IoC) DEMONSTRATION
 * ============================================================================
 * 
 * Educational Component contrasting the three primary forms of Dependency Injection:
 * 
 * 1. Constructor Injection (PREFERRED & INDUSTRY BEST PRACTICE):
 *    - All dependencies are marked 'final', ensuring immutability.
 *    - Makes dependencies explicit and guarantees that the object is in a valid state
 *      upon creation.
 *    - Allows simple POJO unit testing without needing reflection, Spring Runner, or @MockBean.
 *    - Since Spring 4.3+, @Autowired is optional if there is a single constructor.
 * 
 * 2. Field Injection via @Autowired (LEGACY / COURSE MATERIAL PATTERN):
 *    - Injected directly into private fields using Java Reflection.
 *    - Violates encapsulation; hides required dependencies from callers.
 *    - Harder to unit-test outside the Spring container.
 * 
 * 3. Setter Injection:
 *    - Used primarily for optional dependencies or post-construction reconfiguration.
 * ============================================================================
 */
@Component
public class DependencyInjectionDemoComponent {

    private static final Logger log = LoggerFactory.getLogger(DependencyInjectionDemoComponent.class);

    // ------------------------------------------------------------------------
    // APPROACH 1: Constructor Injection (Preferred - used across CampusConnect)
    // ------------------------------------------------------------------------
    private final StudentService studentService;

    // ------------------------------------------------------------------------
    // APPROACH 2: Field Injection with @Autowired (Legacy Academic Example)
    // ------------------------------------------------------------------------
    @Autowired
    private UserRepository autowiredUserRepository;

    // ------------------------------------------------------------------------
    // APPROACH 3: Setter Injection (Optional dependencies)
    // ------------------------------------------------------------------------
    private String environmentLabel;

    @Autowired(required = false)
    public void setEnvironmentLabel() {
        this.environmentLabel = "CampusConnect Enterprise Demo v1.0";
    }

    // Preferred Constructor Injection
    public DependencyInjectionDemoComponent(StudentService studentService) {
        this.studentService = studentService;
        log.info("[IoC Demonstration] DependencyInjectionDemoComponent instantiated using Constructor Injection.");
    }

    public String getInjectionReport() {
        boolean constructorOk = (studentService != null);
        boolean fieldAutowiredOk = (autowiredUserRepository != null);

        return String.format(
            "Spring IoC Container Report:\n" +
            " - Constructor Injection (StudentService): %s [RECOMMENDED]\n" +
            " - Field @Autowired Injection (UserRepository): %s [LEGACY PATTERN]\n" +
            " - Setter Injection: %s",
            constructorOk ? "ACTIVE & INITIALIZED" : "FAILED",
            fieldAutowiredOk ? "ACTIVE & INITIALIZED" : "FAILED",
            environmentLabel
        );
    }
}
