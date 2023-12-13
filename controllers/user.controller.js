const userModel = require('../models/index').user
const Op = require(`sequelize`).Op

exports.getAllUser = async (request, response) => {
    let users = await userModel.findAll()
    try {
    return response.json ({
        success: true,
        data: users,
        message: 'All user have been loaded'
    })
    } catch (error) {
        console.error(error);
        console.log(userModel);
        return response.status(500).json({ message: error });
    }
};