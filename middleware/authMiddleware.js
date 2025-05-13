const jwt = require('jsonwebtoken')

const authorization = async (req, res, next) => {

    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token)
    // next()
    // console.log(token)
    // console.log(req.headers.authorization)

    if (!token) {
        return res.status(404).json({ message: "unauthorized" })
    }
    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        console.log("decoded", decoded)
        
        req.userId = decoded.id

        next()
        
    } catch (err) {
        console.log("error", err)
        res.status(404).json({ message: "invalid authorization" })
    }
}
module.exports = authorization  