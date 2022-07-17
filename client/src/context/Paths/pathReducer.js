import {
	ADD_PATH,
	DELETE_PATH,
	PATH_ERROR,
	GET_PATHS,
	HIDE_PATHS,
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
