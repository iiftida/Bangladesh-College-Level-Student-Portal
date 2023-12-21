const express = require("express");
const router = express.Router();
const universityNoticeController = require('../controllers/universityNotice')

//index
router.get('/',universityNoticeController.index)


module.exports = router