var express = require("express");
var router = express.Router({});
const hashPassword = require("../utils/hash-password");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Seat } = require("../models/index");
const generateRandomPassword = require("../utils/generate-random-password");
const sendMail = require("../utils/send-mail");
const passport = require("passport");

router.get(
  "/logout",
  asyncHandler(async (req, res, next) => {
    // const user = await User.findOne({ _id: req.user._id });
    const dsds = req.session;
    const requser = req.user;
    console.log("dsds", dsds);
    console.log("requser", requser);

    req.logout();
    res.status(204).json({ message: "success" });
  })
);
