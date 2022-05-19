import React ,{useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux';

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

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Canine Shelter </Typography>
                <img src={logo} alt="memmories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
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