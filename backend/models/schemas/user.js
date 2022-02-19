const { Schema } = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new Schema({
    //구글아이디로 로그인할 경우 구글 아이디를 따로 받아줌
    googleId: {
        type: String,
        default: null,
    },
    //이름
    name: {
        type: String,
        required: true,
    },
    //유저아이디 (이메일형식)
    userId: {
        type: String,
        required: true,
    },
    //비밀번호
    password: {
        type: String,
        required: true,
    },
    //이제껏 결제한 총 시간
    totalTime: {
        type: Number, //밀리초
        required: true,
        default: 0,
    },
    //사용한 총 시간
    usedTime: {
        type: Number, // 밀리초
        required: true,
        default: 0,
    },
    //이용가능한 남은 시간
    remainingTime: {
        type: Number, //밀리초
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