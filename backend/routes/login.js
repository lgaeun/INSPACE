// const express = require('express');
// const app = express();
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json({ extended: false })) // req.body정보를 읽을수 있도록 설정

const { Router } = require('express');
const asyncHandler = require('../utils/async-handler');
const hashPassword = require('../utils/hash-password');
const { User } = require('../models');
const router = Router();



router.post('/', passport.authenticate('local', {
    failureRedirect: '/fail'
}), function(res, req) {
    res.statusCode(200).json({ message: 'success' })
})


module.exports = router;

// app.get('/login', function(res, req){
//         req.render('login.html')
// })