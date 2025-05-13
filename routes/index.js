const express = require("express")
const router = express.Router()
const TodoRoutes = require('./TodoRoute')
const AuthRoutes = require("./AuthRoute")
const authorization = require("../middleware/authMiddleware")
router.use("/auth", AuthRoutes)
router.use("/todo", authorization, TodoRoutes)

module.exports = router;