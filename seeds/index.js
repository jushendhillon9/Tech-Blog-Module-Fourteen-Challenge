const sequelize = require("../config/connection")
const seedUsers = require("./userData")
const seedUserPostsData = require("./userPostsData");
const seedUserPostCommentsData = require("./postCommentData");

const seedAll = async () => {
    try {
        await sequelize.sync({force: true});

        await seedUsers();

        await seedUserPostsData();

        await seedUserPostCommentsData();

        process.exit(0);
    }
    catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}

seedAll();