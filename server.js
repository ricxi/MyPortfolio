const config = require('./config/config.js');
const app = require('./server/express.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {}).then(() => {
  console.log('Connected to the database!');
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' });
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server started on port %s.', config.port);
});
