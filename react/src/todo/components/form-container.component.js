import { connect } from 'react-redux';
import { FormWithRouter } from './form.component';
import { addTodo } from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    onCreateTodo: todo => {
      dispatch(addTodo(todo));
    },
  };
};

export const Form = connect(null, mapDispatchToProps)(FormWithRouter);
