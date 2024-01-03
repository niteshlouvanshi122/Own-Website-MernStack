require("dotenv").config()
const express = require("express")
const authRoter = require("./Router/auth-router")
const connectionDb = require("./DB/database")
const authController = require("./Router/contact-router")
const serviceRouter = require("./Router/sevice-router")
const PORT = process.env.SERVER_NUMBER
const cors = require("cors")
const app = express()

const corsOption = {
    origin : "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials : true,
}

app.use(cors(corsOption))
app.use(express.json())

app.use("/api/auth", authRoter)
app.use("/api/form", authController)
app.use("/api/data", serviceRouter)


connectionDb().then(()=>{
    app.listen(3000, () => {
        console.log(`Server is Running at Port :- ${PORT}`);
    })
})