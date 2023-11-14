const sequelize = require("../config/connection"); //importing the instance of the sequelize class from the connection file

const User = require("./User");
const UserPosts = require("./userPosts");
const postComments = require("./postComments")

User.hasMany(UserPosts, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
})

UserPosts.belongsTo(User, {
    foreignKey: "user_id",
})

UserPosts.hasMany(postComments, {
    foreingKey: "userPost_id",
    onDelete: "CASCADE"
})

postComments.belongsTo(UserPosts, {
    foreingKey: "userPost_id"
})

module.exports = { 
    User, 
    UserPosts, 
    postComments, 
    sequelize
}; //need to export the same instance of the sequelize connection!!!