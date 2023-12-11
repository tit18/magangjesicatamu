const Joi = require('joi')
const validateTamu = (request, response, next) => {
    const rules = Joi
        .object()
        .keys({
            nama_pengunjung: Joi.string().optional(),
            uuid_user: Joi.string().optional(),
            asal_instansi: Joi.string().optional(),
            nama_dituju: Joi.string().optional(),
            keperluan: Joi.string().optional(),
            jumlah_tamu: Joi.number().optional(),
            janjian: Joi.boolean().optional(),
            tanggal_masuk: Joi.string().optional(),
            testimoni: Joi.string().optional(),
            no_wa_pengunjung: Joi.number().optional(),
            foto: Joi.string().allow(null),
            diterima_oleh: Joi.string().optional(),
            tanggal_keluar: Joi.string().optional()


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

module.exports = { validateTamu }