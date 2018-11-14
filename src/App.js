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
          />
          <label>{this.props.title}</label>
          <button className="destroy" />
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
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
        </header>
        <section className="main">
          <TodoList>
            {this.state.todos.map(todo => (
              <TodoItem title={todo.title} completed={todo.completed} />
            ))}
          </TodoList>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

export default App;
