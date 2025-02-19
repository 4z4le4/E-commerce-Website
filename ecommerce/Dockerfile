FROM maven:3.8.4-openjdk-17-slim

WORKDIR /app

COPY . .

RUN mvn dependency:resolve

CMD ["mvn", "spring-boot:run"]



