'use strict';

var express = require('express');
var controller = require('./visitorList.controller');

var router = express.Router();
controller.ok();
router.post("/",                           controller.createReq);
router.get("/company/:id",                 controller.getCompanyVisitorListReq);
router.delete("/company/:company_id/visitor/:visitor_id", controller.deleteVisitorReq);
router.delete("/:id",                      controller.deleteReq);
router.post("/validate",						controller.validateReq);

module.exports = router;