const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const users = require('../controllers/users')

//welcome page
router.get('/',users.welcomePage)

//login Page
router.get('/login',users.loginPage)

//dashboard 
router.get('/dashboard',users.dashboard)

//passport.authenticate() with do the work
router.post('/login',passport.authenticate('local', { failureRedirect: '/user/login', failureFlash: true }),users.login)

//logout
router.get('/logout',users.logout)


module.exports = router