import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { fetcher } from '../../api';

const useStyles = makeStyles({
  formContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginTop: '1em',
    textAlign: 'center',
  },
});

export default function Search({}) {
  const { formContainer, header } = useStyles();
  const { control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log('**data', data);
    const { search, sort, order } = data;
    // const queryString =
    //   'q=' + encodeURIComponent(`${search} sort:${sort} order:${order}`);
    const queryString = `q=${search}&sort=${sort}&order=${order}`;

    const url = `/search/repositories?q=${queryString}`;
    const res = await fetcher({ url });
    console.log('**res', res);
  };

  return (
    <div>
      <Typography variant="h1" component="h2" gutterBottom className={header}>
        Repo Hero
      </Typography>
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
