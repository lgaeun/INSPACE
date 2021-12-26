const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const calcTime = require("../utils/calc-time");
const jwtAuth = require("../utils/jwt-auth");

//좌석이 이용중인지. 이용중이라면 몇 시간이 남았는지를 보여줍니다.
router.get(
  "/table",
  asyncHandler(async (req, res, next) => {
    //이용중인 좌석을 일단 찾습니다.
    if (!jwtAuth(req)) {
      res.redirect("/");
      return;
    }
    const renewedSeat = await Position.find({
      isempty: false,
    }).populate("user");

    //이용중인 좌석들을 사용한 시간을 업데이트합니다.
    //남은시간 < 사용한 시간이면 유저의 누적 사용시간을 남아있던 시간만큼 더하고 남은 시간을 0으로
    //남은시간 > 사용한 시간이면 유저의 누적 사용시간에서 사용한 시간을 더하고 남은 시간에서 사용한 시간을 빼는 로직입니다.
    //첫번쨰 라우터에서 유저와 좌석이용 데이터를 업데이트 합니다.
    for (const position of renewedSeat) {
      //지난 시간 계산
      const passedTime = Math.floor(new Date() - position.checkTime);
      console.log(passedTime);
      const user = await User.findOne({ _id: position.user });

      //남은 시간보다 사용한 시간이 많은 경우
      if (user.remainingTime <= passedTime) {
        await User.updateOne(
          { _id: position.user },
          {
            $inc: {
              usedTime: user.remainingTime,
              remainingTime: -user.remainingTime,
            },
          }
        );
        await Position.updateOne(
          {
            _id: position._id,
          },
          {
            isempty: true,
            checkTime: new Date(
              position.checkTime.getTime() + user.remainingTime
            ),
            deletedAt: new Date(
              position.checkTime.getTime() + user.remainingTime
            ),
          }
        );
      } else {
        //남은 시간이 사용한 시간보다 많은 경우
        const user = await User.findOneAndUpdate(
          { _id: position.user },
          {
            $inc: {
              usedTime: passedTime,
              remainingTime: -passedTime,
            },
          },
          { new: true }
        );
        await Position.updateOne(
          { _id: position.id },
          {
            checkTime: new Date(),
          }
        );
      }
    }
    next();
  })
);

// 두번째 라우터에서 업데이트된 유저정보가 반영된 좌석이용현황을 응답해줍니다.
router.get(
  "/table",
  asyncHandler(async (req, res, next) => {
    const reservedSeat = await Position.find({
      isempty: false,
    }).populate("user");
    const editedReservedSeat = reservedSeat.reduce((acc, pos) => {
      const remainingTimeMilSec = Math.floor(
        pos.checkTime.getTime() +
          new Date(pos.user.remainingTime).getTime() -
          new Date().getTime()
      );
      acc.push({
        position: pos.position,
        table: pos.table,
        remainingTime: calcTime(remainingTimeMilSec),
      });
      return acc;
    }, []);
    res.json(editedReservedSeat);
  })
);

//티켓정보 확인하는 페이지
//티켓을 선택하고 다음버튼 눌렀을 때 유저가 어떤 티켓을 가지고 있었는지 보내줍니다.
router.get(
  "/ticket",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const user = await User.findOne({
      _id: id,
    }).populate("userTicket");
    //유저가 이용중인 이용권이 있으면 해당이용권의 종류를 보내주고 이용중인 이용권이 없으면 null을 보내줍니다.
    if (user.userTicket && user.remainingTime >= 2) {
      res.json({ message: "success", category: user.userTicket.category });
    } else {
      res.json({ message: "success", category: null });
    }
  })
);

