const jwt = require('jsonwebtoken');

const authenticateToken = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'bukutamu');

        request.user = decoded;
        next();
    } catch (error) {
        return response.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticateToken };