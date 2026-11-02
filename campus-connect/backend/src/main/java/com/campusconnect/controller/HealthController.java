package com.campusconnect.controller;

import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    private final Environment environment;

    public HealthController(Environment environment) {
        this.environment = environment;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> checkHealth() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "application", "CampusConnect Backend",
                "activeProfiles", Arrays.asList(environment.getActiveProfiles()),
                "timestamp", LocalDateTime.now().toString(),
                "javaVersion", System.getProperty("java.version"),
                "server", "Embedded Apache Tomcat"
        ));
    }
}
