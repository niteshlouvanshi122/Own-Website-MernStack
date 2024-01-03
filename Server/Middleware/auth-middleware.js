const jwt = require("jsonwebtoken");
const User = require("../DB/userModel")

const authMiddleware = async ( req, res, next) => {
    const token = req.header("Authorization")
    

    if (!token){
        return res
        .status(401)
        .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    const jwtToken = token.replace("Bearer", "").trim()
    

    try {

        const isVerified = jwt.verify( jwtToken, process.env.TOKEN_KEY);
       
        const userData = await User.findOne({email:isVerified.email})
        .select({password:0})
        
        // console.log(userData);

        req.user = userData
        req.token = token
        req.userID = userData._id
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }
   

}

module.exports = authMiddleware