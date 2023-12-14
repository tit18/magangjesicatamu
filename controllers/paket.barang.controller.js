const paketModel = require('../models/index').histori_paket_barang
const Op = require('sequelize').Op
const upload = require('./upload-foto').single(`gambar`)
const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/index').user
const HistoriKurir = require('../models/index').histori_paket_barang;

exports.addPaketBarang = async (request, response) => {
    const uuid = uuidv4();
    let newPaket = {
        uuid: uuid,
        uuid_user: request.body.uuid_user,
        nama_kurir: request.body.nama_kurir,
        no_wa_kurir: request.body.no_wa_kurir,
        nama_penerima: request.body.nama_penerima,
        tanggal_datang: request.body.tanggal_datang,
        tanggal_pengambilan: request.body.tanggal_pengambilan,
        foto: request.file.filename,
        status: false
    }
    try {

    const user = await userModel.findOne({ where: {uuid: request.body.uuid_user}});
    if (user == null) {
        return response.json({
            success: false,
            message: 'User penerima tidak ditemukan'
        })
    } else {
        paketModel.create(newPaket)
        .then(result => {
            return response.json({
                succes: true,
                message: "Data Penerimaan paket Barang berhasil disimpan"
            })
        }).catch(error => {
            return response.json({
                success: false, message: error
            })
        })
    }
    } catch (error) {
        console.error(error);
        console.log(paketModel);
        return response.status(500).json({ message: error });
    }

    
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

exports.getAllHistoriKurir = async (req, res, next) => {
    let { date, sort, page, quantity, search } = req.query;
    const paramQuerySQL = {};
    let limit;
    let offset;

    if (date !== '' && typeof date !== 'undefined') {
        paramQuerySQL.where = {
            tanggal_datang: { [Op.substring]: date }
        };
        if (search !== '' && typeof search !== 'undefined') {
            paramQuerySQL.where = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { nama_kurir: { [Op.substring]: search } },
                            { nama_penerima: { [Op.substring]: search } }
                        ]
                    },
                    {
                        tanggal_datang: { [Op.substring]: date }
                    }
                ]
            }
        }

    }

    if (sort !== '' && typeof sort !== 'undefined') {
        let query;
        if (sort.charAt(0) !== '-') {
            query = [[sort, 'ASC']];
        } else {
            query = [[sort.replace('-', ''), 'DESC']];
        }

        paramQuerySQL.order = query;
    }

    if (quantity !== '' && typeof quantity !== 'undefined' && page !== '' && typeof page !== 'undefined') {
        if (quantity !== '' && typeof quantity !== 'undefined') {
            limit = Number(quantity);
            paramQuerySQL.limit = limit;
        }

        if (page !== '' && typeof page !== 'undefined') {
            offset = page * limit - limit;
            paramQuerySQL.offset = offset;
        }
    } else {
        page = 1;
        limit = 50;
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
    }

    try {
        const data = await HistoriKurir.findAll(paramQuerySQL);
        const DataAll = await HistoriKurir.findAll();
        const currentPage = page;
        const totalData = DataAll.length;
        const quantityData = data.length;
        if (data) {
            res.status(200).json({
                success: true,
                data: data,
                meta: {
                    currentPage: currentPage,
                    quantity: quantityData,
                    totalData: totalData
                }
            });
        }
    } catch (err) {
        next(err);
    }
};

