// Imports required modules //
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Defines the Comment model by extending the Model class //
class Comment extends Model {}

// Initializes Comment model, specifying the attributes & their types of data //
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false // Column does not allow null values //
    }
  },
  {
    sequelize // Connects to database using the provided sequelize object //
  }
);

module.exports = Comment;