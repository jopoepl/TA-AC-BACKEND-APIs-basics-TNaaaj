const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");


// establishing a connection between the server and the user
mongoose.connect("mongodb://127.0.0.1:27017/book-store-api", (err) => {
  console.log(err ? err : "Connection is made sucessfully");
});
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const booksv2Router = require("./routes/booksv2");
const booksv3Router = require("./routes/booksv3");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/v2/books", booksv2Router);
app.use("/api/v3/books", booksv3Router);

module.exports = app;