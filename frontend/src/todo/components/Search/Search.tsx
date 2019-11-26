import React, { ChangeEvent } from 'react';
import { InputAdornment } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchAction } from '../../actions/todo.actions';
import { SearchField, SearchIcon } from './Search.styles';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    dispatch(searchAction(value));
  }

  return (
    <SearchField
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
