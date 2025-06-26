const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');
const { verifyToken, isTeacher, isTeacherOrAdmin } = require('../middleware/auth.middleware');

// Get all notices (public route)
router.get('/', noticeController.getAllNotices);

// Get notice by ID (public route)
router.get('/:id', noticeController.getNoticeById);

// Create a new notice (teachers and admin only)
router.post('/', verifyToken, isTeacherOrAdmin, noticeController.createNotice);

// Update a notice (only by the author or admin)
router.put('/:id', verifyToken, isTeacherOrAdmin, noticeController.updateNotice);

// Delete a notice (only by the author or admin)
router.delete('/:id', verifyToken, isTeacherOrAdmin, noticeController.deleteNotice);

module.exports = router;
