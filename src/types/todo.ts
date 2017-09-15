export enum Status {
    todo,
    inProgress,
    done
}

export class Todo {
    constructor(title: string, status: Status) {}
}
