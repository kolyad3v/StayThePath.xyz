import {
	ADD_PATH,
	ADD_NOBLEPATH_WAKE,
	ADD_NOBLEPATH_GYM,
	ADD_NOBLEPATH_FOOD,
	ADD_NOBLEPATH_JOURNAL,
	DELETE_PATH,
	PATH_ERROR,
	UPDATE_PATH,
	UPDATE_NOBLE_PATH_WAKE,
	UPDATE_NOBLE_PATH_GYM,
	UPDATE_NOBLE_PATH_FOOD,
	UPDATE_NOBLE_PATH_JOURNAL,
	GET_PATHS,
	GET_NOBLE_PATH_WAKE,
	GET_NOBLE_PATH_GYM,
	GET_NOBLE_PATH_FOOD,
	GET_NOBLE_PATH_JOURNAL,
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
		case ADD_NOBLEPATH_WAKE:
			return {
				...state,
				noblePathWake: [...state.noblePathWake, action.payload],
				loading: false,
			}
		case ADD_NOBLEPATH_GYM:
			return {
				...state,
				noblePathGym: [...state.noblePathGym, action.payload],
				loading: false,
			}
		case ADD_NOBLEPATH_FOOD:
			return {
				...state,
				noblePathFood: [...state.noblePathFood, action.payload],
				loading: false,
			}
		case ADD_NOBLEPATH_JOURNAL:
			return {
				...state,
				noblePathJournal: [...state.noblePathJournal, action.payload],
				loading: false,
			}

		case GET_PATHS:
			return {
				...state,
				paths: action.payload,
				loading: false,
			}
		case GET_NOBLE_PATH_WAKE:
			return {
				...state,
				noblePathWake: action.payload,
				loading: false,
			}
		case GET_NOBLE_PATH_GYM:
			return {
				...state,
				noblePathGym: action.payload,
				loading: false,
			}
		case GET_NOBLE_PATH_FOOD:
			return {
				...state,
				noblePathFood: action.payload,
				loading: false,
			}
		case GET_NOBLE_PATH_JOURNAL:
			return {
				...state,
				journal: action.payload,
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
		case UPDATE_NOBLE_PATH_WAKE:
			return {
				...state,
				noblePathWake: state.noblePathWake.map((path) =>
					path._id === action.payload._id ? action.payload : path
				),
			}
		case UPDATE_NOBLE_PATH_GYM:
			return {
				...state,
				noblePathGym: state.noblePathGym.map((path) =>
					path._id === action.payload._id ? action.payload : path
				),
			}
		case UPDATE_NOBLE_PATH_FOOD:
			return {
				...state,
				noblePathFood: state.noblePathFood.map((path) =>
					path._id === action.payload._id ? action.payload : path
				),
			}
		case UPDATE_NOBLE_PATH_JOURNAL:
			return {
				...state,
				noblePathJournal: state.noblePathJournal.map((path) =>
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
