const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const Ronin = require('../models/Ronin.js')

// @route       POST api/ronins
// @desc        register a new ronin
// @access      public
router.post(
	'/',
	[
		check('email', 'please include a valid email you maggot scum').isEmail(),
		check('password', 'please enter password with 6 or more characters').isLength(
			{ min: 6 }
		),
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			let ronin = await Ronin.findOne({ email })
			if (ronin) {
				return res.status(400).json({ msg: 'Email already exists you maggot scum' })
			}

			ronin = new Ronin({
				email,
				password,
			})

			// create a salt using bcrypt package
			const salt = await bcrypt.genSalt(10)
			// update the instance of ronin above to set password to the salted hash.
			ronin.password = await bcrypt.hash(password, salt)
			// ronin.save returns a promise so wait for this to come back in
			await ronin.save()
			// create payload to give to client
			const payload = {
				ronin: {
					id: ronin.id,
				},
			}

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) {
						throw err
					}
					res.json({ token })
				}
			)
		} catch (err) {
			console.error(err.message, 'ronin api')
			res.status(500).send('server error')
		}
	}
)

module.exports = router
