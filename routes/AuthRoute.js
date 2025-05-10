const express = require("express")
const router = express.Router()
const {createUser} = require("../controllers/AuthController.js")
// const {getAllUsers} = require("../controllers/AuthController.js")
const {loginUser} = require("../controllers/AuthController.js")

router.post("/sign-up", createUser)
// router.get("/getUsers", getAllUsers)\
router.post("/login", loginUser)
module.exports = router;