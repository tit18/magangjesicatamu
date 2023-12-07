const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const resepsionisModel = require('../models/index').resepsionis;
require ('dotenv').config;


const generateToken = (userId) => {
    const token = jwt.sign({ userId }, 'bukutamu', { expiresIn: '12h' });
    return token;
};

exports.login = async (request, response) => {
    let { email, password } = request.body;

    try {
        const user = await resepsionisModel.findOne({ where: { email } });

        const pass = bcrypt.hash(password.toString(), 15);

        if (!user || !(bcrypt.compare((await pass).toString(), user.password))) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.uuid);

        return response.json({ success: 'true', logged: 'true', nama: user.nama, token: token });
    } catch (error) {
        console.error(error);
        console.log(resepsionisModel);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
};