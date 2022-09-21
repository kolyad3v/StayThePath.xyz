import React, { useState } from 'react'

import {
	addNoblePath,
	usePath,
	deleteNoblePath,
} from '../../context/Paths/PathState'

const AddNoblePath = () => {
	// need to keep in pathState otherwise the destructuring assignment doesn't pull out the dispatch correctly.
	const [pathState, pathDispatch] = usePath()
	const { noblePathGym, noblePathFood, noblePathWake } = pathState

	const [hideState, setHide] = useState(false)

	const addNobleGymPath = (e) => {
		e.preventDefault()
		if (noblePathGym.length === 0) {
			addNoblePath(pathDispatch, { name: 'Gym' })
		} else {
			if (
				window.confirm(
					'Are you sure? Cannot be undone and all you logs will be deleted!'
				)
			) {
				deleteNoblePath(pathDispatch, noblePathGym[0]._id, 'Gym')
			}
		}
	}

	const addNobleWakePath = (e) => {
		e.preventDefault()
		if (noblePathWake.length === 0) {
			addNoblePath(pathDispatch, { name: 'Wake' })
		} else {
			if (
				window.confirm(
					'Are you sure? Cannot be undone and all you logs will be deleted!'
				)
			) {
				deleteNoblePath(pathDispatch, noblePathWake[0]._id, 'Wake')
			}
		}
	}

	const addNobleFoodPath = (e) => {
		e.preventDefault()
		if (noblePathFood.length === 0) {
			addNoblePath(pathDispatch, { name: 'Food' })
		} else {
			if (
				window.confirm(
					'Are you sure? Cannot be undone and all you logs will be deleted!'
				)
			) {
				deleteNoblePath(pathDispatch, noblePathFood[0]._id, 'Food')
			}
		}
	}

	const onHide = () => {
		setHide(!hideState)
	}

	let form = (
		<form className={`addNoblePaths hoverable ${hideState ? null : 'show'}`}>
			<h4>Noble Paths</h4>
			<div className='row'>
				<div className='center-align'>
					<label>
						<input
							type='checkbox'
							value='Gym'
							checked={noblePathGym.length === 0 ? false : true}
							className='filled-in'
							onChange={addNobleGymPath}
						/>
						<span>Activate Gym Path</span>
					</label>
				</div>
			</div>
			<div className='row'>
				<div className='center-align'>
					<label>
						<input
							type='checkbox'
							value='Wake'
							checked={noblePathWake.length === 0 ? false : true}
							className='filled-in'
							onChange={addNobleWakePath}
						/>
						<span>Activate Wake Path</span>
					</label>
				</div>
			</div>
			<div className='row'>
				<div className='center-align'>
					<label>
						<input
							type='checkbox'
							value='Food'
							checked={noblePathFood.length === 0 ? false : true}
							className='filled-in'
							onChange={addNobleFoodPath}
						/>
						<span>Activate Food Path</span>
					</label>
				</div>
			</div>
		</form>
	)

	return (
		<div>
			<button
				className='btn-floating btn-large waves-effect waves-light black'
				onClick={onHide}
			>
				<i className='material-icons'>add</i>
			</button>
			{form}
		</div>
	)
}

export default AddNoblePath
