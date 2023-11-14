const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class postComments extends Model {}

postComments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userPost_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user_posts",
                key: "id"
            },
            onDelete: "CASCADE",
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
    }
)

module.exports = postComments;