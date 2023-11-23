// Imports
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { ValidationError } = require("express-json-validator-middleware");

const app = express();
const routes = require("./routes");

const initializeDatabase = require("./database/initializeDb");

initializeDatabase();

app.use(
  morgan("dev", {
    skip: function (req, res) {
      return res.statusCode > 400;
    },
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  // Set response headers
  res.header("Access-Control-Allow-Origin", "*"); // Allow access to any (*) site
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // We set which kind of headers we want to accept

  // Set available request methods
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next(); // Go to next middleware
});

app.use(routes);

/**
 * Error handler middleware for express-json-validator-middleware validation errors.
 */
app.use((error, request, response, next) => {
  // Check the error is a validation error
  if (error instanceof ValidationError) {
    // Handle the error
    response.status(400).send(error.validationErrors);
    next();
  } else {
    // Pass error on if not a validation error
    next(error);
  }
});

app.use((req, res, next) => {
  const error = new Error("No route was found for this request!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
