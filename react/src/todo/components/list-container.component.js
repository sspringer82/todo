import { connect } from 'react-redux';
import { List } from './list.component';

const mapStateToProps = state => {
  return state.todos;
};

export const TodoList = connect(mapStateToProps)(List);
