const { Schema } = require("mongoose");

const PositionSchema = new Schema(
  {//좌석이름
    position: {
      type: Number,
      required: true,
    }, //속한 섹션
    table:{
      type:String,
      required: true,
    },//좌석이용여부
    isempty: {
      type: Boolean,
      default: false,
      // required: true,
    }, //좌석을 반납하거나 이동한시간
    deletedAt:{
      type:Date,
      default: null,
    },//좌석 사용 시간
    startTime: {
      type: Date,
      default: null //timestamps 이용???
    },//유저와 연결 
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },//티켓과 연결
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
  },
  { timestamps: true }
);

module.exports = PositionSchema;
