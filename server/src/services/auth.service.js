// services/userService.js
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');

const avatarBaseUrl = 'https://avatar.iran.liara.run/public';

const registerUser = async ({ username, fullName, password, gender }) => {
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new Error('Username already taken.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Set profile picture based on gender
    const avatar = gender === 'male'
        ? `${avatarBaseUrl}/boy?username=${username}`
        : `${avatarBaseUrl}/girl?username=${username}`;

    // Create new user
    const newUser = await User.create({
        fullName,
        username,
        gender,
        password: hashedPassword,
        avatar,
    });

    return {
        id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        avatar: newUser.avatar,
        token: generateToken(newUser._id),
    };
};


const authenticateUser = async ({ username, password }) => {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid username.');
    }

    // Check if the password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw new Error('Invalid password.');
    }

    // Return user details and token
    return {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        avatar: user.avatar,
        token: generateToken(user._id),
    };
};

module.exports = {
    registerUser,
    authenticateUser
};
