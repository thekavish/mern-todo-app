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

mongoose.connect(
  'mongodb://127.0.0.1:27017/mern_project',
  { useNewUrlParser: true, useUnifiedTopology: true },
)
const connection = mongoose.connection
connection.once('open', () => { console.log('DB connection success.') })

todoRoutes.route('/').get((req, res) => {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err)
    }
    else {
      res.json(todos)
    }
  })
})

todoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id

  Todo.findById(id, (err, todo) => {
    if (err) {
      res.status(404).send(
        { message: 'Todo non existent', error: { message: err.message } },
      )
    }
    else {
      res.json(todo)
    }
  })
})

todoRoutes.route('/add').post((req, res) => {
  let todo = new Todo(req.body)

  todo.save().then(todo => {
    res.status(200).json({ message: 'Added a new Todo' })
  }).catch(err => {
    res.status(400).send(
      { message: 'Cannot add new Todo', error: { message: err.message } },
    )
  })
})

todoRoutes.route('/update/:id').put((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(404).send('Todo non existent')
    }
    else {
      todo.description = req.body.description
      todo.priority = req.body.priority
      todo.responsible = req.body.responsible
      todo.completed = req.body.completed

      todo.save().then(todo => {
        res.status(200).json({ message: 'Updated Todo' })
      }).catch(err => {
        res.status(400).send(
          { message: 'Cannot update Todo', error: { message: err.message } },
        )
      })
    }
  })

})

todoRoutes.route('/delete/:id').delete((req, res) => {
  let id = req.params.id

  Todo.deleteOne({ '_id': id }, (err, todo) => {
    if (err) {
      res.status(404).send(
        { message: 'Todo non existent', error: { message: err.message } },
      )
    }
    else {
      res.json(todo)
    }
  })
})

app.use('/todos', todoRoutes)

app.listen(PORT, function () {
  console.log('Server is running at port: ' + PORT)
})
