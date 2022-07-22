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

	let totalHours = 0
	if (entries.length > 0) {
		totalHours = entries
			.map((el) => parseInt(el.hours))
			.reduce((total, num) => {
				return total + num
			})
	}

	let combinedHours = totalHours + parseInt(value)

	let entriesArr = entries.map((entry) => (
		<tr style={{ fontSize: '1rem' }} key={entry._id}>
			<td>{entry.hours}</td>
			<td>{entry.notes}</td>
			<td>{new Date(entry.date).toDateString()}</td>
		</tr>
	))

	return (
		<div>
			<div className='row'>
				<div className='col s12 '>
					<div className='card small grey darken-4 hoverable'>
						<div className='card-content white-text'>
							<span className='card-title activator'>
								{name} : {combinedHours} hours
								<i className='material-icons right'>more_vert</i>
							</span>
							<div className='row'>
								<div className='col s1'></div>

								<div className='col s3'>
									<button
										className='waves-effect waves-white btn-flat green accent-2 black-text pulse'
										onClick={onUpdate}
									>
										{current ? 'Save' : 'Update'}
									</button>
								</div>
								<div className='col s1'></div>

								<div className='col s3'>
									{current && (
										<button
											className='waves-effect waves-teal grey btn-flat black-text'
											onClick={onClear}
										>
											clear
										</button>
									)}
								</div>
								<div className='col s1'></div>

								<div className='col s3'>
									{current ? (
										<button
											className='btn-floating btn-medium waves-effect waves-light red'
											onClick={onDelete}
										>
											<i className='tiny material-icons'>clear</i>
										</button>
									) : null}
								</div>
							</div>

							{/* {current ? (
								<div className='input-field col s12 '>
									<input
										name='value'
										value={updateValue}
										onChange={onChange}
										className='white-text'
									/>{' '}
								</div>
							) : null} */}

							{current ? (
								<div className='input-field col s12'>
									<input
										name='hours'
										onChange={onChange}
										placeholder='hours, eg 1hr 30 = 1.5'
										required
										className='white-text'
									/>
								</div>
							) : null}
							{current ? (
								<div className='input-field col s12'>
									<textarea
										name='notes'
										onChange={onChange}
										placeholder='notes'
										className='white-text materialize-textarea'
									/>
								</div>
							) : null}
						</div>
						<div className='card-reveal '>
							<span className='card-title grey-text text-darken-4'>
								Entries<i className='material-icons right'>close</i>
							</span>
							<table className='highlight responsive-table'>
								<thead>
									<tr>
										<th>
											<h5>Hours</h5>
										</th>
										<th>
											<h5>Notes</h5>
										</th>
										<th>
											<h5>Date</h5>
										</th>
									</tr>
								</thead>
								<tbody>{entries && entriesArr}</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Path.propTypes = {
	path: PropTypes.object.isRequired,
}

export default Path
