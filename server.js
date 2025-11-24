const config = require('./config/config.js');
const express = require('express');
const path = require('path');
const app = require('./server/express.js');
const mongoose = require('mongoose');

const clientDistPath = path.join(__dirname, 'client', 'dist');

app.use(express.static(clientDistPath));

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {}).then(() => {
  console.log('Connected to the database!');
});

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('Server started on port %s.', config.port);
});
