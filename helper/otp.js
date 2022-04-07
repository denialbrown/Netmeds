const fast2sms = require('fast-two-sms')

var options = {
    authorization:
        "###yourapikey###",
    message: otp,
    numbers: [phone],
}

fast2sms.sendMessage(options)
            .then((response) => {
                res.send("SMS OTP Code Sent Successfully")
            })
            .catch((error) => {
                res.send("Some error taken place")
            });
    