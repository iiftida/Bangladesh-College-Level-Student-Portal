const TeacherNotice = require('../models/teachersNotice')
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports.index = async(req,res)=>{
    const teacherNotice = await TeacherNotice.find({}).sort('-created_at')
    res.render('notice/user/teacherNotice/index',{teacherNotice})
}

module.exports.teacherIndex = async(req,res)=>{
    const teacherNotice = await TeacherNotice.find({}).sort('-created_at')
    res.render('notice/teacher/index',{teacherNotice})
}

module.exports.renderNewNoticeForm = async(req,res)=>{
    res.render('notice/teacher/new')
}

module.exports.createNotice= async(req,res)=>{
    req.body.notice.noticeHolder = req.user.firstname + " " + req.user.lastname;
    // console.log(req.body.notice)
    const teacherNotice = new TeacherNotice(req.body.notice);
    const newlyCreatedNotice = await teacherNotice.save();
    if(newlyCreatedNotice.important===true){

        const msg = {
            to: "maf181238@gmail.com",
            // to: "mfahim181238@bscse.uiu.ac.bd",
            from: "fahimarefin57@gmail.com", // Use the email address or domain you verified above
            subject: "Do not reply this mail",
            html: `<b>Hello Student's of section ${newlyCreatedNotice.section}</b><br>
                     Your course teacher ${newlyCreatedNotice.noticeHolder} just uploaded a very important announcement<br>
                     please check your portal immediately`,
          };
        
          sgMail
            .send(msg)
            .then(async (data) => {
              console.log("Email sent");
            //   console.log(data);
              req.flash("success", "Notice has been posted also email send!!");
              res.redirect("/teacher/teacherNotices");
            })
            .catch((error) => {
              console.error(error);
            });
    }else{
        req.flash("success", "Notice has been posted!!");
        res.redirect("/teacher/teacherNotices");
    }

    
}

module.exports.renderNoticeEditForm= async(req,res)=>{
    const {id} = req.params
    const notice = await TeacherNotice.findById(id)
    if(!notice){
        req.flash('error','Couldnot find that notice from teacher')
        res.redirect('/teacher/teacherNotices')
    }else{
        res.render('notice/teacher/edit', {notice})
    }
}

module.exports.updateNotice= async(req,res)=>{
    const { id } = req.params
    req.body.notice.noticeHolder = req.user.firstname + " " + req.user.lastname;
    const updatednotice = await TeacherNotice.findByIdAndUpdate(id,{ ...req.body.notice },{ runValidators: true, new: true })
    req.flash('success','Successfully Updated Your Notice')        //message key is 'success'
    res.redirect(`/teacher/teacherNotices`)   //get req by default
}

module.exports.deleteNotice= async(req,res)=>{
    const { id } = req.params
    await TeacherNotice.findByIdAndDelete(id)
    req.flash('success','Successfully Deleted A Notice')        //message key is 'success'
    res.redirect(`/teacher/teacherNotices`)   //get req by default
}