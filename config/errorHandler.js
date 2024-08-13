const errorHandler = require("errorhandler");

const setupErrorHandler = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
  } else {
    app.use((err, req, res, next) => {
      const code = err.code || 500;
      res.status(code).json({
        code: code,
        message: code === 500 ? null : err.message,
      });
    });
  }
};

module.exports = setupErrorHandler;
