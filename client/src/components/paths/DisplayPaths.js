import React, { Fragment, useEffect } from 'react'
import Path from './Path'
import NoblePathWake from './NoblePathWake'
import NoblePathGym from './NoblePathGym'

import { usePath, getPaths, getNoblePaths } from '../../context/Paths/PathState'
const DisplayPaths = () => {
	const [displayState, displayDispatch] = usePath()

	const { paths, noblePaths } = displayState

	useEffect(() => {
		getPaths(displayDispatch)
		getNoblePaths(displayDispatch, 'Wake')
		getNoblePaths(displayDispatch, 'Gym')
	}, [displayDispatch])

	const displayPaths = paths.map((path) => <Path key={path._id} path={path} />)
	console.log(paths)

	const displayNoblePathWake =
		noblePaths.length > 0 &&
		noblePaths.map((path) => {
			if (path.name === 'Wake') {
				return <NoblePathWake key={path._id} noblePath={path} />
			}
		})

	const displayNoblePathGym =
		noblePaths.length > 0 &&
		noblePaths.map((path) => {
			if (path.name === 'Gym') {
				return <NoblePathGym key={path._id} noblePath={path} />
			}
		})

	console.log(noblePaths)
	return (
		<Fragment>
			{displayPaths}
			{displayNoblePathGym}
			{displayNoblePathWake}
		</Fragment>
	)
}

export default DisplayPaths
