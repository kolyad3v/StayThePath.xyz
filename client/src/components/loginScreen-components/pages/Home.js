import React, { Fragment } from 'react'
import Experience from '../../../Experience/Experience'
import DisplayPaths from '../../paths/DisplayPaths'
import AddPath from '../../paths/AddPath'
import AddNoblePath from '../../paths/AddNoblePath'
import NoblePathJournal from '../../paths/NoblePathJournal'
const Home = () => {
	// eslint-disable-next-line
	const experience = new Experience(document.querySelector('canvas.webgl'))

	const homeComponent = (
		<Fragment>
			<AddPath />
			<AddNoblePath />
			<DisplayPaths />
		</Fragment>
	)
	const journalComponent = (
		<Fragment>
			<NoblePathJournal />
		</Fragment>
	)

	return (
		<>
			<div className='grid-2 text-center'>{homeComponent}</div>
		</>
	)
}

export default Home
