<?php
    require_once("mysql_connect.php");
   
    $query = "INSERT INTO student_grade (student_id , student_name, course, grade) 
    VALUES (  default , '{$_POST['name']}' , '{$_POST['course']}' , '{$_POST['grade']}' ) ";          
    print_r($query); 
    $result = mysqli_query($conn,$query);
    $output =[
        'success'=> [],
        'error'  => []
    ];
    $query_output =[];
    
    if(mysqli_affected_rows($conn)> 0){
         $output['success'][] = true;
         $new_id = mysqli_insert_id($conn);
         $query_output[] = $new_id;
    }else{
         $output['error'][] = 'Update fail';
    }

    
    print_r($query_output);
    print_r($output);
    mysqli_close($conn);

?>