const { registerUser, authenticateUser } = require('../services/auth.service');
const { validatePasswordStrength } = require('../utils/validatePasswordStrength');


// controllers/userController.js

const signUpUser = async (req, res) => {
    try {
        const { username, fullName, password, confirmPassword, gender } = req.body;
        // Check if all fields are filled
        if (!username || !fullName || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: 'Please fill in all the fields.' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }

        // Validate password strength
        const passwordValidation = validatePasswordStrength(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({ errors: passwordValidation.errors });
        }

        // Register user
        const user = await registerUser({ username, fullName, password, gender });

        res.status(200).json(user);

    } catch (error) {
        console.error('Error while registering the user:', error);
        const statusCode = error.message === 'Username already taken.' ? 400 : 500;
        return res.status(statusCode).json({ error: error.message || 'Registration failed.' });
    }
};



const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if all fields are filled
        if (!username || !password) {
            return res.status(400).json({ error: 'Please fill all the fields.' });
        }

        // Authenticate user
        const user = await authenticateUser({ username, password });

        res.status(200).json(user);

    } catch (error) {
        console.error('Error while the user login:', error);
        const statusCode = error.message.startsWith('Invalid') ? 400 : 500;
        return res.status(statusCode).json({ error: error.message || 'Login failed.' });
    }
};




module.exports = {
    loginUser,
    signUpUser,
}