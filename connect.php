<?php
$servername = "localhost";
$username = "Bryan";
$password = "hBje_]PduD7OLYmG";
$dbname = "gp_sys";

// Create connection
$conn = new mysqli($servername, 'root', '', $dbname) or die("unable to connect to database");
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
