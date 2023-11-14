const { UserPosts } = require("../models")
//require the index file for models

userPostsData = [
    {
        author: "Xandromus",
        post_header: "Navigating the MVC Paradigm: Simplifying Software Development",
        post_content: "MVC, a software design cornerstone, elegantly divides applications into Model, View, and Controller. This separation fosters organized, scalable code, empowering developers to build efficient and maintainable applications across diverse platforms.",
        user_id: "1"
    },
    {
        author: "InnoTechJive",
        post_header: "Unraveling Express.js: Streamlining Web Development with MVC",
        post_content:"Express.js, a powerhouse for web development, seamlessly integrates MVC principles. Routes and middleware serve as controllers, views are managed through templates, and Sequelize streamlines dynamic database interactions.",
        user_id: "2"
    },
    {
        author: "CodeCrazeMaestro",
        post_header: "Sequelize and MVC: Crafting Dynamic Database Interactions",
        post_content: "Discover the dynamic synergy of Sequelize and MVC. Sequelize's ORM seamlessly integrates with the Model-View-Controller architecture, offering robust data management. Ideal for developers crafting scalable, dynamic, and database-driven applications.",
        user_id: "3"
    }
]

const seedUserPostsData = () => UserPosts.bulkCreate(userPostsData);

module.exports = seedUserPostsData;