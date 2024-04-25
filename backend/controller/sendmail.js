// sendmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "shahmanan1014@gmail.com",
        pass: "iaad ujgy grsp pakg",
    },
});

const sendmailFunction = async(req, res, toemail, subject, amount, e1) => {
    const info = await transporter.sendMail({
        from: 'shahmanan1014@gmail.com', // sender address
        to: toemail, // list of receivers
        subject: subject || "Hello ✔", // Subject line
        text: `Amount: ${amount}`, // plain text body with the amount
        html: `<b>Amount: ${amount}</b>`, // html body with the amount
        attachments: [{
            filename: 'data.json',
            content: JSON.stringify(e1), // Attach e1 as JSON string
        }]
    });

    console.log("Message sent: %s", info.messageId);
    // res.send(info); // This line sends the response
};

module.exports = sendmailFunction;