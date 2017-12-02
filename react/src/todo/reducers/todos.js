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
    default:
      return {
        todos: state.todos,
      };
  }
};
