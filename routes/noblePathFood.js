const express = require('express')
const auth = require('../middleware/auth')
const NoblePathFood = require('../models/NoblePathFood')
const router = express.Router()

// NOBLE PATH FOOD

// @route       POST api/path/noblePathFood
// @desc        add a noble path Food to the user interface. Not the entries route.
// @access      private

router.post('/', auth, async (req, res) => {
	const { id: ronin } = req.ronin

	try {
		let noblePathFood = await NoblePathFood.findOne({ ronin })
		if (noblePathFood) {
			return res.status(400).json({
				msg: 'Food Path Already Initialised',
			})
		} else {
			noblePathFood = new NoblePathFood({
				ronin: req.ronin.id,
			})

			const noblePath = await noblePathFood.save()

			res.status(200).json(noblePath)
		}
	} catch (err) {
		console.error(err.message)
		res.status(500).send({ msg: 'server error' })
	}
})
// @route		GET a Food NOBLE PATH
// @desc		get noble Food path if exists
// @access		private

router.get('/', auth, async (req, res) => {
	try {
		const allNoblePathFood = await NoblePathFood.find({
			ronin: req.ronin.id,
		}).sort({
			date: -1,
		})
		res.json(allNoblePathFood)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('server error')
	}
})

// @route       DELETE api/noblePathFood
// @desc        Delete noble path FOOD
// @access      private
router.delete('/:id', auth, async (req, res) => {
	try {
		let pathToDelete = await NoblePathFood.findById(req.params.id)
		if (!pathToDelete) return res.status(404).json({ msg: 'Path not found' })

		// make sure Ronin can only edit their own items
		if (pathToDelete.ronin.toString() !== req.ronin.id) {
			return res.status(401).json({ msg: 'not authorised' })
		}

		await NoblePathFood.findByIdAndRemove(req.params.id)

		res.json({ msg: 'item deleted' })
	} catch (err) {
		console.error(error.message)
		res.status(500).send('Server Error ')
	}
})

// @route		POST a Food time ENTRY api/noblePathFood
// @desc		add Food time on noblePathFood
// @access		private

router.post('/Entry/:id', auth, async (req, res) => {
	console.log(req.params)
	try {
		const noblePath = await NoblePathFood.findById(req.params.id)

		const newEntry = {
			time: req.body.time,
			meal: req.body.meal,
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
