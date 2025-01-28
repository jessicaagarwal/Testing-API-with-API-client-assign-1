const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

// Sample student data
const students = [
    { student_id: "1", name: "Alice Johnson", total: 433 },
    { student_id: "2", name: "Bob Smith", total: 410 },
    { student_id: "3", name: "Charlie Davis", total: 415 },
    { student_id: "4", name: "David Brown", total: 390 },
    { student_id: "5", name: "Eva White", total: 450 },
    // Add more student records as needed
];

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files
app.use(express.static('static'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Endpoint to retrieve students above a given threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Input validation
    if (typeof threshold !== 'number') {
        return res.status(400).json({ error: 'Invalid input: threshold must be a number.' });
    }

    // Filter students based on the threshold
    const filteredStudents = students.filter(student => student.total > threshold);

    // Prepare response
    const response = {
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    };

    // Send response
    res.json(response);
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});