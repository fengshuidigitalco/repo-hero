import React from 'react';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Badge,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ErrorIcon from '@material-ui/icons/Error';
import { blue } from '@material-ui/core/colors';
import { useSearchContext } from '../SearchContext';

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      backgroundColor: (props) => blue[props.colorNumber],
    },
    badges: {
      ...theme.flexContainer.row,
      justifyContent: 'space-around',
    },
    cardHeader: {
      fontSize: '20px',
      fontWeight: 700,
    },
    content: {
      height: 110,
      overflow: 'hidden',
      paddingBottom: '40px',
      textOverflow: 'ellipsis',
    },
    formContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      marginTop: '1em',
      textAlign: 'center',
    },
    root: {
      cursor: 'pointer',
      marginBottom: '1em',
      minWidth: 275,
      paddingBottom: '1em',
      maxWidth: '90vw',
      width: '100%',
      '& *': {
        transition: 'transform 150ms ease',
      },
      '&:active, &:active *': {
        transform: 'scale(0.96)',
      },
      [theme.breakpoints.up('md')]: {
        margin: '1em',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 300,
      },
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    },
    description: {
      fontSize: 14,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  })
);

const determineColorNumber = (number) => {
  const stringNumber = `${number}`;
  const finalDigit = stringNumber.split('').pop();
  return parseInt(`${finalDigit}00`);
};

export default function Result({ repository, index }) {
  const history = useHistory();
  const { selectRepository } = useSearchContext();
  const props = { colorNumber: determineColorNumber(index) };
  const classes = useStyles(props);
  const {
    id,
    name,
    description,
    language,
    watchers,
    stargazers_count,
    forks,
    git_url,
    open_issues,
  } = repository;

  const onClick = () => {
    selectRepository(id);
    history.push(`/repository/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined" onClick={onClick}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {name.charAt(0)}
          </Avatar>
        }
        title={name}
        subheader={language}
        classes={{ title: classes.cardHeader }}
      />
      <CardContent className={classes.content}>
        <Typography
          className={classes.description}
          color="textSecondary"
          gutterBottom
        >
          {description}
        </Typography>
      </CardContent>
      <div className={classes.badges}>
        <Badge badgeContent={stargazers_count} color="secondary">
          <StarIcon color="primary" />
        </Badge>
        <Badge badgeContent={watchers} color="secondary">
          <VisibilityIcon color="primary" />
        </Badge>
        <Badge badgeContent={open_issues} color="secondary">
          <ErrorIcon color="primary" />
        </Badge>
        <Badge badgeContent={forks} color="secondary">
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
      </div>
    </Card>
  );
}
