const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const routes = require("./routes");

const connectDB = require("./database/connection");
const setupErrorHandler = require("./config/errorHandler");
const configureSession = require("./config/session");

connectDB();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configureSession(app);

app.use((req, res, next) => {
  res.locals.user = req.session.userId
    ? { username: req.session.username }
    : null;
  next();
});

app.use(routes);
app.use("*", (req, res) => {
  res.status(404).render("not-found");
});

setupErrorHandler(app);

module.exports = app;
