const { User } = require("../models")
//require the index file for models

userData = [
    {
        userName: "Xandromus",
        password: "newPassWord123",

    },
    {
        userName: "InnoTechJive",
        password: "coolPassword",

    },
    {
        userName: "CodeCrazeMaestro",
        password: "randomPassword"
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
