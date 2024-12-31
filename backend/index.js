import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import bcrypt from 'bcrypt';
import crypto from "crypto";
import jwt from 'jsonwebtoken';

const JWT_SECRET = crypto.randomBytes(32).toString('hex');
const JWT_EXPIRATION = '1h';

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'dev',
    host: '100.70.103.46',
    database: 'OptiTrade',
    password: 'mAhGnIs763$@',
    port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/create-table', async (req, res) => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      u_name VARCHAR(100) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL, 
      u_pass TEXT NOT NULL
    );
  `;

    try {
        await pool.query(createTableQuery);
        res.json({ message: 'Users table created or already exists.' });
    } catch (err) {
        console.error('Error creating table:', err);
        res.status(500).json({ message: 'Failed to create users table', error: err.message });
    }
});

app.post('/users', async (req, res) => {
    const { u_name, email, u_pass } = req.body;
    const hashedPassword = await bcrypt.hash(u_pass, 10);
    const insertUserQuery = 'INSERT INTO users (u_name, email, u_pass) VALUES ($1, $2, $3) RETURNING *';

    try {
        const result = await pool.query(insertUserQuery, [u_name, email, hashedPassword]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding user:', err);
        res.status(500).json({ message: 'Failed to add user', error: err.message });
    }
});

app.get('/users', async (req, res) => {
    const selectUsersQuery = 'SELECT id, u_name, email FROM users';

    try {
        const result = await pool.query(selectUsersQuery);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
    }
});

app.post('/signup', async (req, res) => {
    const { u_name, email, u_pass } = req.body;

    if (!u_name || !email || !u_pass) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const userExistsQuery = 'SELECT id FROM users WHERE email = $1';
        const existingUser = await pool.query(userExistsQuery, [email]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(u_pass, 10);

        const insertUserQuery = `
          INSERT INTO users (u_name, email, u_pass)
          VALUES ($1, $2, $3)
          RETURNING id, u_name, email
      `;
        const result = await pool.query(insertUserQuery, [u_name, email, hashedPassword]);

        res.status(201).json({
            message: 'User created successfully!',
            user: result.rows[0],
        });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({
            message: 'Failed to sign up the user.',
            error: err.message,
        });
    }
});

app.post('/login', async (req, res) => {
    const { email, u_pass } = req.body;

    if (!email || !u_pass) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(userQuery, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' }); // Unauthorized
        }

        const user = result.rows[0];

        const isPasswordValid = await bcrypt.compare(u_pass, user.u_pass);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                u_name: user.u_name,
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                u_name: user.u_name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({
            message: 'Failed to log in the user.',
            error: err.message,
        });
    }
});

app.get('/check-connection', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ message: 'Database connection successful!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to connect to the database', error: err.message });
    }
});

app.delete('/delete-table', async (req, res) => {
    const deleteTableQuery = `
    DROP TABLE users; `;

    try {
        await pool.query(deleteTableQuery);
        res.json({ message: 'Users table deleted successfully, if it existed.' });
    } catch (err) {
        console.error('Error deleting table:', err);
        res.status(500).json({ message: 'Failed to delete users table', error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
