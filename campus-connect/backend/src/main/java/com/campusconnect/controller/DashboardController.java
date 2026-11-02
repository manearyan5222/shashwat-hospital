package com.campusconnect.controller;

import com.campusconnect.config.DependencyInjectionDemoComponent;
import com.campusconnect.dto.DashboardSummaryDTO;
import com.campusconnect.service.DashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;
    private final DependencyInjectionDemoComponent diDemoComponent;

    // Demonstrating Constructor-based Dependency Injection
    public DashboardController(DashboardService dashboardService, DependencyInjectionDemoComponent diDemoComponent) {
        this.dashboardService = dashboardService;
        this.diDemoComponent = diDemoComponent;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getSummary() {
        DashboardSummaryDTO summary = dashboardService.getDashboardSummary();
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/ioc-demo")
    public ResponseEntity<Map<String, String>> getDependencyInjectionDemo() {
        return ResponseEntity.ok(Map.of(
                "architectureTopic", "Spring Inversion of Control (IoC) & Dependency Injection (DI)",
                "details", diDemoComponent.getInjectionReport()
        ));
    }
}
