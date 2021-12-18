const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");
const calcTime = require('../utils/calc-time')

//좌석선택 창에서 좌석선택하고 next버튼 누르면 밸리데이션
// router.get(
//   "/:section/:position",
//   asyncHandler(async (req, res, next) => {
//     // const { category, duration, price, section, position } = req.params;
//     const { section, position } = req.params;
//     const checkPosition = await Position.findOne({ section: section, name: position });

//     if (!checkPosition) {
//       throw new Error("이미 사용중인 좌석입니다.");
//       return;
//     }

//     res.status(200).json({ message: "success" });
//   })
// );


// 테이블 전체가 보일때 사용하고 있는 좌석의 위치와 남은시간을 보내줍니다.
router.get('/table', asyncHandler (async (res,req,next)=>{
  const reservedSeat = await Position.find({
    isempty: false
  }).populate('user');
  const editedReservedSeat = reservedSeat.reduce((acc, pos)=>{
    acc.push({postion: pos.position, table: pos.table, remainingTime: calcTime(pos.user.remainingTime)});
    return acc;
  })
  res.json(editedReservedSeat)
})
)






//결제하기 화면에서 결제하기 버튼을 누를 경우 데이터를 DB에 넣습니다.
router.post("/table/position/:id", asyncHandler (async (req, res, next) => {
  //table, position, id 값을 받고
  // const { table, position, id } = req.params;
  const {id} = req.params;
  const { category, duration, price, table, position } = req.body;

  const checkPosition = await Position.findOne({ table: table, name: position });

  if (checkPosition) {
    throw new Error("이미 사용중인 좌석입니다.");
    return;
    }
  
//티켓데이터 생성
  const tempTicket = await Ticket.create({
      category,
      durationSec: duration*60*60,
      price,
  });
  //선택한 좌석에 대한 정보를 db에 넣고 user, ticket objectId를 연동시킵니다.
  const tempPosition = await Position.create({
      name : position,
      table: table,
      isempty: false,
      startTime: new Date(),
      deletedAt: null,
      user: id,
      ticket: tempTicket._id
  })

  await User.updateOne({_id:id},{
    userSeat: tempPosition._id,
    userTicket:tempTicket._id,
    $push: { userTicketHistory: tempTicket._id
    },
    totalTime: totalTime+duration*60*60,
    remainingTime: remainingTime+duration*60*60
  })

})
)


//duration : Number hour
//좌석 시간은 시 분
//메인페이지 시간카운트는 종료시간을 보내주면 Date객체로 



module.exports = router;