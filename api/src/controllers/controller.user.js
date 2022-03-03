const cryptation = require('../middlewares/middleware.bcrypt');
const User = require('../models/Model.User');

const registerUser = async (req, res) => {
  try {
    //encryption password
    const cryptedPassword = await cryptation.encryption(req.body.password);
    const newUser = new User({
      username: req.body.username,
      password: cryptedPassword,
    });
    await newUser
      .save()
      .then((user) => {
        console.log(
          'User has been created.✅ (username: ' + req.body.username + ')'
        );
        res.status(201).json(user);
        return;
      })
      .catch((err) => {
        console.log('User was not created.⛔ ');
        res.status(400).json(err);
        return;
      });
  } catch (error) {
    res.status(404).json(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({username: req.params.username})
      .then((response) => {
        console.log(
          'User has been deleted.✅ (username: ' + req.params.username + ')'
        );
        res.status(204).json(response);
        return;
      })
      .catch((err) => {
        console.log('User was not deleted.⛔');
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    res.status(404).json(err);
  }
  return;
};

const getAllUsers = async (req, res) => {
  try {
    await User.find()
      .then((response) => {
        console.log('User List has been sent.✅');
        res.status(200).json(response);
        return;
      })
      .catch((err) => {
        console.log('User List was not sent.⛔');
        res.status(400).json(err);
      });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const cryptedPassword = await cryptation.encryption(req.body.password);
    await User.findOneAndUpdate(
      {username: req.params.username},
      {password: cryptedPassword},
      {
        new: true,
      }
    )
      .then((response) => {
        console.log('User has been updated.✅');
        res.status(201).json(response);
        return;
      })
      .catch((err) => {
        console.log('User was not updated.⛔');
        res.status(400).json(err);
        return;
      });
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = {registerUser, deleteUser, getAllUsers, updateUser};
