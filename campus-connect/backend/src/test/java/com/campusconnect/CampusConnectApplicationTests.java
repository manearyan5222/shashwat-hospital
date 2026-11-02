package com.campusconnect;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("h2")
class CampusConnectApplicationTests {

    @Test
    void contextLoads() {
        // Verifies Spring ApplicationContext boots successfully with embedded Tomcat and JPA beans
    }
}
