const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const jwtAuth = require("../utils/jwt-auth");
//결제완료 페이지
router.get(
  "/paymentsInfo",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const user = await User.findOne({ _id: id })
      .populate("userTicket")
      .populate("userSeat");
    if (!user) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    const { category, price, duration } = user.userTicket;
    const { position, table } = user.userSeat;
    const startTime = user.userTicket.createdAt;
    res.json({ category, price, duration, startTime, position, table });
  })
);

//결제하기 페이지(결제하기 전)
router.get(
  "/payments",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const user = await User.findOne({ _id: id })
      .populate("userTicket")
      .populate("userSeat");
    if (!user) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    const { category, price, duration } = user.userTicket;
    const { position, table } = user.userSeat;
    res.json({ category, price, duration, position, table });
  })
);

module.exports = router;
