const path = require("path");
const express = require("express");

const session = require("express-session");
const exphbs = require("express-handlebars");

const routes = require("./controllers");
const sequelize = require("./config/connection"); //sequelize required here
const helpers = require("./utils/helper");

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({helpers});

const sess = {
    secret: "Super secret secret",
    resave: false,
    saveUninitialized: false,
};
//sets up the user session here

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "public")));

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server is now listening on port: ${PORT}`));
})



