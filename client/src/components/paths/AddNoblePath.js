import React, { useState } from 'react'

import { addNoblePath, usePath } from '../../context/Paths/PathState'

const initialPath = {
	name: 'Wake',
}

const AddNoblePath = () => {
	// need to keep in pathState otherwise the destructuring assignment doesn't pull out the dispatch correctly.
	const [pathState, pathDispatch] = usePath()

	const [path] = useState(initialPath)

	const { name } = path

	const [hideState, setHide] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()
		addNoblePath(pathDispatch, path)
	}

	const onHide = () => {
		setHide(!hideState)
	}

	let form = (
		<form onSubmit={onSubmit}>
			<div className='row'>
				<div className='col 12'>
					<div className='row'>
						<h3>{name}</h3>
					</div>
				</div>
				<div className='row'>
					<input
						type='submit'
						value='Add Path'
						className='waves-effect waves-light btn white-text'
					/>
				</div>
			</div>
		</form>
	)

	return (
		<div>
			<button
				className='btn-floating btn-large waves-effect waves-light red'
				onClick={onHide}
			>
				<i className='material-icons black'>add</i>
			</button>
			{hideState && form}
		</div>
	)
}

export default AddNoblePath
