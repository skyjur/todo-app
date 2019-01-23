import React from "react";
import "./App.scss"
import TodoScreen from "./ui/screens/TodoScreen";
import { TodoStore, TodoItem } from "./store";

export interface AppState {
    todoList: TodoItem[]
}

export class App extends React.Component<{}, AppState> {
    private todoStore = new TodoStore();

    state = {
        todoList: []
    }

    componentDidMount() {
        this.todoStore.setListener((todoList) => this.setState({ todoList }))
    }

    render() {
        return <TodoScreen {...this.state} />
    }
}