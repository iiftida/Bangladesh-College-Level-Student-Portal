const mongooge  = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongooge.Schema({
    email:{
        type:String,
        required: true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    section:{
        type:String,
        required:true
    },
    year:{
        type:String,
        required:true
    }
    //(username,salt,hash) 3 fields are here bcz of plugin
    // hash field is the password field
})

userSchema.plugin(passportLocalMongoose)    
module.exports = mongooge.model('User',userSchema)