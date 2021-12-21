const { Schema } = require("mongoose");

const TicketSchema = new Schema({
    //이용권 종류
    category: {
        type: String,
        required: true,
    }, //구매한 이용권의 시간
    duration: {
        type: Number,
        required: true,
    }, //이용권가격
    price: {
        type: Number,
        rquired: true,
    }, //구매한 시간
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
}, { timestamps: true });

module.exports = TicketSchema;