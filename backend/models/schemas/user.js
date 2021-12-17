const { Schema } = require("mongoose");
const shortId = require("./types/shortId");

const UserSchema = new Schema({
    shortId,
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
    },
    totalTime: {
        type: Number,
    },
    usedTime: {
        type: Number,
    },
    userSeat: {
        type: Schema.Types.ObjectId,
        ref: "Seat",
    },
    userTicket: {
        type: Schema.Types.ObjectId,
        ref: "ticket",
    },
}, { timestamps: true });

module.exports = UserSchema;