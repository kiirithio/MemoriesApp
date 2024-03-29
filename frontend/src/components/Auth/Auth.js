import React , {useState} from 'react';
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import FileBase from 'react-file-base64';

import Input from './Input';
import useStyles from './styles';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes'
import { signin, signup } from '../../redux/actions/auth'

const initialState = { userame: '', email:'', password:'', confirmPassword:''}
const clientId = "598579548721-rpm47c5i81tk6naivn2apadouvq82evq.apps.googleusercontent.com"
const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData, setFormData] = useState(initialState);

    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevIsSignUp) => !prevIsSignUp );
        setShowPassword(false)
    }
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token }})

            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = async (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try again later.")
    }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {isSignup && (
                        <>
                            <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        </>
                        
                    )}
                    <Input name="username" label="User Name" handleChange={handleChange} autoFocus/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignup ? "Sign Up" : "Sign In"}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth