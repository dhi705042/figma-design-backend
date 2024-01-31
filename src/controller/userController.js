// controllers/userController.js
const User = require('../models/userModel');
const mongoose = require('mongoose');

const createUser = async (req, res) => {
  try {

    const reqBody = req.body;
    const newUser = await User.create(reqBody);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const userDetails = await User.findById({ _id: userId });
  
      if (!userDetails) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(userDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const updateUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, age, country } = req.body;
  
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email, age, country },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const deletedUser = await User.findByIdAndDelete({ _id: userId });
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

const aggregateUserData = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          averageAge: { $avg: '$age' },
          usersByCountry: { $addToSet: '$country' },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  aggregateUserData,
};
