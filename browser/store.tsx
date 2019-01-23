import uuid from "uuid/v4";

export interface TodoItem {
    id: string
    title: string
    done: boolean
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
        console.log('action', action)
        switch (action.type) {
            case "createTodo":
                const newTodo: TodoItem = {
                    ...action.args,
                    id: uuid(),
                    done: false
                }
                this.todoList = [...this.todoList, newTodo]
                if (this.listener) {
                    this.listener(this.todoList)
                }
                break;
            case "markDone":
                this.todoList = this.todoList.map(obj => {
                    if (obj.id == action.args.id) {
                        return {
                            ...obj,
                            done: true
                        }
                    }
                    return obj
                })
                if (this.listener) {
                    this.listener(this.todoList)
                }
        }
        console.log('newState', this.todoList)
    }

    setListener(callback: (data: TodoItem[]) => void) {
        this.listener = callback
        callback(this.todoList);
    }
}