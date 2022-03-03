const app = require('./app');
const database = require('./database/database.mongodb');

app.listen(5000, () => {
  console.log('Port ' + 5000 + ' is listening...');
  database.connect();
});
