const mongoose = require('mongoose')

const PathSchema = mongoose.Schema({
	ronin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ronins',
	},
	name: {
		type: String,
		required: true,
	},
	value: {
		type: String,
	},
	entries: [
		{
			ronin: {
				type: mongoose.Schema.Types.ObjectId,
			},
			hours: {
				type: String,
			},
			notes: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('path', PathSchema)
