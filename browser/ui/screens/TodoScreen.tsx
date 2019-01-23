import React from "react";
import Header from "../elements/Header";
import Section from "../elements/Section";
import TodoInputHeader from "../elements/TodoInputHeader";
import TodoList from "../elements/TodoList";
import { AppState } from "../../App";
import TodoItem from "../elements/TodoItem";

export default ({ todoList }: AppState) =>
    <>
        <Section>
            <Header />
        </Section>

        <Section>
            <TodoInputHeader />

            <TodoList>
                {todoList.map(obj =>
                    <TodoItem key={obj.id} obj={obj} />
                )}
            </TodoList>
        </Section>
    </>