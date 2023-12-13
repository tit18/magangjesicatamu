const express = require('express');
const upload = require('../controllers/upload-foto')
const paketController = require('../controllers/paket.barang.controller')
let { validatePaket, updateValidatePaket } = require('../middleware/paket.validation')
let { BasicAuth } = require('../middleware/basicauth')
let { authenticateToken } = require('../middleware/auth.middleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/kurir', [BasicAuth], [upload.single('foto')], paketController.addPaketBarang)
app.put('/kurir/konfirmasi/:id', [authenticateToken], [updateValidatePaket], paketController.updatePaket)
app.get('/kurir/histori', [authenticateToken], paketController.getAllHistoriKurir)
app.use(express.static(__dirname))

module.exports = app