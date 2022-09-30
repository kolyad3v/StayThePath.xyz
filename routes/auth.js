const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const Ronin = require('../models/Ronin.js')

// @route       GET api/auth
// @desc        get the student which has logged in
// @access      private
router.get('/', auth, async (req, res) => {
	try {
		// if the auth middleware shows a token, we will go to the database and find the student details whose match that id. return details except the password.
		const ronin = await Ronin.findById(req.ronin.id).select('-password')

		res.json(ronin)
	} catch (err) {
		res.status(500).send('server error')
	}
})

// @route       POST api/auth
// @desc        authenticate student and return token
// @access      private
router.post(
	'/',
	[
		check('email', 'please provide a valid email').isEmail(),
		check('password', 'password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			let ronin = await Ronin.findOne({ email })

			if (!ronin) {
				return res.status(400).json({ msg: 'Invalid Credentials' })
			}

			// will return true or false depending on whether the passwords match
			const isMatch = await bcrypt.compare(password, ronin.password)

			if (!isMatch) {
				res.status(400).json({ msg: 'Invalid Credentials' })
			}

			const payload = {
				ronin: {
					id: ronin.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) {
						throw err
					}
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('server error')
		}
	}
)

module.exports = router
