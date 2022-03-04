const bcrypt = require('bcrypt');

const encryption = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(String(password), salt);
  return encryptedPassword;
};

const compare = (password, encryptedPassword) => {
  console.log(password);
  console.log(encryptedPassword);
  return bcrypt.compare(String(password), encryptedPassword);
};

const cryptation = {encryption, compare};

module.exports = cryptation;
