package com.campusconnect.config;

import com.campusconnect.model.*;
import com.campusconnect.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final PlacementOpportunityRepository opportunityRepository;
    private final PlacementApplicationRepository applicationRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${campusconnect.demo.admin-password:Admin@Campus2026!}")
    private String adminPassword;

    @Value("${campusconnect.demo.faculty-password:Faculty@Campus2026!}")
    private String facultyPassword;

    @Value("${campusconnect.demo.student-password:Student@Campus2026!}")
    private String studentPassword;

    public DataInitializer(UserRepository userRepository,
                           StudentRepository studentRepository,
                           CourseRepository courseRepository,
                           EnrollmentRepository enrollmentRepository,
                           PlacementOpportunityRepository opportunityRepository,
                           PlacementApplicationRepository applicationRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.opportunityRepository = opportunityRepository;
        this.applicationRepository = applicationRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("[DataInitializer] Database already contains records. Skipping seed data population.");
            return;
        }

        log.info("[DataInitializer] Initializing demo users, students, courses, enrollments, and placements...");

        // 1. Create Users with configurable credentials from environment
        String adminHash = passwordEncoder.encode(adminPassword);
        String facultyHash = passwordEncoder.encode(facultyPassword);
        String studentHash = passwordEncoder.encode(studentPassword);

        User adminUser = userRepository.save(new User("admin", "admin@campusconnect.edu", adminHash, "Dr. Sarah Mitchell", Role.ADMIN));
        User faculty1 = userRepository.save(new User("prof_john", "john.doe@campusconnect.edu", facultyHash, "Prof. John Doe", Role.FACULTY));
        User faculty2 = userRepository.save(new User("prof_alan", "alan.turing@campusconnect.edu", facultyHash, "Prof. Alan Turing", Role.FACULTY));

        User stuUser1 = userRepository.save(new User("alex_chen", "alex.chen@campusconnect.edu", studentHash, "Alex Chen", Role.STUDENT));
        User stuUser2 = userRepository.save(new User("priya_sharma", "priya.sharma@campusconnect.edu", studentHash, "Priya Sharma", Role.STUDENT));
        User stuUser3 = userRepository.save(new User("marcus_vance", "marcus.vance@campusconnect.edu", studentHash, "Marcus Vance", Role.STUDENT));
        User stuUser4 = userRepository.save(new User("ananya_iyer", "ananya.iyer@campusconnect.edu", studentHash, "Ananya Iyer", Role.STUDENT));
        User stuUser5 = userRepository.save(new User("david_kim", "david.kim@campusconnect.edu", studentHash, "David Kim", Role.STUDENT));

        // 2. Create Student Profiles
        Student s1 = new Student("STU-2024-001", "Alex", "Chen", "alex.chen@campusconnect.edu", "Computer Science", 4, new BigDecimal("3.85"), "Java, Spring Boot, React, Docker, PostgreSQL");
        s1.setUser(stuUser1);
        s1 = studentRepository.save(s1);

        Student s2 = new Student("STU-2024-002", "Priya", "Sharma", "priya.sharma@campusconnect.edu", "Computer Science", 4, new BigDecimal("3.92"), "Python, Machine Learning, Java, React, SQL");
        s2.setUser(stuUser2);
        s2 = studentRepository.save(s2);

        Student s3 = new Student("STU-2024-003", "Marcus", "Vance", "marcus.vance@campusconnect.edu", "Information Technology", 3, new BigDecimal("3.45"), "JavaScript, Node.js, HTML/CSS, React, MongoDB");
        s3.setUser(stuUser3);
        s3 = studentRepository.save(s3);

        Student s4 = new Student("STU-2024-004", "Ananya", "Iyer", "ananya.iyer@campusconnect.edu", "Electronics & Comm", 4, new BigDecimal("3.78"), "Embedded C, IoT, Python, Java, System Design");
        s4.setUser(stuUser4);
        s4 = studentRepository.save(s4);

        Student s5 = new Student("STU-2024-005", "David", "Kim", "david.kim@campusconnect.edu", "Computer Science", 2, new BigDecimal("3.60"), "Java, Data Structures, Git, Web Basics");
        s5.setUser(stuUser5);
        s5 = studentRepository.save(s5);

        Student s6 = new Student("STU-2024-006", "Rohan", "Verma", "rohan.verma@campusconnect.edu", "Information Technology", 4, new BigDecimal("3.20"), "PHP, MySQL, HTML5, Bootstrap, QA Testing");
        s6 = studentRepository.save(s6);

        // 3. Create Courses
        Course c1 = courseRepository.save(new Course("CS-301", "Enterprise Java & Spring Boot", "Comprehensive course covering OOP, Spring MVC, REST APIs, JPA, and cloud deployment.", "Computer Science", 4, "Prof. John Doe", 45, "Fall 2026"));
        Course c2 = courseRepository.save(new Course("CS-305", "Database Systems & SQL Optimization", "Relational database architecture, normalization, indexing, JDBC internals, and transactions.", "Computer Science", 3, "Prof. Alan Turing", 40, "Fall 2026"));
        Course c3 = courseRepository.save(new Course("IT-204", "Modern Full-Stack Web Development", "React.js, component architecture, state management, HTTP communication, and modern UI design.", "Information Technology", 4, "Prof. John Doe", 50, "Fall 2026"));
        Course c4 = courseRepository.save(new Course("EC-410", "Cloud Computing & Microservices", "Distributed systems design, REST contract design, containerization, and monitoring.", "Electronics & Comm", 3, "Dr. Sarah Mitchell", 35, "Fall 2026"));

        // 4. Create Enrollments
        enrollmentRepository.save(new Enrollment(s1, c1, LocalDate.of(2026, 8, 15), "A", EnrollmentStatus.COMPLETED));
        enrollmentRepository.save(new Enrollment(s1, c2, LocalDate.of(2026, 8, 15), "A-", EnrollmentStatus.COMPLETED));
        enrollmentRepository.save(new Enrollment(s1, c3, LocalDate.of(2026, 9, 1), "IP", EnrollmentStatus.ENROLLED));

        enrollmentRepository.save(new Enrollment(s2, c1, LocalDate.of(2026, 8, 15), "A", EnrollmentStatus.COMPLETED));
        enrollmentRepository.save(new Enrollment(s2, c2, LocalDate.of(2026, 8, 15), "A", EnrollmentStatus.COMPLETED));

        enrollmentRepository.save(new Enrollment(s3, c3, LocalDate.of(2026, 9, 1), "B+", EnrollmentStatus.ENROLLED));
        enrollmentRepository.save(new Enrollment(s4, c1, LocalDate.of(2026, 8, 15), "A-", EnrollmentStatus.COMPLETED));
        enrollmentRepository.save(new Enrollment(s4, c4, LocalDate.of(2026, 9, 1), "IP", EnrollmentStatus.ENROLLED));
        enrollmentRepository.save(new Enrollment(s5, c1, LocalDate.of(2026, 9, 5), "IP", EnrollmentStatus.ENROLLED));
        enrollmentRepository.save(new Enrollment(s6, c3, LocalDate.of(2026, 9, 5), "B", EnrollmentStatus.ENROLLED));

        // 5. Create Placement Opportunities
        PlacementOpportunity p1 = opportunityRepository.save(new PlacementOpportunity(
                "Google Cloud Labs", "Associate Cloud Software Engineer",
                "Design and implement resilient backend microservices in Java/Go. Work with distributed databases.",
                "Computer Science, Information Technology", new BigDecimal("3.70"), new BigDecimal("18.50"),
                "Bangalore / Hybrid", LocalDate.now().plusMonths(2), OpportunityStatus.OPEN));

        PlacementOpportunity p2 = opportunityRepository.save(new PlacementOpportunity(
                "Oracle Corporation", "Java Systems Developer",
                "Develop enterprise application components, high-throughput database drivers, and cloud middleware.",
                "Computer Science, Information Technology, Electronics & Comm", new BigDecimal("3.40"), new BigDecimal("14.00"),
                "Hyderabad", LocalDate.now().plusMonths(1), OpportunityStatus.OPEN));

        PlacementOpportunity p3 = opportunityRepository.save(new PlacementOpportunity(
                "Microsoft IDC", "Full-Stack Developer Intern",
                "Build modern customer-facing web apps with React, TypeScript, and Java microservice backends.",
                "Computer Science, Information Technology", new BigDecimal("3.60"), new BigDecimal("16.00"),
                "Noida / Bangalore", LocalDate.now().plusMonths(2), OpportunityStatus.OPEN));

        PlacementOpportunity p4 = opportunityRepository.save(new PlacementOpportunity(
                "Infosys Technologies", "Systems Engineer Specialist",
                "End-to-end enterprise digital transformation, API integration, and database operations.",
                "Computer Science, Information Technology, Electronics & Comm", new BigDecimal("3.00"), new BigDecimal("7.50"),
                "Pune", LocalDate.now().minusWeeks(2), OpportunityStatus.CLOSED));

        // 6. Create Placement Applications
        applicationRepository.save(new PlacementApplication(s1, p1, LocalDate.now().minusWeeks(3), ApplicationStatus.SHORTLISTED, "Coding round cleared with 100% test cases passed."));
        applicationRepository.save(new PlacementApplication(s1, p2, LocalDate.now().minusWeeks(2), ApplicationStatus.INTERVIEWING, "Technical Round 1 scheduled for next Monday."));
        applicationRepository.save(new PlacementApplication(s2, p1, LocalDate.now().minusWeeks(3), ApplicationStatus.SELECTED, "Offered role with 18.5 LPA package. Acceptance received."));
        applicationRepository.save(new PlacementApplication(s2, p3, LocalDate.now().minusWeeks(2), ApplicationStatus.SHORTLISTED, "Resume shortlisted by engineering panel."));
        applicationRepository.save(new PlacementApplication(s3, p3, LocalDate.now().minusWeeks(1), ApplicationStatus.APPLIED, "Application under preliminary screening."));
        applicationRepository.save(new PlacementApplication(s4, p2, LocalDate.now().minusWeeks(1), ApplicationStatus.APPLIED, "Eligibility verified. Waiting for test link."));

        log.info("[DataInitializer] Demo data seeded successfully! Roles: ADMIN (admin), FACULTY (prof_john), STUDENT (alex_chen). Passwords loaded securely from environment properties.");
    }
}
