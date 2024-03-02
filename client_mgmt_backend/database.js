const mysql = require('mysql2/promise');

// Create a connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     port: 3306,
//     database: 'CLIENT_MGMT'
// });

// // Connect to the database
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL server:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL server');
// });
// Create table if not exists



async function getPool() {
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: 3306,
        database: 'CLIENT_MGMT'
    });

    return pool;
}

// Get the connection
createTable();
async function createTable() {
    
    const CLIENT_QUERY =
        `CREATE TABLE IF NOT EXISTS CLIENT (
            client_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255)
        );`;
    const MEETING_QUERY = `
        CREATE TABLE IF NOT EXISTS MEETING (
            meeting_id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            scheduled_time DATETIME,
            agenda VARCHAR(255)
        );`;
    const CLIENT_MEETING_QUERY = `CREATE TABLE IF NOT EXISTS CLIENT_MEETING (
            client_id INT,
            meeting_id INT,
            FOREIGN KEY (client_id) REFERENCES CLIENT(client_id),
            FOREIGN KEY (meeting_id) REFERENCES MEETING(meeting_id),
            PRIMARY KEY (client_id, meeting_id)
        );`;
    const PROJECT_QUERY = `CREATE TABLE IF NOT EXISTS PROJECT (
            project_id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            start_date DATETIME,
            end_date DATETIME,
            status ENUM('NOT_STARTED', 'PROGRESS', 'COMPLETED'),
            client_id INT,
            FOREIGN KEY (client_id) REFERENCES CLIENT(client_id)
        );`;
    const promises = [];
    const pool = await getPool();
    for (let query of [CLIENT_QUERY, MEETING_QUERY, CLIENT_MEETING_QUERY, PROJECT_QUERY]) {
        promises.push(pool.query(query));
    }
    Promise.all(promises).then(async() => {
        console.log('Tables created successfully');
        await pool.end();
    }).catch((err) => {
        console.error('Error creating tables:', err);
    });
    
}


// Close the connection
// connection.end((err) => {
//     if (err) {
//         console.error('Error closing MySQL connection:', err.stack);
//         return;
//     }
//     console.log('MySQL connection closed');
// });

module.exports = getPool;