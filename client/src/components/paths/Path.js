import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	deletePath,
	setCurrent,
	clearCurrent,
	updatePath,
	pathEntry,
} from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

const initialPath = {
	name: '',
	value: '',
	hours: '',
	notes: '',
	_id: '',
}

const Path = ({ path }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [pathState, pathDispatch] = usePath()

	const { _id, name, value, entries } = path

	const { current } = pathState

	const [pathUpdateState, setPath] = useState(initialPath)

	const { value: updateValue } = pathUpdateState
	useEffect(() => {
		if (current !== null) {
			setPath(current)
		} else {
			setPath(initialPath)
		}
	}, [current])

	const onDelete = () => {
		deletePath(pathDispatch, _id)
	}

	const onUpdate = () => {
		if (current === null) {
			setCurrent(pathDispatch, path)
		} else {
			console.log(pathUpdateState)
			updatePath(pathDispatch, pathUpdateState).then(
				pathEntry(pathDispatch, pathUpdateState)
			)
			setAlert('Updated. Good job.', 'success')
			clearCurrent(pathDispatch)
		}
	}

	const onChange = (e) => {
		setPath({ ...pathUpdateState, [e.target.name]: e.target.value })
	}

	const onClear = () => {
		clearCurrent(pathDispatch)
		setAlert('cleared', 'light')
	}

	let entriesArr = entries.map((entry) => (
		<ul key={entry._id}>
			<li>{entry.hours}</li>
			<li>{entry.notes}</li>
			<li>{entry.date}</li>
		</ul>
	))

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-center'>{name}</h3>
			<span className={'badge badge-primary'}> Total: {value}</span>

			<button className='btn btn-danger btn-sm' onClick={onDelete}>
				Discard
			</button>
			<button className='btn btn-primary btn-sm' onClick={onUpdate}>
				{current ? 'Save' : 'Update'}
			</button>
			{current && (
				<button className='btn btn-secondary btn-sm' onClick={onClear}>
					clear
				</button>
			)}

			{current ? (
				<input name='value' value={updateValue} onChange={onChange} />
			) : null}
			{current ? (
				<input
					name='hours'
					onChange={onChange}
					placeholder='hours, eg 1hr 30 = 1.5'
					required
				/>
			) : null}
			{current ? (
				<input name='notes' onChange={onChange} placeholder='notes' />
			) : null}

			{entries && entriesArr}
		</div>
	)
}

Path.propTypes = {
	path: PropTypes.object.isRequired,
}

export default Path
