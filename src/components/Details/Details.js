import React from 'react';
import {
  Badge,
  createStyles,
  makeStyles,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import { useSearchContext } from '../Search/SearchContext';
import { Card } from '../Card';

const useStyles = makeStyles((theme) =>
  createStyles({
    cardClass: {
      cursor: 'default',
      margin: '2em auto',
      maxWidth: '90%',
      [theme.breakpoints.up('md')]: {
        margin: '2em auto',
        width: '80%',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '80%',
      },
    },
    content: {
      height: 'auto',
    },
    description: {
      fontSize: 14,
      marginBottom: '1em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    header: {
      fontSize: '20px',
      margin: 'auto',
      paddingTop: '2em',
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        fontSize: '25px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '48px',
      },
    },
    link: {
      textDecoration: 'underline',
    },
    row: {
      ...theme.flexContainer.row,
      flexWrap: 'wrap',
      marginTop: '2em',
      width: '100%',
      justifyContent: 'space-evenly',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-start',
      },
    },
  })
);

export default function Details({ repository, index }) {
  const classes = useStyles();
  const { selectedRepository } = useSearchContext();

  if (!selectedRepository) {
    return (
      <Typography
        variant="h3"
        component="h2"
        gutterBottom
        className={classes.header}
      >
        Repository not found.
      </Typography>
    );
  }

  const {
    name,
    description,
    language,
    watchers,
    stargazers_count,
    forks,
    html_url,
    open_issues,
    score,
    license,
  } = selectedRepository;
  const key = license?.key || null;

  return (
    <Card
      classOverrides={{ root: classes.cardClass }}
      title={name}
      color={500}
      contentClassName={classes.content}
      subHeader={language}
      content={
        <>
          <Typography
            className={classes.description}
            color="textSecondary"
            gutterBottom
          >
            {description}
          </Typography>
          <a href={html_url} target="_blank" rel="noreferrer">
            <span className={classes.link}>View On Github</span>
          </a>
          <div className={classes.row}>
            {key && (
              <span>
                License: <span>{key}</span>
              </span>
            )}
            <span>
              score: <span>{score}</span>
            </span>
          </div>
        </>
      }
      footer={
        <>
          <Badge badgeContent={stargazers_count} color="secondary" max={10000}>
            <StarIcon color="primary" />
          </Badge>
          <Badge badgeContent={watchers} color="secondary" max={10000}>
            <VisibilityIcon color="primary" />
          </Badge>
          <Badge badgeContent={open_issues} color="error" max={10000}>
            <ErrorIcon color="primary" />
          </Badge>
          <Badge badgeContent={forks} color="secondary" max={10000}>
            <SvgIcon viewBox="0 0 34 34" color="primary">
              <path
                d="M27.131,8.383c0-2.092-1.701-3.794-3.794-3.794s-3.793,1.702-3.793,3.794c0,0.99,0.39,1.885,1.013,2.561
		c-0.474,2.004-1.639,2.393-4.167,3.029c-1.279,0.322-2.753,0.7-4.099,1.501V7.003c1.072-0.671,1.793-1.854,1.793-3.209
		C14.084,1.702,12.382,0,10.292,0C8.199,0,6.497,1.702,6.497,3.794c0,1.356,0.722,2.539,1.795,3.21v19.62
		c-1.073,0.671-1.795,1.854-1.795,3.21c0,2.092,1.702,3.794,3.795,3.794c2.092,0,3.793-1.702,3.793-3.794
		c0-1.355-0.722-2.539-1.793-3.209v-3.846c0.496-3.768,2.321-4.232,5.075-4.926c2.527-0.637,5.955-1.513,7.048-5.852
		C25.981,11.535,27.131,10.099,27.131,8.383z M10.292,2.002c0.988,0,1.793,0.805,1.793,1.794c0,0.989-0.806,1.793-1.793,1.793
		c-0.989,0-1.795-0.805-1.795-1.793C8.498,2.806,9.302,2.002,10.292,2.002z M10.292,31.627c-0.989,0-1.795-0.807-1.795-1.794
		c0-0.989,0.806-1.793,1.795-1.793c0.988,0,1.793,0.806,1.793,1.793C12.085,30.824,11.28,31.627,10.292,31.627z M23.337,10.177
		c-0.989,0-1.793-0.805-1.793-1.793c0-0.989,0.806-1.794,1.793-1.794c0.988,0,1.794,0.805,1.794,1.794
		C25.131,9.373,24.327,10.177,23.337,10.177z"
              />
            </SvgIcon>
          </Badge>
        </>
      }
    />
  );
}
