import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class TodosList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { todos: [] }
  }

  changeStatus (i) {
    const currentTodo = this.state.todos[i]
    currentTodo.completed = !currentTodo.completed

    axios.post('http://localhost:3001/todos/update/' + currentTodo._id,
      currentTodo).then((response) => {
      console.log(response)
      let newTodos = this.state.todos.slice()
      newTodos[i] = currentTodo
      this.setState({
        todos: newTodos,
      })
    }).catch((error) => {
      console.error(error)
    })
  }

  componentDidMount () {
    axios.get('http://localhost:3001/todos').then((response) => {
      this.setState({ todos: response.data })
    }).catch((error) => {
      console.error(error)
    })
  }

  render () {
    const todoRows = this.state.todos.map(
      (todo, i) => <Todo key={i} value={todo}
                         onClick={() => this.changeStatus(i)}/>,
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
      <tr className={this.props.value.completed
        ? 'table-danger'
        : 'table-success'}>
        <td>{this.props.value.description}</td>
        <td>{this.props.value.responsible}</td>
        <td>{priorities[parseInt(this.props.value.priority) - 1]}</td>
        <td>
          <input type="checkbox"
                 className="form-control"
                 checked={this.props.value.completed}
                 onChange={this.props.onClick}
          />
        </td>
        <td>
          <Link to={'edit/' + this.props.value._id} className="btn btn-primary btn-sm">Edit</Link>
        </td>
      </tr>
    )
  }
}
