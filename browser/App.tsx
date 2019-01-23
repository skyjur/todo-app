import React from "react";
import "./App.scss"
import TodoScreen from "./ui/screens/TodoScreen";
import { TodoStore, TodoItem, TodoAction } from "./store";

export interface Props {
    localStorage: Storage
}

export interface AppState {
    todoList: TodoItem[]
}

export interface Dispatcher {
    (action: TodoAction): void;
}

export interface CommonProps {
    dispatch: Dispatcher
}

export class App extends React.Component<Props, AppState> {
    private todoStore = new TodoStore(
        this.props.localStorage,
        process.env.SERVER_URL!
    );

    state = {
        todoList: []
    }

    componentDidMount() {
        this.todoStore.setListener((todoList) => {
            this.setState({ todoList })
        })
    }

    dispatch: Dispatcher = action => this.todoStore.dispatch(action)

    render() {
        return <TodoScreen
            {...this.state}
            dispatch={this.dispatch} />
    }
}