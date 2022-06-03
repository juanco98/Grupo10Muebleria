const express   = require('express');
const router    = express.Router();
const pool      = require('../database');

router.get('/', (req, res) => {
    res.render('register/form');
})

router.post('/', async (req, res) => {
    const {username, name, lastname, address, email, password} = req.body;
    const newUser = {
        username,
        name,
        lastname,
        email,
        address,
        password
    };
    await pool.query('INSERT INTO users set ?', [newUser]);
    res.send('recibido')
})

module.exports = router;