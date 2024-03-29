import React, {useState} from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom'

import useStyles from './styles'
import { deletePost, likePost } from "../../../redux/actions/posts";

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result.googleId || user?.result?._id;
    const hasLikedPost = likes.find((like) => like === (userId))

    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (userId))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} pledge${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Pledge' : 'Pledges'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Pledge</>;
    };

    const datetime = post.datetime;
    var dateOnly = new Date(datetime).toLocaleDateString();
    console.log(dateOnly);


    const handleLike = async () => {
        dispatch(likePost(post._id))

        if(hasLikedPost) {
            setLikes(likes.filter((id) => id !== (userId)))
        } else {
            setLikes([ ...likes, userId]) 
        }
    }

    const openPost = () => history.push(`/posts/${post._id}`)
    
    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
             className={classes.cardAction} 
             onClick={openPost}
             component="span"
             name="test">
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.username}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?._id === post?.creator) && (
            <div className={classes.overlay2} name="edit">
                <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>
            )}
            <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)} </Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title} </Typography>
            <Typography className={classes.details} variant="body2" color="textSecondary">Date: {dateOnly} </Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message} </Typography>
            </CardContent>          
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </Button>
                {(user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}             
            </CardActions>
        </Card>
    );
}

export default Post;