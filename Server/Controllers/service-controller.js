const Services = require("../DB/serviceModel");

const service = async (req,res) => {
    try {
        const response = await Services.find();

        if (!response){
            res.status(404).json({ msg: "No service found" });
            return
        }
        return res.status(200).json({ msg: "Service found", data: response });
    } catch (error) {
        console.log(`error from the server ${error}`);
    }
}

module.exports = service;