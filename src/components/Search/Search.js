import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import SearchBar from './SearchBar';
import { Results } from './Results';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '1em',
  },
  header: {
    marginTop: '1em',
    textAlign: 'center',
  },
});

export default function Search({}) {
  const { container, header } = useStyles();

  return (
    <div className={container}>
      <Typography variant="h3" component="h2" gutterBottom className={header}>
        Repo Hero
      </Typography>
      <SearchBar />
      <Results />
    </div>
  );
}
