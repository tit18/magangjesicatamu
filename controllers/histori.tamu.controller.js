const tamuModel = require('../models/index').histori_tamu;
const Op = require('sequelize').Op
const upload = require(`./upload-cover`).single(`cover`)
const {v4: uuidv4} = require('uuid');
const uuid = uuidv4();

exports.getAllTamu = async (request, response) => {
    let tamu = await tamuModel.findAll()
    return response.json({
        succes:true,
        data:tamu,
        message: ''
    })
}

exports.findTamu = async (request, response) => {
    let keyword = request.body.keyword

    let tamu = await tamuModel.findAll({
        where: {
            [Op.or]: [
                { nama_pengunjung: { [Op.substring]: keyword} },
                { asal_instansi: { [Op.substring]: keyword} }
            ]
        }
    })
    return response.json({
        success: true,
        data: tamu,
        mesagge: 'Semua tamu sudah disimpan'
    })
}

exports.addTamu = (request, response) => {
    let newTamu = {
        uuid: uuid, 
        nama_pengunjung: request.body.nama_pengunjung,
        uuid_user: request.body.uuid_user,
        asal_instansi: request.body.asal_instansi,
        nama_dituju: request.body.nama_dituju,
        keperluan: request.body.keperluan,
        jumlah_tamu: request.body.jumlah_tamu,
        janjian: request.body.janjian,
        tanggal_masuk: request.body.tanggal_masuk,
        foto: request.body.foto
    }

    tamuModel.create(newTamu)
        .then(result => {
            return response.json({
                success: true,
                message:'Data kunjungan tamu berhasil disimpan'
            })
        })
}

exports.updateTamu = (request, response) => {
    let dataTamu = {
        diterima_oleh: request.body.diterima_oleh,
        tanggal_keluar: request.body.tanggal_keluar,
        testimoni: request.body.testimoni
    }

    let idTamu = request.params.id

    tamuModel.update(dataTamu, { where: { uuid: request.params.id } })
        .then(result => {
            return response.json({
                success: true,
                message: 'Data testimoni tamu berhasil disimpan'
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}