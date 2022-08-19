import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	noblePathEntry,
	deleteNoblePath,
} from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

// --> this component will display the entries and enable switching to add an entry

const entry = {
	name: 'Wake',
	hour: '',
	minute: '',
	notes: '',
	_id: '',
}

const NoblePathWake = ({ noblePath }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	// need to keep in pathState otherwise the destructuring assignment doesn't pull out the dispatch correctly. Actually we can use comma seperation to omit pathState variable and still destructure correctly.
	const [, pathDispatch] = usePath()

	const { _id, entries } = noblePath

	const [entryState, setEntry] = useState(entry)
	const { name } = entryState

	const [readyForUpdateState, setReadyForUpdateState] = useState(false)

	// useEffect(() => {
	// 	if (current !== null) {
	// 		setPath(current)
	// 	} else {
	// 		setPath(initialPath)
	// 	}
	// }, [current])

	const onUpdate = () => {
		if (!readyForUpdateState) {
			setReadyForUpdateState(true)
			setEntry({ ...entryState, _id })
		} else {
			// if (pathUpdateState.minutes > 59) {
			// 	setAlert('Max 59 mins, please re-enter input', 'danger')
			// } else {}
			noblePathEntry(pathDispatch, entryState)
			setAlert('Updated. Good job.', 'success')
			setReadyForUpdateState(false)
			setEntry({
				...entryState,
				hour: '',
				minute: '',
				notes: '',
				_id: '',
			})
		}
	}

	const onChange = (e) => {
		setEntry({ ...entryState, [e.target.name]: e.target.value })
		console.log(entryState)
	}

	const onClear = () => {
		setReadyForUpdateState(false)
		setAlert('Cleared', 'light')
	}

	const onDelete = () => {
		if (window.confirm('are you sure cannot be undone you cunt')) {
			deleteNoblePath(pathDispatch, _id, name)
		}
	}

	let entriesArr =
		entries.length > 0
			? entries.map((entry) => (
					<tr style={{ fontSize: '1rem' }} key={entry._id}>
						<td>{entry.hour}</td>
						<td>{entry.notes}</td>
						<td>{new Date(entry.date).toDateString()}</td>
					</tr>
			  ))
			: null

	return (
		<div className='card medium white darken-2 hoverable '>
			<div className='card-content'>
				<span className='card-title activator'>
					{name} Time
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
						{readyForUpdateState && (
							<button
								className='waves-effect waves-teal red btn-flat black-text'
								onClick={onDelete}
							>
								X
							</button>
						)}
					</div>
				</div>

				<div className='row'>
					{readyForUpdateState ? (
						<div className='input-field col s4 '>
							<input
								name='hour'
								onChange={onChange}
								placeholder='Hour'
								className='white-text'
								type={'time'}
							/>
						</div>
					) : null}

					<div className='row'>
						{readyForUpdateState ? (
							<div className='input-field col s12'>
								<textarea
									name='notes'
									onChange={onChange}
									placeholder='Easy/hard wake up, poor sleep, etc'
									className='white-text materialize-textarea'
								/>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<div className='card-reveal  '>
				<span className='card-title grey-text text-darken-4'>
					Entries<i className='material-icons right'>close</i>
				</span>
				<table className='highlight responsive-table'>
					<thead>
						<tr>
							<th>
								<h5>Wake Time</h5>
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
	)
}

NoblePathWake.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathWake
