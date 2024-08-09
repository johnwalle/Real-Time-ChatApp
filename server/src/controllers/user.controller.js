const { getAllUsersExceptLoggedIn } = require('../services/user.service');
const User = require('../models/user.model')


const getUsers = async (req, res) => {

    
    try {
        const loggedUserId = req.user.id;

        // Use the service to get users
        const allUsers = await getAllUsersExceptLoggedIn(loggedUserId);

        return res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error in user controller:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
};

const getUserById = async (id) => {
    const user = await User.findOne({ _id: id }).select('-password');
    return user;
};



module.exports = { getUsers, getUserById };
