import { Subtask } from '../../shared/Subtask';
import { ActionType } from 'typesafe-actions';
import {
  saveSubtaskAction,
  deleteSubtaskAction,
  deleteSubtaskSuccessAction,
  SAVE_SUBTASK,
  DELETE_SUBTASK,
  updateSubtaskSuccessAction,
  createSubtaskSuccessAction,
  UPDATE_SUBTASK_SUCCESS,
  CREATE_SUBTASK_SUCCESS,
  DELETE_SUBTASK_SUCCESS,
} from '../actions/subtask.actions';
import { getToken } from '../../login/selectors/login.selector';
import axios from 'axios';
import { takeLatest, put, select } from '@redux-saga/core/effects';
import { getTodo } from '../selectors/todo.selector';
import { saveTodoAction } from '../actions/todo.actions';
import update from 'immutability-helper';
import { Todo } from '../../shared/Todo';
import db from '../../db/db';

function* save({ payload: subtask }: ActionType<typeof saveSubtaskAction>) {
  const token = yield select(getToken);
  let responseSubtask: Subtask;
  if (subtask.id) {
    if (navigator.onLine) {
      responseSubtask = (yield axios.put<Subtask>(
        `${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`,
        subtask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      const id = subtask.todo.id ? subtask.todo.id : subtask.todo;
      const todo = yield db.table('todo').get(id);
      const subtaskIndex = todo.subtasks.findIndex(
        (st: Subtask) => st.id === subtask.id
      );
      db.table('todo').update(
        id,
        update(todo, { subtasks: { [subtaskIndex]: { $set: subtask } } })
      );
      responseSubtask = subtask as Subtask;
    }
    yield put(updateSubtaskSuccessAction(responseSubtask));
  } else {
    if (navigator.onLine) {
      responseSubtask = (yield axios.post<Subtask>(
        `${process.env.REACT_APP_SERVER}/subtask/`,
        subtask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )).data;
    } else {
      const id = subtask.todo.id ? subtask.todo.id : subtask.todo;
      const todo = yield db.table('todo').get(id);
      const subtaskIndex =
        (id as number) * 1000 +
        Math.max.apply(
          null,
          todo.subtasks.map((st: Subtask) => st.id)
        ) +
        1;
      const subtaskWithIndex = update(subtask, { id: { $set: subtaskIndex } });
      db.table('todo').update(
        id,
        update(todo, { subtasks: { $push: [subtaskWithIndex] } })
      );
      responseSubtask = subtaskWithIndex as Subtask;
    }
    yield put(createSubtaskSuccessAction(responseSubtask));
  }
}

function* remove({ payload: subtask }: ActionType<typeof deleteSubtaskAction>) {
  if (navigator.onLine) {
    const token = yield select(getToken);
    yield axios.delete(
      `${process.env.REACT_APP_SERVER}/subtask/${subtask.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    const id = subtask.todo.id ? subtask.todo.id : subtask.todo;
    const todo = yield db.table('todo').get(id);
    const subtaskIndex = todo.subtasks.findIndex(
      (st: Subtask) => st.id === subtask.id
    );
    db.table('todo').update(
      id,
      update(todo, { subtasks: { $splice: [[subtaskIndex, 1]] } })
    );
  }
  yield put(deleteSubtaskSuccessAction(subtask));
}

function* toggleTodoStatusDependingOnSubtasks({
  payload: subtask,
  type,
}: ActionType<
  | typeof updateSubtaskSuccessAction
  | typeof createSubtaskSuccessAction
  | typeof deleteSubtaskSuccessAction
>) {
  let id: Todo | number = subtask.todo;
  if (typeof id !== 'number' && subtask.todo.id) {
    id = subtask.todo.id;
  }
  const todo = yield select(getTodo(id as number));
  const subtasks = todo.subtasks;
  const subtaskIndex = subtasks.findIndex(
    (st: Subtask) => st.id === subtask.id
  );

  if (type === CREATE_SUBTASK_SUCCESS && subtaskIndex === -1) {
    subtasks.push(subtask);
  } else if (type === UPDATE_SUBTASK_SUCCESS && subtaskIndex > -1) {
    subtasks[subtaskIndex] = subtask;
  } else if (type === DELETE_SUBTASK_SUCCESS && subtaskIndex > -1) {
    subtasks.splice(subtaskIndex, 1);
    if (subtasks.length === 0) {
      return;
    }
  }
  const allDone = subtasks.every((st: Subtask) => st.done);

  yield put(saveTodoAction(update(todo, { done: { $set: allDone } })));
}

export default function* todoSaga() {
  yield takeLatest(SAVE_SUBTASK, save);
  yield takeLatest(DELETE_SUBTASK, remove);
  yield takeLatest(
    [UPDATE_SUBTASK_SUCCESS, CREATE_SUBTASK_SUCCESS, DELETE_SUBTASK_SUCCESS],
    toggleTodoStatusDependingOnSubtasks
  );
}
