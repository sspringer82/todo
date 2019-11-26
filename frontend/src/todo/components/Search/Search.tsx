import React, { ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { searchAction } from '../../actions/todo.actions';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    dispatch(searchAction(value));
  }

  return (
    <TextField
      placeholder="Suche"
      variant="outlined"
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
