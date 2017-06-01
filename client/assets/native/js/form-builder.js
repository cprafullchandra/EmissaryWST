const options = {
    subtypes: {
        text: ['datetime-local']
    },
    onSave: function (e, formData) {
        var formJSON = getFormData(formData);
        var url = '/api/form/template';
        ajaxPost(url, formJSON);
    },
    stickyControls: {
        enable: true
    },
    sortableControls: true,
    disableInjectedStyle: false,
    disableFields: ['autocomplete']
};

function getFormData(formdata) {
    const companyData = JSON.parse(localStorage.getItem("currentCompany"));
    const myCompanyId = companyData._id;

    var form = {};

    form._admin_id = myCompanyId;
    form.template = formdata;

    return form;

}

/**
 * @function ajaxPost
 * @param {string} url
 * @param {data} data
 * @desc Ajax function to create a POST request to server.
 */
function ajaxPost(url, data) {
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        success: function (response) {
        },
        error: function (response) {
            //console.log(response);
            //alert(jQuery.parseJSON(resJSON).responseText);
            event.preventDefault();
        }
    });
}

jQuery(function ($) {
    $('#form-builder').formBuilder(options);

});
