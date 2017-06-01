const companyData = JSON.parse(localStorage.getItem("currentCompany"));
const myCompanyId = companyData._id;

var options = {
    formData: loadSavedForm(),
    subtypes: {
        text: ['datetime-local']
    },
    onSave: function (e, formData) {
        var formJSON = formatFormData(formData);
        var url = '/api/form/template';
        ajaxPut(url, formJSON);
    },
    stickyControls: {
        enable: true
    },
    sortableControls: true,
    disableInjectedStyle: false,
    disableFields: ['autocomplete'],
    defaultFields: [
        {
            "type": "header",
            "subtype": "h1",
            "label": "Check In"
        },
        {
            "type": "text",
            "required": true,
            "label": "First Name",
            "className": "form-control",
            "name": "text-1496299533016",
            "subtype": "text"
        },
        {
            "type": "text",
            "required": true,
            "label": "Last Name",
            "className": "form-control",
            "name": "text-1496299552960",
            "subtype": "text"
        },
        {
            "type": "text",
            "subtype": "tel",
            "required": true,
            "label": "Phone Number",
            "className": "form-control",
            "name": "text-1496299568961"
        },
        {
            "type": "button",
            "subtype": "submit",
            "label": "Submit",
            "className": "btn btn-primary",
            "name": "button-1496299626278",
            "style": "primary"
        }
    ]
};

function formatFormData(formData) {
    var form = {};

    form._admin_id = myCompanyId;
    form.template = formData;

    return form;
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

/**
 * @function ajaxPut
 * @param {string} url
 * @param {data} data
 * @desc Ajax function to create a POST request to server.
 */
function ajaxPut(url, data) {
    $.ajax({
        type: "PUT",
        url: url,
        data: data,
        dataType: 'json',
        success: function (response) {
            console.log("SUCCESS!" + response);
        },
        error: function (response) {
            //console.log(response);
            //alert(jQuery.parseJSON(resJSON).responseText);
            event.preventDefault();
        }
    });
}

function loadSavedForm() {
    var url = '/api/form/template/' + myCompanyId;
    var formJSON = getFormData(url);

    if (formJSON === null) {
        return null;
    } else {
        return formJSON.template;
    }
}

jQuery(function ($) {
    $('#form-builder').formBuilder(options);
});
