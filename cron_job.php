<?php
// require_once("mysql_connect.php");
$conn = mysqli_connect("localhost", "root", "Magojun0097!","hkimdb");
$truncate = "TRUNCATE TABLE student_data";
$result = $conn->query($truncate);
$reinsertSQL = "INSERT INTO `student_grade` (`student_id`, `student_name`, `course`, `grade`) VALUES
(1, 'Tien', 'react', 99),
(2, 'David', 'PHP', 100),
(3, 'Randy', 'Javascript', 95),
(4, 'Rachal', 'Photo Shop', 98),
(5, 'Kyle', 'Database', 78),
(6, 'Jay', 'CSS3', 100),
(7, 'Mia', 'Redux', 96),
(8, 'Esther', 'HTML5', 99),
(9, 'Jose', 'JAVA', 98),
(10, 'Diana', 'MySql', 95),
(11, 'Hanny', 'ERP', 100),
(12, 'Goeun', 'Node', 100),
(13, 'Jun', 'Data', 100),
(14, 'Jerry', 'Cplus', 92),
(15, 'Davide', 'Angular', 77),
(16, 'Keith', 'System', 84);";
$reinsertResult = $conn->query($reinsertSQL);
$conn->close();
?>