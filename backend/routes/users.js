var express = require("express");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const { modelNames } = require("mongoose");
var router = express.Router();

//사용중인 유저의 유저페이지에 필요한 정보를 보여줍니다.
//이용중인 메인페이지로 들어오는 경우는
router.get(
  "/:id/checkIn",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id })
      .populate("userTicket")
      .populate("userSeat");
    const { category, duration } = user.userTicket;
    const { table, position, startTime } = user.userSeat;
    const { remainingTime } = user;
    const finishTimeMilSec =
      startTime.getTime() + new Date(remainingTime * 1000).getTime();
    const finishTime = new Date(finishTimeMilSec);

    // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
    res
      .status(200)
      .json({ category, duration, table, position, startTime, finishTime });
  })
);

//이용중이다가 퇴실하기 눌럿을 때 유저시간 반영하는거 해야해!
router.get(
  "/:id/checkOut",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    //좌석을 사용중이던 유저가 퇴실을 하는 경우
    if (user.userSeat) {
      const prevPosition = await Position.findOneAndUpdate(
        { _id: user.userSeat },
        { isempty: true, deletedAt: new Date() },
        { new: true }
      );
      const tempSecTime = Math.floor(
        (prevPosition.deletedAt - prevPosition.startTime) / 1000
      );
      await User.updateOne(
        { _id: id },
        {
          $inc: {
            usedTime: tempSecTime,
            remainingTime: -tempSecTime,
          },
        }
      );
    }

    const checkoutUser = await User.findOne({ _id: id })
      .populate("userTicket")
      .populate("userSeat");
    const { category, duration } = checkoutUser.userTicket;
    const { table, position, startTime } = checkoutUser.userSeat;
    const { remainingTime } = user;
    const remainingTimeMilSec =
      new Date().getTime() + new Date(remainingTime * 1000).getTime();
    const remainedTime = new Date(remainingTimeMilSec);

    // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
    res.json({ category, startTime, remainedTime, table, position, duration });
    // res.status(200).json({ message: "success" });
  })
);

module.exports = router;
