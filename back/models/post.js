const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      content : {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    },{
      sequelize,
      modelName: 'Post',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  };
  static associate(db){
    db.Post.hasMany(db.Image);
    db.Post.hasMany(db.Comment);
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, {through : 'Like', as: 'Liker'});
    db.Post.belongsToMany(db.Hashtag, { through : 'PostHashtag'});
  }
}