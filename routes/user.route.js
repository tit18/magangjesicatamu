const express = require('express');
const user = require('../models/user');

const router = express.Router();


router.get('/users', async (req, res) => {
    try{
        const user = await user.findAll();
        res.json(user);
    }catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;