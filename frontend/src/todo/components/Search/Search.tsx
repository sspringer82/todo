import React, { ChangeEvent, useState } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { searchAction } from '../../actions/todo.actions';
import { SearchField, SearchIcon, ClearIcon } from './Search.styles';

const Search: React.FC = () => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  function handleFieldChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    handleSearch(value);
  }

  function clearSearch() {
    handleSearch('');
  }

  function handleSearch(value: string) {
    setSearch(value);
    dispatch(searchAction(value));
  }

  return (
    <SearchField
      placeholder="Suche"
      variant="outlined"
      onChange={handleFieldChange}
      value={search}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={clearSearch}
              style={{ visibility: search.length > 0 ? 'visible' : 'hidden' }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Search;
