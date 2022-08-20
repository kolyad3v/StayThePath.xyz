import React, { useState, useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import AlertContext from '../../../context/alert/alertContext'
import {
	useAuth,
	clearErrors,
	loginRonin,
} from '../../../context/auth/AuthState'

const Login = () => {
	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	const [authState, authDispatch] = useAuth()
	const { error, isAuthenticated } = authState

	useEffect(() => {
		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger')
			clearErrors(authDispatch)
		}
	}, [error, setAlert, authDispatch])

	const [ronin, setRonin] = useState({
		email: '',
		password: '',
	})

	const { email, password } = ronin

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
		} else {
			loginRonin(authDispatch, {
				email,
				password,
			})
		}
	}

	if (isAuthenticated) return <Navigate to='/' />

	return (
		<div className='form-container'>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'> Email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
					<label htmlFor='password'> Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
					/>
				</div>
				<input type='submit' value='Login' className='btn btn-primary btn-block' />
			</form>
		</div>
	)
}

export default Login
