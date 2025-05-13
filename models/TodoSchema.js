const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title: String,
    completed: Boolean,
    userId: string
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;