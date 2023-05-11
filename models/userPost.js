// Imports the necessary libraries //
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// Defines the Post model //
class UserPost extends Model {}

// Defines the Post table structure //
UserPost.init(
  {
    title: DataTypes.STRING,  // Post title column //
    body: DataTypes.STRING    // Post body column //
  },
  {
    sequelize   // Connects to the database using the Sequelize instance //
  }
);

module.exports = UserPost;