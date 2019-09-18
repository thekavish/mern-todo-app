import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default class TodosList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { todos: [] }
  }

  changeStatus (i) {
    const currentTodo = this.state.todos[i]
    currentTodo.completed = !currentTodo.completed

    axios.put('http://localhost:3001/todos/update/' + currentTodo._id, currentTodo).then((response) => {
      let newTodos = this.state.todos.slice()
      newTodos[i] = currentTodo
      this.setState({
        todos: newTodos,
      })
    }).catch((error) => {console.error(error)})
  }

  deleteTodo (i) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        const currentTodo = this.state.todos[i]

        axios.delete('http://localhost:3001/todos/delete/' + currentTodo._id).then((response) => {
          Swal.fire(
            'Deleted!',
            'Your todo has been deleted.',
            'success',
          )

          let newTodos = this.state.todos.slice()
          delete newTodos[i]
          this.setState({
            todos: newTodos,
          })

          this.props.history.push('/')
        }).catch((error) => {
          console.error(error)
        })
      }
    })
  }

  fillTodoTable () {
    axios.get('http://localhost:3001/todos')
      .then((response) => this.setState({ todos: response.data }))
      .catch((error) => {console.error(error)})
  }

  componentDidMount () {
    this.fillTodoTable()
  }

  render () {
    const todoRows = this.state.todos.map(
      (todo, i) => <Todo key={i} value={todo}
                         onStatusChange={() => this.changeStatus(i)}
                         deleteTodo={() => this.deleteTodo(i)}/>,
    )

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">List TODOS!</h3>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead className={'thead-dark'}>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {todoRows}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

class Todo extends React.Component {
  render () {
    const priorities = ['Low', 'Medium', 'High']

    return (
      <tr className={this.props.value.completed ? 'text-strike' : ''}>
        <td>{this.props.value.description}</td>
        <td>{this.props.value.responsible}</td>
        <td>{priorities[parseInt(this.props.value.priority) - 1]}</td>
        <td>
          <div className="form-check">
            <input type="checkbox"
                   className="form-check-input"
                   checked={this.props.value.completed}
                   onChange={this.props.onStatusChange}/>
          </div>
        </td>
        <td>
          <div className="btn-group" role="group" aria-label="Actions">
            <Link to={'edit/' + this.props.value._id}
                  className={'btn btn-sm ' +
                  (this.props.value.completed
                    ? 'btn-secondary disabled'
                    : 'btn-primary')}
            >Edit</Link>
            <button
              className="btn btn-sm btn-danger"
              onClick={this.props.deleteTodo}
            >Delete
            </button>
          </div>
        </td>
      </tr>
    )
  }
}
