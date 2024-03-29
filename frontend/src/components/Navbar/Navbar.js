import React ,{useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import logo from '../../images/logo.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/')
        setUser(null);
    }

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect (() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Gift List</Typography>
                <img src={logo} alt="logo" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.username} src={user.result.imageUrl}>{user.result.username.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.username}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;