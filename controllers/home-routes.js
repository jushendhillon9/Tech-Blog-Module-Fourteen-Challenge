const router = require("express").Router();
//NEED TO REQUIRE THE MODELS TO BE USED AS WELL
const { User, UserPosts, postComments } = require("../models");
const dayjs = require("dayjs");
const sequelize = require("../config/connection"); //allows me to access the databse

router.get("/homepage", async (req, res) => {
    try {
        let homepage = true;
        let isLoggedIn = req.session.isLoggedIn;
        const allUserPostsDB = await UserPosts.findAll({
            include: {
                model: postComments
            },
        });
        
        const allUsersPosts = allUserPostsDB.map((userPost) => userPost.get({ plain: true}));
        allUsersPosts.sort((a,b) => {
            return b.createdAt - a.createdAt;
        });
        for (const userPost of allUsersPosts) {
            userPost.createdAt = dayjs(userPost.createdAt).format("DD/MM/YYYY");
            userPost.postComments.createdAt = dayjs(userPost.postComments.createdAt).format("DD/MM/YYYY");
        }
        res.render("homepage&dashboard", {homepage, allUsersPosts, isLoggedIn})
    }
    catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
})

router.get("/signup", async (req, res) => {
    try {
        let isLoggedIn = req.session.isLoggedIn;
        const redirectParam = req.query.redirect;
        let signup;
        if (redirectParam == "true") {
            signup = true;
            res.render("login&signup", {signup, isLoggedIn})
        }
        else {
            signup = false;
            res.render("login&signup", {signup, isLoggedIn})
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/dashboard", async (req, res) => {
    try {
        let dashboard = true;
        let isLoggedIn = req.session.isLoggedIn;
        let addPostButton = true;
        const dbAllUserPosts = await UserPosts.findAll(
            {
                where: {
                    user_id: req.session.userID
                }
            }
        )
        let allUsersPosts = dbAllUserPosts.map((userPost) => userPost.get({ plain: true }))
        for (const userPost of allUsersPosts) {
            userPost.createdAt = dayjs(userPost.createdAt).format("DD/MM/YYYY");
            if (userPost.postComments) {
                userPost.postComments.createdAt = dayjs(userPost.postComments.createdAt).format("DD/MM/YYYY");
            }
        }
        res.render("homepage&dashboard", {dashboard, allUsersPosts, isLoggedIn, addPostButton})
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get("/createpost", async (req, res) => {
    try {
        res.render("createPost");
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.get("/commentpage:postID", async (req, res) => {
    try {
        let postID = req.params.postID;
        const selectedPostDB = await UserPosts.findOne({
            where: {
                id: postID
            }
        })
        const selectedPost = selectedPostDB.get({plain: true});
        res.render("commentpage", {selectedPost});
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;