// Imports Sequelize package //
const Sequelize = require('sequelize');

// Loads the environment variables from .env file //
require('dotenv').config();

// Creates a new Sequelize instance, using either JawsDB URL or local MySQL database credentials //
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) // If exists, use JawsDB URL //
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost', // MySQL server host name //
    dialect: 'mysql', // MySQL as the database management system //
    port: 3306 // MySQL server port number //
  });

// Exports the sequelize instance //
module.exports = sequelize;