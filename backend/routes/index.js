var express = require("express");
var router = express.Router({});
const hashPassword = require("../utils/hash-password");
const asyncHandler = require("../utils/async-handler");
const generateRandomPassword = require("../utils/generate-random-password");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
const { User, Ticket, Seat } = require("../models/index");
const sendMail = require("../utils/send-mail");
const passport = require("passport");
const local = require("../passport/strategies/local");
const jwt = require("jsonwebtoken");
const jwtAuth = require("../utils/jwt-auth");
// const { secret } = require("../../utils/jwt");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

//회원가입
router.post(
  "/signup",
  asyncHandler(async (req, res, next) => {
    const { name, userId, password, checkPassword } = req.body;
    const hashedPassword = hashPassword(password);
    const existId = await User.findOne({ userId });
    if (existId) {
      throw new Error("사용중인 아이디입니다.");
      return;
    }
    if (password != checkPassword) {
      throw new Error("비밀번호가 일치하지 않습니다.");
      return;
    }
    await User.create({
      name,
      userId,
      password: hashedPassword,
    });
    console.log("회원가입후");
    res.status(200).json({ message: "success" });
  })

);

//로그인
//로그인시 토큰을 보내줌
router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    async(req, res, next) => {
        // setUserToken(res, req.user)
        const user = await User.findOne({ _id: req.user.id }).populate("userSeat");
        var checkIn = null;
        const { userId, name } = user;
        if (!user.userSeat) {
            checkIn = false;
        } else {
            checkIn = !user.userSeat.isempty;
        }

    const token = jwt.sign({ userId, name, id: req.user.id, checkIn }, secret); //payload
    res.cookie("token", token);
    // res.json({ token })
    console.log("req.user 안의 값12345:", req.user);
    console.log("token555:", token);
    console.log("req.cookies값좀 보자777", req.cookies);
        res.json({
            token,
        });
    }
);

router.get("/logout", (req, res, next) => {
    res.cookie("token", null, { maxAge: 0 });
    res.json({ message: "logout" });
});

router.post(
    "/reset-password",
    asyncHandler(async(req, res, next) => {
        // const id = jwtAuth(req).id;

        const { userId } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            throw new Error("해당 메일로 가입된 아이디가 없습니다.");
        }
        const password = generateRandomPassword();
        await User.updateOne({ userId }, {
            password: hashPassword(password),
        });

        await sendMail(
            userId,
            "비밀번호가 변경되었습니다.",
            `변경된 비밀번호는 : ${password} 입니다.`
        );
        res.status(200).json({ message: "success" });
    })
);

router.post(
  "/info-change-name",
  asyncHandler(async (req, res, next) => {
    const id = jwtAuth(req).id;
    const { name } = req.body;
    const user = await User.findOne({ _id: id });
    if (user.name == name) {
      throw new Error("변경 전 이름과 같습니다.");
    }
    await User.updateOne({ _id: id }, { name });
    res.status(200).json({ message: "success" });
  })

);
router.post(
    "/info-change-password",
    asyncHandler(async(req, res, next) => {
        const id = jwtAuth(req).id;
        const { password, newpassword, confirmpassword } = req.body;
        const user = await User.findOne({ _id: id });

        if (user.password != hashPassword(password)) {
            throw new Error("기존 비밀번호를 다시 입력해주세요");
        } else if (hashPassword(password) == hashPassword(newpassword)) {
            throw new Error("기존비밀번호와 새 비밀번호를 다르게 입력해주세요");
        }
        if (newpassword != confirmpassword) {
            throw new Error("새비밀번호를 다시 확인해주세요.");
        }
        await User.updateOne({ _id: id }, {
            password: hashPassword(newpassword),
        });
        res.status(200).json({ message: "success" });
    })
);
module.exports = router;