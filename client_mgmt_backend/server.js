const express = require('express');
const router = express.Router();
const getPool = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

app.use(cors());

// Get all clients
app.get('/clients', async (req, res) => {
    const pool = await getPool();
    pool.query('SELECT * FROM CLIENT').then(result => {
        res.status(200).json({ clientList: result[0] });
        pool.end();
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    });
});

// Create a new client
app.post('/clients', async (req, res) => {
    const pool = await getPool();
    const { name, email, phone, address } = req.body;
    pool.query('INSERT INTO CLIENT(name, email, phone, address) VALUES (?, ?, ?, ?)', [name, email, phone, address]).then(result => {
        console.log(result);
        pool.end();
        res.status(201).json({ message: 'Client created successfully', client_id: result[0].insertId });
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    })
});

// Update a client
app.put('/clients/:clientId', async (req, res) => {
    console.log('update')
    const pool = await getPool();
    const { name, email, phone, address } = req.body;
    const clientId = req.params.clientId;
    pool.query('UPDATE Client SET name=?, email=?, phone=?, address=? WHERE client_id=?', [name, email, phone, address, clientId]).then(result => {
        pool.end();
        res.status(200).json({ message: 'Client updated successfully' });
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    });
});

// Delete a client
app.delete('/clients/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    const pool = await getPool();
    pool.query('DELETE FROM Client WHERE client_id=?', [clientId]).then(result => {
        pool.end();
        res.status(200).json({ message: 'Client deleted successfully' });
    }).catch(err => {
        console.error(err);
        res.status(500).send({ message: 'Internal server error' });
    });
});

//Meeting
// Get all meetings
app.get('/meetings', async (req, res) => {
    const pool = await getPool();
    try {
        const result = await pool.query('SELECT Meeting.*, Client.* FROM MEETING INNER JOIN CLIENT_MEETING ON MEETING.meeting_id = CLIENT_MEETING.meeting_id INNER JOIN CLIENT ON CLIENT_MEETING.client_id = CLIENT.client_id');
        pool.end();
        const meetingList = [];
        const meetingSet = {};
        result[0].forEach((meeting) => {
            const clientObj = { client_id: meeting.client_id, client_name: meeting.name };
            if (meetingSet[meeting.meeting_id]) {
                const index = meetingSet[meeting.meeting_id].index;
                meetingList[index].clientList.push(clientObj);
            } else {
                meetingSet[meeting.meeting_id] = {
                    index: meetingList.length,
                };
                const meet = {
                    meeting_id: meeting.meeting_id,
                    title: meeting.title,
                    scheduled_time: meeting.scheduled_time,
                    agenda: meeting.agenda,
                    clientList: [clientObj]
                }
                meetingList.push(meet);
            }
        })
        res.status(200).json({ meetingList: meetingList });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Create a new meeting
app.post('/meetings', async (req, res) => {
    const pool = await getPool();
    const { title, scheduled_time, agenda, clients } = req.body;
    try {
        const result = await pool.query('INSERT INTO MEETING(title, scheduled_time, agenda) VALUES (?, ?, ?)', [title, scheduled_time, agenda]);
        const meetingId = result[0].insertId;
        const promises = [];
        for (let clientId of clients) {
            promises.push(pool.query('INSERT INTO CLIENT_MEETING(client_id, meeting_id) VALUES (?, ?)', [clientId, meetingId]));
        }
        await Promise.all(promises);
        pool.end();
        res.status(200).json({ message: 'Meeting created successfully', meeting_id: meetingId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update a meeting
app.put('/meetings/:meetingId', async (req, res) => {
    const pool = await getPool();
    try {
        const { agenda, title, scheduled_time, clients } = req.body;
        const meetingId = req.params.meetingId;

        // Convert date_time to the MySQL datetime format
        const formattedDateTime = new Date(scheduled_time).toISOString();
        await pool.query('UPDATE Meeting SET scheduled_time=?, agenda=?, title=? WHERE meeting_id=?', [scheduled_time, agenda, title, meetingId]);
        const promises = [];
        for (let clientId of clients) {
            promises.push(pool.query('UPDATE IGNORE Client_Meeting SET client_id=? WHERE meeting_id=?', [clientId, meetingId]));
        };
        await Promise.all(promises);
        pool.end();
        res.status(200).json({ message: 'Meeting updated successfully',meeting_id: meetingId});

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }

});

// Delete a meeting
app.delete('/meetings/:meetingId', async(req, res) => {
    const pool = await getPool();
    try {
        const meetingId = req.params.meetingId;
        await pool.query('DELETE FROM Client_Meeting WHERE meeting_id=?', [meetingId]);
        await pool.query('DELETE FROM Meeting WHERE meeting_id=?', [meetingId]);
        res.status(200).json({ message: 'Meeting deleted successfully', meeting_id: meetingId});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


//projects
// Get all projects
app.get('/projects', async (req, res) => {
    const pool = await getPool();
    try {
        const result = await pool.query('SELECT Project.*, Client.name AS client_name FROM Project INNER JOIN Client ON Project.client_id = Client.client_id');
        res.status(200).json({ projectList: result[0] });
        pool.end();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Create a new project
app.post('/projects', async (req, res) => {
    const { clientId, name, description, startDate, endDate, status } = req.body;
    try {
        const pool = await getPool();
        const result = await pool.query('INSERT INTO Project(client_id, name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?, ?)', [clientId, name, description, startDate, endDate, status]);
        pool.end();
        res.status(201).json({ message: 'Project created successfully', project_id: result[0].insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Update a project
app.put('/projects/:projectId', async (req, res) => {
    const { name, description, status,startDate,endDate,clientId } = req.body;
    const projectId = req.params.projectId;
    try {
        const pool = await getPool();
        await pool.query('UPDATE Project SET client_id=?, name=?, description=?, start_date=?, end_date=?, status=? WHERE project_id=?', [clientId, name, description, startDate, endDate, status, projectId]);
        pool.end();
        res.status(200).json({ message: 'project updated successfully',project_id: projectId});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Delete a project
app.delete('/projects/:projectId', async(req, res) => {
    const projectId = req.params.projectId;
    try {
        const pool = await getPool();
        await pool.query('DELETE FROM Project WHERE project_id=?', [projectId]);
        res.status(200).json({ message: 'project deleted successfully', project_id: projectId});
        pool.end();
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
// Start the server
const PORT = process.env.PORT || 3000; // Use the port specified in the environment variable PORT, or default to 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
