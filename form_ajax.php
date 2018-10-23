<!doctype html>
<html>
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <script type="text/javascript">
        
        $(document).ready(function(){
            $("button").click(sendData);
        })

        function sendData(){
            const ajaxOptions ={
                url: 'index_insert.php',
                method: 'post',
                data: {
                    name: $("#name_input").val(),
                    course: $("#course_input").val(),
                    grade: $("#grade_input").val()
                },
                success: function(response){
                    console.log('success', response);
                }
            }
            $.ajax(ajaxOptions);
        }
    </script>
</head>
<body>

<!-- <form action="" method="post"> -->
    <input type="text" name="name" id="name_input" value="hook">
    <input type="text" name="course" id="course_input" value="java">
    <input type="text" name="grade" id="grade_input" value ="100">
    <button>Submit</button>    
<!-- </form> -->
</body>
</html>