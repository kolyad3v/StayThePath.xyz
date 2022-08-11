import React, { useState, useContext, Fragment } from 'react'
import PropTypes from 'prop-types'

import { usePath, noblePathEntry } from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

// --> this component will display the entries and enable switching to add an entry

const entry = {
	name: 'Food',
	hour: '',
	minute: '',
	meal: '',
	_id: '',
}

const NoblePathFood = ({ noblePath }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	// need to keep in pathState otherwise the destructuring assignment doesn't pull out the dispatch correctly.
	const [, pathDispatch] = usePath()

	const { _id, entries } = noblePath
	console.log(noblePath, 'noblepathFood')

	const [entryState, setEntry] = useState(entry)

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
				name: 'Food',
				hour: '',
				minute: '',
				meal: '',
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

	const entriesArr = entries && entries.map((entry) => <td>{entry.hour}</td>)

	return (
		<div>
			<div className='row'>
				<div className='col s12 '>
					<div className='card medium grey darken-2 hoverable'>
						<div className='card-content white-text'>
							<span className='card-title activator'>
								<h5>Food Record</h5>
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
							</div>

							{readyForUpdateState && (
								<div className='input-field col s12 '>
									<input name='hour' onChange={onChange} className='white-text' />
								</div>
							)}

							{readyForUpdateState ? (
								<div className='input-field col s12'>
									<input
										name='minute'
										onChange={onChange}
										placeholder='Wake mins'
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
										placeholder='Easy/hard wake up, poor sleep, etc'
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
											<p>Time Eaten</p>
										</th>
										<th>
											<p>Meal</p>
										</th>
										<th>
											<p>Sets</p>
										</th>
										<th>
											<p>Entry Log Date</p>
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

NoblePathFood.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathFood
