export interface TodoItem {
    id: string
    title: string
}

export interface ActionCreateTodo {
    type: 'createTodo',
    args: {
        title: string
    }
}

export interface ActionMarkDone {
    type: 'markDone',
    args: {
        id: string
    }
}

export type Action = ActionCreateTodo | ActionMarkDone;

export class TodoStore {
    async handle(action: Action) {
        switch (action.type) {

        }
    }

    setListener(callback: (data: TodoItem[]) => void) {
        callback([
            { id: "1", title: "Todo 1" },
            { id: "2", title: "Todo 2" },
        ])
    }
}