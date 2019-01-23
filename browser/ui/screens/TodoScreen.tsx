import React from "react";
import Header from "../elements/Header";
import Section from "../elements/Section";
import TodoInputHeader from "../elements/TodoForm";
import TodoList from "../elements/TodoList";
import TodoListItem from "../elements/TodoListItem";
import { Dispatcher } from "../../App";
import { TodoItem } from "../../store";
import TodoFormContainer from "../../containers/TodoFormContainer";

interface Props {
    todoList: TodoItem[],
    dispatch: Dispatcher
}

export default ({ todoList, dispatch }: Props) =>
    <>
        <Section>
            <Header />
        </Section>

        <Section>
            <TodoFormContainer dispatch={dispatch} />

            <TodoList>
                {todoList.map(obj =>
                    <TodoListItem key={obj.id} obj={obj} />
                )}
            </TodoList>
        </Section>
    </>