const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      content : {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    },{
      sequelize,
      modelName: 'Comment',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  };
  static associate(db){
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
    db.Comment.belongsToMany(db.User, { through: 'CommentLike', as: 'CommentLiker'})
    db.Comment.hasMany(db.Comment, { as : 'Reply'});
  }
}