FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN apk add --no-cache maven && mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.war app.war
COPY --from=build /app/target/classes ./target/classes
COPY --from=build /app/src/main/webapp ./src/main/webapp
RUN apk add --no-cache maven
EXPOSE 8085
CMD ["mvn", "compile", "exec:java"]
