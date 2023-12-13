const express = require('express');
const upload = require('../controllers/upload-foto')
const paketController = require('../controllers/paket.barang.controller')
let { validatePaket } = require('../middleware/paket.validation')
let { BasicAuth } = require('../middleware/basicauth')
let { authenticateToken } = require('../middleware/auth.middleware')

const app = express()

app.use(express.json())


app.post('/kurir', [BasicAuth], [validatePaket], [upload.single('foto')], paketController.addPaketBarang)
app.put('/kurir/konfirmasi/:id', [authenticateToken], [validatePaket], paketController.updatePaket)
app.get('/kurir/histori', [authenticateToken], paketController.getAllHistoriKurir)
app.use(express.static(__dirname))

module.exports = app