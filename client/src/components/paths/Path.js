import React from 'react'
import PropTypes from 'prop-types'

import { usePath, deletePath } from '../../context/Paths/PathState'

const Path = ({ path }) => {
	const pathDispatch = usePath()[1]

	const { _id, name, value } = path

	const onDelete = () => {
		deletePath(pathDispatch, _id)
	}

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>{name}</h3>
			<span className={'badge badge-primary'}></span>
			<ul className='list'>
				<li>{value}</li>
			</ul>
			<p>
				<button className='btn btn-danger btn-sm' onClick={onDelete}>
					{' '}
					Discard
				</button>
			</p>
		</div>
	)
}

Path.propTypes = {
	path: PropTypes.object.isRequired,
}

export default Path
