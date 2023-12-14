const tamuModel = require('../models/index').histori_tamu;
const userModel = require('../models/index').user
const Op = require('sequelize').Op
const upload = require(`./upload-cover`).single(`cover`)
const { v4: uuidv4 } = require('uuid');
const HistoriTamu = require('../models/index').histori_tamu;

exports.getAllHistoriTamu = async (req, res, next) => {
    let { date, sort, page, quantity, search } = req.query;
    const paramQuerySQL = {};
    let limit;
    let offset;

    if (date !== '' && typeof date !== 'undefined') {
        paramQuerySQL.where = {
            tanggal_masuk: { [Op.substring]: date }
        };
        if (search !== '' && typeof search !== 'undefined') {
            paramQuerySQL.where = {
                [Op.and]: [
                    {
                        [Op.or]: [
                            { nama_pengunjung: { [Op.substring]: search } },
                            { asal_instansi: { [Op.substring]: search } },
                            { nama_dituju: { [Op.substring]: search } }
                        ]
                    },
                    {
                        tanggal_masuk: { [Op.substring]: date }
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
        const data = await HistoriTamu.findAll(paramQuerySQL);
        const DataAll = await HistoriTamu.findAll();
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

// exports.findTamu = async (request, response) => {
//     let keyword = request.body.keyword

//     let tamu = await tamuModel.findAll({
//         where: {
//             [Op.or]: [
//                 { nama_pengunjung: { [Op.substring]: keyword} },
//                 { asal_instansi: { [Op.substring]: keyword} }
//             ]
//         }
//     })
//     return response.json({
//         success: true,
//         data: tamu,
//         mesagge: 'Semua tamu sudah disimpan'
//     })
// }

exports.addTamu = async (request, response) => {
    const uuid = uuidv4();
    try {
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
        no_wa_pengunjung: request.body.no_wa_pengunjung,
        foto: request.file.filename
    }
    
    const user = await userModel.findOne({ where: {uuid: request.body.uuid_user}});
    if (user == null) {
        return response.json({
            success: false,
            message: 'User penerima tidak ditemukan'
        })
    } else {
        tamuModel.create(newTamu)
        .then(result => {
            return response.json({
                success: true,
                message: 'Data kunjungan tamu berhasil disimpan'
            })
        })
        .catch(error => {
            return response.json({
                success: false, message: error
            })
        })
    }
    } catch (error) {
        console.error(error);
        console.log(tamuModel);
        return response.status(500).json({ message: error });
    }
    // tamuModel.create(newTamu)
    //     .then(result => {
    //         return response.json({
    //             success: true,
    //             message: 'Data kunjungan tamu berhasil disimpan'
    //         })
    //     })
    

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
