import uuid from "uuid/v4";

export interface TodoItem {
    id: string
    title: string
    done: boolean
    backendSync: boolean
}

export interface ActionCreateTodo {
    type: 'createTodo',
    args: Pick<TodoItem, "title">
}

export interface ActionMarkDone {
    type: 'markDone',
    args: Pick<TodoItem, "id">
}

export interface ActionSyncComplete {
    type: 'syncComplete',
    args: Pick<TodoItem, "id">
}

export type TodoAction = ActionCreateTodo | ActionMarkDone | ActionSyncComplete;


export class TodoStore {
    private todoList: TodoItem[] = []
    private listener: (data: TodoItem[]) => void;

    constructor(private localStore: Storage, private backendUrl: string) {
        this.fetchFromBackend()
    }

    async dispatch(action: TodoAction) {
        console.log('action', action)
        switch (action.type) {
            case "createTodo":
                const newTodo: TodoItem = {
                    ...action.args,
                    id: uuid(),
                    done: false,
                    backendSync: false
                }
                this.todoList = [...this.todoList, newTodo]
                if (this.listener) {
                    this.listener(this.todoList)
                }
                this.syncToBackend()
                break;
            case "markDone":
                this.todoList = this.todoList.map(obj => {
                    if (obj.id == action.args.id) {
                        return {
                            ...obj,
                            done: true,
                            backendSync: false
                        }
                    }
                    return obj
                })
                if (this.listener) {
                    this.listener(this.todoList)
                }
                this.syncToBackend()
                break;
            case "syncComplete":
                this.todoList = this.todoList.map(obj => {
                    if (obj.id == action.args.id) {
                        return {
                            ...obj,
                            backendSync: true
                        }
                    }
                    return obj
                })
                if (this.listener) {
                    this.listener(this.todoList)
                }
                break;
        }
        console.log('newState', this.todoList)
    }

    setListener(callback: (data: TodoItem[]) => void) {
        this.listener = callback
        callback(this.todoList);
    }

    private async syncToBackend() {
        for (let obj of this.todoList) {
            if (!obj.backendSync) {
                await fetch(`${this.backendUrl}/todo/${obj.id}`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        ...obj,
                        backendSync: true
                    })
                })
                this.dispatch({
                    type: "syncComplete",
                    args: {
                        id: obj.id
                    }
                })
            }
        }
    }

    private async fetchFromBackend() {
        const resp = await fetch(`${this.backendUrl}/todo`)
        const respBody = await resp.json()
        if (respBody.ok) {
            this.todoList = [...respBody.data]
        } else {
            console.error(resp)
        }
        if (this.listener) {
            this.listener(this.todoList)
        }
    }
}