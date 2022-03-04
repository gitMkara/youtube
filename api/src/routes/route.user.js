const {
  registerUser,
  deleteUser,
  getAllUsers,
  updateUser,
} = require('../controllers/controller.user');

const router = require('express').Router();

router.post('/register', registerUser);
router.put('/:username', updateUser);
router.get('/', getAllUsers);
router.delete('/:username', deleteUser);
module.exports = router;
