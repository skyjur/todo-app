import React from "react";
import { TodoItem } from "../../store";

interface TodoItemProps {
    obj: TodoItem
}

export default ({ obj: { id, title } }: TodoItemProps) =>
    <div className="">
        {title}
    </div>