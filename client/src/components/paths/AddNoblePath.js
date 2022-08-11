import React, { useState } from 'react'

import { addNoblePath, usePath } from '../../context/Paths/PathState'

const initialPath = {
	name: '',
}

const AddNoblePath = () => {
	// need to keep in pathState otherwise the destructuring assignment doesn't pull out the dispatch correctly.
	const [pathState, pathDispatch] = usePath()

	const [path, setPath] = useState(initialPath)

	const { name } = path

	const [hideState, setHide] = useState(false)

	const onSubmit = (e) => {
		e.preventDefault()
		addNoblePath(pathDispatch, path)
	}

	const onChange = (e) => {
		if (name === '') {
			setPath({
				...path,
				name: e.target.value,
			})
		} else {
			console.log(`deleting noble path ${path.name}`)
			setPath({
				...path,
				name: '',
			})
		}
	}

	const onHide = () => {
		setHide(!hideState)
	}

	let form = (
		<form onSubmit={onSubmit}>
			<div className='row'>
				<div className='col 12'>
					<input
						type='submit'
						value='Add Path'
						className='waves-effect waves-light btn white-text'
					/>
				</div>
			</div>

			<div className='row'>
				<div className='col 12'>
					<p>
						<label>
							<input
								type='checkbox'
								value='Gym'
								className='filled-in'
								onChange={onChange}
							/>
							<span>Activate Gym Path</span>
						</label>
					</p>
				</div>
			</div>
			<div className='row'>
				<div className='col 12'>
					<p>
						<label>
							<input
								type='checkbox'
								value='Wake'
								className='filled-in'
								onChange={onChange}
							/>
							<span>Activate Wake Path</span>
						</label>
					</p>
				</div>
			</div>
			<div className='row'>
				<div className='col 12'>
					<p>
						<label>
							<input
								type='checkbox'
								value='Food'
								className='filled-in'
								onChange={onChange}
							/>
							<span>Activate Food Path</span>
						</label>
					</p>
				</div>
			</div>
		</form>
	)

	return (
		<div>
			<button
				className='btn-floating btn-large waves-effect waves-light black'
				onClick={onHide}
			>
				<i className='material-icons'>add</i>
			</button>
			{hideState && form}
		</div>
	)
}

export default AddNoblePath
