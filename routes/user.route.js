const express = require('express');
let { BasicAuth } = require('../middleware/basicauth')
const userController = require('../controllers/user.controller')

const app = express()

app.use(express.json())



app.get('/user' ,[BasicAuth], userController.getAllUser)




module.exports = app;