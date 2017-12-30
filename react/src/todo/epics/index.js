import { mergeMap } from 'rxjs/operators';

export const todoEpic = (action, store) => {
  return action.ofType('foo').pipe(
    mergeMap(action => {
      return action;
    }),
  );
};
