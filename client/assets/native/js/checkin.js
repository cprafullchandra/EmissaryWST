/**
 * @file Manages checkins.
 */

function submitForm(){
     $.post("https://slack.com/api/chat.postMessage",
     {
        'token': "xoxp-167311421539-169267386423-191140632117-5263dba19bf30c7b56274a69fade6545",
        'channel': "emissary_slack_test",
        'text': "This is a test. If you see this, it worked"
     });
}



$(document).ready(function(){

    var socket = io();

    var VALIDATE_COMPANY_ID = "validate_company_id";
    var ADD_VISITOR = "add_visitor";

    var companyData = JSON.parse(localStorage.getItem("currentCompany"));
    const myCompanyId = companyData._id;
    console.log(companyData);
    socket.emit(VALIDATE_COMPANY_ID, companyData);

    var formData = loadSavedForm(myCompanyId);
    if(formData !== null) {
        console.log(formData);
        var formOptions = {
            formData,
            dataType: 'json'
        };

        $('#check-in').formRender(formOptions);
    }

    //Prevent users from scrolling around on iPad
    document.ontouchmove = function(e) {
        e.preventDefault();
    };

    //Bind Listeners
    $('#tap-to-check').on('click', startCheckIn);
    $('.check-in').on('submit', submitForm);

    //When a user starts their check in
    /**
     * @function startCheckIn
     * @desc Starts the check in process
     */
    function startCheckIn(){
        $('.check-in').addClass('show');
        $('.check-in').animate({
            top:'10%',
            opacity: '1'
        }, 700);
        $(this).addClass('hide');
        $('#clock').addClass('hide');
    }

    /**
     * @function submitForm
     * @desc When a client submits their form
     */
    function submitForm(){
        //event.preventDefault();
        var data = grabFormElements();
        //console.log(data.company_id);
        
        //if(localStorage.getItem("slackToken")&&localStorage.getItem("slackChannel"))
        //{
             $.post("https://slack.com/api/chat.postMessage",
             {
                'token': "xoxp-167311421539-169267386423-191140632117-5263dba19bf30c7b56274a69fade6545",
                'channel': "emissary_slack_test",
                'text': "This is a test. If you see this, it worked"
             },
             function(data, status){
              });
        //}

        socket.emit(ADD_VISITOR, data);

        $(this).animate({
            top:'35%',
            opacity:'0'
        },0);

    }

    /**
     * @function grabFormElements
     * @desc Grabs elements from the check in and puts it into an object
     */
    function grabFormElements(){
        var newVisitor = {};
        newVisitor.company_id = companyData._id;
        newVisitor.first_name= $('#visitor-first').val();
        newVisitor.last_name = $('#visitor-last').val();
        newVisitor.phone_number = $('#visitor-number').val();
        newVisitor.checkin_time = new Date();
        return newVisitor;
    }

    /**
     * @function updateClock
     * @desc gives the current time
     */
    function updateClock () {
        var currentTime = new Date ( );
        var currentHours = currentTime.getHours ( );
        var currentMinutes = currentTime.getMinutes ( );
        //var currentSeconds = currentTime.getSeconds ( );
        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
        //currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

        // Convert the hours component to 12-hour format if needed
        currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

        // Convert an hours component of "0" to "12"
        currentHours = ( currentHours === 0 ) ? 12 : currentHours;

        // Compose the string for display
        var currentTimeString = currentHours + ":" + currentMinutes;

        $("#clock").html(currentTimeString);
    }
    updateClock();
    setInterval(updateClock, 60 * 1000);

    /***
     * Find a specific cookie name
     * @param cName
     * @returns {string|*}
     */
    function getCookie(cName) {
        var name = cName + '=';
        var cookieArray = document.cookie.split(';');

        for (var i = 0, len = cookieArray.length; i < len; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ')
                cookie.substring(1);
            if (cookie.indexOf(name) === 0)
                return cookie.substring(name.length, cookie.length);
        }

    }


});

function loadSavedForm(myCompanyId) {
    var url = '/api/form/template/' + myCompanyId;
    var formJSON = getFormData(url);

    //console.log(formJSON);
    if (formJSON === null) {
        return null;
    } else {
        return formJSON.template;
    }
}

function getFormData(url) {
    var json;

    $.ajax({
        dataType: 'json',
        type: 'GET',
        data: $('#response').serialize(),
        async: false,
        url: url,
        success: function (response) {
            json = response;
            //console.log(response);
        }
    });


    return json;
}
