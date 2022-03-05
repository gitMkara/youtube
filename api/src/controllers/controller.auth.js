const cryptation = require('../middlewares/middleware.bcrypt');
const tokenHub = require('../middlewares/middleware.jwt');
const User = require('../models/Model.User');

const userLogin = async (req, res) => {
  try {
    if (req.body.username) {
      const userFromDB = await User.findOne({
        username: req.body.username,
      }).catch((err) => {
        console.log(err.message);
        res.status(401).json('User not found. ⛔' + err.message);
      });

      const isValidPassword = userFromDB
        ? await cryptation.compare(req.body.password, userFromDB.password)
        : false;

      const accessToken = tokenHub.generateAccessToken(userFromDB.username);
      const refreshToken = tokenHub.generateRefreshToken(userFromDB.username);

      isValidPassword
        ? res
            .status(200)
            .json({accessToken: accessToken, refreshToken: refreshToken})
        : res.status(401).json('Invalid username or password. ⛔');
    } else {
      res.status(401).json('Invalid username or password. ⛔');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const userLogout = (req, res) => {
  try {
    tokenHub.refreshTokenStorage.length = 0;
    console.log('User has been logouted. ✅');
    res.status(200).json('User has been logouted. ✅');
  } catch (error) {
    res.status(404).json(error);
  }
};

const refresh = (req, res) => {
  try {
    tokenHub.refreshNewTokens(req, res);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {userLogin, userLogout, refresh};
