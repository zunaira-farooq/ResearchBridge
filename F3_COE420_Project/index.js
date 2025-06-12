const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const port = 5500;

// Serve static files from the current directory (or a subdirectory)
app.use(express.static(__dirname)); // This will serve files from the root

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MySQL using Promises
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'chiddu123', // Replace with your MySQL password
    database: 'research_bridge',
});

// Check MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Signup Route for Professors
app.post('/Profsignup', async (req, res) => {
    const { full_name, email, password, faculty_link, google_scholar, current_projects, availability } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Check if the email already exists
    const checkEmailQuery = `SELECT * FROM professors WHERE email = ?`;
    try {
        const [results] = await db.promise().query(checkEmailQuery, [email]);

        if (results.length > 0) {
            // Email already exists
            return res.status(409).send('Email already registered. Please use a different email.');
        }

        // Insert new professor record
        const sql = `INSERT INTO professors (full_name, email, password, faculty_link, google_scholar, current_projects, availability) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [full_name, email, hashedPassword, faculty_link, google_scholar, current_projects, availability];
        
        const [insertResult] = await db.promise().query(sql, values);

        // Check if the insert was successful
        if (insertResult.affectedRows > 0) {
            console.log('Professor registered successfully.');
            // Redirect to the professor dashboard after successful registration
            return res.redirect('/profDashboard.html');
        } else {
            console.log('Failed to insert new professor.');
            return res.status(500).send('Error registering professor.');
        }
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Error while processing the request.');
    }
});

// Professor Signin
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query to check if the user exists
        const [results] = await db.promise().query('SELECT * FROM professors WHERE email = ?', [email]);

        if (results.length == 0) {
            return res.status(401).send('Invalid email or password');
        }

        const professor = results[0];

        // Assuming passwords are hashed in the database
        const isMatch = await bcrypt.compare(password, professor.password);
        if (isMatch) {
            // Redirect to dashboard on successful login
            res.redirect(`/profDashboard`);
            //res.redirect(`/dashboard?professorId=${professor.id}`);
        } else {
            res.status(401).send('Invalid email or password');
        }

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Signup Route for RAs - not completed
app.post('/RAsignup', async (req, res) => {
    const { full_name, email, password, faculty_link, google_scholar, current_projects, availability } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Check if the email already exists
    const checkEmailQuery = `SELECT * FROM professors WHERE email = ?`;
    try {
        const [results] = await db.promise().query(checkEmailQuery, [email]);

        if (results.length > 0) {
            // Email already exists
            return res.status(409).send('Email already registered. Please use a different email.');
        }

        // Insert new professor record
        const sql = `INSERT INTO professors (full_name, email, password, faculty_link, google_scholar, current_projects, availability) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [full_name, email, hashedPassword, faculty_link, google_scholar, current_projects, availability];
        
        const [insertResult] = await db.promise().query(sql, values);

        // Check if the insert was successful
        if (insertResult.affectedRows > 0) {
            console.log('Professor registered successfully.');
            // Redirect to the professor dashboard after successful registration
            return res.redirect('/profDashboard.html');
        } else {
            console.log('Failed to insert new professor.');
            return res.status(500).send('Error registering professor.');
        }
    } catch (err) {
        console.error('Database query error:', err);
        return res.status(500).send('Error while processing the request.');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});