import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
	usePath,
	getNoblePaths,
	noblePathEntry,
} from '../../../context/Paths/PathState'

import AlertContext from '../../../context/alert/alertContext'

// --> this component will display the entries and enable switching to add an entry

const NoblePathJournal = () => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [pathState, pathDispatch] = usePath()

	const [entryState, setEntry] = useState({
		name: 'journal',
		subject: '',
		category: '',
		body: '',
		_id: '',
	})

	const { name } = entryState

	useEffect(() => {
		getNoblePaths(pathDispatch, name)
	}, [pathDispatch, name])

	const { noblePathJournal } = pathState
	const { _id } = noblePathJournal[0]
	// console.log(_id, typeof _id, entries)

	const [readyForUpdateState, setReadyForUpdateState] = useState(false)

	const onUpdate = () => {
		if (!readyForUpdateState) {
			setReadyForUpdateState(true)
			// let journalObject
			// // the problem with this code is that the initial state is an empty array which will evaluate to bool true. But then accessing element 0 will throw undefined because nothing is in it yet!
			// noblePathJournal.length > 0
			// 	? (journalObject = noblePathJournal[0])
			// 	: setAlert('no entries', 'danger') && setReadyForUpdateState(false)
			// const { _id } = journalObject
			// setEntry({ ...entryState, _id })

			// we need to get the ID of the journal path...

			// Once we have it we can set it to state ready for send off with our entry
			console.log(noblePathJournal)

			setEntry({ ...entryState, _id })
		} else {
			noblePathEntry(pathDispatch, entryState)
			setAlert('Updated. Good job.', 'success')
			setReadyForUpdateState(false)
			setEntry({
				...entryState,
				name: 'journal',
				subject: '',
				category: '',
				body: '',
				_id: '',
			})
		}
	}

	const onChange = (e) => {
		setEntry({ ...entryState, [e.target.name]: e.target.value })
	}

	const onClear = () => {
		setReadyForUpdateState(false)
		setAlert('Cleared', 'light')
	}

	// const onDelete = () => {
	// 	let _id = noblePathJournal[0]._id ?? null
	// 	if (window.confirm('are you sure? Will lose all journal data')) {
	// 		deleteNoblePath(pathDispatch, _id, name)
	// 	}
	// }

	let displayEntryData
	if (noblePathJournal[0]) {
		const { entries } = noblePathJournal[0]

		displayEntryData =
			entries &&
			entries.map((entry, index) => (
				<tr key={index}>
					<th>
						Subject: {entry.subject} <br />
						Category: {entry.category}
					</th>

					<td style={{ float: 'left' }}>{entry.body}</td>

					<th style={{ float: 'right' }}>{new Date(entry.date).toDateString()}</th>
				</tr>
			))
	}
	let capital = name.charAt(0).toUpperCase() + name.slice(1, name.length)

	return (
		<div>
			<div className={`card medium white hoverable  text-center journal`}>
				<div className='card-content black-text'>
					<span className='card-title activator'>
						{capital}
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

					<div className='row'>
						{readyForUpdateState ? (
							<div className='input-field col s2 '>
								<input
									name='subject'
									onChange={onChange}
									placeholder='Subject'
									className='black-text'
								/>
							</div>
						) : null}
						{readyForUpdateState ? (
							<div className='input-field col s2'>
								<input
									name='category'
									onChange={onChange}
									placeholder='Category'
									required
									className='black-text'
								/>
							</div>
						) : null}

						<div className='row'>
							{readyForUpdateState ? (
								<div className='input-field col s12'>
									<textarea
										name='body'
										onChange={onChange}
										placeholder='Today I witnessed a miracle...'
										className='black-text materialize-textarea'
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>
				<div className='card-reveal '>
					<span className='card-title grey-text text-darken-4'>
						<i className='material-icons right'>close</i>
					</span>
					<table className='highlight responsive-table'>
						<thead>
							<tr>
								<th>
									<h3>Entries</h3>
								</th>
							</tr>
						</thead>
						<tbody>{displayEntryData}</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

NoblePathJournal.propTypes = {
	noblePath: PropTypes.object,
}

export default NoblePathJournal
