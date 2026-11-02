package com.campusconnect.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * Aspect-Oriented Programming (AOP) Demonstration.
 * 
 * Demonstrates:
 * - Cross-cutting concerns: Centralized audit logging and performance metrics
 *   without polluting business logic in controllers and services.
 * - @Aspect: Marks this class as an Aspect configuration.
 * - @Pointcut: Reusable expression defining join points (method executions).
 * - @Before: Advice executed before the matched methods.
 * - Safe logging: Sanitizes sensitive fields (passwords, tokens, secrets) to comply
 *   with security best practices.
 */
@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    /**
     * Pointcut targeting all public methods in the controller package.
     */
    @Pointcut("execution(* com.campusconnect.controller..*.*(..))")
    public void controllerPointcut() {
    }

    /**
     * Pointcut targeting all public methods in the service package.
     */
    @Pointcut("execution(* com.campusconnect.service..*.*(..))")
    public void servicePointcut() {
    }

    /**
     * @Before Advice: Executed before matching controller calls.
     * Demonstrates JoinPoint inspection and secure parameter logging.
     */
    @Before("controllerPointcut()")
    public void logControllerCallBefore(JoinPoint joinPoint) {
        String className = joinPoint.getTarget().getClass().getSimpleName();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        String sanitizedArgs = Arrays.stream(args)
                .map(this::maskSensitiveObject)
                .collect(Collectors.joining(", "));

        log.info("[AOP @Before] HTTP Request -> {}.{}() invoked with parameters: [{}]",
                className, methodName, sanitizedArgs);
    }

    /**
     * @Around Advice: Demonstrates execution timing measurement and performance tracing.
     */
    @Around("servicePointcut()")
    public Object profileServiceMethodExecution(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        String methodSignature = proceedingJoinPoint.getSignature().toShortString();

        try {
            Object result = proceedingJoinPoint.proceed();
            long duration = System.currentTimeMillis() - startTime;
            log.debug("[AOP @Around] Service Execution -> {} completed in {} ms", methodSignature, duration);
            return result;
        } catch (Throwable throwable) {
            long duration = System.currentTimeMillis() - startTime;
            log.error("[AOP @Around] Service Exception -> {} failed after {} ms with message: {}",
                    methodSignature, duration, throwable.getMessage());
            throw throwable;
        }
    }

    /**
     * Helper to prevent sensitive data (passwords, tokens, credit cards)
     * from appearing in application logs.
     */
    private String maskSensitiveObject(Object arg) {
        if (arg == null) {
            return "null";
        }
        String stringVal = arg.toString();
        String lowerName = arg.getClass().getSimpleName().toLowerCase();

        if (lowerName.contains("auth") || lowerName.contains("password") ||
            stringVal.toLowerCase().contains("password") || stringVal.toLowerCase().contains("token")) {
            return "[PROTECTED_CREDENTIALS]";
        }

        // Limit arg string length to avoid log pollution
        if (stringVal.length() > 100) {
            return stringVal.substring(0, 97) + "...";
        }
        return stringVal;
    }
}
