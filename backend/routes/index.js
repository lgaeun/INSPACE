var express = require("express");
var router = express.Router();
const hashPassword = require("../utils/hash-password");
const asyncHandler = require("../utils/async-handler");
const { User, Ticket, Seat } = require("../models/index");

router.post(
    "/signup",
    asyncHandler(async(req, res, next) => {
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
        res.status(201).json({ message: "success" });
    })
);

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/fail'
}), function(res, req) {
    res.statusCode(200).json({ message: 'success' })
})

router.get("/logout", (req, res, next) => {
    req.logout();
    res.status(204).json({ message: "success" });
});

router.post(
    '/findid',
    asyncHandler(async(req, res, next) => {
        const { name, password } = req.body;
        const Pname = await User.findOne({ name });
        const checkPassword = hashPassword(password)
        if (!Pname) {
            throw new Error('유효한 이름이 아닙니다.')
        }
        if (Pname.password != checkPassword) {
            throw new Error('비밀번호가 다릅니다.')
        }
        res.json(Pname.userId)
    })
)


module.exports = router;