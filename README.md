# Project01-Group14

E-commerce full-stack web app (React.js + Java Spring Boot + MySQL). In the React app, when working with React lifecycle, I have used Redux to manage states and
variables from the Spring app. I utilized Axios to handle APIs and React-Bootstrap to handle the UI. On the Spring app side, I have already built it based on the MVC
model and used Spring Data JPA for CRUD operations with entities.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone [repository URL]`
1. Navigate to the project directory: `cd [project directory]`

### Using Docker Compose

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Open a terminal and navigate to the project directory.

3. Run the following command to start the project:

   ```shell
   docker-compose up
   ```

   This command will build the necessary Docker images and start the containers defined in the `docker-compose.yml` file.

4. Once the containers are up and running, you can access the project at \[http://localhost:port\] in your web browser.

## Contributing

If you would like to contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b new-feature`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin new-feature`
5. Submit a pull request
