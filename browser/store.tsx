import uuid from "uuid/v4";

export interface TodoItem {
    id: string
    title: string
}

export interface ActionCreateTodo {
    type: 'createTodo',
    args: Pick<TodoItem, "title">
}

export interface ActionMarkDone {
    type: 'markDone',
    args: Pick<TodoItem, "id">
}

export type TodoAction = ActionCreateTodo | ActionMarkDone;


export class TodoStore {
    private todoList: TodoItem[] = []
    private listener: (data: TodoItem[]) => void;

    constructor(private localStore: Storage) {
    }

    async dispatch(action: TodoAction) {
        switch (action.type) {
            case "createTodo":
                const newTodo: TodoItem = {
                    id: uuid(),
                    ...action.args
                }
                this.todoList = [...this.todoList, newTodo]
                if (this.listener) {
                    this.listener(this.todoList)
                }
                break;
        }
    }

    setListener(callback: (data: TodoItem[]) => void) {
        this.listener = callback
        callback(this.todoList);
    }
}