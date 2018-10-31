<?php
    require_once("mysql_connect.php");

    print_r($_POST);
   
    $query = "DELETE FROM student_grade  WHERE student_id = '{$_POST['student_id']}'" ;          
    print_r($query); 
    $result = mysqli_query($conn,$query);
    print_r($result);
    $output =[
        'success'=> [],
        'error'  => []
    ];
    git
    if($result){
         $output['success'][] = true;
    }else{
         $output['error'][] = 'Delete fail';
    }
    
    print_r($output);
    mysqli_close($conn);

?>