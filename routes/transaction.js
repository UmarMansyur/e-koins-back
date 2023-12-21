const router = require('express').Router();
const { create, show, showByQrCode } = require('../controllers/transaction');


router.get('/:id', show);
router.post('/', create);
router.post('/scan/qr-code', showByQrCode);

module.exports = router;