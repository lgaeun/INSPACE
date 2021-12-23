const { Schema } = require("mongoose");

const UserSchema = new Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }, //이제껏 결제한 총 시간
    totalTime: {
        type: Number,
        required: true,
        default: 0,
    }, //사용한 총 시간
    usedTime: {
        type: Number,
        required: true,
        default: 0,
    },
    remainingTime: {
        type: Number,
        required: true,
        default: 0,
    },
    //가장 최근에 결제한 티켓
    userTicket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
    }, //좌석 position 과 연결
    userSeat: {
        type: Schema.Types.ObjectId,
        ref: "Position",
    }, //이제껏 결제한 종 티켓들을 배열로 받았습니다.
    userTicketHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Ticket",
        default: [],
        required: true,
    }, ],
}, { timestamps: true });

module.exports = UserSchema;