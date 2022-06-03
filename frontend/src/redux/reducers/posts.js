import { FETCH_ALL, CREATE, FETCH_POST, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, STOP_LOADING}  from '../../constants/actionTypes';

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
            return { ...state, posts: action.payload }
        case FETCH_POST:
            return { ...state, post: action.payload }
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