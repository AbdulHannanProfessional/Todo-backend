const user = require("../models/UserSchema")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {

    let { name, email, password } = req.body;
    if (!name && !email && !password) {
        res.status(400).json({ message: "please enter the required information" })
    }
    const checkUser = await user.findOne({ email });

    if (checkUser !== null) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    try {
        const hashpass = await bcrypt.hash(password, 10);
        console.log(hashpass)
        const newUser = await user.create({
            name,
            email,
            password: hashpass
        })

        const secret = process.env.JWT_SECRET; // keep this secret & safe

        console.log(secret)

        const token = jwt.sign({id: newUser._id}, secret);
     

        res.status(200).json({ 
            message: "signed up successfully!",
            data: {
              user: newUser,        // ✅ newUser instead of undefined
              token: token,
              _id: newUser._id      // ✅ correct _id
            }
          })
          

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
        
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
          }
          
          if (!existingUser) {
            return res.status(404).json({ error: "Please register first" });
          }
          
          const comparePass = await bcrypt.compare(password, existingUser.password)
          
          
          if (!comparePass) {
            return res.status(401).json({ message: "Email or password is incorrect", requestedBody: req.body });
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