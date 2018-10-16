$(document).ready(function(){
    $('form').on('click', 'button', function() {
            ajaxParams.username = $('#email').val();
            ajaxParams.password = $('#pass').val();
            $.ajax(ajaxParams);
        
    });
});


var ajaxParams = {
    dataType: 'JSON',
    url: 'login_handler.php',
    method: 'post',
    data: username, password,
    success: function( response ){
        if(response.success){
            console.log("login sucess");
        }else{
            console.log("login fail");
        };
    },
    
}
