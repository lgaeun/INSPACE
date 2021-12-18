var express = require("express");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Seat } = require("../models/index");
const { modelNames } = require("mongoose");
var router = express.Router();

/* 유저페이지 */
router.get(
  "/users/:shortId/checkIn",
  asyncHandler(async (req, res, next) => {
    const { shortId } = req.params;
    const user = await User.findOne({ shortId })
      .populate("userTicket")
      .populate("userSeat");
    const { category } = user.userTicket;
    const { section, position, startTime } = user.userTicket;
    const { totalTime, usedTime } = user;
    res.json({ category, section, position, startTime, totalTime, usedTime });
    res.status(200).json({ message: "success" });
  })
);

modele;
