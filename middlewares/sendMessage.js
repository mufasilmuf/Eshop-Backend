var accountSid = process.env.accountSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.authToken;

const twilio = require('twilio')(accountSid, authToken)

exports.sendMessage = async (message) => {
    twilio.messages.create({
        from: process.env.twilioNumber,
        to: process.env.mobileNumber,
        body: message
    })
        .then((res) => { })
        .catch((err) => { })
}