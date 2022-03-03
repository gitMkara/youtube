const mongoose = require('mongoose');
const {MONGO_URI} = require('../constants/constant.common');

const connect = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB has been connected.');
    })
    .catch((err) => {
      console.log(err);
    });
};
const disconnect = async () => {
  await mongoose
    .disconnect()
    .then(() => {
      console.log('MongoDB has been disconnected.');
    })
    .catch((err) => {
      console.log(err);
    });
};

const database = {connect, disconnect};

module.exports = database;
