const express = require('express')
const userRouter = express.Router()
const  authMiddleware = require('../middlewares/authMiddleware')
const { getUsers } = require('../controllers/user.controller')


userRouter.get('/', authMiddleware, getUsers)


module.exports = userRouter

