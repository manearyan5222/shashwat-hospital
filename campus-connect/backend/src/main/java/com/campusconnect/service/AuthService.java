package com.campusconnect.service;

import com.campusconnect.dto.AuthRequest;
import com.campusconnect.dto.AuthResponse;
import com.campusconnect.dto.RegisterRequest;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.exception.DuplicateResourceException;
import com.campusconnect.model.ProfileStatus;
import com.campusconnect.model.Role;
import com.campusconnect.model.Student;
import com.campusconnect.model.User;
import com.campusconnect.repository.StudentRepository;
import com.campusconnect.repository.UserRepository;
import com.campusconnect.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    // Demonstrating Constructor-based Dependency Injection
    public AuthService(AuthenticationManager authenticationManager,
                       UserRepository userRepository,
                       StudentRepository studentRepository,
                       PasswordEncoder passwordEncoder,
                       JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        User user = userRepository.findByUsername(request.getUsername())
                .or(() -> userRepository.findByEmail(request.getUsername()))
                .orElseThrow(() -> new BadRequestException("User record could not be loaded"));

        Long studentProfileId = null;
        if (user.getRole() == Role.STUDENT) {
            Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());
            if (studentOpt.isPresent()) {
                studentProfileId = studentOpt.get().getId();
            }
        }

        return new AuthResponse(
                jwt,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getRole(),
                studentProfileId
        );
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateResourceException("Username '" + request.getUsername() + "' is already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email '" + request.getEmail() + "' is already registered");
        }

        User user = new User(
                request.getUsername(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                request.getRole() != null ? request.getRole() : Role.STUDENT
        );
        User savedUser = userRepository.save(user);

        Long studentProfileId = null;
        if (savedUser.getRole() == Role.STUDENT) {
            String studentCode = request.getStudentId() != null && !request.getStudentId().isBlank()
                    ? request.getStudentId()
                    : "STU-" + System.currentTimeMillis() % 100000;

            String[] nameParts = request.getFullName().trim().split("\\s+", 2);
            String firstName = nameParts[0];
            String lastName = nameParts.length > 1 ? nameParts[1] : "Student";

            Student student = new Student();
            student.setUser(savedUser);
            student.setStudentId(studentCode);
            student.setFirstName(firstName);
            student.setLastName(lastName);
            student.setEmail(savedUser.getEmail());
            student.setDepartment(request.getDepartment() != null ? request.getDepartment() : "General Engineering");
            student.setAcademicYear(request.getAcademicYear() != null ? request.getAcademicYear() : 1);
            student.setGpa(BigDecimal.ZERO);
            student.setProfileStatus(ProfileStatus.ACTIVE);
            student.setSkills("Java, Problem Solving");

            Student savedStudent = studentRepository.save(student);
            studentProfileId = savedStudent.getId();
        }

        String jwt = tokenProvider.generateTokenFromUsername(savedUser.getUsername(), savedUser.getRole().name());

        return new AuthResponse(
                jwt,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                savedUser.getRole(),
                studentProfileId
        );
    }
}
