const mongooge  = require('mongoose')

const universityNoticeSchema = new mongooge.Schema({
    noticeHolder:{
        type:String,
        required:true
    },
    noticeText:{
        type:String,
        required:true
    },
    important:{
        type:Boolean,
        default:false
    },
})

module.exports = mongooge.model('UniversityNotice',universityNoticeSchema)