const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
})

transport
    .verify()
    .then(() => console.info('Connected to email server'))
    .catch(() => console.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));

/**
 * Send email with nodemailer
 * @param {string} to Email id of the user
 * @param {string} subject Subject of the email
 * @param {string} message Message you want to send
 */
module.exports.send = async (to, subject, message) => {
    const msg = { to, from: process.env.SMTP_HOST, subject, html: message };
    await transport.sendMail(msg)
        .then((res) => console.log("Successfully sent"))
        .catch((err) => console.log("Failed ", err))
}