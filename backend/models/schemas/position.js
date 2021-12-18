const { Schema } = require("mongoose");

const PositionSchema = new Schema({
    name: {
        type: String,
        required: true,
    }, //좌석 사용 여부
    isempty: {
        type: Boolean,
    }, //섹션별 남은 좌석
    startTime: {
        type: Number, //timestamps 이용???
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: "Ticket",
    },
}, { timestamps: true });

module.exports = PositionSchema;