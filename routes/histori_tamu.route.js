const express = require('express');
const tamuController = require('../controllers/histori.tamu.controller')
const upload = require('../controllers/upload-cover')
let { validateTamu } = require('../middleware/tamu.validation')
let { BasicAuth } = require('../middleware/basicauth')
let { authenticateToken } = require('../middleware/auth.middleware')

const app = express()

app.use(express.json())

app.post('/tamu', [BasicAuth], [validateTamu], [upload.single(`foto`)], tamuController.addTamu)
app.put('/tamu/testimoni/:id', [authenticateToken], [validateTamu], tamuController.updateTamu)
app.get('/tamu/histori', [authenticateToken], tamuController.getAllHistoriTamu)
app.use(express.static(__dirname))

module.exports = app