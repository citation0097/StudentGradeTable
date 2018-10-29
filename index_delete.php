<?php
    require_once("mysql_connect.php");
    $query = "DELETE FROM student_grade  WHERE student_id = '{$_POST['student_id']}'" ;          
    $result = mysqli_query($conn,$query);
    $output =[
        'success'=> [],
        'error'  => []
    ];
    
    if($result){
         $output['success'][] = true;
    }else{
         $output['error'][] = 'Delete fail';
    }
    
    print_r($output);
    mysqli_close($conn);

?>