import React, { useReducer, useContext } from 'react'
import axios from 'axios'
import PathContext from './pathContext.js'
import pathReducer from './pathReducer.js'

import {
	ADD_PATH,
	ADD_NOBLEPATH_WAKE,
	ADD_NOBLEPATH_GYM,
	ADD_NOBLEPATH_FOOD,
	ADD_NOBLEPATH_JOURNAL,
	CLEAR_CURRENT,
	DELETE_PATH,
	GET_PATHS,
	GET_NOBLE_PATH_WAKE,
	GET_NOBLE_PATH_GYM,
	GET_NOBLE_PATH_FOOD,
	GET_NOBLE_PATH_JOURNAL,
	UPDATE_NOBLE_PATH_WAKE,
	UPDATE_NOBLE_PATH_GYM,
	UPDATE_NOBLE_PATH_FOOD,
	UPDATE_NOBLE_PATH_JOURNAL,
	PATH_ERROR,
	SET_CURRENT,
	UPDATE_PATH,
} from '../types.js'

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

// UPDATE PATH
export const updatePath = async (dispatch, path) => {
	try {
		const res = await axios.put(`/api/paths/${path._id}`, path)
		dispatch({
			type: UPDATE_PATH,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: PATH_ERROR,
			payload: error.response.msg,
		})
	}
}

// MAKE PATH ENTRY
export const pathEntry = async (dispatch, path) => {
	try {
		const res = await axios.post(`/api/paths/entry/${path._id}`, path)
		dispatch({
			type: UPDATE_PATH,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: PATH_ERROR,
			payload: error.response.msg,
		})
	}
}

// DELETE PATH
export const deletePath = async (dispatch, _id) => {
	try {
		const res = await axios.delete(`/api/paths/${_id}`)
		console.log(res.data)
		dispatch({ type: DELETE_PATH, payload: _id })
	} catch (err) {
		dispatch({ type: PATH_ERROR, payload: err.response.msg })
	}
}

// ADD NOBLE PATH
export const addNoblePath = async (dispatch, path) => {
	try {
		// const res = await axios.post(`/api/paths/noblePath${path.name}`, path)
		// // i've put the template literal in here so that when I come to make the other noble paths I can just change the noble path name rather than writing out a whole new function
		// console.log(res.data)
		// // if dispatch doesn't run, state won't update
		// dispatch({ type: ADD_NOBLEPATH, payload: res.data })

		switch (path.name) {
			case 'Gym':
				let res = await axios.post(`/api/paths/noblePath${path.name}`)
				console.log(res.data)
				dispatch({ type: ADD_NOBLEPATH_GYM, payload: res.data })
				break
			case 'Wake':
				let resWake = await axios.post(`/api/paths/noblePath${path.name}`)
				console.log(resWake.data)
				dispatch({ type: ADD_NOBLEPATH_WAKE, payload: resWake.data })
				break

			case 'Food':
				let resFood = await axios.post(`/api/noblePath${path.name}`)
				console.log(resFood.data)
				dispatch({ type: ADD_NOBLEPATH_FOOD, payload: resFood.data })
				break

			case 'Journal':
				let resJournal = await axios.post(`/api/${path.name}`)
				console.log(resJournal.data)
				dispatch({ type: ADD_NOBLEPATH_JOURNAL, payload: resJournal.data })
				break

			default:
				break
		}
	} catch (error) {
		dispatch({
			type: PATH_ERROR,
			payload: error.response,
		})
	}
}
// GET NOBLE PATHS
export const getNoblePaths = async (dispatch, noblePathName) => {
	try {
		switch (noblePathName) {
			case 'Gym':
				let res = await axios.get(`/api/paths/noblePath${noblePathName}`)
				console.log(res.data)
				dispatch({ type: GET_NOBLE_PATH_GYM, payload: res.data })
				break
			case 'Wake':
				let resWake = await axios.get(`/api/paths/noblePath${noblePathName}`)
				console.log(resWake.data)
				dispatch({ type: GET_NOBLE_PATH_WAKE, payload: resWake.data })
				break

			case 'Food':
				let resFood = await axios.get(`/api/noblePath${noblePathName}`)
				console.log(resFood.data)
				dispatch({ type: GET_NOBLE_PATH_FOOD, payload: resFood.data })
				break

			case 'Journal':
				let resJournal = await axios.get(`/api/${noblePathName}`)
				console.log(resJournal.data)
				dispatch({ type: GET_NOBLE_PATH_JOURNAL, payload: resJournal.data })
				break

			default:
				break
		}
		// if (noblePathName === 'Gym') {
		// 	dispatch({ type: GET_NOBLE_PATH_GYM, payload: res.data })
		// } else {
		// 	dispatch({ type: GET_NOBLE_PATHS, payload: res.data })
		// }
	} catch (err) {
		dispatch({ type: PATH_ERROR, payload: err.response })
	}
}
// POST NOBLE PATH WAKE ENTRY
export const noblePathEntry = async (dispatch, path) => {
	try {
		// console.log(path)
		// const res = await axios.post(
		// 	`/api/paths/noblePath${path.name}Entry/${path._id}`,
		// 	path
		// )
		// dispatch({
		// 	type: UPDATE_NOBLE_PATH,
		// 	payload: res.data,
		// })

		switch (path.name) {
			case 'Gym':
				let res = await axios.post(
					`/api/paths/noblePath${path.name}Entry/${path._id}`,
					path
				)
				console.log(res.data)
				dispatch({ type: UPDATE_NOBLE_PATH_GYM, payload: res.data })
				break
			case 'Wake':
				let resWake = await axios.post(
					`/api/paths/noblePath${path.name}Entry/${path._id}`,
					path
				)
				console.log(resWake.data)
				dispatch({ type: UPDATE_NOBLE_PATH_WAKE, payload: resWake.data })
				break

			case 'Food':
				let resFood = await axios.post(
					`/api/noblePath${path.name}/Entry/${path._id}`,
					path
				)
				console.log(resFood.data)
				dispatch({ type: UPDATE_NOBLE_PATH_FOOD, payload: resFood.data })
				break

			case 'Journal':
				let resJournal = await axios.post(
					`/api/${path.name}/JournalEntry/${path._id}`,
					path
				)
				console.log(resJournal.data)
				dispatch({ type: UPDATE_NOBLE_PATH_JOURNAL, payload: resJournal.data })
				break

			default:
				break
		}
	} catch (error) {
		dispatch({
			type: PATH_ERROR,
			payload: error.response,
		})
	}
}

// SET CURRENT
export const setCurrent = (dispatch, path) => {
	dispatch({ type: SET_CURRENT, payload: path })
}

// CLEAR CURRENT
export const clearCurrent = (dispatch) => {
	dispatch({ type: CLEAR_CURRENT })
}

const PathState = (props) => {
	const initialState = {
		paths: [],
		noblePathWake: [],
		noblePathGym: [],
		noblePathFood: [],
		noblePathJournal: [],
		current: null,
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
