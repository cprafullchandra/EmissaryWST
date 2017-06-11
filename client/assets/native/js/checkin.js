/**
 * @file Manages checkins.
 */

$(document).ready(function () {

    var socket = io();

    var VALIDATE_COMPANY_ID = "validate_company_id";
    var ADD_VISITOR = "add_visitor";

    var companyData = JSON.parse(localStorage.getItem("currentCompany"));
    const myCompanyId = companyData._id;
    socket.emit(VALIDATE_COMPANY_ID, companyData);

    var formData = loadSavedForm(myCompanyId);
    var requiredFields = [{
        "type": "header",
        "subtype": "h1",
        "label": "Check In"
    }, {
        "type": "text",
        "required": true,
        "label": "First Name",
        "className": "form-control",
        "name": "first_name",
        "subtype": "text"
    }, {
        "type": "text",
        "required": true,
        "label": "Last Name",
        "className": "form-control",
        "name": "last_name",
        "subtype": "text"
    }, {
        "type": "text",
        "subtype": "tel",
        "required": true,
        "label": "Phone Number",
        "data-format": "+1 (ddd)ddd-dddd",
        "pattern": "^[\\+]1\\s[\\(]\\d{3}[\\)]\\d{3}[\\-]\\d{4}",
        "oninvalid": "setCustomValidity('Please follow the correct format (xxx)xxx-xxxx.')",
        "oninput": "setCustomValidity('')",
        "className": "form-control form-phone bfh-phone",
        "name": "tel"
    }];

    var submitButton = [{
        "type": "button",
        "subtype": "submit",
        "label": "Submit",
        "className": "btn btn-primary",
        "name": "submitForm",
        "style": "primary"
    }];

    if (formData !== null) {
        requiredFields = requiredFields.concat(JSON.parse(formData));
    }

    requiredFields = requiredFields.concat(submitButton);

    const formOptions = {
        formData: requiredFields,
        dataType: 'json'
    };

    $('#check-in').formRender(formOptions);

    // Prevent users from scrolling around on iPad
    document.ontouchmove = function (e) {
        e.preventDefault();
    };

    // Bind Listeners
    $('#tap-to-check').on('click', startCheckIn);
    $('.check-in').on('submit', submitForm);

    /**
     * @function startCheckIn
     * @desc Starts the check in process
     */
    function startCheckIn() {
        $('.check-in').addClass('show');
        $('.check-in').animate({
            top: '10%',
            opacity: '1'
        }, 700);
        $(this).addClass('hide');
        $('#clock').addClass('hide');
    }

    /**
     * @function submitForm
     * @desc When a client submits their form
     */
    function submitForm() {
        let data = grabFormElements();

        let formData = JSON.parse(JSON.stringify($("#check-in").serializeArray()));

        // Finds label for each input field and appends it to the JSON.
        for (let i = 0; i < formData.length; i++) {
            let obj = formData[i];
            let label = $("label[for='" + obj.name + "']");
            obj.title = label.text();
            console.log(obj);
        }
        // TODO: make slack integration configurable
        //if(localStorage.getItem("slackToken")&&localStorage.getItem("slackChannel"))
        //{
        let slackMessage = data.first_name + ' ' + data.last_name + ' has just checked in.';
        $.post("https://slack.com/api/chat.postMessage", {
            'token': "xoxp-167311421539-169267386423-191140632117-5263dba19bf30c7b56274a69fade6545",
            'channel': "emissary_slack_test",
            'text': slackMessage
        }, function (data, status) {
        });
        //}

        socket.emit(ADD_VISITOR, data);

        $(this).animate({
            top: '35%',
            opacity: '0'
        }, 0);
    }

    /**
     * @function grabFormElements
     * @desc Grabs elements from the check in and puts it into an object
     */
    function grabFormElements() {
        let data = $('.check-in').serializeArray();
        let newVisitor = {};
        newVisitor.company_id = companyData._id;
        newVisitor.checkin_time = new Date();
        for (let i = 0; i < data.length; i++) {
            newVisitor[data[i].name] = data[i].value;
        }
        return newVisitor;
    }

    /**
     * @function updateClock
     * @desc gives the current time
     */
    function updateClock() {
        var currentTime = new Date();
        var currentHours = currentTime.getHours();
        var currentMinutes = currentTime.getMinutes();

        // Pad the minutes and seconds with leading zeros, if required
        currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;

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

});

function loadSavedForm(myCompanyId) {
    var url = '/api/form/template/' + myCompanyId;
    var formJSON = getFormData(url);

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
        }
    });

    return json;
}
