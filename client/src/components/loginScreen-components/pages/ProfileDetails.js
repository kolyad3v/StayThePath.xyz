import React from 'react'
import { useAuth } from '../../../context/auth/AuthState'

const ProfileDetails = () => {
	const [authState, authDispatch] = useAuth()
	const { student } = authState
	return (
		<div>
			<p>E: {student && student.email}</p>
		</div>
	)
}

export default ProfileDetails
