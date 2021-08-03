const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      email:{
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      profileUrl:{
        type: Sequelize.STRING(200),
        allowNull: false,
        defaultValue: 'empty_profile.png'
      },
      password:{
        type: Sequelize.STRING(200),
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(30),
        unique: true,
      },
      provider: {
        type: Sequelize.STRING(15),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(20),
      },
    },{
      sequelize,
      modelName: 'User',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    })
  };
  
  static associate(db){
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followers', foreignKey : 'FollowingId'})
    db.User.belongsToMany(db.User, { through : 'Follow' , as : 'Followings', foreignKey : 'FollowerId'})
    db.User.belongsToMany(db.Post, { through : 'Like', as: 'Liked' })
    db.User.belongsToMany(db.Comment, { through : 'CommentLike', as: 'CommentLiked'})
  }
}