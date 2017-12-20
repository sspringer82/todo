import { mergeMap } from 'rxjs/operators';

export const todoEpic = (action, store) => {
  debugger;
  return action.ofType('foo').pipe(
    mergeMap(action => {
      return action;
    }),
  );
};
