
const Todo = require("../models/TodoSchema")



const getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({userId: req.userId});
        res.status(200).json({ message: "All Todos fetched successfully", data: todos });
    } catch (error) {
        console.error("Error in getAllTodos:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createTodo = async (req, res) => {
    try {
        let { title, completed } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTodo = await Todo.create({ title, completed, userId: req.userId });
        res.status(200).json({ message: "Todo added successfully", data: newTodo });

    } catch (error) {
        console.error("Error in createTodo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        if(req.params.id == undefined){
            return res.status(404).json({message: "is an unexpected error"})
        }

        res.status(200).json({ message: "This Todo got deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteTodo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, completed }, { new: true });

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.status(200).json({ message: "Todo updated successfully", data: updatedTodo });

    } catch (error) {
        console.error("Error in updateTodo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    getAllTodos, 
    createTodo,
    deleteTodo,
    updateTodo
}