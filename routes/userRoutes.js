// user.routes.js

const express = require('express');
const router = express.Router();
const userService = require('../services/user.service'); // Adjust the path based on your project structure

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error getting users' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error getting user' });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const updatedUser = await userService.updateUserById(userId, req.body);

    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await userService.deleteUserById(userId);

    if (!deletedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
