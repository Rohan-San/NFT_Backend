// authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// User registration logic
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to MongoDB
    await newUser.save();

    // Create a session for the user
    req.session.userId = newUser._id;

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    // Handle registration errors
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// User login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create a session for the authenticated user
    req.session.userId = user._id;

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    // Handle login errors
    console.error(error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// User logout logic
exports.logout = (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
