#
# Build stage
#
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
COPY .env /home/app
RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM openjdk:11-jre-slim
COPY --from=build /home/app/target/sample-jar-with-dependencies.jar /usr/local/lib/sample-jar-with-dependencies.jar
COPY .env /
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/sample-jar-with-dependencies.jar"]
