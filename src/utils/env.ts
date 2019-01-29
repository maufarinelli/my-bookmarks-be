const ENV = {
  PORT: parseInt(process.env.PORT || '3010', 10),
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export default ENV;
