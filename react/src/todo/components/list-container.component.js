import { connect } from 'react-redux';
import { ListWithRouter } from './list.component';

const mapStateToProps = state => {
  return state.todos;
};

export const TodoList = connect(mapStateToProps)(ListWithRouter);
