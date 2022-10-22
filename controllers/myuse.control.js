const db = require('../models');
const protfolioForm = db.protfolioForm;
const { sendMessage } = require('../middlewares/sendMessage')

exports.addProtfolioForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (name == '' || email == '' || message == '') {
            res.status(400).json({
                status: false,
                message: 'please enter the all the details.'
            })
        }

        protfolioForm.findOne(({ email: email }), (err, data) => {
            if (data) {
                res.status(403).json({
                    status: false,
                    message: "email address is already existing."
                })
            }
            else {
                const newFormData = new protfolioForm({
                    name,
                    email,
                    message,
                });

                const messageBody = `Hi Mohamed Mufasil Mufeeth, ${name} is submitted a form in your protfolio website, ${message} and further details contact at ${email}`

                newFormData.save()
                    .then((data) => {
                        sendMessage(messageBody);
                        res.status(200).json({
                            status: true,
                            message: 'Thanks for submitting the form || data successfully received.'
                        })
                    })
                    .catch((err) => {
                        res.status(401).json({
                            status: false,
                            message: 'sorry data can not be inserted, please try again later.',
                            err: err
                        })
                    })
            }
        })
    }
    catch (err) {
        res.status(500).send({
            message: "Interal server please try again later."
        })
    }
}
