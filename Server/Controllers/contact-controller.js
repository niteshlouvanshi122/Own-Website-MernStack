const ContactModel = require("../DB/contactModel");

const contactForm = async ( req, res ) => {
    try {
        const responc = req.body;
        await ContactModel.create(responc)
        return res.status(200).json({ massage: "Message send successfully :)" })
    } catch (error) {
        return res.status(500).json({ massage: "Message Not Send Please try Again :)" })
    }
}

module.exports = contactForm;
