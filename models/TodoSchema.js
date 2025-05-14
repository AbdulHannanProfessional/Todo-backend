const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title: String,
    completed: Boolean,
    userId: mongoose.Schema.Types.ObjectId
})

const Todo = mongoose.model("Todo", todoSchema)

module.exports = Todo;