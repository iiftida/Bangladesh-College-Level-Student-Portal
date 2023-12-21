const express = require("express");
const router = express.Router();
const teacherNoticeController = require('../controllers/teachersNotice')

//index
router.get('/',teacherNoticeController.index)

module.exports = router