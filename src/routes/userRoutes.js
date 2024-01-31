const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

// Aggregate user data
router.get('/aggregate', UserController.aggregateUserData);

// Create a new user
router.post('/create', UserController.createUser);

// Get all users
router.get('/getAll', UserController.getAllUsers);

// Get a specific user by ID
router.get('/:id', UserController.getUserById);

// Update a user by ID
router.put('/:id', UserController.updateUserById);

// Delete a user by ID
router.delete('/:id', UserController.deleteUserById);

module.exports = router;