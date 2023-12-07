const express = require('express');
const upload = require('../controllers/upload-foto')
let { validatePaket } = require('../middleware/paket.validation')
let { BasicAuth } = require('../middleware/basicauth')
let { authenticateToken } = require('../middleware/auth.middleware')

const app = express()

app.use(express.json())

const paketController = require('../controllers/paket.barang.controller')

app.post('/api/v1/halaman/kurir', [BasicAuth], [validatePaket], [upload.single('foto')], paketController.addPaketBarang)
app.put('/api/v1/halaman/kurir/konfirmasi/:id', [authenticateToken], [validatePaket], paketController.updatePaket)
app.use(express.static(__dirname))

module.exports = app