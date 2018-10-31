<?php
$conn = mysqli_connect("localhost", "root", "Magojun0097!","hkimdb");
$truncate = "TRUNCATE TABLE student_grade";
$result = $conn->query($truncate);
if ($connection->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$reinsertSQL = "INSERT INTO `student_grade` (`student_id`, `student_name`, `course`, `grade`) VALUES
(default, 'Tien', 'react', 99),
(default, 'David', 'PHP', 100),
(default, 'Randy', 'Javascript', 95),
(default, 'Rachal', 'Photo Shop', 98),
(default, 'Kyle', 'Database', 78),
(default, 'Jay', 'CSS3', 100),
(default, 'Mia', 'Redux', 96),
(default, 'Esther', 'HTML5', 99),
(default, 'Jose', 'JAVA', 98),
(default, 'Diana', 'MySql', 95),
(default, 'Hanny', 'ERP', 100),
(default, 'Goeun', 'Node', 100),
(default, 'Jun', 'Data', 100),
(default, 'Jerry', 'Cplus', 92),
(default, 'Davide', 'Angular', 77),
(default, 'Keith', 'System', 84);";
$reinsertResult = $conn->query($reinsertSQL);
$conn->close();
?>