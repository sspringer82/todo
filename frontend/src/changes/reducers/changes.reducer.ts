export interface State {
  connection: boolean;
}

const initialState: State = {
  connection: true,
};

export default function(state: State = initialState, action: any): State {
  switch (action.type) {
    default:
      return state;
  }
}
