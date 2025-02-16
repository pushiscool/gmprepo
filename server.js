const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Create an Express app
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Create or open the database
const db = new sqlite3.Database('subscriptions.db');

// Create the subscriptions table if it doesn't exist
db.run("CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

// Handle form submission
app.post('/subscribe', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const stmt = db.prepare("INSERT INTO subscriptions (name, email) VALUES (?, ?)");
    stmt.run(name, email, function(err) {
        if (err) {
            return res.status(500).send("Error inserting subscription");
        }
        res.send("Thank you for subscribing!");
    });
    stmt.finalize();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
