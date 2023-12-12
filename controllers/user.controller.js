const userModel = require('../models/index').user
const Op = require(`sequelize`).Op

exports.getAllUser = async (request, response) => {
    let users = await userModel.findAll()
    return response.json ({
        success: true,
        data: users,
        message: 'All user have been loaded'
    })
};