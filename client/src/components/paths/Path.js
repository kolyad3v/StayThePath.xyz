import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	deletePath,
	setCurrent,
	clearCurrent,
	updatePath,
} from '../../context/Paths/PathState'

const initialPath = {
	name: '',
	value: '',
	_id: '',
}

const Path = ({ path }) => {
	const [pathState, pathDispatch] = usePath()

	const { _id, name, value } = path

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
			updatePath(pathDispatch, pathUpdateState)
		}
	}

	const onChange = (e) => {
		setPath({ ...pathUpdateState, [e.target.name]: e.target.value })
	}

	const onClear = () => {
		clearCurrent(pathDispatch)
	}
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
		</div>
	)
}

Path.propTypes = {
	path: PropTypes.object.isRequired,
}

export default Path
