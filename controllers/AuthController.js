const user = require("../models/UserSchema")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {

    let { name, email, password } = req.body;
    if (!name && !email && !password) {
        res.status(400).json({ message: "please enter the required information" })
    }
    try {
        const hashpass = await bcrypt.hash(password, 10);
        console.log(hashpass)
        const newUser = await user.create({
            name,
            email,
            password: hashpass
        })
        // res.status(200).json({ name, email, password })
        const secret = process.env.JWT_SECRET; // keep this secret & safe

        console.log(secret)

        const token = jwt.sign({id: user._id}, secret, { expiresIn: '1h' });
     

        res.status(200).json({ message: "signed up successfully !" , data: {user: newUser, token: token} })


    } catch (err) {
        res.status(400).json({ message: `an error occured while updating : ${err} ` })
    }
}
const loginUser = async(req,res ) => {

    let {email, password} = req.body;
    
    if(!email && !password) {
        res.status(404).json({message: "please fill in the following required fields"})
    }


    try{
        
        const existingUser = await user.findOne({email})

        console.log(existingUser)
        if(!existingUser){
            res.status(404).json({error:"please register first"})
        }

        const comparePass = await bcrypt.compare(password, existingUser.password)
        
        if(!comparePass){
            res.status(404).json({message:"email or password is incorrect"})
        }

        const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET,  { expiresIn: '1h' } )

        res.status(200).json({ message:`welcome back ${existingUser.name}`, token, existingUser})
    }catch(err) {
        res.status(404).json({message: "please enter valid information: " + err})
    }



}
// const getAllUsers = async (req, res) => {

//     try {
//         const allUsers = await user.find()

//         res.status(200).json({ data: allUsers })

//     } catch (err) {
//         res.status(404).json({ message: err })
//     }
// }

module.exports = { createUser, loginUser };