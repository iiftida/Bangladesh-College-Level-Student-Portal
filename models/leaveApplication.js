const mongooge  = require('mongoose')

const leaveApplicationSchema = new mongooge.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    days:{
        type:Number,
        required:true,
        min: [1, 'Leave can not be less than 1 days'], 
        max: [7, 'Leave can not be greater than 7 days']
    },
    message:{
        type:String,
        required:true,
        maxlength: [200, 'Name must be less than or equal to 200 characters'] 
    }
})

module.exports = mongooge.model('Leave',leaveApplicationSchema)