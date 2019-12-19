import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dummy from './dummy'

const plist = dummy

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    height: "100%",
    backgroundColor: "#f6f6ef",
    padding: "10px",
  },
  post_cont: {
    display: "flex",
    flexDirection: "column",
  },
  title_cont: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  post_title: {
    color: "black"
  },
  post_link: {
    marginLeft: "5px",
    fontSize: "12px",
    color: "grey",
  },
  stats_cont: {
    display: "flex",
    color: "grey",
    fontSize: "12px",
    marginBottom: "10px",
  }
}));

const PostList = () => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      {plist.hits.map((item, index) =>
        <>
          <div style={{color: "grey", float: "left"}}>{index + 1}.</div>
          <div className={classes.post_cont}>
            <div className={classes.title_cont}>
              <div className={classes.post_title}>{item.title}</div>
              <div className={classes.post_link}>(Link)</div>
            </div>
            <div className={classes.stats_cont}>
              <div>{`${item.points} by ${item.author} 2 hours ago`}</div>
              <div>| hide |</div>
              <div>{item.num_comments} comments</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PostList;