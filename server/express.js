const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const userRoutes = require('./routes/user.routes.js');
const authRoutes = require('./routes/auth.routes.js');
const contactRoutes = require('./routes/contact.routes.js');
const projectRoutes = require('./routes/project.routes.js');
const qualificationRoutes = require('./routes/qualification.routes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', contactRoutes);
app.use('/', projectRoutes);
app.use('/', qualificationRoutes);
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use((err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  if (
    err &&
    (err.name === 'AuthenticationError' ||
      err.name === 'UnauthorizedError' ||
      err.name === 'JsonWebTokenError' ||
      err.name === 'ValidationError')
  ) {
    console.err(err);
    return res.status(statusCode).json({ error: err.message });
  }

  console.log(err);
  return res.status(statusCode).json({ error: err.name + ': ' + err.message });
});

module.exports = app;
