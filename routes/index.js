const express = require('express');
const router = express.Router();
const user = require('./user');
const auth = require('./authentication');
const classes = require('./class');
const academicYear = require('./academycYear');
const transaction = require('./transaction');


router.use('/user', user);
router.use('/auth', auth);
router.use('/class', classes);
router.use('/academicYear', academicYear);
router.use('/transaction', transaction);

module.exports = router;

