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
	name: 'Gym',
	time: '',
	exercises: [],
	notes: '',
	_id: '',
}

const exerciseEntry = {
	name: '',
	sets: [],
	notes: '',
}

const setsEntry = {
	reps: '',
	weight: '',
	quality: '',
}

const NoblePathGym = ({ noblePath }) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext
	const [, pathDispatch] = usePath()

	const { _id, entries, name } = noblePath
	console.log(noblePath, 'noblepath')
	console.log(entries, 'sessions')

	const [entryState, setEntry] = useState(entry)

	const [exerciseEntryState, setExerciseEntryState] = useState(exerciseEntry)
	const { name: exerciseName, notes } = exerciseEntryState
	const [setsEntryState, setSetsEntry] = useState(setsEntry)
	const { reps, weight, quality } = setsEntryState

	// HOLDING ARRAY STATE
	const [setsTotal, setSetsTotal] = useState([])
	const [exercisesTotal, setExercisesTotal] = useState([])

	// VIEW STATES
	const [readyForUpdateState, setReadyForUpdateState] = useState(false)
	const [addExerciseState, setAddExerciseState] = useState(false)

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
				name: 'Gym',
				time: '',
				exercises: [],
				notes: '',
				_id: '',
			})
		}
	}

	const onChange = (e) => {
		setEntry({ ...entryState, [e.target.name]: e.target.value })
	}

	const onAddExercise = () => {
		if (!addExerciseState) {
			setAddExerciseState(true)
		} else {
			setAddExerciseState(false)
		}
	}

	// EXERCISE TO MAIN STATE MANIPULATION --->>>

	const pushAllExercisesToState = () => {
		setEntry({ ...entryState, exercises: [...exercisesTotal] })
	}
	console.log(entryState)

	// 	EXERCISE STATE MANIPULATION ----->>>
	const onChangeExercise = (e) => {
		setExerciseEntryState({
			...exerciseEntryState,
			[e.target.name]: e.target.value,
		})
	}
	console.log(exerciseEntryState, 'exerciseEntryState')

	const submitExerciseToHoldingArray = () => {
		// arrayHolderExercises.unshift(exerciseEntryState)
		setExercisesTotal([...exercisesTotal, exerciseEntryState])
		console.log('submitted exercise with sets to exercise holding state')
		setExerciseEntryState({
			...exerciseEntryState,
			name: '',
			sets: [],
			notes: '',
		})
	}

	// 	SETS STATE MANIPULATION ----->>>

	const setsOnChange = (e) => {
		setSetsEntry({ ...setsEntryState, [e.target.name]: e.target.value })
	}
	console.log(setsEntryState, 'sets entry state')

	const submitSetToHoldingArray = () => {
		setSetsTotal([...setsTotal, setsEntryState])
		setSetsEntry({ ...setsEntryState, reps: '', weight: '', quality: '' })
	}
	console.log(setsTotal, 'holding array of sets')

	const submitSetsToExercise = () => {
		setExerciseEntryState({
			...exerciseEntryState,
			sets: [...setsTotal],
		})
		console.log('submitted to exercise state')
		setSetsTotal([])
	}
	console.log(exerciseEntryState, 'exerciseEntryState')

	console.log(exercisesTotal, 'exercisesTotal')
	// 	SETS STATE MANIPULATION <<<<-----

	const onClear = () => {
		setReadyForUpdateState(false)
		setAlert('Cleared', 'light')
		setAddExerciseState(false)
		setEntry({
			...entryState,
			name: '',
			time: '',
			exercises: [],
			notes: '',
			_id: '',
		})
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
					<div className='row'>
						{readyForUpdateState && (
							<div className=' col s3 '>
								<input
									name='time'
									type={'time'}
									onChange={onChange}
									className='white-text'
								/>
							</div>
						)}
						{readyForUpdateState && (
							<div className=' col s9'>
								<textarea
									name='notes'
									onChange={onChange}
									placeholder='Overall session notes'
									className='white-text materialize-textarea'
								/>
							</div>
						)}
					</div>
					<div className='row'>
						{readyForUpdateState && (
							<div className='col s6'>
								<button
									className='waves-effect waves-teal green btn-flat black-text '
									name='exercises'
									onClick={onAddExercise}
								>
									+ Add Exercise
								</button>
							</div>
						)}
						{addExerciseState && (
							<div className='col s6'>
								<input
									type='text'
									name='name'
									value={exerciseName}
									placeholder='name of exercise'
									className='white-text'
									onChange={onChangeExercise}
								/>
							</div>
						)}
						{addExerciseState && (
							<>
								<input
									type='text'
									placeholder='R'
									name='reps'
									className='col s1'
									value={reps}
									onChange={setsOnChange}
								/>

								<input
									type='text'
									name='weight'
									placeholder='W'
									className='col s1'
									value={weight}
									onChange={setsOnChange}
								/>

								<input
									type='text'
									name='quality'
									placeholder='Q'
									className='col s1'
									value={quality}
									onChange={setsOnChange}
								/>
								<div className='col s3'>
									<button
										className='btn-small waves-effect waves-light green'
										onClick={submitSetToHoldingArray}
									>
										NextSet
									</button>
								</div>
								<div className='col s1'></div>

								<div className='col s1'>
									<button
										className='btn-small waves-effect waves-light blue'
										onClick={submitSetsToExercise}
									>
										<i className='material-icons'>check</i>
									</button>
								</div>
							</>
						)}

						{addExerciseState && (
							<div className='col s9'>
								<input
									type='text'
									name='notes'
									value={notes}
									placeholder='Specific Exercise Notes'
									className='white-text'
									onChange={onChangeExercise}
								/>
								<button
									className='btn-small waves-effect waves-light black'
									onClick={submitExerciseToHoldingArray}
								>
									<i className='material-icons'>check</i>
								</button>
								<button
									className='btn-small waves-effect waves-light yellow'
									onClick={pushAllExercisesToState}
								>
									p<i className='material-icons'>check</i>
								</button>
							</div>
						)}
					</div>
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
	)
}

NoblePathGym.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathGym
