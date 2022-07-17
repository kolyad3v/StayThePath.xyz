import React, { Fragment } from 'react'
import Experience from '../../../Experience/Experience'
import DisplayPaths from '../../paths/DisplayPaths'
import AddPath from '../../paths/AddPath'
const Home = () => {
	// eslint-disable-next-line
	// const experience = new Experience(document.querySelector('canvas.webgl'))

	const stats = (
		<Fragment>
			<AddPath />
			<DisplayPaths />
		</Fragment>
	)

	return (
		<>
			<div className='grid-2 text-center'>{stats}</div>
		</>
	)
}

export default Home
