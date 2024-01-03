const User = require("../DB/userModel")
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
    try {
        res.status(200).send("welcome Router Page")
    } catch (error) {
        res.status(400).send({msg:"page not found.."})
    }
}

const register = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, phone, password } = req.body ;

        const userExist = await User.findOne({email});
        const userName = await User.findOne({username})

        // if (userName){
        //     return res.status(400).json({ message: "This Name is already Exists in DataBase :)" })
        // }

        if(userExist){
            return res.status(400).json({ message: "Email already Exists" })
        }
        
        // Hash Your password
        // const Soult_Round = 12;
        
        // const hash_password = await bcrypt.hash(password, Soult_Round);

        const userCreated = await User.create({username, email, phone, password})

        res.status(200).json({
            massage: "Registration Successful :) ",
            Token : await userCreated.TokenGenerat(),
            userID : userCreated._id.toString(),
        })

    } catch (error) {
        res.status(404).send({msg:"Page not found.."})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        // console.log(userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // compare the Password
        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                massage: "Login Successful :) ",
                Token : await userExist.TokenGenerat(),
                userID : userExist._id.toString(),
            })
        }else{
            return res.status(401).json({ message: "Invalid email or password" })
        }

    } catch (error) {
        res.status(404).send({msg:"page not found.."})
    }
}

const user = async ( req, res, next) => {
    try {
        const userData = req.user
        console.log(userData); 
        res.status(200).json({userData})
    } catch (error) {
        console.log(`Error for the route ${error}`);
    }
}

module.exports = {home,register,login,user}