import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import AlertContext from '../../../context/alert/alertContext'

import { useAuth, clearErrors, register } from '../../../context/auth/AuthState'
import { usePath, addNoblePath } from '../../../context/Paths/PathState'

const Register = (props) => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [authState, authDispatch] = useAuth()
	const { error, isAuthenticated } = authState

	const [, pathDispatch] = usePath()

	useEffect(() => {
		if (error === 'Email already exists') {
			setAlert(error, 'danger')
			clearErrors()
		}
		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history, setAlert, authDispatch])

	const [ronin, setRonin] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	})

	const { name, email, password, password2 } = ronin

	const onChange = (e) => {
		setRonin({
			...ronin,
			[e.target.name]: e.target.value,
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger')
		} else if (password !== password2) {
			setAlert('Paswords do not match', 'danger')
		} else {
			register(authDispatch, {
				name,
				email,
				password,
			})
			addNoblePath(pathDispatch, { name: 'journal' })
		}
	}

	if (isAuthenticated) return <Navigate to='/' />

	// eventually I will want it to take us straight to experience, but some reason I cannot access AuthContext in experience to run loadstudent, meaning if the user refreshes the page it doesn't keep them logged in. A bug to fix.
	// if (isAuthenticated) return <Navigate to='/experience' />

	return (
		<div className='form-container'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'> Name</label>
					<input type='text' name='name' value={name} onChange={onChange} required />
					<label htmlFor='email'> Email</label>
					<input
						type='email'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>

					<label htmlFor='password'> Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
						minLength='6'
					/>
					<label htmlFor='password2'> Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={onChange}
						required
						minLength='6'
					/>
				</div>
				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	)
}

export default Register
