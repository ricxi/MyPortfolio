const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'SECRET_TEST_KEY',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  mongoUri:
    process.env.MONGODB_URI ||
    'mongodb://root:password@127.0.0.1:37017/Portfolio?authSource=admin',
};

module.exports = config;
