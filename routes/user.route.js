const express = require('express');
let { BasicAuth } = require('../middleware/basicauth')

const app = express()

app.use(express.json())

const userController = require('../controllers/user.controller')

app.get('/user' ,[BasicAuth], userController.getAllUser)




module.exports = app;