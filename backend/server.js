const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const todoRoutes = express.Router()
const PORT = 3001

let Todo = require('./todo.model')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/mern_project', { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => { console.log('DB SUCCESS') })

todoRoutes.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err)
    } else {
      res.json(todos)
    }
  })
})
todoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id
  Todo.findById((err, todo) => {
    if (err) {
      console.log(err)
    } else {
      res.json(todo)
    }
  })
})

app.use('/todos', todoRoutes)

app.listen(PORT, function () {
  console.log('Server is running at port: ' + PORT)
})