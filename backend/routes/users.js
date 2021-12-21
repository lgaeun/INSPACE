var express = require("express");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const { modelNames } = require("mongoose");
var router = express.Router();




//사용중인 유저의 유저페이지에 필요한 정보를 보여줍니다.
router.get(
    "/:id/checkIn",
    asyncHandler(async(req, res, next) => {
        const { id } = req.params;
        const user = await User.findOne({ _id: id })
            .populate("userTicket")
            .populate("userSeat");
        const { category } = user.userTicket;
        const { table, position, startTime } = user.userSeat;
        const { remainingTime } = user;
        const finishTimeMilSec = new Date().getTime() + new Date(remainingTime).getTime;
        const finishTime = new Date(finishTimeMilSec);

        // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
        res.json({ category, table, position, finishTime });
        res.status(200).json({ message: "success" });
    })
);

router.get(
    "/:id/checkOut",
    asyncHandler(async(req, res, next) => {
        const { id } = req.params;
        const user = await User.findOne({ _id: id })
            .populate("userTicket")
            .populate("userSeat");
        const { category } = user.userTicket;
        const { table, position, startTime } = user.userSeat;
        const { remainingTime } = user;
        const finishTimeMilSec = new Date().getTime() + new Date(remainingTime).getTime;
        const finishTime = new Date(finishTimeMilSec);

        // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
        res.json({ category, table, position, finishTime });
        res.status(200).json({ message: "success" });

        await Position.updateOne({ _id: user.userSeat }, {
            isempty: true,
            deletedAt: new Date(),
        })

    })
);


module.exports = router