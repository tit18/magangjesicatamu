const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resepsionisModel = require('../models/index').resepsionis;
require('dotenv').config;


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return token;
};

exports.login = async (request, response) => {
    let { email, password } = request.body;

    try {
        const user = await resepsionisModel.findOne({ where: { email } });
        const credential =  await bcrypt.compare(password, user.password);
        if (!user) {
            return response.status(201).json({success: 'true', logged: 'false', message: 'Invalid Email' });
        }
        if (!credential) {
            return response.status(201).json({success: 'true', logged: 'false', message: 'Invalid Password' });
        }

        const token = generateToken(user.uuid);

        return response.json({ success: 'true', logged: 'true', nama: user.nama, token: token });
    } catch (error) {
        console.error(error);
        console.log(resepsionisModel);
        return response.status(500).json({ message: error });
    }
};