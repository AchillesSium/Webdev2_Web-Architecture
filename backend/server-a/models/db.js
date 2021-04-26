const mongoose = require('mongoose');

/**
 * Get database connect URL.
 *
 * Reads URL from DefaultUrl environment variable 
 * and return the variable
 *
 * @returns {string} connection URL
 */
const getDbUrl = () => {
  
  const defaultUrl = 'mongodb://localhost:27017/SandwichOrder';
  return defaultUrl;
};

const connectDB = () => {
  // Do nothing if already connected
  if (!mongoose.connection || mongoose.connection.readyState === 0) {
    mongoose
      .connect(getDbUrl(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        autoIndex: true
      })
      .then(() => {
        mongoose.connection.on('error', err => {
          console.error(err);
        });

        mongoose.connection.on('reconnectFailed', handleCriticalError);
      })
      .catch(handleCriticalError);
  }
}

const handleCriticalError = (err) => {
  console.error(err);
  throw err;
}

const disconnectDB = () => {
  mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB, getDbUrl };