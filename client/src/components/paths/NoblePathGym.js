import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	noblePathEntry,
	deleteNoblePath,
} from '../../context/Paths/PathState'

import AlertContext from '../../context/alert/alertContext'

// --> this component will display the entries and enable switching to add an entry

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

	const [entryState, setEntry] = useState({
		name: 'Gym',
		time: '',
		exercises: [],
		notes: '',
		_id: '',
	})
	const { exercises } = entryState

	const [exerciseEntryState, setExerciseEntryState] = useState({
		name: '',
		sets: [],
		notes: '',
	})

	const { name: exerciseName, notes } = exerciseEntryState
	const [setsEntryState, setSetsEntry] = useState(setsEntry)
	const { reps, weight, quality } = setsEntryState

	// VIEW STATES
	const [readyForUpdateState, setReadyForUpdateState] = useState(false)
	const [addExerciseState, setAddExerciseState] = useState(false)

	const onUpdate = () => {
		if (!readyForUpdateState) {
			setReadyForUpdateState(true)
			setEntry({ ...entryState, _id })
		} else {
			noblePathEntry(pathDispatch, entryState)
			setReadyForUpdateState(false)
			setAlert('Updated. Good job.', 'success')
			setAddExerciseState(false)
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
		setEntry({ ...entryState, exercises: [...exercises, exerciseEntryState] })
		setExerciseEntryState({
			...exerciseEntryState,
			name: '',
			sets: [],
			notes: '',
		})
	}
	console.log(entryState)

	// 	EXERCISE STATE MANIPULATION ----->>>
	const onChangeExercise = (e) => {
		setExerciseEntryState({
			...exerciseEntryState,
			[e.target.name]: e.target.value,
		})
	}

	// 	SETS STATE MANIPULATION ----->>>

	const setsOnChange = (e) => {
		setSetsEntry({ ...setsEntryState, [e.target.name]: e.target.value })
	}
	console.log(setsEntryState, 'sets entry state')

	const submitSetToExerciseSets = () => {
		let holdArray = exerciseEntryState
		holdArray.sets.push(setsEntryState)
		setExerciseEntryState(holdArray)
		setSetsEntry({ ...setsEntryState, reps: '', weight: '', quality: '' })
	}

	console.log(exerciseEntryState, 'exerciseEntryState')

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

	let exerciseDataArray = []
	entries.forEach((session) => {
		console.log(session.exercises, 'forEach')
		let exerciseSubDataArray = []
		session.exercises.forEach((exercise) => {
			exercise.name &&
				exercise.notes &&
				exercise.sets &&
				exerciseSubDataArray.push(exercise.name, exercise.notes, exercise.sets)
		})
		exerciseDataArray.push(exerciseSubDataArray)
	})
	console.log(exerciseDataArray)

	let entriesArr =
		entries.length > 0 &&
		entries.map((entry, index) => (
			<tr key={entry._id}>
				<td style={{ width: '20px' }}>{entry.time}</td>
				<td>{entry.notes}</td>
				<td style={{ width: '400px' }}>
					{exerciseDataArray[index].map((exercise, index) => (
						<>
							<p style={{ fontWeight: 'bold', width: '200px' }} key={Math.random()}>
								{typeof exercise === 'string' && exercise}
							</p>
							{typeof exercise === 'object' &&
								exercise.map((set, index) => (
									<p style={{ width: 'auto' }} key={Math.random()}>
										Set {index + 1} <br />
										reps: {set.reps} | Weight: {set.weight} | Quality: {set.quality}
									</p>
								))}
						</>
					))}
				</td>
				<td>{new Date(entry.date).toDateString()}</td>
			</tr>
		))

	return (
		<div className='card medium white darken-2 hoverable '>
			<div className='card-content black-text'>
				<span className='card-title activator'>
					{name}
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
								className='black-text'
							/>
						</div>
					)}
					{readyForUpdateState && (
						<div className=' col s9'>
							<textarea
								name='notes'
								onChange={onChange}
								placeholder='Overall session notes'
								className='black-text materialize-textarea'
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
								className='black-text'
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
									onClick={submitSetToExerciseSets}
								>
									NextSet
								</button>
							</div>
							<div className='col s1'></div>

							<div className='col s1'></div>
						</>
					)}

					{addExerciseState && (
						<div className='col s9'>
							<input
								type='text'
								name='notes'
								value={notes}
								placeholder='Specific Exercise Notes'
								className='black-text'
								onChange={onChangeExercise}
							/>

							<button
								className='btn-small waves-effect waves-light black'
								onClick={pushAllExercisesToState}
							>
								{' '}
								Save Exercise
								<i className='material-icons'>check</i>
							</button>
						</div>
					)}
				</div>
			</div>
			<div className='card-reveal '>
				<span className='card-title grey-text text-darken-4'>
					Sessions<i className='material-icons right'>close</i>
				</span>
				<table className='highlight responsive-table'>
					<thead>
						<tr>
							<th>
								<p>Time of Training</p>
							</th>
							<th>
								<p>Notes</p>
							</th>
							<th>
								<p>Exercises</p>
							</th>
							<th>
								<p>Date</p>
							</th>
						</tr>
					</thead>
					<tbody>{entries && entriesArr}</tbody>
				</table>
			</div>
		</div>
	)
}

NoblePathGym.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathGym
