const { text } = require('express');
const express = require('express')
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'alsrb2918@gmail.com',
        pass: 'jciepctxalweakff',
    }
})

module.exports = (to, subject, text) => new Promise((resolve, reject) => {
    const message = {
        from: 'alsrb2918@gmail.com',
        to,
        subject,
        text,
    }

    transport.sendMail(message, (err, info) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(info);
    })
})