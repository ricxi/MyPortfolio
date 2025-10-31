const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'SECRET_TEST_KEY',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://root:password@127.0.0.1:37017/Portfolio?authSource=admin' ||
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/mernproject',
};

module.exports = config;
