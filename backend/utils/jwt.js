const jwt = require('jsonwebtoken');

const secret = 'inspace';

exports.secret = secret;

exports.setUserToken = (res, user) => {
    const token = jwt.sign(user, secret);
    res.cookie('token', token);
    console.log('user정보값333', user);
    console.log('token utils333', token)
    res.json({
        token
    })
}