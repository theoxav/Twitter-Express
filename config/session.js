// config/session.js
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Database = require("../database/connection");
const config = require("../config/config");

const dbInstance = Database.getInstance();

function setupSession(app) {
  app.use(
    session({
      secret: config.SESSION_SECRET,
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
}

module.exports = setupSession;
