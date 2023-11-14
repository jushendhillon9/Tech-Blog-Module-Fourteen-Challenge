//create sequelize connection
const Sequelize = require("sequelize"); //requiring the sequelize class from the sequelize library
require("dotenv").config();

const sequelize = new Sequelize( //creating an instance of the sequelize class using new keyword
//this is what allows sequelize to connect to a mysql database
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
)

module.exports = sequelize;