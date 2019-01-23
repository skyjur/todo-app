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
}