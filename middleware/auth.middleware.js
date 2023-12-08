const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticateToken };