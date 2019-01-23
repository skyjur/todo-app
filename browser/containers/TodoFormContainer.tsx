import TodoForm from "../ui/elements/TodoForm";
import React from "react";
import { CommonProps } from "../App";

interface State {
    newTodoTitle: String
}

export default class TodoFormContainer extends React.Component<CommonProps, State> {
    state = {
        newTodoTitle: ''
    }

    onSubmit = () => {
        this.props.dispatch({
            type: 'createTodo',
            args: {
                title: this.state.newTodoTitle
            }
        })
        this.setState({
            newTodoTitle: ''
        })
    }

    onTitleUpdate = value => this.setState({ newTodoTitle: value })

    render() {
        console.log('onTitleUpdate', this.onTitleUpdate)
        return <TodoForm
            newTodoTitle={this.state.newTodoTitle}
            onTitleUpdate={this.onTitleUpdate}
            onSubmit={this.onSubmit}
        />
    }
}