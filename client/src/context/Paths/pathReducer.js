import {
	ADD_PATH,
	DELETE_PATH,
	PATH_ERROR,
	UPDATE_PATH,
	GET_PATHS,
	HIDE_PATHS,
	SET_CURRENT,
	CLEAR_CURRENT,
} from '../types.js'

export default (state, action) => {
	switch (action.type) {
		case ADD_PATH:
			return {
				...state,
				paths: [...state.paths, action.payload],
				loading: false,
			}
		case GET_PATHS:
			return {
				...state,
				paths: action.payload,
				loading: false,
			}
		case DELETE_PATH:
			return {
				...state,
				paths: state.paths.filter((path) => path._id !== action.payload),
				loading: false,
			}
		case HIDE_PATHS:
			return {
				...state,
				visible: !state.visible,
			}
		case UPDATE_PATH:
			return {
				...state,
				paths: state.paths.map((path) =>
					path._id === action.payload._id ? action.payload : path
				),
			}
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			}
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			}
		case PATH_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			}
		default:
			throw new Error(`Unsupported type of: ${action.type}`)
	}
}
