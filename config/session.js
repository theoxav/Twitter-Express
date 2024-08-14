const { app } = require("../app");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Database = require("../database/connection");

const dbInstance = Database.getInstance();

app.use(
  session({
    secret: "je suis un secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({
      clientPromise: dbInstance.getClientPromise(),
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
