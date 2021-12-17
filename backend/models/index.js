const mongoose = require("mongoose");
const UserSchema = require("./schemas/user");
const TicketSchema = require("./schemas/ticket");
const SeatSchema = require("./schemas/seat");

const User = mongoose.model("User", UserSchema);
const Ticket = mongoose.model("Ticket", TicketSchema);
const Seat = mongoose.model("Seat", SeatSchema);

exports.User = User;
exports.Ticket = Ticket;
exports.Seat = Seat;