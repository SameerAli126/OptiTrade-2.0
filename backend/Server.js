// combined.js

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

// Database credentials from index.js
const pool = new Pool({
    user: 'dev',
    host: '100.70.103.46',
    database: 'OptiTrade',
    password: 'mAhGnIs763$@',
    port: 5432
});

app.use(cors());
app.use(express.json());

// Create users table
app.get("/create-table", async (req, res) => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS api_schema.users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      owner_id UUID NOT NULL DEFAULT uuid_generate_v4()
    );

    ALTER TABLE api_schema.users ENABLE ROW LEVEL SECURITY;

    CREATE POLICY select_own_data ON api_schema.users
    FOR SELECT
    USING (owner_id = owner_id);

    CREATE POLICY insert_own_data ON api_schema.users
    FOR INSERT
    WITH CHECK (true);

    CREATE POLICY update_own_data ON api_schema.users
    FOR UPDATE
    USING (owner_id = owner_id);

    CREATE POLICY delete_own_data ON api_schema.users
    FOR DELETE
    USING (owner_id = owner_id);
  `;

    try {
        await pool.query(createTableQuery);
        res.json({ message: "Users table created in api_schema or already exists." });
    } catch (err) {
        console.error("Error creating table:", err);
        res.status(500).json({ message: "Failed to create users table", error: err.message });
    }
});

// User registration
app.post("/users", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const insertUserQuery = "INSERT INTO api_schema.users (name, email, password) VALUES ($1, $2, $3) RETURNING *";

    try {
        const result = await pool.query(insertUserQuery, [name, email, hashedPassword]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).json({ message: "Failed to add user", error: err.message });
    }
});

// Get all users
app.get("/users", async (req, res) => {
    const selectUsersQuery = "SELECT id, name, email FROM api_schema.users";

    try {
        const result = await pool.query(selectUsersQuery);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error retrieving users:", err);
        res.status(500).json({ message: "Failed to retrieve users", error: err.message });
    }
});

// Check database connection
app.get("/check-connection", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({ message: "Database connection successful!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to connect to the database", error: err.message });
    }
});

// User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const selectUserQuery = "SELECT * FROM api_schema.users WHERE email = $1";

    try {
        const result = await pool.query(selectUserQuery, [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        res.status(200).json({
            message: "Login successful",
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Login failed", error: err.message });
    }
});

// Create trades table
app.get("/create-trades-table", async (req, res) => {
    const createTradesTableQuery = `
    CREATE TABLE IF NOT EXISTS api_schema.trades (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES api_schema.users(id),
      stock_symbol TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      trade_type TEXT NOT NULL CHECK (trade_type IN ('buy', 'sell')),
      price NUMERIC(10, 2) NOT NULL,
      trade_date TIMESTAMPTZ DEFAULT NOW()
    );
  `;

    try {
        await pool.query(createTradesTableQuery);
        res.json({ message: "Trades table created or already exists." });
    } catch (err) {
        console.error("Error creating trades table:", err);
        res.status(500).json({ message: "Failed to create trades table", error: err.message });
    }
});

// Execute a trade
app.post("/trade", async (req, res) => {
    const { user_id, stock_symbol, quantity, trade_type, price } = req.body;

    const insertTradeQuery = `
    INSERT INTO api_schema.trades (user_id, stock_symbol, quantity, trade_type, price)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    try {
        const result = await pool.query(insertTradeQuery, [user_id, stock_symbol, quantity, trade_type, price]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error executing trade:", err);
        res.status(500).json({ message: "Trade failed", error: err.message });
    }
});

// Get portfolio for a user
app.get("/portfolio/:userId", async (req, res) => {
    const { userId } = req.params;

    const getPortfolioQuery = `
    SELECT stock_symbol,
           SUM(CASE WHEN trade_type = 'buy' THEN quantity ELSE -quantity END) AS quantity
      FROM api_schema.trades
     WHERE user_id = $1
     GROUP BY stock_symbol
     HAVING SUM(CASE WHEN trade_type = 'buy' THEN quantity ELSE -quantity END) > 0;
  `;

    try {
        const result = await pool.query(getPortfolioQuery, [userId]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching portfolio:", err);
        res.status(500).json({ message: "Failed to retrieve portfolio", error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});