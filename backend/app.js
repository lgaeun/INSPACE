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
const authRouter = require("./routes/auth");
// const loginRouter = require('./routes/login');
const loginRequired = require("./middlewares/login-required");
const session = require("express-session");
const cors = require("cors");
var app = express();

require("dotenv").config();
require("./passport")();
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:3300",
//   credentials: true,
// };

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }),
    cookie: {
      maxAge: 60 * 10000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);

app.use("/auth", authRouter);
// app.use("/google", GoogleRouter);
app.use("/payments", paymentsRouter);
app.use("/users", usersRouter);
app.use("/reservation", reservationRouter);

// app.use("/payments", loginRequired, paymentsRouter);
// app.use("/users", loginRequired, usersRouter);
// app.use("/reservation", loginRequired, reservationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json({ err: err.message });
});

module.exports = app;
