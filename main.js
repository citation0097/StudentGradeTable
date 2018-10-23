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
 * data object
 * @type {Array}
 */
var student_array = [];
var data_object = {};


/***************************************************************************************************
* initializeApp 
* @params {undefined} none
* @returns: {undefined} none
* initializes the application, including adding click handlers and pulling in any data from the server, in later versions
*/
function initializeApp(){
    addClickHandlersToElements();
    readDataFromSGT();      
}

/***************************************************************************************************
* addClickHandlerstoElements
* @params {undefined} 
* @returns  {undefined}
*     
*/
function addClickHandlersToElements(){

    $("#add_btn").click( handleAddClicked );
    $(".btn-default").click( handleCancelClick );
    $("#update_btn").click( handleUpdateClicked );
}

/***************************************************************************************************
 * handleAddClicked - Event Handler when user clicks the add button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleAddClicked(){
    addStudent();
}

/***************************************************************************************************
 * handleCancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 * @param: {undefined} none
 * @returns: {undefined} none
 * @calls: clearAddStudentFormInputs
 */
function handleCancelClick(){
    clearAddStudentFormInputs();
} 

/***************************************************************************************************
 * handleUpdateClicked - Event Handler when user clicks the update button
 * @param {object} event  The event object from the click
 * @return: 
       none
 */
function handleUpdateClicked(){    
    updateStudent();
    
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
 * errorMsg - error message show with modal 
 * @param response: message
 */
function errorMsg( response){
    $(".modal-body > p").text(response);
    $('#errorModal').modal();
}






