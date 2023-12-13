const Joi = require('joi')
const validateTamu = (request, response, next) => {
    const rules = Joi
        .object()
        .keys({
            nama_pengunjung: Joi.string().required(),
            uuid_user: Joi.string().required(),
            asal_instansi: Joi.string().optional(),
            nama_dituju: Joi.string().required(),
            keperluan: Joi.string().required(),
            jumlah_tamu: Joi.number().required(),
            janjian: Joi.boolean().required(),
            tanggal_masuk: Joi.string().required(),
            testimoni: Joi.string().optional(),
            no_wa_pengunjung: Joi.number().required(),
            foto: Joi.string().allow(null),
            diterima_oleh: Joi.string().optional(),
            tanggal_keluar: Joi.string().optional()

        })
        .options({ abortEarly: false })
        console.log (request.body)
    let { error } = rules.validate(request.body)
    if (error != null) {
        let errMessage = error.details.map(it => it.message).join(",")
        return response.status(422).json({
            succes: false,
            message: errMessage
        })
    }
    next()
}


const updateValidateTamu = (request, response, next) => {
    const rules = Joi
        .object()
        .keys({
            tanggal_pengambilan: Joi.string().optional(),
            status: Joi.boolean().optional()

        })
        .options({ abortEarly: false })

    let { error } = rules.validate(request.body)
    if (error != null) {
        let errMessage = error.details.map(it => it.message).join(",")
        return response.status(422).json({
            succes: false,
            message: errMessage
        })
    }

    next()
}

module.exports = { validateTamu, updateValidateTamu}