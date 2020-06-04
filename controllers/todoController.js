const bodyParser = require("body-parser")
const mongoose = require("mongoose")

// connect to the database
mongoose.connect("mongodb+srv://todo-test:todo-test@cluster0-furww.mongodb.net/<dbname>?retryWrites=true&w=majority")

var data = [{ item: "buy milk" }, { item: "walk the dog" }, { item: "clean the car" }, { item: "kick some coding ass" }]
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {
  app.get("/todo", (req, res) => {
    res.render("todo", { todos: data })
  })

  app.post("/todo", urlencodedParser, (req, res) => {
    data.push(req.body)
    res.json(data)
  })

  app.delete("/todo/:item", (req, res) => {
    data = data.filter(function (todo) {
      return todo.item.replace(/ /g, "-") !== req.params.item
    })
    res.json(data)
  })
}
