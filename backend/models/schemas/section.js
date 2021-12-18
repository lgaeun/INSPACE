const { Schema } = require("mongoose");
const PositionSchema = require("./position");

const SectionSchema = new Schema({
    //선택한 섹션
    name: {
        type: String,
        required: true,
    }, //선택한 섹션 내의 좌석
    position: [PositionSchema],
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // ticket: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Ticket",
    // },
}, { timestamps: true });

module.exports = SectionSchema;