import React, { Component } from "react";
import "./App.css";
import todoList from "./todos.json";

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onClick={this.props.completeTodo}
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return <ul className="todo-list">{this.props.children}</ul>;
  }
}

class App extends Component {
  state = { todos: todoList };

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
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.addNewTodo}
          />
        </header>
        <section className="main">
          <TodoList>
            {this.state.todos.map(todo => (
              <TodoItem
                title={todo.title}
                completed={todo.completed}
                completeTodo={this.handleCompletedTodo(todo.id)}
                handleDeleteTodo={this.handleDeleteTodo(todo.id)}
              />
            ))}
          </TodoList>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
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
