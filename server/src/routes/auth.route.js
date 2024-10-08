const express = require('express')
const router = express.Router();
const { loginUser, signUpUser } = require('../controllers/auth.controller')


router.post('/login', loginUser);
router.post('/signup', signUpUser);

module.exports = router;