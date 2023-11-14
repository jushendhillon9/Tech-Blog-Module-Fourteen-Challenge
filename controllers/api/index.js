//will require the userRoutes file from user-Routes.js and will set up the append userRoutes to specific add on of url
const router = require("express").Router();

const userRoutes = require("./user-routes");

router.use("/", userRoutes);

module.exports = router;