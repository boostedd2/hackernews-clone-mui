import React, { useState } from 'react';
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
    color: "black",
    '& a': {
      color: "black",
      textDecoration: "none",
    }
  },
  post_link: {
    marginLeft: "5px",
    fontSize: "12px",
    color: "grey",
  },
  stats_cont: {
    display: "flex",
    flexWrap: "wrap",
    color: "grey",
    fontSize: "12px",
    marginBottom: "10px",
  },
}));

const PostList = () => {
  const classes = useStyles();
  const [displayPosts, setDisplayPosts] = useState(dummy)

  function url_domain(data) {
    var a = document.createElement('a');
    if (data === null) {
      return ''
    }
    a.href = data;
    return '(' + a.hostname.replace(/^www\./,'') + ')';
  }

  function localUrl(data, id) {
    if (data === null) {
      return 'https://news.ycombinator.com/item?id=' + id
    }
    return data
  }

  function timeconvert(time) {
    var postDate = new Date(time)
    var currDate = new Date()
    var diff = currDate - postDate
    if (diff > 60e3) { 
      console.log(Math.floor(diff / 3600e3), 'hours ago');
      return Math.floor(diff / 3600e3), 'hours ago'
    }
    else console.log(
      Math.floor(diff / 60e3), 'minutes ago');
      return Math.floor(diff / 60e3), 'minutes ago'
  }

  return(
    <div className={classes.root}>
      {displayPosts.hits.map((item, index) =>
        <>
          <div style={{color: "grey", float: "left"}}>{index + 1}.</div>
          <div className={classes.post_cont}>
            <div className={classes.title_cont}>
              <div className={classes.post_title}><a href={localUrl(item.url, item.objectID)}>{item.title}</a></div>
              <div className={classes.post_link}>{url_domain(item.url)}</div>
            </div>
            <div className={classes.stats_cont}>
              <div>{`${item.points} points by ${item.author} ${timeconvert(item.created_at)} ago`} |</div>
              <div className={classes.hide_button}>&nbsp;hide&nbsp;</div>
              <div>| {item.num_comments} comments</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PostList;