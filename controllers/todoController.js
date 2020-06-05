const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// connect to the database
mongoose.connect("mongodb+srv://todo-test:todo-test@cluster0-furww.mongodb.net/todoList?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

// create a schema
const todoSchema = new mongoose.Schema({
  item: String,
})

const Todo = mongoose.model("Todo", todoSchema)
let itemOne = Todo({ item: "get flowers" }).save(function (err) {
  if (err) throw err
  console.log("Item saved.")
})

// var data = [{ item: "buy milk" }, { item: "walk the dog" }, { item: "clean the car" }, { item: "kick some coding ass" }]
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {
  app.get("/todo", (req, res) => {
    // get data from mongodb and pass it to the view
    Todo.find({}, function (err, data) {
      if (err) throw err
      res.render("todo", { todos: data })
    })
  })

  app.post("/todo", urlencodedParser, (req, res) => {
    // get data and add it to mongodb
    const newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err
      res.json(data)
    })
  })

  app.delete("/todo/:item", (req, res) => {
    // delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteOne(function (err, data) {
      if (err) throw err
      res.json(data)
    })
  })
}
