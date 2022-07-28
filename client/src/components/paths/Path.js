import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	deletePath,
	// setCurrent,
	// clearCurrent,
	// updatePath,
	pathEntry,
} from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

const initialPath = {
	name: '',
	value: '',
	hours: 0,
	minutes: 0,
	notes: '',
	_id: '',
}

const Path = ({ path }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [pathState, pathDispatch] = usePath()

	const { _id, name, entries } = path

	const { current } = pathState

	const [pathUpdateState, setPath] = useState(initialPath)

	const [readyForUpdateState, setReadyForUpdateState] = useState(false)

	useEffect(() => {
		if (current !== null) {
			setPath(current)
		} else {
			setPath(initialPath)
		}
	}, [current])

	const onDelete = () => {
		if (
			window.confirm(
				'Are you sure? This will delete this path forever! Hit ok to continue...'
			)
		) {
			deletePath(pathDispatch, _id)
		} else {
			setAlert('Crisis averted.', 'success')
		}
	}

	const onUpdate = () => {
		if (!readyForUpdateState) {
			setReadyForUpdateState(true)
			setPath({ ...pathUpdateState, _id })
		} else {
			if (pathUpdateState.minutes > 59) {
				setAlert('Max 59 mins, please re-enter input', 'danger')
			} else {
				pathEntry(pathDispatch, pathUpdateState)
				setAlert('Updated. Good job.', 'success')
				setReadyForUpdateState(false)
				setPath({
					...pathUpdateState,
					name: '',
					value: '',
					hours: 0,
					minutes: 0,
					notes: '',
					_id: '',
				})
			}
		}
	}

	const onChange = (e) => {
		setPath({ ...pathUpdateState, [e.target.name]: e.target.value })
	}

	const onClear = () => {
		setReadyForUpdateState(false)
		setAlert('Cleared', 'light')
	}

	let totalHours = 0
	if (entries.length > 0) {
		totalHours = entries
			.map((el) => el.hours)
			.reduce((total, num) => {
				return total + num
			})
	}

	let totalMins = 0
	if (entries.length > 0) {
		totalMins = entries
			.map((el) => el.minutes)
			.reduce((total, num) => {
				return total + num
			})
	}

	let entriesArr = entries.map((entry) => (
		<tr style={{ fontSize: '1rem' }} key={entry._id}>
			<td>
				{entry.hours} hrs:{entry.minutes} mins
			</td>
			<td>{entry.notes}</td>
			<td>{new Date(entry.date).toDateString()}</td>
		</tr>
	))

	return (
		<div>
			<div className='row'>
				<div className='col s12 '>
					<div className='card medium grey darken-4 hoverable'>
						<div className='card-content white-text'>
							<span className='card-title activator'>
								{name} : {totalHours} hours {totalMins} mins
								<i className='material-icons right'>more_vert</i>
							</span>
							<div className='row'>
								<div className='col s1'></div>

								<div className='col s3'>
									<button
										className='waves-effect waves-white btn-flat green accent-2 black-text pulse'
										onClick={onUpdate}
									>
										{readyForUpdateState ? 'Save' : 'Update'}
									</button>
								</div>
								<div className='col s1'></div>

								<div className='col s3'>
									{readyForUpdateState && (
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
									{readyForUpdateState ? (
										<button
											className='btn-floating btn-medium waves-effect waves-light red'
											onClick={onDelete}
										>
											<i className='tiny material-icons'>clear</i>
										</button>
									) : null}
								</div>
							</div>

							{/* {readyForUpdateState ? (
								<div className='input-field col s12 '>
									<input
										name='value'
										value={updateValue}
										onChange={onChange}
										className='white-text'
									/>{' '}
								</div>
							) : null} */}

							{readyForUpdateState ? (
								<div className='input-field col s12'>
									<input
										name='hours'
										onChange={onChange}
										placeholder='Hours'
										required
										className='white-text'
									/>{' '}
								</div>
							) : null}
							{readyForUpdateState ? (
								<div className='input-field col s12'>
									<input
										name='minutes'
										onChange={onChange}
										placeholder='Mins'
										required
										className='white-text'
									/>{' '}
								</div>
							) : null}
							{readyForUpdateState ? (
								<div className='input-field col s12'>
									<textarea
										name='notes'
										onChange={onChange}
										placeholder='Notes, eg task completed, exercise, study topic'
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
											<h5>Time</h5>
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
