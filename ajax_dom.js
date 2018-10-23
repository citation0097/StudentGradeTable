// define ajax paramenter

var ajaxParams = {
    data: data_object,
    dataType: 'json',
    url: '',
    method: 'post',
    success: '', 
    error: ""
} 


/***************************************************************************************************
 * readDataFromSGT - call ajax to read student data
 * @param none
 * @returns {undefined} none
 * @calls  */

function readDataFromSGT(){
    
    let ajaxSelectParams = {
        data: data_object,
        dataType: 'json',
        url: 'index_select.php',
        method: 'post',
        success: getStudentList, 
        error: ""
    } 
    $.ajax(ajaxSelectParams);

}


/***************************************************************************************************
 * getStudentList - read student data from ajax
 * @param response  the ajax sucess respnse
 * @returns {undefined} none
 * @calls  */

function  getStudentList(response){
    if(response.success){
        for( let i  in  response.data) {
            let    student = {};
            student.id = response.data[i].id;
            student.name = response.data[i].name;
            student.course =  response.data[i].course;
            student.grade =  response.data[i].grade;
            student_array.push(student);
            updateStudentList();
        }
       
    }else{
        errorMsg(response.errors);
    }
}



/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(){
    $("tbody").empty();
    // console.log('updateStudentList student_array',student_array.length);
    for( let i = 0 ;  i < student_array.length ; i++ ) {
        renderStudentOnDom(student_array[i]);
    }
    let average = calculateGradeAverage(student_array);
    renderGradeAverage(average);
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    let    student = {};
    student.name =  $('#studentName').val();
    student.course =  $('#course').val();
    student.grade =  $('#studentGrade').val();
    let valid = validateData( student.name, student.course,student.grade , "parent");
    console.log('addStudent valid',valid);
    if(valid ){
        data_object.name = student.name;
        data_object.course = student.course;
        data_object.grade     = student.grade;
        ajaxParams.data = data_object;
        ajaxParams.url = 'index_insert.php';
        $.ajax(ajaxParams);   
        student_array.push(student);
        updateStudentList();
        clearAddStudentFormInputs();
    } 
           
    

}
/***************************************************************************************************
 * updateStudent - update a student info
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function updateStudent(){
    let    student = {};
    // data_object ={};
    student.student_id =  $('#studentId').val();
    student.name =  $('#updStudentName').val();
    student.course =  $('#updCourse').val();
    student.grade =  $('#updstudentGrade').val();
    let valid = validateData( student.name, student.course,student.grade , "popup");
    
    if(valid ){
        $("tbody").empty();
        data_object.student_id = student.student_id ;
        data_object.name = student.name;
        data_object.course = student.course;
        data_object.grade     = student.grade;
        ajaxParams.data = data_object;
        ajaxParams.url = 'index_update.php';
        $.ajax(ajaxParams);   
        updateStudentArray(data_object);
        
    } 
}

// /***************************************************************************************************
//  * updateStudentArray - update student_array
//  * /
 
function updateStudentArray(dataobj){
    for(let i=0; i < student_array.length; i++){
        if(student_array[i].id === dataobj.student_id){
            let index = i;
            student_array.splice(index,1,dataobj);
        }
        updateStudentList();
    }
}


/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){
    // data_object ={};
    let row = $('<tr>');
    row.attr('id', studentObj.id);
    let column = '<td>' + studentObj.name + '</td>'
        + '<td>' + studentObj.course + '</td>'
        + '<td>' + studentObj.grade + '</td>'
    var updateBtn = $('<td>').attr('type','button').addClass('btn btn-info');  
    updateBtn.text('Update');  
    var deleteBtn = $('<td>').attr('type','button').addClass('btn btn-danger');
    deleteBtn.text('Delete');
    var body = $(".table").find('tbody');
    row.append(column);
    row.append(updateBtn);
    row.append(deleteBtn);
    row.appendTo(body);
    // delete button click
    deleteBtn.click( function(){
        data_object ={};
        let stuIndex = student_array.indexOf(studentObj);
        let targetrow = $(event.currentTarget).parent();

        data_object.student_id = parseInt(targetrow.attr('id'));
        ajaxParams.url = 'index_delete.php';
        ajaxParams.data = data_object;
        $.ajax(ajaxParams);
        console.log('deleteStd',ajaxParams );
        student_array.splice(stuIndex,1);
        targetrow.remove();
        let average = calculateGradeAverage(student_array);
        renderGradeAverage(average);
    });
   // Edit button click
    updateBtn.click( function(){
        
        $('#updModal').modal();
        data_object ={};
        let stuIndex = student_array.indexOf(studentObj);
        let targetrow = $(event.currentTarget).parent();

        let student_id = parseInt(targetrow.attr('id'));
        $('#studentId').val(student_id);
        $('#updStudentName').val(targetrow[0].children[0].innerText);
        $('#updCourse').val(targetrow[0].children[1].innerText);
        $('#updstudentGrade').val(targetrow[0].children[2].innerText);
        
    });

}

/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_list){
    let sum = 0;

    for( let i=0;  i < student_list.length ; i++ ){
        sum += parseFloat(student_list[i].grade);
    }
    return parseFloat(sum / (student_list.length));
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $(".badge").text( isNaN(average) ?  0 : average );
}

/***************************************************************************************************
 * validateData - check input data is valid for student table 
 * @param students name, course, grade
 * @returns true,false 
 */
function validateData(fullName, course, grade, type){
   
    let gradeRegex= /^([0-9]|([1-9][0-9])|100)/;
    if ( fullName == ''){
        if(type==="parent"){
            // errorMsg("Name must be filled out");
            $(".student-name").addClass("has-error");
		    $(".student-icon").popover("show");
        }else{
            alert("Name must be filled out");
        }
       
        return false;
    } else{
        $(".student-name").removeClass("has-error");
		$(".student-name").addClass("has-success");
		$(".student-icon").popover("hide");
    }
    if ( course == ''){
        if(type==="parent"){
            errorMsg("Course must be filled out");
        }else{
            alert("Course must be filled out");
        }
        // console.log('validate course false');
        return false;
    }
    console.log('grade.match(gradeRegex)', grade.match(gradeRegex));
    if(!grade.match(gradeRegex)){
        if(type==="parent"){
            errorMsg("Grade Number must between 0 ~ 100");
        }else{
            alert("Grade Number must between 0 ~ 100");
        }
        return false;
    }
    return true;

}


/***************************************************************************************************
 * checkFormEntry - Function that checks each fields to ensure input is valid. Provides UX feedback
 * @param: {undefined} none
 * @returns: {undefined} none
 */
function checkFormEntry() {
	if ($("#studentName").val().length < 2) {
		$(".student-name").addClass("has-error");
		$(".student-icon").popover("show");
	} else {
		$(".student-name").removeClass("has-error");
		$(".student-name").addClass("has-success");
		$(".student-icon").popover("hide");
	}

	if ($("#studentCourse").val().length < 2) {
		$(".student-course").addClass("has-error");
		$(".course-icon").popover("show");
	} else {
		$(".student-course").removeClass("has-error");
		$(".student-course").addClass("has-success");
		$(".course-icon").popover("hide");
	}
	if ($("#studentGrade").val() === "" || $("#studentGrade").val() > 100 || isNaN($("#studentGrade").val())) {
		$(".student-grade").addClass("has-error");
		$(".grade-icon").popover("show");
	} else {
		$(".student-grade").removeClass("has-error");
		$(".student-grade").addClass("has-success");
		$(".grade-icon").popover("hide");
	}
}
