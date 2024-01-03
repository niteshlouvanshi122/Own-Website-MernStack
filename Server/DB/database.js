const mongoose = require("mongoose")

const URL = process.env.MONGODB_URL
const connectionDB = async () => {
    try {
        mongoose.connect(URL).then(() => { 
            console.error("DataBase Connection Successfuly...") 
        }).catch((error) => { 
            console.error("DataBase Connection Filed :)") 
        });
    } catch (error) {
        console.error("Server is not connected");
    }
}

module.exports = connectionDB