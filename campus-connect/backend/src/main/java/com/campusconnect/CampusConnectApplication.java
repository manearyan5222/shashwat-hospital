package com.campusconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * CampusConnect Main Spring Boot Application.
 * 
 * Demonstrates:
 * - @SpringBootApplication: Meta-annotation combining @Configuration,
 *   @EnableAutoConfiguration, and @ComponentScan.
 * - Embedded Tomcat Server startup.
 * - Layered enterprise architecture initialization.
 */
@SpringBootApplication
public class CampusConnectApplication {

    public static void main(String[] args) {
        SpringApplication.run(CampusConnectApplication.class, args);
    }
}
