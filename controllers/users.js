const User = require('../models/user')

module.exports.welcomePage = (req,res)=>{
    res.render('users/welcome')
}

module.exports.loginPage = (req,res)=>{
    res.render('users/login')
}

module.exports.dashboard = (req,res)=>{
    res.render('users/dashboard')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome Back ${req.user.username} into Collecge Portal`)
    res.redirect('/user/dashboard')
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {       //passport provide it see doc
        if (err) {
            return next(err)
        }
        req.flash('success', 'GoodBye!')
        res.redirect('/user/login')
    })
}