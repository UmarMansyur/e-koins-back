const router = require('express').Router();
const { create, destroy, show, showAll, update, nextGrade } = require('../controllers/classes');

router.get('/', showAll);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.put('/student/next-grade', nextGrade);

module.exports = router;