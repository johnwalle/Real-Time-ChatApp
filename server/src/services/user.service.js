const User = require('../models/user.model');

// Service function to get all users except the logged-in user
const getAllUsersExceptLoggedIn = async (loggedUserId) => {
    try {
        // Get all users except the logged-in user
        const allUsers = await User.find({ _id: { $ne: loggedUserId } }).select("-password");
        return allUsers;
    } catch (error) {
        console.error('Error in user service:', error);
        throw new Error('Internal server error.');
    }
};

const getuser = (id) => {
    const user = User.findOne({ _id: id }).select('-password');
    return user;
}


module.exports = { getAllUsersExceptLoggedIn, getuser };
