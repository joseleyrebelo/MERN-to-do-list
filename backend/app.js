const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todosRoutes = require("./routes/todos-routes");

// Quick Abstractions
//
const app = express();

//
// Setup - Main
//

// Parsing incoming request
app.use(bodyParser.json());

// Establishing headers with requester
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );

  next();
});

// Setting root Todolist routing
app.use("/api/todos/", todosRoutes);

//
// Setup - Errors fallbacks
//

// Replies 404 if nothing matches
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// Replies 500 in case of errors
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//
// Database setup
// & server service initiation
//

// Establishing MongoDB entity and connection agents
mongoose
  .connect(
    `mongodb+srv://clust1:todolist@cluster0.9uste.mongodb.net/db1?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("# Connected to MongoDB");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
