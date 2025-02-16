<?php
// Configuration
$db_file = 'subscriptions.db';

// Create or open the database
$db = new SQLite3($db_file);

// Create the subscriptions table if it doesn't exist
$db->exec("CREATE TABLE IF NOT EXISTS subscriptions (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];

// Insert the subscription data into the database
$stmt = $db->prepare("INSERT INTO subscriptions (name, email) VALUES (:name, :email)");
$stmt->bindValue(':name', $name, SQLITE3_TEXT);
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$stmt->execute();

// Close the database connection
$db->close();

echo "Thank you for subscribing!";
?>
