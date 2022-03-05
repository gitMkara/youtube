const jwt = require('jsonwebtoken');
const {
  JWT_ACCESS_TOKEN,
  JWT_REFRESH_TOKEN,
} = require('../constants/constant.common');

let refreshTokenStorage = [];

const generateAccessToken = (user) => {
  try {
    const accessToken = jwt.sign({username: user}, JWT_ACCESS_TOKEN, {
      expiresIn: '3s',
    });
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};
const generateRefreshToken = (user) => {
  try {
    const refreshToken = jwt.sign({username: user}, JWT_REFRESH_TOKEN);
    refreshTokenStorage.push(refreshToken);
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};
const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.headers.auth;

    if (accessToken) {
      jwt.verify(accessToken, JWT_ACCESS_TOKEN, (err, decode) => {
        if (err) {
          res.status(401).json(err.name);
          return;
        }

        next();
      });
    } else {
      res.status(400).json('Header Required.');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

const refreshNewTokens = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) res.status(400).json('RefreshToken is required. ⛔');

    if (!refreshTokenStorage.includes(refreshToken))
      res.status(400).json('Invalid refreshToken. ⛔');

    jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, decode) => {
      if (err) res.status(401).json('RefreshToken verification error. ⛔');

      refreshTokenStorage = refreshTokenStorage.filter(
        (key) => !key == refreshToken
      );

      const newAccessToken = generateAccessToken(decode.username);
      const newRefreshToken = generateRefreshToken(decode.username);
      refreshTokenStorage.push(newRefreshToken);
      res
        .status(200)
        .json({accessToken: newAccessToken, refreshToken: newRefreshToken});
    });
  } catch (error) {
    res.status(404).json(error);
  }
};

const tokenHub = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  refreshNewTokens,
  refreshTokenStorage,
};
console.log(refreshTokenStorage);
module.exports = tokenHub;
