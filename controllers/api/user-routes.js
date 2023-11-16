//this will be used for the "users" related routes
const router = require("express").Router();
const { User, UserPosts, postComments } = require("../../models")

//CREATE new user route, will be a post route
//SIGN UP
router.post("/signup", async (req, res) => {
    try {
        let dbNewUser = await User.create({
                userName: req.body.userName,
                password: req.body.password
        });

        dbNewUser = await dbNewUser.get({ plain: true});

        req.session.userID = dbNewUser.id;

        await req.session.save (() => {
            req.session.isLoggedIn = true;
            req.session.userName = dbNewUser.userName;
            res
                .status(200)
                .json({ user: dbNewUser, message: 'You are now logged in!' });
        })
    }
    catch (err) {
        console.error(err)
        res
            .status(500) //return status code error
            .json(err) //return the error, and must be in json 
    }
})

//Login route, will be a post route as well
//SIGN IN
router.post("/login", async (req, res) => {
    try {
        //First step: check if the email is valid, if not then give status code error
        let dbUserData = await User.findOne({
            where: {
                userName: req.body.userName,
            }
        })
        dbUserData = dbUserData.get({ plain: true });
        if (!dbUserData) {
            res
                .status(400)
                .json({ message: "Incorrect email or password. Please Try Again!"})
            return; 
        }
        //Second step: IFF email is valid, then check if the password is valid
        const validPassword = await dbUserData.checkPassword(req.body.password)
        if (!validPassword) {
            res
                .status(400)
                .json({message: "Incorrect email or password. Please Try Again!"})
            return; 
        }
        await req.session.save(() => {
            req.session.isLoggedIn = true;
            req.session.userName = dbUserData.userName;
            res
                .status(200)
                .json({ user: dbUserData, message: "Congrats You Are Logged In!"})
        })
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json(err)
    }
})

router.get("/logout", async (req,res) => {
    try {
        console.log("BEING HIT")
        if (req.session.isLoggedIn) {
            console.log("DESTROYING NOW");
            req.session.destroy((err) => {
                if (err) {
                    res.status(500).json(err);
                }
                else {
                    res.redirect("/homepage")
                }
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

router.post("/createpost", async (req, res) => {
    try {
        
        let newUserPost = await UserPosts.create({
            author: req.session.userName,
            post_header: req.body.postTitle,
            post_content: req.body.postContent,
            user_id: req.session.userID,

        })
        res.json(newUserPost);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post("/addcomment", async (req, res) => {
    //use session id to get authorname
    const commenterDB = await User.findOne({
        where: {
            id: req.session.userID
        }
    })
    const commenter = await commenterDB.get({plain: true});
    let authorname = commenter.userName;
    
    let comment = await postComments.create({
        author: authorname,
        comment_content: req.body.commentContent,
        userPost_id: req.body.postID,
    })
    res.json(comment);
})

//need an update post route, will be a post route

router.put("/updatepost", async (req, res) => {
    try {
        let updatedPost = await UserPosts.update(
            {
                post_header: req.body.postTitle,
                post_content: req.body.postContent,
            },
            {
                where: {
                    user_id: req.session.userID,
                }
            }
        )
        res.json(updatedPost);
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

router.delete("/deletepost", async (req, res) => {
    try {
        // Assuming you have a UserPosts model
        await UserPosts.destroy({
            where: {
                user_id: req.session.userID,
            },
        });
        res.status(200).json({ message: 'Posts deleted successfully' });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error deleting posts:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//need a delete post route, will be a delete route

module.exports = router;