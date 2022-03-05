const {
  registerUser,
  deleteUser,
  getAllUsers,
  updateUser,
} = require('../controllers/controller.user');
const tokenHub = require('../middlewares/middleware.jwt');

const router = require('express').Router();

router.post('/register', registerUser);
router.put('/:username', tokenHub.verifyAccessToken, updateUser);
router.get('/', tokenHub.verifyAccessToken, getAllUsers);
router.delete('/:username', tokenHub.verifyAccessToken, deleteUser);
module.exports = router;
