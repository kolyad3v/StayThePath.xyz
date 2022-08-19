import React, { Fragment } from 'react'

import DisplayPaths from '../../paths/DisplayPaths'
import AddPath from '../../paths/AddPath'
import AddNoblePath from '../../paths/AddNoblePath'

const Home = () => {
	const homeComponent = (
		<Fragment>
			<DisplayPaths />
		</Fragment>
	)

	return (
		<>
			<div className='grid-2 text-center'>
				<AddPath />
				<AddNoblePath />
			</div>
			<div className='text-center'>{homeComponent}</div>
		</>
	)
}

export default Home
