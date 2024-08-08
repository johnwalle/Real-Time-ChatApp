const { getAllUsersExceptLoggedIn } = require('../services/user.service');

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

module.exports = { getUsers };
