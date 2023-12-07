const paketModel = require('../models/index').histori_paket_barang
const Op = require('sequelize').Op
const upload = require('./upload-foto').single(`gambar`)
const {v4: uuidv4} = require('uuid');
const uuid = uuidv4();

exports.addPaketBarang = (request, response) => {
    let newPaket = {
        uuid: uuid,
        uuid_user: request.body.uuid_user,
        nama_kurir: request.body.nama_kurir,
        no_wa_kurir: request.body.no_wa_kurir,
        nama_penerima: request.body.nama_penerima,
        tanggal_datang: request.body.tanggal_datang,
        tanggal_pengambilan: request.body.tanggal_pengambilan,
        foto: request.body.foto,
        status: request.body.status
    }

    paketModel.create(newPaket) 
        .then(result => {
            return response.json({
                succes: true,
                message: "Data Penerimaan paket Barang berhasil disimpan"
            })
        })
}

exports.updatePaket = (request, response) => {
    let dataPaket = {
        tanggal_pengambilan: request.body.tanggal_pengambilan,
        status: request.body.status
    }

    let idPaket = request.params.id

    paketModel.update(dataPaket, { where: { uuid: request.params.id } })
        .then(result => {
            return response.json({
                succes: true,
                message: 'Data Pengambilan Paket Barang berhasil disimpan'
            })
        })
        .catch(error => {
            return response.json({
                succes: false,
                message: error.message
            })
        })
}