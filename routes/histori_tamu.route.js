const express = require('express');
const upload = require('../controllers/upload-cover')
let { validateTamu } = require('../middleware/tamu.validation')

const app = express()

app.use(express.json())

const tamuController = require('../controllers/histori.tamu.controller')


app.post('/api/v1/halaman/tamu',[validateTamu], [upload.single(`foto`)], tamuController.addTamu)
app.put('/api/v1/halaman/tamu/testimoni/:id', [validateTamu], tamuController.updateTamu)
app.use(express.static(__dirname))

module.exports = app