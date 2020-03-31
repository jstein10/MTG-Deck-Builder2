import React from "react";
// import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
    },
    menuButton: {
    marginRight: theme.spacing(2),
    },
    title: {
    flexGrow: 1,
    },
}));

export default () => {

    const { isAuthenticated, loginWithRedirect, logout, loading, user } = useAuth0();

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundImage: 'url(https://i.ytimg.com/vi/T40NSkd7Olc/maxresdefault.jpg)'}}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img src='https://media.magic.wizards.com/MTG_Logo_Top_en.png' style={{height:'40px'}} alt='logo'/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {isAuthenticated && !loading? `Welcome, ${user.name}!`:'MTG Deck Builder'}
                </Typography>

                {isAuthenticated ? 
                    <Button  color='inherit' onClick={() => logout()}>Log out</Button>
                :
                    <Button color='inherit' onClick={() => loginWithRedirect({})}>Log in</Button>
                }
                </Toolbar>
            </AppBar>
        </div>
    );
};
