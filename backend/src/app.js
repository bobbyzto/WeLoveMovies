if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// error-handlers
const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");

// route handlers
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");

// setting cross origin request url access
let clientUrl = "";
process.env.REACT_APP_BASE_URL
? clientUrl = process.env.REACT_APP_BASE_URL
: clientUrl = "http://localhost:3000";

// app-level middleware
app.use(express.json());
app.use(
  cors({
    origin: [clientUrl],
  })
);

// routes
app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// 404 and 500 errors
app.use(notFound);
app.use(errorHandler);

module.exports = app;
