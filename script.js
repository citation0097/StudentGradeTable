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
    console.log(student);
    student_array.push(student);
    console.log('student_array', student_array);
    updateStudentList(student_array);
    clearAddStudentFormInputs();
}
/***************************************************************************************************
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentFormInputs(){
    // student_array.pop();
    // student = {};
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('') ;
}
/***************************************************************************************************
 * renderStudentOnDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param {object} studentObj a single student object with course, name, and grade inside
 */
function renderStudentOnDom(student_list){

    //console.log('renderStudentOnDom',student_list[0].name);

    var row = $('<tr>');
    row.attr('text' , currentRow);
    row.attr('text' , "tr" + currentRow);
    console.log('renderStudentOnDom',currentRow);
    var column = '<td>' + student_list[currentRow].name + '</td>'
        + '<td>' + student_list[currentRow].course + '</td>'
        + '<td>' + student_list[currentRow].grade + '</td>'
    var deleteBtn = $('<td>').attr('type','button').addClass('btn btn-danger');
    deleteBtn.text('Delete');
    var body = $(".table").find('tbody');
    row.append(column);
    row.append(deleteBtn);
    row.appendTo(body);

    $(".btn-danger").click( function(){
        var targetrow = $(event.currentTarget).parent();
        targetrow.remove();

    });

}

/***************************************************************************************************
 * updateStudentList - centralized function to update the average and call student list update
 * @param students {array} the array of student objects
 * @returns {undefined} none
 * @calls renderStudentOnDom, calculateGradeAverage, renderGradeAverage
 */
function updateStudentList(student_list){

    // for( var eachstudent in student_list ){
        renderStudentOnDom(student_list);
        // console.log('updateStudentList', student_list);
        // console.log('updateStudentList_eachstudent', eachstudent);
    // }
    calculateGradeAverage();
}
/***************************************************************************************************
 * calculateGradeAverage - loop through the global student array and calculate average grade and return that value
 * @param: {array} students  the array of student objects
 * @returns {number}
 */
function calculateGradeAverage(){
}
/***************************************************************************************************
 * renderGradeAverage - updates the on-page grade average
 * @param: {number} average    the grade average
 * @returns {undefined} none
 */
function renderGradeAverage(){
}





