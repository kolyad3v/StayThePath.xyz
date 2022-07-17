import React, { Fragment, useEffect } from 'react'
import Path from './Path'

import { usePath, getPaths } from '../../context/Paths/PathState'
const DisplayPaths = () => {
	const [displayState, displayDispatch] = usePath()

	const { paths } = displayState

	useEffect(() => {
		getPaths(displayDispatch)
	}, [displayDispatch])

	const displayPaths = paths.map((path) => <Path key={path._id} path={path} />)
	return <Fragment>{displayPaths}</Fragment>
}

export default DisplayPaths
