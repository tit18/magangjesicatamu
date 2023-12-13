const express = require('express');
const sequelize = require('./config');
const path = require('path');
const authRoutes = require('./routes/auth.route');
const { authenticateToken } = require('./middleware/auth.middleware');
const cors = require('cors');
const tamuRoute = require('./routes/histori_tamu.route');
const paketRoute = require('./routes/paket_barang.route');
const userRoute = require('./routes/user.route');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors())



app.use('/api/v1/halaman', tamuRoute)
app.use('/api/v1/halaman', paketRoute)
app.use('/api/v1/halaman', userRoute)
app.use('/api/v1/halaman', authRoutes)


app.get('/', (request, response) => {
    const result = {
        message: 'Welcome to Buku Tamu',
        route: ['/api/v1/halaman']
    };
    response.json({ success: true, message: result });
});
app.get('/protected', authenticateToken, (request, response) => {
    response.json({ message: 'This is a protected route', user: request.user });
});

// sequelize.sync({ force: false }).then(() => {
//     console.log('Database synced');
// }).catch((error) => {
//     console.error('Error syncing database: ', error);
// });
app.use('/api/v1/halaman/tamu/media', express.static(path.join(__dirname, 'cover')));
app.use('/api/v1/halaman/kurir/media', express.static(path.join(__dirname, 'gambar')));
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});