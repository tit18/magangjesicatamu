const jwt = require('jsonwebtoken');

const authenticateToken = (request, response, next) => {
    const token = request.header('Authorization');

    if (!token) {
        return response.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return response.status(403).json({ message: 'Forbidden' });
        }

        request.user = user;
        next();
    });
};

module.exports = { authenticateToken };