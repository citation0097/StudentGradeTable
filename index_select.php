
<?php
    require_once("mysql_connect.php");
    
    $query = "SELECT student_id as id , student_name as name  , course, grade FROM student_grade"; 
    
    $result = mysqli_query($conn,$query);
    $output =[
        'success'=> false,
        'data' => [],
        'error'  => []
    ];
      
    if($result){
        if(mysqli_num_rows($result)> 0){
            $output['success'] = true;
            while($row = mysqli_fetch_assoc($result)){
                  $output['data'][] = $row;
            }
        }else{
             $output['error'][] = 'No data available';
        }
    }else{
          $output['error'][] = 'error with query';
    }

    $jsonOutput = json_encode($output);
    echo $jsonOutput;
    mysqli_close($conn);
?>