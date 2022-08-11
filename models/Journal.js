const mongoose = require('mongoose')

const JournalSchema = mongoose.Schema({
	ronin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ronins',
	},
	// I'm not going to add a name field because it is not dynamically changing and I can hard code in front-end.

	entries: [
		{
			ronin: {
				type: mongoose.Schema.Types.ObjectId,
			},
			subject: {
				type: String,
			},
			category: {
				type: String,
			},
			body: {
				type: String,
				requried: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],

	// I also don't think I need a time of creation for the noble path either. Will leave out for now.
})

module.exports = mongoose.model('noblePathJournal', JournalSchema)
