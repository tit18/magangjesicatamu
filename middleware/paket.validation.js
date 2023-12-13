const Joi = require('joi')
const validatePaket = (request, response, next) => {
    const rules = Joi
        .object()
        .keys({
            uuid_user: Joi.string().required(),
            nama_kurir: Joi.string().required(),
            no_wa_kurir: Joi.number().optional(),
            nama_penerima: Joi.string().required(),
            tanggal_datang: Joi.string().required(),
            foto: Joi.string().allow(null),
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

const updateValidatePaket = (request, response, next) => {
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

module.exports = { validatePaket, updateValidatePaket }