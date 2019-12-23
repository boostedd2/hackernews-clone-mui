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
  user: {
    '& a': {
      color: "grey",
      textDecoration: "none",
    },
    '& a:hover': {
      textDecoration: "underline"
    }
  },
  time: {
    '& a': {
      color: "grey",
      textDecoration: "none",
    },
    '& a:hover': {
      textDecoration: "underline"
    }
  },
  hide_button: {
    '& a': {
      color: "grey",
      textDecoration: "none",
    },
    '& a:hover': {
      textDecoration: "underline",
      cursor: "pointer"
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
  const [searchTerm, setSearchTerm] = useState('')
  const [extraPosts, setExtraPosts] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(async () => {
    const fetchData = async () => {
      const result = await axios(
        'http://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=30'
      );
        setDisplayPosts(result.data.hits)
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
      if (diff / 3600e3 > 24 >= 1) {
        return Math.floor(diff / 3600e3) % 24 + ' days ago'
      }
      return (Math.floor(diff / 3600e3) + ' hours ago')
    }
    else return (Math.floor(diff / 60e3) + ' minutes ago')
  }

  function loadMore() {
    axios.get(
      `http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${extraPosts.toString()}&hitsPerPage=30`
    )
    .then(result => {
      setExtraPosts(extraPosts + 1)
      setDisplayPosts(result.data.hits)
      setIsLoading(false)
      })
  }

  function onSearch(searchTerm) {
    axios.get(
      `http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${extraPosts.toString()}&hitsPerPage=30`
    )
    .then(result => {
      setDisplayPosts(result.data.hits)
      setIsLoading(false)
      })
  }

  function onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = displayPosts.filter(isNotId);
    console.log(updatedList)
    setDisplayPosts(updatedList)
  }

  return(
    <div className={classes.root}>
      {isLoading ? <Loading /> :
      displayPosts.map((item, index) =>
        <div key={index}>
          <div style={{color: "grey", float: "left"}}>{index + 1}.</div>
          <div className={classes.post_cont}>
            <div className={classes.title_cont}>
              <div className={classes.post_title}><a href={localUrl(item.url, item.objectID)} target="_blank" rel="noopener noreferrer">{item.title}</a></div>
              <div className={classes.post_link}>{url_domain(item.url)}</div>
            </div>
            <div className={classes.stats_cont}>
              <div>{`${item.points} points by`}&nbsp;</div>
              <div className={classes.user}><a href={'https://news.ycombinator.com/user?id='+ item.author} target="_blank" rel="noopener noreferrer">{item.author}</a></div>
              <div>&nbsp;</div>
              <div className={classes.time}><a href={'https://news.ycombinator.com/item?id=' + item.objectID} target="_blank" rel="noopener noreferrer">{timeconvert(item.created_at)}</a></div>
              <div>&nbsp;|&nbsp;</div>
              <div className={classes.hide_button}><a onClick={() => onDismiss(item.objectID)}>hide</a></div>
              <div>&nbsp;|&nbsp;</div>
              <div className={classes.comments}><a href={'https://news.ycombinator.com/item?id=' + item.objectID} target="_blank" rel="noopener noreferrer">{item.num_comments} comments</a></div>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => loadMore()}>More</button>
      <input type="text" onChange={e => setSearchTerm(e.target.value)}></input>
      <button onClick={() => onSearch(searchTerm)}>Search</button>
      <div>Page: {extraPosts.toString()}</div>
      <div>Results of: {searchTerm}</div>
    </div>
  )
}

const Loading = () => {
  return(
    <div>Loading...</div>
  )
}

export default PostList;