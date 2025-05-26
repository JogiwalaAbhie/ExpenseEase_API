const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Registration and Login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Admin only: Get all users
router.get('/users', authMiddleware, isAdmin, authController.getAllUsers);

// User updates (protected routes)
router.put('/update-email', authMiddleware, authController.updateEmail);
router.put('/update-username', authMiddleware, authController.updateUsername);
router.put('/change-password', authMiddleware, authController.changePassword);
router.put('/update-user', authMiddleware, authController.updateUser); // Can update both email and username
router.delete('/delete-account', authMiddleware, authController.deleteAccount);

// Forgot password (public routes, no auth required)
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword); // Use PUT since we’re updating password

module.exports = router;
