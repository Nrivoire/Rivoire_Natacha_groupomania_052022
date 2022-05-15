const User = require('./user.js');
const Post = require('./post.js');

User.hasMany(Post, {as : 'Post', foreignKey: 'userid'});
Post.belongsToMany(User, {as: 'User', foreignKey: 'id'});