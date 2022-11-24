import * as api from '../../api';
import { FETCH_ALL, CREATE, FETCH_POST, START_LOADING, STOP_LOADING,FETCH_BY_SEARCH, UPDATE, DELETE, COMMENT, FETCH_BY_CREATOR}  from '../../constants/actionTypes'

// Action Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error.message);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error.message);
    }
}

export const getPostsByCreator = (name) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { data } } = await api.fetchPostsByCreator(name);
  
      dispatch({ type: FETCH_BY_CREATOR, payload: { data } });
      dispatch({ type: STOP_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery)

        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPost(post);

        history.push(`/posts/${data._id}`)
        dispatch ({ type: CREATE, payload: data})
        dispatch({ type: STOP_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data} = await api.comment(value, id);
        
        dispatch({ type: COMMENT, payload: data})
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}