//Import Resources and Libs
<<<<<<< HEAD

var Email = require('../../notification/email');
var TextModel = require('../../notification/text');

var VisitorList = require('../../models/VisitorList');
var Employee = require('../../models/Employee');
var Appointment = require('../../models/Appointment');
var Company = require('../../models/Company')
=======
let VisitorList = require('../../models/VisitorList');
let Employee = require('../../models/Employee');
let Appointment = require('../../models/Appointment');
>>>>>>> c2904a7... Fix all JSHint errors and server unit tests

/* handles route for getting the Company's visitor list */
module.exports.getCompanyVisitorListReq = function(req, res){
    let company_id = req.params.id;
    exports.getCompanyVisitorList(company_id, function(err_msg, result){
        if(err_msg) return res.status(400).json(err_msg);
        if(result  ===  null){
            result = new VisitorList();
            result.visitors = [];
            result.company_id=companyId;
            result.save(function(err){
                if(err) {
                    return res.status(400).json(err_msg);
                } else {
                    return res.status(200).json(result);
                }
            });
        } else {
            return res.status(200).json(result);
        }
    });
};


/* logic for getting the Company's visitor list */
module.exports.getCompanyVisitorList = function(company_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    VisitorList.findOne({company_id: company_id}, function(err, list){
        if(err) return callback({error: "Getting Visitor List"}, null);
        if(list === null) {
            list = new VisitorList();
            list.visitors=[];
            list.company_id = company_id;
        }
        list.save(function(err){
            if(err)return callback({error: "Error in saving"}, null);
            return callback(null, list);
        });
    });
};

/* handles route to delete visitor in the list*/
module.exports.deleteVisitorReq = function(req, res){
    let visitor_id = req.params.visitor_id;
    let company_id = req.params.company_id;
    exports.deleteVisitor(company_id, visitor_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

/* logic for deleting the visitor in the list */
module.exports.deleteVisitor = function(company_id, visitor_id, callback){
    if(!company_id)
        return callback({error: "Please send company id."}, null);
    if(!visitor_id)
        return callback({error: "Please send visitorList id."}, null);
    VisitorList.findOneAndUpdate(
        {company_id: company_id},
        {$pull: {visitors:{_id:visitor_id}}},
        {safe: true, upsert: true, new:true}, function(err, data){
            if(err) return callback({error: "Can't update list"}, null);
            return callback(null, data);
        });
};

/* clear the list */
module.exports.deleteReq = function(req, res){
    let list_id = req.params.id;
    exports.delete(list_id, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

module.exports.delete = function(list_id, callback){
    if(!list_id)
        return callback({error: "Please send list id."}, null);
    VisitorList.findOne({_id: list_id}, function(err, list){
        if(err || list === null) return callback({error: "Can't find company"}, null);
        list.visitors=[];
        list.save(function(err){
            if(err) return callback({error: "Can't save"}, null);
            return callback(null, list);
        });
    });
};
exports.validateReq = function(req, res) {
    console.log(req.body)
    exports.validate(req.body, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};
exports.validate = function(data, callback){
            
            var company_id = data.company_id;
            console.log(company_id);
            Company.findOne({_id: company_id}, function(err, c){
                if(err || !c) {
                    console.log(err);
                    console.log(c);
                    return callback({error: "An error was encountered. Could not find company."}, null);
                }

                else {
                    //socket.join(company_id);
                    exports.getCompanyVisitorList(company_id, function(err_msg, result){
                        console.log(result)
                        if(err_msg){
                            console.log('Error Getting Visitor List');
                            return callback({error: err_msg}, company_id);
                            //exports.notifyError(company_id, {error: err_msg});
                        } else {
                            return callback(null, result);
                        }

                    });
                }
            });
};
// This route will be called when a visitor checks in
<<<<<<< HEAD
exports.createReq = function(req, res) {
    console.log(req.body)
=======
module.exports.createReq = function(req, res) {
>>>>>>> c2904a7... Fix all JSHint errors and server unit tests
    exports.create(req.body, function(err_msg, result){
        if(err_msg)  return res.status(400).json(err_msg);
        return res.status(200).json(result);
    });
};

module.exports.create = function(param, callback){
    //required fields
<<<<<<< HEAD
    console.log(param)
    var company_id = param.company_id;
    var first_name = param.first_name;
    var last_name = param.last_name;
    var phone_number = param.tel;
    var checkin_time = param.checkin_time;
=======
    let company_id = param.company_id;
    let first_name = param.first_name;
    let last_name = param.last_name;
    let phone_number = param.phone_number;
    let checkin_time = param.checkin_time;
>>>>>>> c2904a7... Fix all JSHint errors and server unit tests

    //optional dic var
    let additional_info = param.additional_info;

    // find all the appointments for this visitor
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    tomorrow.setHours(0, 0, 0, 0);

    let query =
    {
        company_id: company_id,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        date: {$gte:today, $lt: tomorrow}
    };

    Appointment.find(query, function(err, appointments) {
        if(err) {
            return callback({error: "An error was encountered. Could not find appointment."}, null);
        }
<<<<<<< HEAD
        var visitor =
=======

        let visitor =
>>>>>>> c2904a7... Fix all JSHint errors and server unit tests
        {
            company_id: company_id,
            last_name: last_name,
            first_name: first_name,
            phone_number: phone_number,
            checkin_time: checkin_time,
            additional_info: additional_info,
            appointments: appointments
        };

        VisitorList.findOne(
            {company_id: company_id},
            function(err, list) {
                if(err) {
                    return callback({error: "An error was encountered. Could not find appointment."}, null);
                }

                if(list === null) {
                    list = new VisitorList();
                    list.visitors=[];
                    list.company_id = company_id;
                }
                list.visitors.push(visitor);
                list.save(function(err){
                    if(err) {
                        return callback({error: "an error in saving"}, null);
                    } else {
                        return callback(null, list);
                    }
                });
            }
        );
    });
};

