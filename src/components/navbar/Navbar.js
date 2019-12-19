import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: "#ff742b", marginBottom: "10px",}}>
        <Toolbar disableGutters>
          <img src="//d3nb9u6x572n0.cloudfront.net/packs/media/images/logo-hn-search-a822432b.png" width="48px" />
          <h3 style={{color: "black"}}>Hacker News</h3>
          <h5 style={{marginLeft: "auto", paddingRight: "10px", color: "black"}}>login</h5>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar