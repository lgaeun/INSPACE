const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");

//결제완료 페이지
router.get(
  "/:id/paymentsInfo",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
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
    // res.status(200).json({ message: "success" });
  })
);

//결제하기 페이지(결제하기 전)
router.get(
  "/:id/payments",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id })
      .populate("userTicket")
      .populate("userSeat");
    if (!user) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    const { category, price, duration } = user.userTicket;
    const { position, table } = user.userSeat;
    res.json({ category, price, duration, position, table });
    // res.status(200).json({ message: "success" });
  })
);

module.exports = router;
