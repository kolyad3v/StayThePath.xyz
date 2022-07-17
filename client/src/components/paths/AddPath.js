import React, { useState } from 'react'
import { addPath, usePath } from '../../context/Paths/PathState'

const initialPath = {
	name: '',
	value: '',
}

const AddPath = () => {
	const [pathState, pathDispatch] = usePath()

	const { name, value } = pathState

	const [path, setPath] = useState(initialPath)

	const onChange = (e) =>
		setPath({
			...path,
			[e.target.name]: e.target.value,
		})

	const onSubmit = (e) => {
		e.preventDefault()
		addPath(pathDispatch, path)
		setPath({
			name: '',
			value: '',
		})
	}

	return (
		<form onSubmit={onSubmit}>
			<input
				type='text'
				name='name'
				placeholder='name'
				value={name}
				onChange={onChange}
			/>

			<input
				type='text'
				name='value'
				value={value}
				placeholder='value'
				onChange={onChange}
			/>

			<input type='submit' value='Add Path' className='btn btn-primary btn-sm' />
		</form>
	)
}

export default AddPath
