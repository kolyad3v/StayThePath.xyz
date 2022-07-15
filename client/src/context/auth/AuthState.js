import React, { useReducer, useContext, useEffect } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import authReducer from './authReducer.js'
import setAuthToken from '../../utils/setAuthToken'

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	RONIN_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
} from '../types.js'

// refactoring --->

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)
	return [state, dispatch]
}

// action creator

export const loadRonin = async (dispatch) => {
	try {
		const res = await axios.get('/api/auth')
		dispatch({ type: RONIN_LOADED, payload: res.data })
	} catch (error) {
		dispatch({ type: AUTH_ERROR })
	}
}

export const register = async (dispatch, formData) => {
	try {
		const res = await axios.post('/api/ronin', formData)
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})

		loadRonin(dispatch)
	} catch (error) {
		dispatch({
			type: REGISTER_FAIL,
			payload: error.response.data.msg,
		})
	}
}

export const loginRonin = async (dispatch, formData) => {
	try {
		const res = await axios.post('/api/auth', formData)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})

		loadRonin(dispatch)
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg })
	}
}

// logout
export const logoutRonin = (dispatch) => {
	dispatch({ type: LOGOUT })
}

// clear errors
export const clearErrors = (dispatch) => {
	dispatch({ type: CLEAR_ERRORS })
}

// authstate provider component
const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: true,
		ronin: null,
		error: null,
	}

	// state allows us to access state and dispatch allows for the sending of objects to our reducer
	const [state, dispatch] = useReducer(authReducer, initialState)

	// set token on initial app loading
	setAuthToken(state.token)

	// load user on first run or refresh
	if (state.loading) {
		loadRonin(dispatch)
	}

	// watch state.token and set headers and local localStorage on any change
	useEffect(() => {
		setAuthToken(state.token)
	}, [state.token])

	return (
		<AuthContext.Provider
			value={{
				state: state,
				dispatch,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthState
