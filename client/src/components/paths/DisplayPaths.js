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
	}, [displayDispatch])

	const displayPaths = paths.map((path) => <Path key={path._id} path={path} />)

	const displayNoblePaths =
		noblePaths.length > 0
			? noblePaths.map((path) => {
					switch (path.name) {
						case 'Wake':
							return <NoblePathWake key={path._id} noblePath={path} />
						case 'Gym':
							return <NoblePathGym key={path._id} noblePath={path} />
						default:
							break
					}
			  })
			: null
	return (
		<Fragment>
			{displayPaths}
			{displayNoblePaths}
		</Fragment>
	)
}

export default DisplayPaths
