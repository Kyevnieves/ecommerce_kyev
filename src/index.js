const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const { database } = require("./keys");
const path = require("path");
const MySQLStore = require("express-mysql-session");
const passport = require("passport");
// INICIALIZACIONES
const app = express();
require("./lib/passport");
// CONFIGURACIONES
app.set("port", 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars.js"),
  })
);
app.set("view engine", ".hbs");
// MIDDLEWARES;
app.use(
  session({
    secret: "sessionMySqlEcommerce",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
// VARIABLES GLOBALES
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});
// ROUTES
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use(require("./routes/links"));
app.use(require("./routes/shop"));
// PUBLIC
app.use(express.static(path.join(__dirname, "public")));
// INICIAR EL SERVIDOR
app.listen(app.get("port"), () => {
  console.log(`Servidor en puerto ${app.get("port")}`);
});
