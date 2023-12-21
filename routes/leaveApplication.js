const express = require("express");
const Leave = require("../models/leaveApplication");
const router = express.Router();
const leaveApplicationController = require('../controllers/leaveApplication') 

// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:'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'
//     }
// }))


//index
router.get("/",leaveApplicationController.index);

//create
router.post("/",leaveApplicationController.create);

//accepted Form route
router.post("/accepted/:leaveID",leaveApplicationController.acceptedApplication);

//Rejected Form route
router.get("/rejected/:leaveID",leaveApplicationController.rejectedApplication);

//new 
router.get("/new",leaveApplicationController.newLeaveForm);

module.exports = router;
