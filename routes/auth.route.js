const express = require('express');
const authController = require('../controllers/auth.controller');
const jwt = require('jsonwebtoken');
let { BasicAuth } = require('../middleware/basicauth')
//const SECRET_KEY = "Buku_Tamu_App";
//auth = (request, response, next) => {
    const router = express.Router();

router.post('/api/v1/halaman/login', [BasicAuth], authController.login);

// let header = request.headers.authorization;
// let token = header && header.split(" ")[1];

// let jwtHeader = {
//     algorithm: "HS256",
// };
// if (token == null) {
//     response.status(401).json({ message: "Unauthorized" });
// } else {
//     jwt.verify(token, SECRET_KEY, jwtHeader, (error, user) => {
//         if (error) {
//             response.status(401).json({ 
//                 message: "Invalid token",
//             });
//         } else {
//             next();
//         }
//     });
//}

//};

module.exports = router;

