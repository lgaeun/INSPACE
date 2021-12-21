const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const TicketSchema = require("./schemas/ticket");
const PositionSchema = require("./schemas/position");

const User = mongoose.model("User", UserSchema);
const Ticket = mongoose.model("Ticket", TicketSchema);
const Position = mongoose.model("Position", PositionSchema);

exports.User = User;
exports.Ticket = Ticket;
exports.Position = Position;
