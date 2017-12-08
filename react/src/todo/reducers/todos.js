const defaultState = {
  todos: [
    { id: 1, title: 'eat' },
    { id: 2, title: 'sleep' },
    { id: 3, title: 'code' },
    { id: 4, title: 'sleep some more' },
  ],
};

export const todos = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      const id =
        state.todos.reduce(
          (prev, curr) => (curr.id > prev ? curr.id : prev),
          0,
        ) + 1;

      return {
        todos: [...state.todos, { ...action.payload.todo, id }],
      };
    default:
      return {
        todos: state.todos,
      };
  }
};
