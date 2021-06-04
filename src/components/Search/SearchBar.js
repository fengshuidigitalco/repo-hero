import React, { useCallback, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { fetcher } from '../../api';
import { useDebounce } from '../../hooks';
import { useSearchContext } from './SearchContext';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  header: {
    marginTop: '1em',
    textAlign: 'center',
  },
  search: {
    width: '100%',
  },
});

export default function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');

  const { setRepositories, setIsLoading } = useSearchContext();
  const { formContainer, search } = useStyles();
  const debouncedSearchTerm = useDebounce(searchString, 500);

  const getRepositories = useCallback(
    async (searchTerm) => {
      setIsLoading(true);
      const queryString = `q=${searchTerm}&sort=${sort}&order=${order}`;

      const url = `/search/repositories?q=${queryString}`;
      const res = await fetcher({ url });

      setRepositories(res.items);
      setIsLoading(false);
    },
    [order, sort, setRepositories, setIsLoading]
  );

  useEffect(() => {
    getRepositories(debouncedSearchTerm);
  }, [debouncedSearchTerm, getRepositories]);

  const onSubmit = async (data) => {
    const { search, sort, order } = data;
    setIsLoading(true);

    const queryString = `q=${search}&sort=${sort}&order=${order}`;

    const url = `/search/repositories?q=${queryString}`;
    const res = await fetcher({ url });

    setRepositories(res.items);
    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={formContainer}>
        <TextField
          id="standard-basic"
          label="Search Repositories"
          className={search}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        <FormControl>
          <InputLabel id="search-sort">Sort</InputLabel>
          <Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <MenuItem value="best match">Best Match</MenuItem>
            <MenuItem value="stars">Stars</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="search-sort-order">Sort Order</InputLabel>
          <Select value={order} onChange={(e) => setOrder(e.target.value)}>
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>

        {/* <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          Query
        </Button> */}
      </form>
    </div>
  );
}
