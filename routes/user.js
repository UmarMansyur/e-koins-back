const router = require('express').Router();
const { create, destroy, show, showAll, update, updateThumbnail } = require('../controllers/user');
const multer = require('multer');
const upload = multer({});

router.get('/', showAll);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);
router.post('/thumbnail/:id', upload.single('thumbnail'), updateThumbnail);
module.exports = router;