/* information about jsdocs: 
* param: http://usejsdoc.org/tags-param.html#examples
* returns: http://usejsdoc.org/tags-returns.html
* 
/**
 * Listen for the document to load and initialize the application
 */
$(document).ready(initializeApp);

/**
 * Define all global variables here.
 *
 */
/***********************
 * student_array - global array to hold student objects
 * @type {Array}
 * example of student_array after input: 
 * student_array = [
 *  { name: 'Jake', course: 'Math', grade: 85 },
 *  { name: 'Jill', course: 'Comp Sci', grade: 85 }
 * ];
 */
student_array = [];

var currentRow = 0;

/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){

    $(".btn-success").click( handleAddClicked );
    $(".btn-default").click( handleCancelClick );

    $(".btn-info").click( function(){

        var data_object = { api_key: 'zgjo1f87H3' };
        var ajaxParams = {
            dataType: 'json',
            url: 'https://s-apis.learningfuze.com/sgt/get',
            method: 'post',
            success: function( response ){
                if(response.success){
                    var student_ajax_array =[];
                    // student_array = [];
                    for( var i = 0 ;  i <  response.data.length; i++) {
                        var    student = new Object();
                        student.name = response.data[i].name;
                        student.course =  response.data[i].course;
                        student.grade =  response.data[i].grade;
                        student_array.push(student);
                        updateStudentList(student_array);
                        clearAddStudentFormInputs();
                    }
                }else{
                    return false;
                };
            },
            data: data_object
        }
        $.ajax(ajaxParams);
    });
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    console.log("handleAddClicked");

    addStudent();
    currentRow++;
}
/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
}
/***************************************************************************************************
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 * @param {undefined} none
 * @return undefined
 * @calls clearAddStudentFormInputs, updateStudentList
 */
function addStudent(){
    var    student = new Object();
    student.name =  $('#studentName').val();
    student.course =  $('#course').val();
    student.grade =  $('#studentGrade').val();
    // console.log('addStudent',student);
    if (student.name === ''){ return;}
    student_array.push(student);
    updateStudentList(student_array);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('') ;
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(studentObj){

    var row = $('<tr>');
    var column = '<td>' + studentObj.name + '</td>'
        + '<td>' + studentObj.course + '</td>'
        + '<td>' + studentObj.grade + '</td>'
    var deleteBtn = $('<td>').attr('type','button').addClass('btn btn-danger');
    deleteBtn.text('Delete');
    var body = $(".table").find('tbody');
    row.append(column);
    row.append(deleteBtn);
    row.appendTo(body);

    deleteBtn.click( function(){
        // console.log('btn studentObj',studentObj);
        var stuIndex = student_array.indexOf(studentObj);
        var targetrow = $(event.currentTarget).parent();
        targetrow.remove();
        // console.log('btn delete stuIndex',stuIndex);
        student_array.splice(stuIndex,1);
        var average = calculateGradeAverage(student_array);
        renderGradeAverage(average);
    });

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student_list){
    $("tbody").empty();
    for( var i = 0 ;  i < student_list.length ; i++ ) {
        renderStudentOnDom(student_list[i]);
    }
    var average = calculateGradeAverage(student_list);
    renderGradeAverage(average);
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(student_list){
    var sum = 0;

    for( var i=0;  i < student_list.length ; i++ ){
        sum += parseInt(student_list[i].grade);
     //   console.log('student_list[i].grade',student_list[i].grade);
    }
    return parseInt(sum / (student_list.length));
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(average){
    $(".badge").text( isNaN(average) ?  0 : average );
}





