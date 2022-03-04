const cryptation = require('../middlewares/middleware.bcrypt');
const User = require('../models/Model.User');

const userLogin = async (req, res) => {
  try {
    let isValid;
    if (req.body.username) {
      const userFromDB = await User.findOne({
        username: req.body.username,
      }).catch((err) => {
        console.log('Invalid username. ⛔' + err.message);
        res.status(401).json('Invalid username. ⛔');
      });

      isValid = await cryptation.compare(
        req.body.password,
        userFromDB.password
      );
    }
    if (isValid) {
      res.status(200).json('User has been logged. ✅');
    } else {

      res.status(401).json('Invalid username or password. ⛔');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {userLogin};
