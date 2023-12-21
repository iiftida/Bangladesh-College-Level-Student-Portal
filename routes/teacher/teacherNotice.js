const express = require("express");
const router = express.Router();
const teacherNoticeController = require('../../controllers/teachersNotice')

//index
router.get('/',teacherNoticeController.teacherIndex)

//new
router.get('/new',teacherNoticeController.renderNewNoticeForm)

//create
router.post('/',teacherNoticeController.createNotice)

//edit form
router.get('/:id/edit',teacherNoticeController.renderNoticeEditForm)

//edit
router.patch('/:id',teacherNoticeController.updateNotice)

//delete
router.delete('/:id',teacherNoticeController.deleteNotice)

module.exports = router