const express = require('express')
const auth = require('../middleware/auth.js')
const router = express.Router()
const Path = require('../models/Path.js')

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
		res.status(500).send('Server Error ')
	}
})

// @route       PUT api/items/:id
// @desc        edit and item so that it's boolean use is set to true false. This can be used later to tell 3 whether or not to equip/adorn the item or not.
// @access      private
router.put('/:id', auth, async (req, res) => {
	// extract the equipped value from the client req object
	const { equipped } = req.body

	// build item object
	const equipField = {}
	if (equipped) {
		equipField.equipped = equipped
	} else if (!equipped) {
		equipField.equipped = false
	}

	try {
		let item = await Item.findById(req.params.id)
		if (!item) return res.status(404).json({ msg: 'Item not found' })

		// make sure student can only edit their own items
		if (item.student.toString() !== req.student.id) {
			return res.status(401).json({ msg: 'not authorised' })
		}

		item = await Item.findByIdAndUpdate(req.params.id, { $set: equipField })

		res.json(item)
	} catch (err) {
		console.error(error.message)
		res.status(500).send('Server Error ')
	}
})

// @route       DELETE api/items
// @desc        throw away an item
// @access      private
router.delete('/:id', auth, async (req, res) => {
	try {
		let item = await Item.findById(req.params.id)
		if (!item) return res.status(404).json({ msg: 'Item not found' })

		// make sure student can only edit their own items
		if (item.student.toString() !== req.student.id) {
			return res.status(401).json({ msg: 'not authorised' })
		}

		await Item.findByIdAndRemove(req.params.id)

		res.json({ msg: 'item deleted' })
	} catch (err) {
		console.error(error.message)
		res.status(500).send('Server Error ')
	}
})

module.exports = router
