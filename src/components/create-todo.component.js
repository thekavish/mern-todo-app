import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export default class CreateTodo extends React.Component {
  constructor (props) {
    super(props)

    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeResponsible = this.onChangeResponsible.bind(this)
    this.onChangePriority = this.onChangePriority.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      description: '',
      responsible: '',
      priority: '1',
      completed: false,
    }
  }

  onChangeDescription (e) {
    this.setState({
      description: e.target.value,
    })
  }

  onChangeResponsible (e) {
    this.setState({
      responsible: e.target.value,
    })
  }

  onChangePriority (e) {
    this.setState({
      priority: e.target.value,
    })
  }

  onSubmit (e) {
    e.preventDefault()

    // Submit form
    const newTodo = {}
    Object.assign(newTodo, this.state)

    axios.post('http://localhost:3001/todos/add', newTodo).then((response) => {
      Swal.fire('Hurray!', response.data.message, 'success')

      // Reset form
      this.setState({
        description: '',
        responsible: '',
        priority: '1',
        completed: false,
      })

      this.props.history.push('/')
    }).catch((error) => {
      console.error(error)
    })
  }

  render () {
    const priorityOptions = [];
    ['Low', 'Medium', 'High'].forEach((priority, value) => {
      priorityOptions.push(
        <option key={value} value={value + 1}>{priority}</option>,
      )
    })

    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create TODOS!</h3>
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="todo-description">Description</label>
                  <input type="text" className="form-control"
                         id="todo-description" placeholder="Provide Description"
                         value={this.state.description}
                         onChange={this.onChangeDescription} required/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="todo-responsible">Responsible</label>
                  <input type="text" className="form-control"
                         id="todo-responsible" placeholder="Who's Responsible"
                         onChange={this.onChangeResponsible} required
                         value={this.state.responsible}/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="todo-priority">Priority</label>
                  <select className="form-control" id="todo-priority"
                          onChange={this.onChangePriority} required
                          value={this.state.priority}>
                    {priorityOptions}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <label htmlFor="">&nbsp;</label><br/>
                <button type="submit" className="btn btn-primary">Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
