const { userLogin } = require('../controllers/controller.auth');

const router = require('express').Router();

router.post('/login', userLogin);
router.post('/logout');

module.exports = router;
