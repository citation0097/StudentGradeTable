<?php
    require_once("mysql_connect.php");

    print_r($_POST);

    $query = "UPDATE student_grade SET   course = '{$_POST['course']}', grade= '{$_POST['grade']}'   
      WHERE student_id =  '{$_POST['student_id']}' ";          
    print_r($query); 
    
    $result = mysqli_query($conn,$query);
    $output =[
        'success'=> [],
        'data'=>[],
        'error'  => []
    ];
   
   if($result){
        $output['success'][] = true;
        $output['data'][] = "'{$_POST['name']}' is updated!" ;

   }else{
        $output['error'][] = 'Update fail';
   }
   
   print_r($output);
   mysqli_close($conn);
    
  

?>