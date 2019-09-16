import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import TodosList from './components/todos-list.component'
import EditTodo from './components/edit-todo.component'
import CreateTodo from './components/create-todo.component'

function App () {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="https://www.google.com">
            MERN TODO APP
          </a>
          <div className="nav-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">List</Link>
              </li>
              <li className="navbar-item">
                <Link to="/create" className="nav-link">Create</Link>
              </li>
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/" exact component={TodosList}/>
        <Route path="/edit/:id" exact component={EditTodo}/>
        <Route path="/create" exact component={CreateTodo}/>
      </div>
    </Router>
  )
}

export default App