//이용권과 좌석을 둘 다 구매하는 경우
//case 1 , 4, 7
//case 1, 4 => 좌석이 없는 사람의 경우 이용권을 결제하고 좌석선택을 하는 경우
//case 7 => 좌석이 이미 있는 사람이 이용권을 결제하고 좌석이동을 하는 경우
//결제하기 화면에서 결제하기 버튼을 누를 경우 데이터를 DB에 넣습니다.
router.post(
  "/table/position/payments/",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const user = await User.findOne({ _id: id })
      .populate("userSeat")
      .populate("userTicket");
    //req.body 로 받는 duration은 hour
    const { category, duration, price, table, position } = req.body;

    //겹치는 좌석이 있는지 확인하고 겹치는 좌석이 있으면 에러를 던집니다.
    const checkPosition = await Position.findOne({
      table: table,
      position: position,
      isempty: false,
    });
    if (checkPosition) {
      throw new Error("이미 사용중인 좌석입니다.");
      return;
    }

    //새로 구매한 이용권 데이터를 추가합니다.
    const newTicket = await Ticket.create({
      category,
      duration, // hour
      price,
      user: user._id,
    });

    //유저가 선택한 좌석을 생성해 db에 넣습니다. 이때 유저가 이미 좌석을 이용하고 있는지에 따라 경우가 나뉩니다.
    //이미 좌석을 이용었던 경우 기존좌석 데이터를 deleted해주는 과정이 추가적으로 필요합니다.
    const newPosition = await Position.create({
      position: position,
      table: table,
      isempty: false,
      startTime: new Date(),
      deletedAt: null,
      checkTime: new Date(),
      user: user._id,
      ticket: newTicket._id,
    });
    //try catch 로 오류를 잡을 때(롤백) 이런 방식으로 하면 되는지 궁금합니다.
    try {
      //기존에 이용중인 좌석이 있던 경우 기존 좌석 정보도 같이 수정해야 합니다.
      // if (user.userSeat && !user.userSeat.isempty) {

      if (user.userSeat && !user.userSeat.isempty) {
        const prevPosition = await Position.findOneAndUpdate(
          { _id: user.userSeat },
          { isempty: true, deletedAt: new Date() },
          { new: true }
        );
        //기존에 사용하던 좌석을 이용한 시간을 계산해서 유저데이터를 업데이트합니다.
        const tempSecTime = Math.floor(
          prevPosition.deletedAt - prevPosition.checkTime
        );
        await Position.updateOne(
          { _id: user.userSeat },
          {
            checkTime: new Date(),
          }
        );
        await User.updateOne(
          { _id: id },
          {
            $inc: {
              usedTime: tempSecTime,
              remainingTime: -tempSecTime + duration * 60 * 60 * 1000,
              totalTime: duration * 60 * 60 * 1000,
            },
            userSeat: newPosition._id,
            userTicket: newTicket._id,
            $push: { userTicketHistory: newTicket._id },
          }
        );
      } else {
        await User.updateOne(
          { _id: id },
          {
            userSeat: newPosition._id,
            userTicket: newTicket._id,
            $push: { userTicketHistory: newTicket._id },
            $inc: {
              totalTime: duration * 60 * 60 * 1000,
              remainingTime: duration * 60 * 60 * 1000,
            },
          }
        );
      }
    } catch (err) {
      await Ticket.deleteOne({ _id: newTicket._id });
      await Position.deleteOne({ _id: newPosition._id });
      next(err);
    }

    res.status(200).json({ message: "success" });
  })
);

//이용권만 구매하는 경우
// case2: 퇴실한 사람 → 시간연장만
// case5 : 이용중인 사람 -> 시간연장만
router.post(
  "/payments/",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const user = await User.findOne({ _id: id })
      .populate("userSeat")
      .populate("userTicket");
    const { category, duration, price } = req.body; //시간연장에 필요한 데이터만 저장
    const newTicket = await Ticket.create({
      category,
      duration,
      price,
      user: user._id,
    });

    if (user.userSeat && !user.userSeat.isempty) {
      await Position.updateOne(
        { _id: user.userSeat },
        { ticket: newTicket._id }
      );
    }
    await User.updateOne(
      { _id: id },
      {
        userTicket: newTicket._id,
        $push: { userTicketHistory: newTicket._id },
        $inc: {
          totalTime: duration * 60 * 60 * 1000,
          remainingTime: duration * 60 * 60 * 1000,
        },
      }
    );
    res.status(200).json({ message: "success" });
  })
);

//case3 , case6 : 이용권 결제 없이 좌석선택만 하는 경우
//case3: 퇴실한 사람 → 좌석선택
//case6: 이용중인 사람 → 좌석이동 , 이 경우 기존 좌석 데이터도 수정해야함
router.post(
  "/position/",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const { position, table } = req.body;
    const user = await User.findOne({ _id: id })
      .populate("userSeat")
      .populate("userTicket");

    //겹치는 좌석이 있는지 확인 후 에러처리
    const checkPosition = await Position.findOne({
      table: table,
      position: position,
      isempty: false,
    });

    if (checkPosition) {
      res
        .status(500)
        .json({ message: "이미 사용중인 좌석입니다.", type: "noPosition" });
      return;
    }

    //남은 시간이 있는지 확인 후 에러처리
    if (user.remainingTime <= 1) {
      res
        .status(500)
        .json({ message: "남은 시간이 없습니다.", type: "noTime" });
      return;
    }

    //새로운 좌석에 대한 데이터를 만듭니다.
    const newPosition = await Position.create({
      position,
      table,
      isempty: false,
      startTime: new Date(),
      deletedAt: null,
      checkTime: new Date(),
      user: user._id,
      ticket: user.userTicket,
    });
    //기존에 이용하던 좌석이 있는 경우
    if (user.userSeat && !user.userSeat.isempty) {
      console.log("1", user.userSeat);
      console.log("2", user.userSeat.isempty);
      const prevPosition = await Position.findOneAndUpdate(
        { _id: user.userSeat },
        { isempty: true, deletedAt: new Date() },
        { new: true }
      );
      const tempSecTime = Math.floor(
        prevPosition.deletedAt - prevPosition.checkTime
      );
      await Position.updateOne(
        { _id: user.userSeat },
        { checkTime: new Date() }
      );
      await User.updateOne(
        { _id: id },
        {
          $inc: {
            usedTime: tempSecTime,
            remainingTime: -tempSecTime,
          },
          userSeat: newPosition._id,
        }
      );
    } else {
      await User.updateOne(
        { _id: id },
        {
          userSeat: newPosition._id,
        }
      );
    }
    res.status(200).json({ message: "success" });
  })
);

module.exports = router;
