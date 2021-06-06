import React from 'react';
import {
  Avatar,
  Card as MUICard,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import cx from 'classnames';

const useStyles = makeStyles((theme) =>
  createStyles({
    avatar: {
      backgroundColor: (props) => blue[props.colorNumber],
    },
    footer: {
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
      marginBottom: '40px',
      textOverflow: 'ellipsis',
    },
    root: {
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
      maxWidth: '90vw',
      marginBottom: '1em',
      minWidth: 275,
      paddingBottom: '1em',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        margin: '1em',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: 300,
      },
    },
  })
);

export function Card({
  classOverrides,
  title,
  content,
  footer,
  color,
  subHeader,
  contentClassName,
  ...rest
}) {
  const props = { colorNumber: color };
  const classes = useStyles(props);

  return (
    <MUICard
      className={classes.root}
      classes={classOverrides}
      variant="outlined"
      {...rest}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="title" className={classes.avatar}>
            {title.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader={subHeader}
        classes={{ title: classes.cardHeader }}
      />
      <CardContent className={cx(classes.content, contentClassName)}>
        {content}
      </CardContent>
      <div className={classes.footer}>{footer}</div>
    </MUICard>
  );
}
