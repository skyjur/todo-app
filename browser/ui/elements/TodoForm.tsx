import React from "react";

interface Props {
    newTodoTitle: string,
    onSubmit()
    onTitleUpdate(value: string): void
}

export default ({ newTodoTitle, onSubmit, onTitleUpdate }: Props) =>
    <div className="columns">
        <div className="column">
            <input
                value={newTodoTitle}
                className="input"
                type="text"
                onChange={e => onTitleUpdate(e.target.value)}
                placeholder="For example: throw out trash" />
        </div>
        <div className="column is-narrow">
            <button className="button is-primary" onClick={onSubmit}>
                Add
            </button>
        </div>
    </div>