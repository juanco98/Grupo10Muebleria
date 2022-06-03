const express   = require('express');
const router    = express.Router();


router.get('/', (req, res) => {
    res.render('aboutus/aboutus');
})

module.exports = router;