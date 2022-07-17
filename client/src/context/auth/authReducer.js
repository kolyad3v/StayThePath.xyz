import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	RONIN_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	CLEAR_PATHS,
} from '../types.js'

const authReducer = (state, action) => {
	switch (action.type) {
		case RONIN_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				ronin: action.payload,
			}
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// localStorage.setItem('token', action.payload.token)
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			}
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			// localStorage.removeItem('token')
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				ronin: null,
				error: action.payload,
			}
		case CLEAR_PATHS:
			return {
				...state,
				paths: [],
				error: null,
				loading: false,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			throw new Error(`Unsupported type of: ${action.type}`)
	}
}

export default authReducer
