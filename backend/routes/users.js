var express = require("express");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const { modelNames } = require("mongoose");
var router = express.Router();
const calcTime = require("../utils/calc-time");
const jwtAuth = require("../utils/jwt-auth");

//사용중인 유저의 유저페이지에 필요한 정보를 보여줍니다.
//이용중인 메인페이지로 들어오는 경우는
router.get(
    "/checkIn",
    asyncHandler(async(req, res, next) => {
        const id = jwtAuth(req).id;
        const user = await User.findOne({ _id: id })
            .populate("userTicket")
            .populate("userSeat");
        const { category, duration } = user.userTicket;
        const { table, position, startTime, checkTime } = user.userSeat;
        const { remainingTime } = user;
        const finishTimeMilSec =
            checkTime.getTime() + new Date(remainingTime).getTime();
        const finishTime = new Date(finishTimeMilSec);

        // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
        res.status(200).json({
            category,
            duration,
            table,
            position,
            startTime,
            finishTime,
            // remainingtime: calcTime(finishTime - new Date()),
        });
    })
);

router.get(
    "/checkOut",
    asyncHandler(async(req, res, next) => {
        const id = jwtAuth(req).id;
        const user = await User.findOne({ _id: id })
            .populate("userSeat")
            .populate("userTicket");
        console.log("체크아웃 누르고 바로");
        console.log("user 남은시간", user.remainingTime);
        console.log("user 사용시간", user.usedTime);
        //좌석을 사용중이던 유저가 퇴실을 하는 경우
        if (user.userSeat && !user.userSeat.isempty) {
            const prevPosition = await Position.findOneAndUpdate({ _id: user.userSeat }, { isempty: true, deletedAt: new Date() }, { new: true });

            const tempSecTime = Math.floor(
                prevPosition.deletedAt - prevPosition.checkTime
            );
            console.log("tempSectime", tempSecTime);
            await Position.updateOne({ _id: user.userSeat }, { checkTime: new Date() });
            //oneday 유저의 경우 남은 시간 0으로 초기화됩니다.

            console.log("이프문 시작전");
            if (user.userTicket && user.userTicket.category == "oneday") {
                await User.updateOne({ _id: id }, {
                    $inc: {
                        usedTime: user.remainingTime,
                        remainingTime: -user.remainingTime,
                    },
                });
                console.log("이건 안찍혀야하고");
            } else {
                await User.updateOne({ _id: id }, {
                    $inc: {
                        usedTime: tempSecTime,
                        remainingTime: -tempSecTime,
                    },
                });

                // if (user.remainingTime > -5000 || user.remainingTime < 5000) {
                //     await User.updateOne({ _id: id }, {
                //         $inc: {
                //             remainingTime: -user.remainingTime,
                //         },
                //     });
                // }
                console.log("else 찍히나");
            }
            console.log("이건 찍히겠지 왜죠");
        }

        const checkoutUser = await User.findOne({ _id: id })
            .populate("userTicket")
            .populate("userSeat");
        //회원가입만 한 상태
        console.log("유저정보 업데이트 하고 나서");
        console.log("user 남은시간", checkoutUser.remainingTime);
        console.log("user 사용시간", checkoutUser.usedTime);
        if (!checkoutUser.userTicket) {
            res.json({
                category: null,
                startTime: null,
                remainingTime: null,
                table: null,
                position: null,
                duration: null,
            });
            return;
        }
        //회원가입하고 이용권만 사고 한번도 좌석이용을 안 해본 경우
        if (!checkoutUser.userSeat) {
            const { category, duration } = checkoutUser.userTicket;
            let { remainingTime } = checkoutUser;
            if (remainingTime > -5000 || remainingTime < 5000) {
                remainingTime = 0;
            }
            res.json({
                category,
                duration,
                remainingTime: calcTime(remainingTime),
                startTime: null,
                position: null,
                table: null,
            });
            return;
        }

        let { remainingTime } = checkoutUser;
        if (remainingTime > -5000 || remainingTime < 5000) {
            remainingTime = 0;
        }
        const { category, duration } = checkoutUser.userTicket;
        const { table, position, startTime } = checkoutUser.userSeat;
        // const { remainingTime } = checkoutUser;

        console.log("출력하기 전 ", checkoutUser.usedTime);
        // const remainingTimeMilSec =
        //   new Date().getTime() + new Date(remainingTime * 1000).getTime();
        // const remainedTime = new Date(remainingTimeMilSec);

        // res.json({ category, table, position, startTime, totalTime, usedTime, finishTime });
        res.json({
            category,
            startTime,
            remainingTime: calcTime(remainingTime),
            table,
            position,
            duration,
        });
        // res.status(200).json({ message: "success" });
    })
);

//티켓 추가정보
router.get(
    "/addInfo",
    asyncHandler(async(req, res, next) => {
        const id = jwtAuth(req).id;
        const user = await User.findOne({
            _id: id,
        }).populate({ path: "userTicketHistory" } // populate blogs
        );
        const editedHistory = user.userTicketHistory;
        const editedData = editedHistory.reduce((acc, history) => {
            const { category, duration, price } = history;
            acc.push({ category, duration, price, startTime: history.createdAt });
            return acc;
        }, []);
        console.log(editedData);

        res.json(editedData);
    })
);
module.exports = router;