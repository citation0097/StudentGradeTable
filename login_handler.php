<!--login_handler.php-->
<?php
    session_start();

    $conn =mysqli_connect("localhost", "root", "root", "hkimdb");

    $email = $_POST['email'];
    $password = $_POST['password'];

    $output = new stdClass;
    $output->success = false;
    $output->loggedin = false;

    $query = "select email, name from memeberes   WHERE email='$email' 
    AND password ='$password' AND active='TRUE'";

    $result = mysqli_query($conn, $query);
    if($result){
        if(mysqli_num_rows($result)>0){
                $row = mysqli_fetch_assoc($result)
                $_SESSION['userID'] = $row['email'];
                $_SESSION['userName'] = $row['name'];
                $output->loggedin = true;
                $output->userData = $user;
                print(json_encode($output));
        }
    }else{
        print('query failed');
    }
    print(json_encode($output));


?>