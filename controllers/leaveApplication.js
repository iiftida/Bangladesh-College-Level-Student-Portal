const Leave = require("../models/leaveApplication");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.index = async (req, res) => {
  const allLeaveApplications = await Leave.find({});
  res.render("leaveApplication/index", { allLeaveApplications });
};

module.exports.create = async (req, res) => {
  req.body.leave.name = req.user.firstname + " " + req.user.lastname;
  req.body.leave.year = req.user.year;
  req.body.leave.section = req.user.section;
  req.body.leave.email = req.user.email;

  const leave = new Leave(req.body.leave);
  await leave.save();
  req.flash("success", "Your Form has been posted wait for response");
  res.redirect("/leaveApplications/new");
};

module.exports.newLeaveForm = (req, res) => {
  res.render("leaveApplication/new");
};

module.exports.acceptedApplication = async (req, res) => {
  const { leaveID } = req.params;
  const leaveApplciation = await Leave.findById(leaveID);
  // console.log(leaveApplciation)

  const msg = {
    to: "maf181238@gmail.com",
    from: "fahimarefin57@gmail.com", // Use the email address or domain you verified above
    subject: "Do not reply this mail",
    html: `<b>Hello ${leaveApplciation.name}</b><br>
             Your Requested for ${leaveApplciation.days} days leave.<br>
             Your request has been accepted<br>`,
  };

  sgMail
    .send(msg)
    .then(async (data) => {
      console.log("Email sent");
      console.log(data);
      const deletedApplication = await Leave.findByIdAndDelete(leaveID);
      // console.log(deletedApplication)
      req.flash("success", "You Just Accepted One Leave Application");
      res.redirect("/leaveApplications");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.rejectedApplication = async (req, res) => {
  const { leaveID } = req.params;
  const leaveApplciation = await Leave.findById(leaveID);
  const msg = {
    to: "maf181238@gmail.com",
    from: "fahimarefin57@gmail.com", // Use the email address or domain you verified above
    subject: "Do not reply this mail",
    html: `<b>Hello ${leaveApplciation.name}</b><br>
            Your Requested for ${leaveApplciation.days} days leave.<br>
            Your request has been rejected since you failed to show valid reason<br>`,
  };

  sgMail
    .send(msg)
    .then(async (data) => {
      console.log("Email sent");
      console.log(data);
      const deletedApplication = await Leave.findByIdAndDelete(leaveID);
      //   console.log(deletedApplication)
      req.flash("success", "You Just Rejected One Leave Application");
      res.redirect("/leaveApplications");
    })
    .catch((error) => {
      console.error(error);
    });
};
