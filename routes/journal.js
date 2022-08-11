const express = require('express')
const auth = require('../middleware/auth')
const NoblePathJournal = require('../models/Journal')
const router = express.Router()

// NOBLE PATH Journal

// @route       POST api/path/noblePathJournal
// @desc        add a noble path Journal to the user interface. Not the entries route.
// @access      private

router.post('/noblePathJournal', auth, async (req, res) => {
	try {
		let noblePathJournal = await NoblePathJournal.findOne()
		if (noblePathJournal) {
			return res.status(400).json({
				msg: 'Journal Path Already Initialised',
			})
		} else {
			noblePathJournal = new NoblePathJournal({
				ronin: req.ronin.id,
			})

			const noblePath = await noblePathJournal.save()

			res.status(200).json(noblePath)
		}
	} catch (err) {
		console.error(err.message)
		res.status(500).send({ msg: 'server error' })
	}
})
// @route		GET a Journal NOBLE PATH
// @desc		get noble Journal path if exists
// @access		private

router.get('/noblePathJournal', auth, async (req, res) => {
	try {
		const allNoblePathJournal = await NoblePathJournal.find({
			ronin: req.ronin.id,
		}).sort({
			date: -1,
		})
		res.json(allNoblePathJournal)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('server error')
	}
})

// @route		POST a Journal time ENTRY api/noblePathJournal
// @desc		add Journal time on noblePathJournal
// @access		private

router.post('/JournalEntry/:id', auth, async (req, res) => {
	console.log(req.params)
	try {
		const noblePath = await NoblePathJournal.findById(req.params.id)

		const newEntry = {
			subject: req.body.subject,
			category: req.body.category,
			body: req.body.body,
		}

		noblePath.entries.unshift(newEntry)

		await noblePath.save()

		res.json(noblePath)
	} catch (err) {
		console.error(err)
		res.status(500).send('entry addition failed')
	}
})

module.exports = router
