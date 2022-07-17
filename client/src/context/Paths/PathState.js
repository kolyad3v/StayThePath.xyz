import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import PathContext from './pathContext.js'
import pathReducer from './pathReducer.js'

import { ADD_PATH, DELETE_PATH, GET_PATHS, PATH_ERROR } from '../types.js'

// refactoring ----->
export const usePath = () => {
	const { state, dispatch } = useContext(PathContext)
	return [state, dispatch]
}

// GET PATHS
export const getPaths = async (dispatch) => {
	try {
		const res = await axios.get('/api/paths')
		console.log(res.data)
		dispatch({ type: GET_PATHS, payload: res.data })
	} catch (err) {
		dispatch({ type: PATH_ERROR, payload: err.response })
	}
}

// ADD PATH
export const addPath = async (dispatch, path) => {
	try {
		const res = await axios.post('/api/paths', path)
		console.log(res.data)
		dispatch({ type: ADD_PATH, payload: res.data })
	} catch (err) {
		dispatch({ type: PATH_ERROR, payload: err.response.msg })
	}
}

// DELETE PATH
export const deletePath = async (dispatch, _id) => {
	try {
		const res = await axios.delete(`/api/path/${_id}`)
		console.log(res.data)
		dispatch({ type: DELETE_PATH, payload: _id })
	} catch (err) {
		dispatch({ type: PATH_ERROR, payload: err.response.msg })
	}
}

const PathState = (props) => {
	const initialState = {
		paths: [],
		error: null,
		loading: true,
		visible: false,
	}

	// state allows us to access state and dispatch allows for the sending of objects to our reducer
	const [state, dispatch] = useReducer(pathReducer, initialState)

	return (
		<PathContext.Provider
			value={{
				state: state,
				dispatch,
			}}
		>
			{props.children}
		</PathContext.Provider>
	)
}

export default PathState
