import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/core';
import { useSearchContext } from '../SearchContext';
import Result from './Result';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  header: {
    marginTop: '1em',
    textAlign: 'center',
  },
});

export default function Results() {
  const { repositories } = useSearchContext();

  const { container } = useStyles();

  const mappedResults = useMemo(
    () =>
      repositories.map((repo, i) => (
        <Result repository={repo} key={`repo-${i}`} index={i} />
      )) || [],
    [repositories]
  );

  return <div className={container}>{mappedResults}</div>;
}
