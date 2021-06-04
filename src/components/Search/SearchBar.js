import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { fetcher } from '../../api';
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

export default function SearchBar({}) {
  const { setRepositories, setIsLoading, isLoading } = useSearchContext();
  const { formContainer, search } = useStyles();
  const { control, handleSubmit } = useForm();

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
      <form onSubmit={handleSubmit(onSubmit)} className={formContainer}>
        <Controller
          name="search"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              id="standard-basic"
              label="Search Repositories"
              {...field}
              className={search}
            />
          )}
        />
        <Controller
          name="sort"
          control={control}
          defaultValue="best match"
          render={({ field }) => (
            <FormControl>
              <InputLabel id="search-sort">Sort</InputLabel>
              <Select {...field}>
                <MenuItem value="best match">Best Match</MenuItem>
                <MenuItem value="stars">Stars</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="order"
          control={control}
          defaultValue="desc"
          render={({ field }) => (
            <FormControl>
              <InputLabel id="search-sort-order">Sort Order</InputLabel>
              <Select {...field}>
                <MenuItem value="desc">Descending</MenuItem>
                <MenuItem value="asc">Ascending</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          Query
        </Button>
      </form>
    </div>
  );
}
