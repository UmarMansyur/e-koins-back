const router = require('express').Router();
const { login, register, whoami } = require('../controllers/authentication/index');

router.get('/login', login);
router.post('/register', register);
router.get('/whoami', whoami);

module.exports = router;