const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

//Create a new user
router.post('/', UserController.createUser);

//Get all users
router.get('/', UserController.getAllUsers);

//Get a specific user by ID
router.get('/:id', UserController.getUserById);

//Update a user by ID
router.put('/:id', UserController.updateUserById);

//Delete a user by ID
router.delete('/:id', UserController.deleteUserById);

//Aggregate user data
router.get('/aggregate', UserController.aggregateUserData);

module.exports = router;

