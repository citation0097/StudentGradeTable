
$(document).ready(function(){
    $('form').on('click', 'button', function() {
        if (validateForm()){
            ajaxParams.emailname = $('#email').val();
            ajaxParams.password = $('#password').val();
            ajaxParams.username = $('#username').val();
            $.ajax(ajaxParams);
        };
    });
});



var ajaxParams = {
    dataType: 'JSON',
    url: 'join.php',
    method: 'post',
    data: username, password,
          email,   
    success: function( response ){
        if(response.success){
            console.log("join sucess");
        }else{
            console.log("join fail");
        };
    },
    
}

/***************************************************************************************************
 * validateForm - if input data check regex validation  
 * @param inputVal: message
 */
function validateForm ( inputVal ) {
 
    const regexUser = '/^[a-z0-9_-]{3,15}$/ig';
    const regexEmail = '/^[A-Z0-9._%+-]{2,15}@[A-Z0-9.-]{2,15}\.[A-Z]{2,5}$/ig';
    const regexPassword = '/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/';
    var  msg;
    if(regexUser.test( form.fullName)){
        
    }else{
        msg = "4-15 characters(no special characters)";
        errorMsg(msg);
        return false;
    }    

    if(regexEmail.test(form.email)){
        
    }else{
        msg = 'enter a valid email address';
        errorMsg(msg);
        return false;
    }

    if(regexPassword.test(form.password)){
        if(form.passWord !== form.pass2){
            msg = "password and confirm password must be same ";
            errorMsg(msg);
            return false;
        }
    }else{
        msg = "at least 1 letter, 1 number, and at least 8 characters(no special characters)";
        errorMsg(msg);
        return false;
    }
    return true;
}    


/***************************************************************************************************
 * errorMsg - error message show with modal 
 * @param response: message
 */
function errorMsg( response){
    $(".modal-body > p").text(response);
    $('#errorModal').modal();

}