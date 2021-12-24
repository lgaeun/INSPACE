const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const paymentsRouter = require("./routes/payments");
const reservationRouter = require("./routes/reservation");
const authRouter = require('./routes/auth')
    // const loginRouter = require('./routes/login');
const loginRequired = require("./middlewares/login-required");
const session = require("express-session");
const cors = require("cors");
// const cookieSession = require("cookie-session");
// const keys = require('./utils/keys')

require("dotenv").config();
require("./passport")();
mongoose.connect(process.env.DB_URL)

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
app.use(cors());

app.use(
    session({
        secret: "Inspace",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    })
);


app.use(passport.initialize());
app.use(passport.session());



app.use("/", indexRouter);
app.use('/auth', authRouter)
    // app.use('/google', GoogleRouter);
app.use("/payments", paymentsRouter);
app.use("/users", usersRouter);
app.use("/reservation", reservationRouter);
// app.use("/payments", loginRequired, paymentsRouter);
// app.use("/users", loginRequired, usersRouter);
// app.use('/reservation', loginRequired, reservationRouter)



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