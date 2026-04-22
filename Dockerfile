# Étape 1 : Build de l'application
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2 : Image d'exécution
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Configuration système
ENV PORT=8080
EXPOSE 8080

# Lancement
ENTRYPOINT ["java", "-jar", "app.jar"]
