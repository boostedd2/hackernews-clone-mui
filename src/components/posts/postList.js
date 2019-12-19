import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: "80%",
    margin: "auto",
  },
  title_cont: {
    display: "flex",
  },
  post_title: {
    color: "black"
  },
  post_link: {
    marginLeft: "5px",
    alignContent: "center",
    fontSize: "12px",
    color: "grey",
  }
}));

const PostList = () => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.title_cont}>
        <div className={classes.post_title}>Title</div>
        <div className={classes.post_link}>(Link)</div>
      </div>
      <div>
        <div>points</div>
        <div>by User</div>
        <div>2 hours ago</div>
        <div>| hide |</div>
        <div>12 comments</div>
      </div>
    </div>
  )
}

export default PostList;