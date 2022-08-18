import React, { Fragment, useEffect } from 'react'
import Path from './Path'
import NoblePathWake from './NoblePathWake'
import NoblePathGym from './NoblePathGym'
import NoblePathFood from './NoblePathFood'

import { usePath, getPaths, getNoblePaths } from '../../context/Paths/PathState'
const DisplayPaths = () => {
	const [displayState, displayDispatch] = usePath()

	const { paths, noblePathWake, noblePathGym, noblePathFood } = displayState

	useEffect(() => {
		getPaths(displayDispatch)
		getNoblePaths(displayDispatch, 'Wake')
		getNoblePaths(displayDispatch, 'Gym')
		getNoblePaths(displayDispatch, 'Food')
	}, [displayDispatch])

	const displayPaths = paths.map((path) => <Path key={path._id} path={path} />)
	console.log(paths)

	const displayNoblePathWake = noblePathWake.length && (
		<NoblePathWake noblePath={noblePathWake[0]} />
	)

	const displayNoblePathGym = noblePathGym.length && (
		<NoblePathGym noblePath={noblePathGym[0]} />
	)

	const displayNoblePathFood = noblePathFood.length && (
		<NoblePathFood noblePath={noblePathFood[0]} />
	)

	console.log(noblePathFood)
	return (
		<Fragment>
			{displayPaths}
			{noblePathGym.length > 0 && displayNoblePathGym}
			{noblePathWake.length > 0 && displayNoblePathWake}
			{noblePathFood.length > 0 && displayNoblePathFood}
			{/* <div className='frostContainer'></div> */}
		</Fragment>
	)
}

export default DisplayPaths
