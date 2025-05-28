<?php
session_start();
include "connection.php";

if (isset($_SESSION['username'])) {
    echo $_SESSION['username'] . $_SESSION['email'] . $_SESSION['password'] . $_SESSION['country'];

    $stmt = $conn->prepare("INSERT INTO users(name, email, password, country) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $_SESSION['username'], $_SESSION['email'], $_SESSION['password'], $_SESSION['country']);
    $stmt->execute();

    header('Location:profile.php');
} else {
    echo "no data";
}
