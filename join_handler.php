<!--join_handler.php-->
<?php

$conn =mysqli_connect("localhost", "root", "root", "hkimdb");


$username = addslashes($_POST['username']);
$password = sha1($_POST['password']);
$email = addslashes($_POST['email']);

$queryexist = "SELECT `ID` FROM `users` WHERE `email`='$email' OR `username`='$username'";
$result = mysqli_query($conn, $queryexist);

if($result){
    if(mysqli_num_rows($result)>0){
        $output['error'] = 'username or email already in use';
        print( json_encode($output));
        exit();
    }else{
        $query = "INSERT INTO `members`(`ID`, `email`, `password`, `name`, `active`) 
        VALUES ( null, '$email', '$password', '$username', 1)";

        $result = mysqli_query($conn, $query);
        
        if($result){
            $output['name'] = $username;
            $output['success'] = true;
            $_SESSION['userID'] = mysqli_insert_id($conn);
            $_SESSION['username'] = $username;
          
        }else{
            $output['error'] = 'invalid user name or password';
        }
    }
}


?>



