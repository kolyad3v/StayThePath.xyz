const express = require('express')
const auth = require('../middleware/auth.js')
const router = express.Router()
const Path = require('../models/Path.js')
const NoblePathWake = require('../models/NoblePathWake.js')
const NoblePathGym = require('../models/NoblePathGym.js')
// @route       GET api/records
// @desc        get logged in ronins full record (total time for all paths)
// @access      private
router.get('/', auth, async (req, res) => {
	try {
		const allPaths = await Path.find({ ronin: req.ronin.id }).sort({
			date: -1,
		})
		res.json(allPaths)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('server error ')
	}
})

// @route       POST api/path
// @desc        add a new global path to begin adding records to
// @access      private
router.post('/', auth, async (req, res) => {
	const { name, value } = req.body

	try {
		const newPath = new Path({
			name,
			value,
			ronin: req.ronin.id,
		})

		const path = await newPath.save()

		res.status(200).json(path)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

// NOBLE PATH WAKE

// @route       POST api/path/noblePathWake
// @desc        add a noble path wake to the user interface. Not the entries route.
// @access      private

router.post('/noblePathWake', auth, async (req, res) => {
	const { name } = req.body

	try {
		let noblePathWake = await NoblePathWake.findOne({ name })
		if (noblePathWake) {
			return res.status(400).json({
				msg: 'Wake Path Already Initialised',
			})
		} else {
			noblePathWake = new NoblePathWake({
				name,
				ronin: req.ronin.id,
			})

			const noblePath = await noblePathWake.save()

			res.status(200).json(noblePath)
		}
	} catch (err) {
		console.error(err.message)
		res.status(500).send({ msg: 'server error' })
	}
})
// @route		GET a WAKE NOBLE PATH
// @desc		get noble wake path if exists
// @access		private

router.get('/noblePathWake', auth, async (req, res) => {
	try {
		const allNoblePathWake = await NoblePathWake.find({
			ronin: req.ronin.id,
		}).sort({
			date: -1,
		})
		res.json(allNoblePathWake)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('server error')
	}
})

// @route		Post a wake time entry api/paths
// @desc		add wake time on noblePathWake
// @access		private

router.post('/noblePathWakeEntry/:id', auth, async (req, res) => {
	console.log(req.params)
	try {
		const noblePath = await NoblePathWake.findById(req.params.id)
		console.log(req.body.hour)
		const newEntry = {
			hour: req.body.hour,
			minute: req.body.minute,
			notes: req.body.notes,
		}

		noblePath.entries.unshift(newEntry)

		await noblePath.save()

		res.json(noblePath)
	} catch (err) {
		console.error(err)
		res.status(500).send('entry addition failed')
	}
})

// NOBLE PATH GYM --->

// @route       POST api/path/noblePathGym
// @desc        add the noble path GYM to the user interface. Not the entries route.
// @access      private

router.post('/noblePathGym', auth, async (req, res) => {
	const { name } = req.body

	try {
		let noblePath = await NoblePathGym.findOne({ name })
		if (noblePath) {
			return res.status(400).json({
				msg: 'Gym Path Already Initialised',
			})
		} else {
			noblePath = new NoblePathGym({
				name,
				ronin: req.ronin.id,
			})

			const noblePathGym = await noblePath.save()
			res.status(200).json(noblePathGym)
		}
	} catch (err) {
		console.error(err.message)
		res.status(500).send({ msg: 'server error' })
	}
})

// @route		GET a WAKE NOBLE PATH
// @desc		get noble wake path if exists
// @access		private

router.get('/noblePathGym', auth, async (req, res) => {
	try {
		const noblePathGym = await NoblePathGym.find({
			ronin: req.ronin.id,
		}).sort({
			date: -1,
		})
		res.json(noblePathGym)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('server error')
	}
})

// @route		Post api/paths
// @desc		add a gym session entry
// @access		private

router.post('/noblePathGymEntry/:id', auth, async (req, res) => {
	try {
		const noblePath = await NoblePathGym.findById(req.params.id)

		const newEntry = {
			time: req.body.time,
			exercises: req.body.exercises,
			notes: req.body.notes,
		}

		noblePath.entries.unshift(newEntry)

		await noblePath.save()

		res.json(noblePath)
	} catch (err) {
		console.error(err)
		res.status(500).send('entry addition failed')
	}
})

// @route       PUT api/value/:id
// @desc        update the value of a path. Not in use atm.
// @access      private
router.put('/:id', auth, async (req, res) => {
	// extract the values needing change from the client req object
	const { value } = req.body

	// build item object
	const pathFields = {}
	if (value) pathFields.value = value

	try {
		let path = await Path.findById(req.params.id)
		if (!path) return res.status(404).json({ msg: 'Path not found' })

		// make sure student can only edit their own items
		if (path.ronin.toString() !== req.ronin.id) {
			return res.status(401).json({ msg: 'not authorised' })
		}

		path = await Path.findByIdAndUpdate(
			req.params.id,
			{ $set: pathFields },
			{ new: true }
		)

		res.json(path)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error ')
	}
})

// @route		Post an Entry api/paths
// @desc		add a log of work output and notes if desired
// @access		private

router.post('/entry/:id', auth, async (req, res) => {
	try {
		const path = await Path.findById(req.params.id)

		const newEntry = {
			hours: req.body.hours,
			minutes: req.body.minutes,
			notes: req.body.notes,
		}

		path.entries.unshift(newEntry)

		await path.save()

		res.json(path)
	} catch (err) {
		console.error(err)
		res.status(500).send('entry addition failed')
	}
})

// @route       DELETE api/paths
// @desc        throw away an item
// @access      private
router.delete('/:id', auth, async (req, res) => {
	try {
		let pathToDelete = await Path.findById(req.params.id)
		if (!pathToDelete) return res.status(404).json({ msg: 'Path not found' })

		// make sure Ronin can only edit their own items
		if (pathToDelete.ronin.toString() !== req.ronin.id) {
			return res.status(401).json({ msg: 'not authorised' })
		}

		await Path.findByIdAndRemove(req.params.id)

		res.json({ msg: 'item deleted' })
	} catch (err) {
		console.error(error.message)
		res.status(500).send('Server Error ')
	}
})

module.exports = router
