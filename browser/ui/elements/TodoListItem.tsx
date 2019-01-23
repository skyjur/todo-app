import React from "react";
import { TodoItem } from "../../store";
import { Dispatcher } from "../../App";

interface TodoItemProps {
    obj: TodoItem
    dispatch: Dispatcher
}

export default ({ obj: { id, title, done }, dispatch }: TodoItemProps) =>
    <div className={done ? 'has-text-line-through has-text-grey' : ''}>
        {title}
        {!done && <button
            className="button is-primary"
            onClick={() => dispatch({ type: 'markDone', args: { id } })}>
            mark done
        </button>}
    </div >