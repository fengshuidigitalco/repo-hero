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

export default function Results({}) {
  const { repositories, isLoading } = useSearchContext();

  const { container } = useStyles();

  const mappedResults = useMemo(
    () =>
      Object.values(repositories).map((repo, i) => (
        <Result repository={repo} key={`repo-${i}`} index={i} />
      )),
    [repositories]
  );

  const content = isLoading ? null : mappedResults;
  return <div className={container}>{content}</div>;
}
