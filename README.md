# CLIENT_MGMT_BACKEND
This project establishes a robust and well-structured REST API for a client management application utilizing Node.js. It seamlessly integrates with MySQL for seamless data storage and retrieval, leveraging the efficient mysql2 library.

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage

1. Configure the necessary environment variables.
2. Start the application using `npm start`.
3. Access the application at `http://localhost:3000`.

## Features

### clients
- #### /clients
    Type(GET): get all clients
- #### /clients/:clientId
    Type(PUT): update client
- #### /clients/:clientId
    Type(DELETE) : delete client
### Meetings
- #### /meetings
 Type(GET): get all meetings
- #### /meetings/:meetingId
    Type(PUT): update Meeting
- #### /meetings/:meetingId
    Type(DELETE): delete 
### Projects
- #### /projects
    Type(GET): get all projects
- #### /projects/:projectId
    Type(PUT): update project
- #### /projects/:projectId
    Type(DELETE) : delete project

# ClientManagement

This project is an Angular application (version 17.0.4) designed for managing clients, meetings, and projects. It allows users to:

- Create new clients, meetings, and projects
- Update existing clients, meetings, and projects
- Delete clients, meetings, and projects
- This application also demonstrates the integration of Jest, a popular testing framework, with Angular, ensuring thorough application testing.

## Development server

- Run ng serve to start a development server.
- Access the application in your web browser at http://localhost:4200/.
- Any changes you make to the application's source code will be automatically reflected in the browser, streamlining the development process

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

- Run ng build to create a production-ready build of the application.
- The built files will be placed in the dist/ directory.

## Running unit tests

- Run ng test to execute unit tests using Jest.
- This ensures the functionality of individual application components.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## License

This project is licensed under the [MIT License].
