# Inventory Management System

A full-stack Inventory Management System built with a React frontend and Spring Boot microservices. The application supports material and vendor management, purchase entry, and vendor-wise purchase reporting. The backend is split into independently deployable services and includes Jenkins pipeline definitions for build, test, code analysis, and Tomcat deployment.

## Features

- **Dashboard** for a quick overview of the application.
- **Material management** to work with material categories, material types, and units.
- **Vendor management** to retrieve and manage vendor information.
- **Purchase entry** with form validation and persistence of purchase records.
- **Reports** including vendor-wise purchase reporting.
- **Microservice-based backend** with separate Inventory, Material, and Vendor services.
- **REST API integration** between the React UI and Spring Boot services.
- **Automated delivery pipeline definitions** using Jenkins, Maven, SonarQube, and Apache Tomcat.
- **Testing support** with Spring Boot Test and H2 dependencies; JaCoCo is configured for coverage reporting in backend modules.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, Tailwind CSS, Lucide |
| Backend | Java, Spring Boot 2.7.3, Spring MVC, Spring Data JPA, Hibernate |
| Database | MySQL 8 |
| Testing and coverage | JUnit / Spring Boot Test, H2, JaCoCo |
| CI/CD and deployment | Jenkins, Maven, SonarQube, Apache Tomcat |
| Packaging | WAR |

## Architecture

```text
React + Vite Frontend
        |
        | REST API (Axios)
        v
Inventory Service (:8090)
        |                     |
        | REST calls           | REST calls
        v                     v
Material Service (:8089)   Vendor Service (:8087)
        |                     |
        v                     v
    materialdb             vendordb

Inventory Service -> inventorydb
```

The Inventory service consumes material-category, material-type, unit, and vendor APIs from the other services. The frontend uses the Inventory service as its configured API base URL.

## Project Structure

```text
.
├── Backend/
│   ├── InventoryManagementSystem/
│   │   ├── src/main/java/       # Controllers, services, DAO, entities and API clients
│   │   ├── src/main/resources/  # Application configuration and seed SQL
│   │   ├── src/test/            # Unit and controller tests
│   │   ├── Jenkinsfile
│   │   └── pom.xml
│   ├── MaterialService/
│   │   ├── src/
│   │   ├── Jenkinsfile
│   │   └── pom.xml
│   └── VendorService/
│       ├── src/
│       ├── Jenkinsfile
│       └── pom.xml
└── frontend/
    └── ims-frontend-master/
        ├── src/api/             # API client and inventory API functions
        ├── src/components/      # Shared layout and UI components
        ├── src/pages/           # Dashboard, Materials, Purchase Entry, Reports, Vendors
        └── package.json
```

## Prerequisites

- Java 17
- Maven 3.9+
- Node.js and npm
- MySQL 8
- Apache Tomcat (for WAR deployment)
- Jenkins and SonarQube (optional, for the CI/CD workflow)

## Local Setup

### 1. Configure MySQL

Create the databases, or enable database creation in your MySQL connection URLs:

```sql
CREATE DATABASE inventorydb;
CREATE DATABASE materialdb;
CREATE DATABASE vendordb;
```

Update each service's `src/main/resources/application.properties` with your local MySQL username and password. Do not commit real credentials.

### 2. Start the backend services

Start the services in this order so dependent APIs are available:

1. **Vendor Service** — port `8087`
2. **Material Service** — port `8089`
3. **Inventory Service** — port `8090`

From each backend service directory, run:

```bash
mvn spring-boot:run
```

Alternatively, package the service as a WAR using `mvn clean package` and deploy it to a configured Tomcat server.

### 3. Start the frontend

Open a terminal in `frontend/ims-frontend-master`.

Configure the API base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8090
```

Then run:

```bash
npm install
npm run dev
```

Use the local URL printed by Vite in the terminal to open the application.

### 4. Build the frontend

```bash
npm run build
npm run preview
```

## CI/CD

Jenkins pipeline definitions are included for the Inventory, Material, and Vendor services. The pipelines are configured to:

1. Check out source code from the configured Git repository.
2. Build the application with Maven.
3. Run tests and publish JUnit test reports.
4. Run SonarQube code analysis.
5. Deploy the generated WAR file to Apache Tomcat.

Before using the pipelines, update repository URLs, Jenkins tool names, credentials IDs, SonarQube settings, and Tomcat deployment settings for your environment. Store secrets in Jenkins Credentials rather than in source files.

## Configuration Notes

- Default service ports in the included configuration: Inventory `8090`, Material `8089`, Vendor `8087`.
- The included frontend `.env` points to `http://localhost:8090`.
- The backend configuration uses separate MySQL databases: `inventorydb`, `materialdb`, and `vendordb`.
- Local database credentials should be configured privately before running the project.
- Ensure the configured frontend API URL and backend service URLs match your actual environment.

## Future Enhancements

- Authentication and role-based authorization.
- Inventory stock-level tracking, low-stock alerts, and stock movement history.
- Pagination, filtering, and exportable reports.
- Docker Compose setup for one-command local startup.
- API documentation with OpenAPI/Swagger.
- Centralized configuration, service discovery, and resilience patterns.

## Author

CHANDAN BEHERA
Java Developer


