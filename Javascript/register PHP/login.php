<?php
session_start();

include "connection.php";
// // Connect to DB (adjust credentials)
// $host = 'localhost';
// $dbname = 'your_database_name';
// $username = 'your_db_username';
// $password = 'your_db_password';

// try {
//     $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
//     $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch(PDOException $e) {
//     die("Database connection failed: " . $e->getMessage());
// }

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['emailLogin'] ?? '';
    $password = $_POST['passLogin'] ?? '';

    if ($email && $password) {
        $result = mysqli_query($conn, "SELECT * FROM users WHERE email = '$email'");
        if ($result && mysqli_num_rows($result) > 0) {
            $user = mysqli_fetch_assoc($result);
            if ($user) {
                if ($user['password'] == $password) { // Use password_verify() if passwords are hashed
                    $_SESSION['username'] = $user['name'];
                    $_SESSION['email'] = $user['email'];
                    $_SESSION['country'] = $user['country'];
                    $_SESSION['loggedin'] = true;

                    header("Location: profile.php"); // or any other secured page
                    exit;
                }
            } else {
                echo "Invalid email or password.";
            }
        } else {
            echo "Both fields are required.";
        }
    } else {
        echo "Invalid request.";
    }
}
