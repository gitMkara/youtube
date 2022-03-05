const {userLogin, userLogout, refresh} = require('../controllers/controller.auth');

const router = require('express').Router();

router.post('/login', userLogin);
router.post('/logout', userLogout);
router.post('/refresh', refresh);

module.exports = router;
