const express = require('express');
const router = express.Router();

const { general } = require('../controllers/general');

router.get('/', general);

module.exports = router;
