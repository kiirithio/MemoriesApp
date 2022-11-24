import React, {useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import {useDispatch, useSelector }  from 'react-redux';
import { useHistory } from "react-router-dom";


import useStyles from './styles'
import { createPost, updatePost } from "../../redux/actions/posts";

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null)
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: '', datetime: ''
    })
    const classes = useStyles();
    const dispatch= useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId = null;
        setPostData({ title:'', message:'', tags:'', selectedFile:''})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === null) {
            dispatch(createPost({ ...postData, username: user?.result?.username }, history));
            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, username: user?.result?.username }));
            clear();
        }
    }

    if(!user?.result?.username) {
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Sign In to add an event or pledge to one.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}` } onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating' } an Event</Typography>
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
            <TextField
                id="datetime-local"
                name="datetime"
                label="Event Date"
                type="datetime-local"
                fullWidth
                value={postData.datetime}
                onChange={(e) => setPostData({ ...postData, datetime: e.target.value })}
                defaultValue="2022-11-26T10:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <div className={classes.fileInput}>
                <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64}) =>setPostData({ ...postData, selectedFile: base64 })}
                 />
            </div>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;