import { FETCH_ALL, CREATE, FETCH_POST, UPDATE, DELETE, COMMENT, FETCH_BY_SEARCH, START_LOADING, FETCH_BY_CREATOR, STOP_LOADING}  from '../../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case UPDATE:
            return { ...state, posts: state.map((post) => post._id === action.payload._id ? action.payload : post)}
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH :
        case FETCH_BY_CREATOR:
            return { ...state, posts: action.payload }
        case FETCH_POST:
            return { ...state, post: action.payload }
        case COMMENT:
            return { 
                ...state,
                posts: state.posts.map((post) => {
                    if(post._id === action.payload._id) return action.payload;
                    
                    return post;
                })
            };
        case CREATE:
            return {...state, posts: [...state, action.payload]};
        case START_LOADING:
            return { ...state, isLoading: true };
        case STOP_LOADING:
            return { ...state, isLoading: false};
        case DELETE:
            return {...state, posts: state.filter((post) => post._id !== action.payload) }
        default:
            return state;
    }
}