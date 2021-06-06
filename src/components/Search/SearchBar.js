import React, { useCallback, useEffect, useState } from 'react';
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import cx from 'classnames';
import { fetcher } from '../../api';
import { useDebounce } from '../../hooks';
import { ASC, DESC } from '../../constants';
import { useSearchContext } from './SearchContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingBottom: '1em',
      width: '100%',
    },
    row: {
      ...theme.flexContainer.row,
      flexWrap: 'wrap',
      width: '100%',
      justifyContent: 'space-between',
    },
    errorMessage: {
      color: red[500],
    },
    formContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      margin: 'auto',
      [theme.breakpoints.up('md')]: {
        maxWidth: '80%',
      },
    },
    input: {
      width: '100%',
    },
    select: {
      width: '100%',
      [theme.breakpoints.up('smTab')]: {
        maxWidth: '30%',
      },
    },
    languageInput: {
      [theme.breakpoints.up('smTab')]: {
        maxWidth: '30%',
      },
    },
    commonInput: {
      marginBottom: '1em',
    },
  }),
);

const determineErrorMessage = (status) => {
  switch (status) {
    case 403: {
      return 'Search request limit reached. Please try again in a bit';
    }
    case 422: {
      return 'Incorrectly formatted query. This code is broken!';
    }
    case 503: {
      return "Gitub's API is down. Please try again in a bit.";
    }
    default: {
      return 'An error occurred. Please try again in a bit.';
    }
  }
};

export default function SearchBar({ id }) {
  const { setRepositories, updateSearch, search } = useSearchContext();
  const [error, setError] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    commonInput,
    container,
    errorMessage,
    languageInput,
    formContainer,
    input,
    row,
    select,
  } = useStyles();

  const { language, term, sort, order } = search;
  const debouncedSearchTerm = useDebounce(term, 500);
  const debouncedLangauge = useDebounce(language, 500);

  const getRepositories = useCallback(
    async (searchTerm, sort, order, language) => {
      let queryString = `q=${searchTerm}`;

      if (language) {
        queryString = `${queryString}+language:${language}`;
      }

      queryString = `${queryString}&sort=${sort}&order=${order}`;

      const url = `/search/repositories?q=${queryString}`;
      const { error, items } = await fetcher({ url });

      if (!!error) {
        const { status } = error;
        const determinedErrorMessage = determineErrorMessage(status);
        setError(determinedErrorMessage);
        setIsDisabled(true);
        return;
      }

      setRepositories(items);
    },
    [setRepositories],
  );

  useEffect(() => {
    if (isDisabled) {
      setTimeout(() => setIsDisabled(false), 10000);
    }
  }, [isDisabled]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getRepositories(
        debouncedSearchTerm,
        search.sort,
        search.order,
        debouncedLangauge,
      );
    }
  }, [
    debouncedSearchTerm,
    getRepositories,
    search.sort,
    search.order,
    debouncedLangauge,
  ]);

  const searchBarId = `${id}-bar`;

  return (
    <div className={container}>
      <div className={formContainer}>
        <div className={row}>
          <TextField
            id={`${searchBarId}-term`}
            label="Search Repositories"
            className={cx(input, commonInput)}
            value={term}
            onChange={(e) => updateSearch({ ...search, term: e.target.value })}
            disabled={isDisabled}
          />
          <div className={row}>
            <FormControl className={cx(select, commonInput)}>
              <InputLabel id="search-sort">Sort</InputLabel>
              <Select
                id={`${searchBarId}-sort`}
                value={sort}
                onChange={(e) =>
                  updateSearch({ ...search, sort: e.target.value })
                }
                disabled={isDisabled}>
                <MenuItem value="best match">Best Match</MenuItem>
                <MenuItem value="stars">Stars</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={cx(select, commonInput)}>
              <InputLabel id="search-sort-order">Sort Order</InputLabel>
              <Select
                id={`${searchBarId}-sort-order`}
                value={order}
                onChange={(e) =>
                  updateSearch({ ...search, order: e.target.value })
                }
                disabled={isDisabled}>
                <MenuItem value={DESC}>Descending</MenuItem>
                <MenuItem value={ASC}>Ascending</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id={`${searchBarId}-filter`}
              label="Filter By Language"
              className={cx(input, commonInput, languageInput)}
              value={language}
              onChange={(e) =>
                updateSearch({ ...search, language: e.target.value })
              }
              disabled={isDisabled}
            />
          </div>
        </div>
        {error && <span className={errorMessage}>{error}</span>}
      </div>
    </div>
  );
}
