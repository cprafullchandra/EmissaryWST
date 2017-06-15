/**
 * @file Manages the dashboard
 */

// Declare JQuery, Handlebars, and Socket globals
/* global $ */
/* global Handlebars */
/* global io */

$(document).ready(function(){
    let DEBUG = 1;
    let companyData = JSON.parse(localStorage.getItem("currentCompany"));
    let visitorList;

    companyData.company_id = companyData._id;


    //let curCompany = JSON.parse(localStorage.getItem('currentCompany'));
    let curUser = JSON.parse(localStorage.getItem('currentUser'));
    //let companyName = companyData.name;


    $('#user-name').text(curUser.first_name + ' ' +  curUser.last_name);

    $.ajax({
          dataType:'json',
          type: 'POST',
          data: companyData,
          url:'/api/visitorLists/validate',
          success:function(response){
            updateList(response);
          }
      });

    /**
     * Compile all the Handle Bar Templates
     */

    // DashBoard Template
    let source = $("#visitor-list-template").html();
    let template = Handlebars.compile(source);

    // Modal Template
    let modal = $('#visitor-info-template').html();
    let modalTemplate = Handlebars.compile(modal);


    /***
     * Listener for Opening a Modal
     */
    $(document).on('click','.patient-check-out',function(){
        let uniqueId = $(this).attr('value');
        let visitor = findVisitor(uniqueId);
        let compiledTemplate = modalTemplate(visitor);
        $('.modal-dialog').html(compiledTemplate);
    });

    /***
     * Listener for Checking out a Visitor
     */
    $(document).on('click','.check-in-btn',function(){
        let id = $(this).closest('.modal-content').find('.modal-body').attr('value');
        let apptId = $(this).closest('.modal-content').find('.modal-left').attr('value');
        let visitor = findVisitor(id);

        let removeVisitor = {};
        removeVisitor.visitor_id = visitor._id;
        removeVisitor.company_id = visitor.company_id;

        $.ajax({
          dataType:'json',
          type: 'DELETE',
          url:'/api/appointments/' + apptId,
          success:function(response){
          }
        });     
    });
    /***
     * @function updateList
     * @desc Add visitors to list
     * @param data returned from call
     */
    function updateList(data){
      visitorList = data.visitors;
        //Parse Visitor List to format Date
        for(var i = 0, len = visitorList.length; i< len; i++){
            visitorList[i].checkin_time = formatTime(visitorList[i].checkin_time);
        }

        //Parse Visitors appoitments
        for(i = 0; i < len; i++){
          var appList = visitorList[i].appointments;
          if(appList[0]){
            for(var j = 0, appLen = appList.length; j < appLen; j++){
              if(compareDate(appList[j].date)){
                visitorList[i].appointmentTime = formatTime(appList[j].date);
                visitorList[i]._apptId = appList[j]._id;
                break;
              }
            }
          }
          else{
      
            visitorList[i].appointmentTime = "None";
          }
        }

       //visitorList.checkin_time = visitorList;
        var compiledHtml = template(visitorList);
        $('#visitor-list').html(compiledHtml);
    }

    /***
     * @function compareDate
     * @desc Compare appointment Date to today's Date
     * @param {obj} appointment object
     * @returns {boolean} If appointment date is equal to today's date
     */
    function compareDate(appointment){
        let today = new Date();
        appointment = new Date(Date.parse(appointment));

        let appointmentDate = appointment.getFullYear() + ' ' + appointment.getDate() + ' ' + appointment.getMonth();
        let todayDate = today.getFullYear() + ' ' + today.getDate() + ' ' + today.getMonth();

        return (appointmentDate === todayDate);
    }

    /**
     * @function findvistor
     * @desc Find Specific Visitor Given Visitor ID within the Visitor Array
     * @param {string} Name of visitor.
     * @returns {string} Visitor
     */
    function findVisitor(id){

        for(let visitor in visitorList) {
            if(visitorList.hasOwnProperty(visitor)){
                if(visitorList[visitor]._id === id){
                    if(DEBUG) console.log(visitorList[visitor]);
                    return visitorList[visitor];
                }
            }
        }
    }

    /***
     * Function to format a JSON date object into a string
     * @param time
     */
    function formatTime(time){
        let currentTime = new Date(Date.parse(time));
        let hour = currentTime.getHours();
        let minute = currentTime.getMinutes();

        if(minute < 10) {
            minute = '0' + minute;
        }

        if(hour >= 13){
            hour = hour-12;
            currentTime = hour + ':' + minute + 'PM';
        }

        else if(hour === 12){
            currentTime = hour + ':' + minute +'PM';
        }
        else if(hour === 0){
            currentTime = 1 + ':' + minute + 'AM';
        }
        else{
            currentTime = hour + ':' + minute +'AM';
        }

        return currentTime;

    }

    $('#logoutButton').on('click',function(){
        localStorage.setItem('userState',0);
    });


    /***
     * TODO order the list by increasing order
     * @param key
     */
    /*
    function increasingOrder(key){

    }
    */

    /***
     * TODO order the list by decreasing order
     * @param key
     */
    /*
    function decreasingOrder(key){

    }
    */

});
