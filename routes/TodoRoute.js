const express = require("express")
const { getAllTodos, createTodo, deleteTodo, updateTodo } = require("../controllers/TodoController")
const router = express.Router()

router.get("/getAllTodos", getAllTodos)
router.post("/createTodo", createTodo)
router.delete("/deleteTodo:id", deleteTodo)
router.patch("/updateTodo:id", updateTodo)
router.get("/", (req, res) => {
    res.status(200).send("your code is running on this server ")
})
module.exports = router