const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require('passport');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const paymentsRouter = require("./routes/payments");
const seatsRouter = require("./routes/seats");
const loginRouter = require('./routes/login');
const loginRequired = require('./middlewares/login-required');
const { passport } = require("passport");
const session = require('express-session');

require('./passport')();
mongoose.connect(
    "mongodb+srv://doosan:bbc0410@simple-board-cluster.mdnn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'Inspace',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://doosan:bbc0410@simple-board-cluster.mdnn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/payments", loginRequired, paymentsRouter);
app.use("/users", loginRequired, usersRouter);
app.use('/login', loginRequired, loginRouter)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    // res.locals.message = err.message;
    // res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ err: err.message });
});

module.exports = app;