const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');

// Creates User model //
class User extends Model {
  // Method to run on instance data per user to check password //
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Starts the User model with attributes & options //
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // Hooks to hash user's password prior to it being created or updated //
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },

    sequelize, // Connect model to sequelize instance //
    timestamps: false, // Disables timestamps //
    freezeTableName: true, // Uses same name for table & model //
    underscored: true, // Uses 'snake_case' for column names //
    modelName: 'User' // Makes the model name singular & lowercase //
  }
);

module.exports = User; // Exports User model //