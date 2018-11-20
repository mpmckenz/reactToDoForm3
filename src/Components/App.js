import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "../App.css";
import InitialTodoList from "../todos.json";
import TodoList from "./TodoList.js";

// class TodoList extends Component {
//   render() {
//     //change to function and take out props.children input parameter than
//     return (
//       <ul className="todo-list">
//         {this.props.todos.map(todo => (
//           <TodoItem
//             title={todo.title}
//             completed={todo.completed}
//             completeTodo={this.props.completeTodo(todo.id)}
//             handleDeleteTodo={this.props.handleDeleteTodo(todo.id)}
//           />
//         ))}
//       </ul>
//     );
//   }
// }

class App extends Component {
  state = { todos: InitialTodoList };

  handleDeleteCompletedTodos = event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({
      todos: newTodos
    });
  };

  handleDeleteTodo = todoIdThatWasClicked => event => {
    const newTodos = this.state.todos.filter(todo => {
      if (todo.id === todoIdThatWasClicked) {
        return false;
      }
      return true;
      //look for matched id todoIdThatWasClicked = todo.id
    });
    this.setState({
      todos: newTodos
    });
  };

  handleCompletedTodo = idUserClicked => event => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === idUserClicked) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    this.setState({
      todos: newTodos
    });
  };

  addNewTodo = event => {
    const newTodos = this.state.todos.slice(0);
    if (event.keyCode === 13) {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 314) + 1,
        title: event.target.value,
        completed: false
      };
      newTodos.push(newTodo);
      this.setState({
        todos: newTodos
      });
      event.target.value = "";
    }
  };

  render() {
    return (
      // <Switch>
      //   <Route exact path="/" Component={TodoList}/>
      //   <Route exact path="/active" />
      //   <Route exact path="/complete" />
      //   render{props => <TodoList (...props) (...commonprops) filter=classname }
      // </Switch>
      <section className="todoapp">
        <header className="header">
          <h1>Mike's todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.addNewTodo}
          />
        </header>
        <section className="main">
          <Route
            exact
            path="/"
            render={() => (
              <TodoList
                todos={this.state.todos}
                completeTodo={this.handleCompletedTodo}
                handleDeleteTodo={this.handleDeleteTodo}
              />
            )}
          />
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <Link to="/">All </Link>
              {/* needs props, event handler,  */}
            </li>
            <li>
              <Link to="/active"> Active </Link>
            </li>
            <li>
              <Link to="/completed"> Completed </Link>
            </li>
          </ul>
          <button
            className="clear-completed"
            onClick={this.handleDeleteCompletedTodos}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
export default App;

/* <Route path="#/active" Render={() => <TodoList todos={this.state.todos.filter(todo => {
  if (todo.completed === false)
  return todo;
  })}
 />
}
  <Route path="/completed" Component={TodoList} /> */

//create const commonprops object with event handlers to pass into the Routes = {value, onComplete= this.handleComplete, and so on}

// handleComplete = identify by ID = evt => this.setState({value: })
// handleComplete = identify by ID = () => this.setState({value: evt.target.value})

// count filter by .length

// ternary classname using this.props.completed ? completed : all
