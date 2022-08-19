const mongoose = require('mongoose')

const NoblePathFoodSchema = mongoose.Schema({
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
			time: {
				type: String,
			},
			meal: {
				type: String,
			},
			date: {
				type: Date,
				default: Date.now,
			},
		},
	],

	// I also don't think I need a time of creation for the noble path either. Will leave out for now.
})

module.exports = mongoose.model('noblePathFood', NoblePathFoodSchema)
