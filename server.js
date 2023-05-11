const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configures session //
const sess = {
  secret: "secret", // Sign the session ID cookie //
  cookie: {}, // Cookie options //
  resave: false, // Saves session to store regardless of modification //
  saveUninitialized: true, // Forces "uninitialized" session to be saved to the store //
  store: new SequelizeStore({
    db: sequelize // Uses Sequelize to store session data //
  })
};

app.use(session(sess)); // Attach the session to application //

// Configures Handlebars as the view engine //
const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/')); // Imports & uses the routes //

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false }); // Syncs the database & starts the app //
});