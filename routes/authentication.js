const router = require('express').Router();
const { login, register, whoami } = require('../controllers/authentication/index');
const auth = require('../middlewares/authorization');

router.post('/login', login);
router.post('/register', register);
router.get('/whoami', auth(['Administrator', 'Student', 'Buyer']), whoami);

module.exports = router;