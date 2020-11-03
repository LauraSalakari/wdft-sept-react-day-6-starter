import React, { Component } from 'react'
import Nav from './components/MyNav'
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios'
import { Switch, Route, withRouter } from 'react-router-dom'
import TodoList from './components/TodoList'
import AddForm from './components/AddForm'
import TodoDetail from './components/TodoDetail'
import EditForm from './components/EditForm'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'


class App extends Component {

  state = {
    todos: [],
    loggedInUser: null,
    errorMessage: null
  }

  componentDidMount() {
    if (!this.state.loggedInUser) {
      axios.get("http://localhost:5000/api/user", { withCredentials: true })
        .then((response) => {
          console.log(response.data)
          this.setState({
            loggedInUser: response.data
          })
        })
    }

    axios.get('http://localhost:5000/api/todos')
      .then((response) => {
        // response.data
        this.setState({
          todos: response.data
        })
      })
  }

  handleAdd = (e) => {
    e.preventDefault()
    const { name, description, image } = e.target
    let imageFile = image.files[0];

    // FormData is a JS class that allows us to create and send a form in a POST request
    let uploadForm = new FormData();
    uploadForm.append("imageUrl", imageFile);

    axios.post("http://localhost:5000/api/upload", uploadForm)
      .then((response) => {

        let newTodo = {
          name: name.value,
          description: description.value,
          completed: false,
          image: response.data.image
        }

        axios.post('http://localhost:5000/api/create', newTodo)
          .then((response) => {
            this.setState({
              todos: [response.data, ...this.state.todos]
            }, () => {
              this.props.history.push('/')
            })
          })
      })


  }

  handleDelete = (todoId) => {
    axios.delete(`http://localhost:5000/api/todos/${todoId}`)
      .then(() => {
        let filteredTodos = this.state.todos.filter((todo) => {
          return todo._id !== todoId
        })

        this.setState({
          todos: filteredTodos
        }, () => {
          this.props.history.push('/')
        })
      })

  }

  handleEdit = (todo) => {
    axios.patch(`http://localhost:5000/api/todos/${todo._id}`, {
      name: todo.name,
      description: todo.description,
      completed: todo.completed
    })
      .then(() => {
        let updatedTodos = this.state.todos.map((myTodo) => {
          if (myTodo._id === todo._id) {
            myTodo = todo
          }
          return myTodo
        })

        this.setState({
          todos: updatedTodos
        }, () => {
          this.props.history.push('/')
        })
      })
  }

  handleSignUp = (e) => {
    //signup code here
    e.preventDefault();

    const { username, email, password } = e.target;

    // note the third overload to the axios request
    // the withCredentials overload allows the client and server to pass the loggedInUser around!!
    axios.post("http://localhost:5000/api/signup", {
      username: username.value,
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          loggedInUser: response.data
        }, () => {
          this.props.history.push("/");
        })
      })
      .catch((err) => {
        // axios error data comes inside the err.response.data (it's an object)
        console.log(err.response.data.errorMessage);

        this.setState({
          errorMessage: err.response.data.errorMessage
        })
      })
  }


  handleSignIn = (e) => {
    // signin code here
    e.preventDefault();

    const { email, password } = e.target;

    axios.post("http://localhost:5000/api/signin", {
      email: email.value,
      password: password.value
    }, { withCredentials: true })
      .then((response) => {
        this.setState({
          loggedInUser: response.data
        }, () => {
          this.props.history.push("/");
        })
      })
      .catch((err) => {
        // axios error data comes inside the err.response.data (it's an object)
        console.log(err.response.data.error);

        this.setState({
          errorMessage: err.response.data.error
        })
      })
  }

  handleLogOut = (e) => {
    //logout code here
    // this is a POST request for reasons(?)
    // the params are: path, data to post(in this case none), the cookie
    axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true })
      .then(() => {
        this.setState({
          loggedInUser: null
        }, () => {
          this.props.history.push("/");
        })
      })
  }

  handleUnmount = () => {
    console.log("Gets called on unmount")
    this.setState({
      errorMessage: null
    })
  }

  render() {
    const { loggedInUser, errorMessage } = this.state;

    return (
      <div>
        <Nav loggedInUser={loggedInUser} onLogout={this.handleLogOut} />
        <h3>Shopping List</h3>
        {
          loggedInUser ? (<h5>User is: {loggedInUser.username}</h5>) : null
        }

        <Switch>
          <Route exact path="/" render={() => {
            return <TodoList todos={this.state.todos} />
          }} />
          {/* <Route path="/" component={AddForm} /> */}
          <Route path="/add-form" render={() => {
            return <AddForm onAdd={this.handleAdd} loggedInUser={loggedInUser} />
          }} />
          {/* <Route path="/todo/:todoId" component={TodoDetail}/> */}
          <Route exact path="/todo/:todoId" render={(routeProps) => {
            return <TodoDetail loggedInUser={loggedInUser} onDelete={this.handleDelete}  {...routeProps} />
          }} />
          <Route path="/todo/:todoId/edit" render={(routeProps) => {
            return <EditForm onEdit={this.handleEdit} {...routeProps} />
          }} />
          <Route path="/sign-in" render={(routeProps) => {
            return <SignIn onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignIn={this.handleSignIn} {...routeProps} />
          }} />
          <Route path="/sign-up" render={(routeProps) => {
            return <SignUp onUnmount={this.handleUnmount} errorMessage={errorMessage} onSignUp={this.handleSignUp} {...routeProps} />
          }} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)