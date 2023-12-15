const router = require('express').Router();
const { create, destroy, show, showAll, update } = require('../controllers/classes');

router.get('/', showAll);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;