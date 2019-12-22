import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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
  hide_button: {
    '& a': {
      color: "grey",
      textDecoration: "none",
    },
    '& a:hover': {
      textDecoration: "underline"
    }
  },
  comments: {
    '& a': {
      color: "grey",
      textDecoration: "none",
    },
    '& a:hover': {
      textDecoration: "underline",
    }
  }
}));

const PostList = () => {
  const classes = useStyles();
  const [displayPosts, setDisplayPosts] = useState('')
  const [cachedPosts, setCachedPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        'http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30'
      );
        setDisplayPosts(result.data)
        cachedPosts.push(result.data)
        console.log(cachedPosts)
        setIsLoading(false)
    };
    fetchData();
  }, []);

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
    if (diff > 3600e3) {
      if (diff / 3600e3 > 24) {
        return Math.floor(diff / 3600e3) % 24 + ' days ago'
      }
      return (Math.floor(diff / 3600e3) + ' hours ago')
    }
    else return (Math.floor(diff / 60e3) + ' minutes ago')
  }

  return(
    <div className={classes.root}>
      {isLoading ? <Loading /> :
      displayPosts.hits.map((item, index) =>
        <>
          <div style={{color: "grey", float: "left"}}>{index + 1}.</div>
          <div className={classes.post_cont}>
            <div className={classes.title_cont}>
              <div className={classes.post_title}><a href={localUrl(item.url, item.objectID)}>{item.title}</a></div>
              <div className={classes.post_link}>{url_domain(item.url)}</div>
            </div>
            <div className={classes.stats_cont}>
              <div>{`${item.points} points by ${item.author} ${timeconvert(item.created_at)}`}</div>
              <div>&nbsp;|&nbsp;</div>
              <div className={classes.hide_button}><a href="#">hide</a></div>
              <div>&nbsp;|&nbsp;</div>
              <div className={classes.comments}><a href={'https://news.ycombinator.com/item?id=' + item.objectID}>{item.num_comments} comments</a></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const Loading = () => {
  return(
    <div>Loading...</div>
  )
}

export default PostList;