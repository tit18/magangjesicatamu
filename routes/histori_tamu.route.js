const express = require('express');
const tamuController = require('../controllers/histori.tamu.controller')
const upload = require('../controllers/upload-cover')
let { validateTamu, updateValidateTamu } = require('../middleware/tamu.validation')
let { BasicAuth } = require('../middleware/basicauth')
let { authenticateToken } = require('../middleware/auth.middleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.post('/tamu', [BasicAuth], [upload.single(`foto`)],[validateTamu],  tamuController.addTamu)
app.put('/tamu/testimoni/:id', [authenticateToken], [updateValidateTamu], tamuController.updateTamu)
app.get('/tamu/histori', [authenticateToken], tamuController.getAllHistoriTamu)
app.use(express.static(__dirname))

module.exports = app