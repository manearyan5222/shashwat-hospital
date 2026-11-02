package com.campusconnect;

import com.campusconnect.dto.AuthRequest;
import com.campusconnect.dto.AuthResponse;
import com.campusconnect.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("h2")
class StudentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${campusconnect.demo.admin-password:Admin@Campus2026!}")
    private String adminPassword;

    @Test
    @DisplayName("GET /api/health should return UP status and Tomcat info")
    void testHealthEndpoint() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.server").value("Embedded Apache Tomcat"));
    }

    @Test
    @DisplayName("GET /api/reports/department-analytics should return JDBC report")
    void testJdbcReportEndpoint() throws Exception {
        mockMvc.perform(get("/api/reports/department-analytics"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    @DisplayName("POST /api/auth/login should return valid JWT token")
    void testLoginSuccess() throws Exception {
        AuthRequest loginRequest = new AuthRequest("admin", adminPassword);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    @DisplayName("GET /api/students should require Bearer token or return students when authenticated")
    void testGetStudentsSecured() throws Exception {
        // First authenticate
        AuthResponse auth = authService.login(new AuthRequest("admin", adminPassword));

        mockMvc.perform(get("/api/students")
                        .header("Authorization", "Bearer " + auth.getToken()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }
}
