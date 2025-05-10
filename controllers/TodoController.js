const Todo = require("../models/TodoSchema")

const getAllTodos = async (req, res) => {
    const todos = await Todo.find()
    res.status(200).json(
        {
            message: "All Todos get successfully ",
            Data: todos
        }
    )
}

const createTodo = async (req, res) => {
    let {title,completed} = req.body;

    if(!title) {
        res.status(400).json("title or completed is required")
        
        return;
    }

    const newTodo = await Todo.create({title, completed})

    res.status(200).json({ message: "todo added successfully",data: newTodo  })
}



const deleteTodo = async (req,res) => {
    let deletedTodo = await Todo.findByIdAndDelete(req.params.id)

    res.status(200).json({message: "this Todo got deleted successfully !!"})



} 
const updateTodo = async (req,res) => {

    let {title, completed} = req.body

    let updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {title, completed})

    res.status(200).json({message: "Todo updatedsuccessfully", data: updatedTodo})
}


module.exports = {
    getAllTodos, 
    createTodo,
    deleteTodo,
    updateTodo
}