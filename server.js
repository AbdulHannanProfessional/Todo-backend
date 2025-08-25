require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001;
const router = require("./routes/index.js")
const uri = process.env.MONGODB_URI;

const CORS = require("cors")

app.use(CORS({
    origin: 'https://redux-todo-abdulhannan.vercel.app', 
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }))

// database connection 
const mongoose = require("mongoose")
mongoose.connect(uri)
    .then(() => console.log("your connection with database successful"))
    .catch(err => console.log("An occured while connecting with database ", err))



// const TodoSchema = mongoose.model(TodoSchema

// )



app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use(router)

app.get("/", (req, res) => {
    res.status(200).send("you are currenlty at the backend service of abdul hannan")
})


app.listen(PORT, () => console.log(`your app is running on port ${PORT}`))
