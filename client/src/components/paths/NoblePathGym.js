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
	name: '',
	time: '',
	exercises: [
		{
			name: '',
			sets: [
				{
					reps: 0,
					weight: 0,
					quality: '',
				},
			],
			notes: '',
		},
	],
	notes: '',
	_id: '',
}

const NoblePathGym = ({ noblePath }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	const [, pathDispatch] = usePath()

	const { _id, entries, name } = noblePath
	console.log(noblePath, 'noblepath')
	console.log(entries, 'sessions')

	const [entryState, setEntry] = useState(entry)

	const [readyForUpdateState, setReadyForUpdateState] = useState(false)

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
				name: '',
				time: '',
				exercises: [
					{
						name: '',
						sets: [
							{
								reps: 0,
								weight: 0,
								quality: '',
							},
						],
						notes: '',
					},
				],
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
		if (window.confirm('are you sure? Cannot be undone')) {
			deleteNoblePath(pathDispatch, _id, name)
		}
	}

	// let entriesArr =
	// 	entries.length > 0
	// 		? entries.map((entry) => (
	// 				<tr style={{ fontSize: '1rem' }} key={entry._id}>
	// 					<td>{entry.time}</td>
	// 					<td>{entry.notes}</td>
	// 					<td>{exercises}</td>
	// 					<td>{new Date(entry.date).toDateString()}</td>
	// 				</tr>
	// 		  ))
	// 		: null

	return (
		<div>
			<div className='row'>
				<div className='col s12 '>
					<div className='card medium grey darken-2 hoverable'>
						<div className='card-content white-text'>
							<span className='card-title activator'>
								{name}
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
											<p>Time</p>
										</th>
										<th>
											<p>Notes</p>
										</th>
										<th>
											<p>Sets</p>
										</th>
										<th>
											<p>Date</p>
										</th>
									</tr>
								</thead>
								{/* <tbody>{entries && entriesArr}</tbody> */}
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

NoblePathGym.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathGym
