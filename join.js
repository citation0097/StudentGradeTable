
$(document).ready(function(){
    $('form').on('click', 'button', function {
        if (validateForm()){

        };
    });
});



function validateForm ( input ) {
 
    const regexUser = '/^[a-z0-9_-]{3,15}$/ig';
    const regexEmail = '/^[A-Z0-9._%+-]{2,15}@[A-Z0-9.-]{2,15}\.[A-Z]{2,5}$/ig';
    const regexPassword = '/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/';
   
    if(regexUser.test( form.fullName)){
        
    }else{
        "4-15 characters(no special characters)"
        return false;
    }    

    if(regexEmail.test(form.eMail)){
        
    }else{
        'enter a valid email address'
        return false;
    }

    if(regexPassword.test(form.passWord)){
        if(form.passWord !== form.pass1){
            "password and confirm password must be same "
        }
    }else{
        "at least 1 letter, 1 number, and at least 8 characters(no special characters)"
        return false;
    }
}    