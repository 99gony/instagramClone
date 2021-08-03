const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Image = require('./image');
const Comment = require('./comment');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Comment= Comment;
db.Image= Image;

User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Comment.init(sequelize);
Image.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Comment.associate(db);
Image.associate(db);

db.sequelize = sequelize;

module.exports = db;
