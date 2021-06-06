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
import { node, number, object, string } from 'prop-types';

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
  }),
);

Card.propTypes = {
  id: string.isRequired,
  classOverrides: object,
  title: string.isRequired,
  content: node.isRequired,
  footer: node,
  color: number.isRequired,
  subHeader: string,
  contentClassName: string,
};
export function Card({
  id,
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
  const cardId = `${id}-card`;

  return (
    <MUICard
      id={cardId}
      className={classes.root}
      classes={classOverrides}
      variant="outlined"
      {...rest}>
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
      {footer && (
        <div className={classes.footer} id={`${cardId}-footer`}>
          {footer}
        </div>
      )}
    </MUICard>
  );
}
