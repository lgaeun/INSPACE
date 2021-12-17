const { Schema } = require("mongoose");

const SeatSchema = new Schema({
    //선택한 섹션
    section: {
        type: String,
        required: true,
    }, //선택한 섹션 내의 좌석
    position: {
        type: String,
        required: true,
    }, //좌석 사용 여부
    empty: {
        type: Boolean,
    }, //섹션별 남은 좌석
    leftSeat: {
        type: Number,
    }, //시작하는시간
    startTime: {
        type: Number, //timestamps 이용???
    }, //끝나는 시간
    // finishTime: {
    //   type: Number,
    // },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        required: true,
    },
}, { timestamps: true });

module.exports = SeatSchema;