$(document).ready(function(){
    $('form').on('click', 'button', function() {
            ajaxParams.email = $('#email').val();
            ajaxParams.password = $('#password').val();
            $.ajax(ajaxParams);
        
    });
});


var ajaxParams = {
    dataType: 'JSON',
    url: 'login_handler.php',
    method: 'post',
    data: email, password,
    success: function( response ){
        if(response.success){
            console.log("login sucess");
        }else{
            console.log("login fail");
        };
    },
    
}
