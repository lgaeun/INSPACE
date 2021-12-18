const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Position } = require("../models/index");

//좌석선택 창에서 좌석선택하고 next버튼 누르면 밸리데이션
router.get(
    "/:section/:position",
    asyncHandler(async(req, res, next) => {
        // const { category, duration, price, section, position } = req.params;
        const { section, position } = req.params;
        const secPosition = await Section.findOne({ name: section }).position;
        const selectPosition = secPosition.filter((pos) => {
            pos.name == position;
        })[0];

        if (!selectPosition.isempty) {
            throw new Error("이미 사용중인 좌석입니다.");
            return;
        }

        res.status(200).json({ message: "success" });
    })
);

//결제하기 화면에서 결제하기 버튼을 누를 경우 데이터를 DB에 넣습니다.
router.post("/:id", async(req, res, next) => {
    const { id } = req.params;
    const { category, duration, price, section, position } = req.body;
    //선택한 이용권에 정보를 db에 넣고
    const tempTicket = await Ticket.create({
        category,
        duration,
        price,
    });
    //선택한 좌석에 대한 정보를 db에 넣고 user, ticket objectId를 연동시킵니다.
    const tempPosition = await Position.create({
        name: position,
        isempty: false,
        startTime: new Date(),
        user: id,
        ticket: tempTicket._id
    })
    await Section.create({
        name: section,
        position: []
    })
});

module.exports = router;