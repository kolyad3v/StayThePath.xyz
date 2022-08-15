const mongoose = require('mongoose')

const NoblePathWakeShema = mongoose.Schema({
	ronin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ronins',
	},
	name: {
		type: String,
		required: true,
	},
	entries: [
		{
			ronin: {
				type: mongoose.Schema.Types.ObjectId,
			},
			hour: {
				type: Number,
			},
			minute: {
				type: Number,
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

module.exports = mongoose.model('noblePathWake', NoblePathWakeShema)
