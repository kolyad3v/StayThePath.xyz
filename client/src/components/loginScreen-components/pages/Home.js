import React, { Fragment } from 'react'
import Experience from '../../../Experience/Experience'

const Home = () => {
	// eslint-disable-next-line
	// const experience = new Experience(document.querySelector('canvas.webgl'))

	const stats = (
		<Fragment>
			<h1>HomePage</h1>
		</Fragment>
	)

	return (
		<>
			<div className='grid-2 text-center'>{stats}</div>
		</>
	)
}

export default Home
