const User = require('./User');
const UserPost = require('./userPost');
const Comment = require('./comment');

// Post belongs to the User, defines the foreign key & uses the onDelete method //
UserPost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

// Post has multiple comments, defines the foreign key & uses the onDelete method //
UserPost.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

// Comment belongs to User, defines the foreign key & uses the onDelete method //
Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comment,
  UserPost
};