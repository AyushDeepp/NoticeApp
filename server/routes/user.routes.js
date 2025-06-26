const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');

// All routes are protected and require admin access
router.use(verifyToken, isAdmin);

// Get all users
router.get('/', userController.getAllUsers);

// Get users by role
router.get('/role/:role', userController.getUsersByRole);

// Create a new user
router.post('/', userController.createUser);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;
