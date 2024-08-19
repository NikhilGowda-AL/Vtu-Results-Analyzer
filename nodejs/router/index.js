const express = require('express');
const createUser = require('../controllers/createUser');
const results = require('../controllers/results');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Working...');
});

router.post('/results', results);

module.exports = router;
