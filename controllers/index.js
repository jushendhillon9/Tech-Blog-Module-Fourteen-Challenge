//this file will set up the api routes in conjuction with the home-routes
const router = require("express").Router();
const apiRoutes = require("./api/index.js");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
//only features the /api/users, which will deal with user requests

module.exports = router;