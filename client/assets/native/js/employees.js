/**
 * @file Manages the employees.
 */
$(document).ready(function(){
    var companyData = JSON.parse(localStorage.getItem("currentCompany"));
    var myCompanyId = companyData._id;

    console.log(myCompanyId);

    var curUser = JSON.parse(localStorage.getItem('currentUser'));
    $('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);

    var employees = getEmployees();

    var source = $("#employee-list-template").html();
    var template = Handlebars.compile(source);
    var compiledHtml = template(employees);

    $("#employee-list").html(compiledHtml);
    $('#employee-form').submit(function (event) {
       submitForm();
       return false;
    });


   /**
     * @function getEmployees
     * @desc Makes a get request to display list of employees
     * @returns displays the employee list
     */
    function getEmployees() {
       var json;
       $.ajax({
           dataType: 'json',
           type: 'GET',
           data: $('#response').serialize(),
           async: false,
           url: '/api/employees/company/' + myCompanyId,
           success: function(response) {
               json = response;
               //console.log(response);
           }
       });
       return json;
   }

   /**
     * @function updateEmployeeList
     * @desc Makes a post request to update list of employees when adding a new employee
     * @param {employee} obj employee
     * @returns updates the employee list
     */
   function updateEmployeeList(obj) {
      $.ajax({
        dataType: 'json',
           type: 'POST',
           data: obj,
           async: false,
           url: '/api/employees',
           success: function(response) {
               employees.push(response);
               //console.log(response);
           }
      });
    }

     /***
     * When a patient submits their form
     * @param none
     * @returns updates the employee list
     */
    function submitForm(){
        var d = grabFormElements();
        console.log(d);
        updateEmployeeList(d);
        $("#employee-list").html(template(employees));
        document.getElementById("employee-form").reset();
        $("#myModal").modal("toggle");
    }

    /***
     * Grabs elements from the check in and puts it into an object
     * @param none
     * @returns new employee object
     */
    function grabFormElements(){
        var newEmployee = {};
        newEmployee.company_id = myCompanyId;
        newEmployee.role = "c_employee";
        newEmployee.first_name= $('#employee-first').val();
        newEmployee.last_name = $('#employee-last').val();
        newEmployee.phone_number = $('#employee-number').val();
        newEmployee.email = $('#employee-email').val();
        newEmployee.password = $('#employee-pw').val();
        newEmployee.confirm_password = $('#employee-confirm-pw').val();
        return newEmployee;
    }

     /**
     * @function findEmployee
     * @desc Find Specific Employee Given Employee ID within the Employee Array
     * @param {string} id id of employee.
     * @returns {string} Employee name
     */
    function findEmployee(id){

        for(var employee in employeeList) {
           if(employeeList.hasOwnProperty(employee)){
              if(employeeList[employee]._id === id){
                  if(DEBUG) //console.log(employeeList[employee]);
                  return employeeList[employee];
              }
           }
        }
    }

    $('#logoutButton').on('click',function(){
      localStorage.setItem('userState',0);
    });


});
