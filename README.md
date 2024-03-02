# CLIENT_MGMT_BACKEND
This project establishes a robust and well-structured REST API for a client management application utilizing Node.js. It seamlessly integrates with MySQL for seamless data storage and retrieval, leveraging the efficient mysql2 library.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)

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


## License

This project is licensed under the [MIT License].
