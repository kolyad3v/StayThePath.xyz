import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import { usePath, noblePathEntry } from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

// --> this component will display the entries and enable switching to add an entry

const entry = {
	name: 'Food',
	time: '',
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
				time: '',
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

	const entriesArr =
		entries &&
		entries.map((entry) => (
			<tr key={entry._id}>
				<td>{entry.time}</td>
				<td>{entry.meal}</td>
				<td>{new Date(entry.date).toDateString()}</td>
			</tr>
		))

	return (
		<div className='card medium white darken-2 hoverable'>
			<div className='card-content black-text'>
				<span className='card-title activator'>
					<h5>Food Record</h5>
					<i className='material-icons right'>more_vert</i>
				</span>
				<div className='row'>
					<div className='col s1'></div>

					<div className='col s3'>
						<button
							className='waves-effect waves-white btn-flat black white-text pulse'
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

					<div className='col s3'></div>
				</div>

				{readyForUpdateState && (
					<div className='input-field col s12 '>
						<input
							name='time'
							onChange={onChange}
							placeholder='Time of meal'
							className='black-text'
						/>
					</div>
				)}

				{readyForUpdateState && (
					<div className='input-field col s12'>
						<textarea
							name='meal'
							onChange={onChange}
							placeholder='Avocado on toast'
							className='black-text materialize-textarea'
						/>
					</div>
				)}
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
								<p>Entry Log Date</p>
							</th>
						</tr>
					</thead>
					<tbody>{entries && entriesArr}</tbody>
				</table>
			</div>
		</div>
	)
}

NoblePathFood.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathFood
