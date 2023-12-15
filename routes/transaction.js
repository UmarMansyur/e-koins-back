const router = require('express').Router();
const { create, show} = require('../controllers/transaction');


router.get('/:id', show);
router.post('/', create);

module.exports = router;