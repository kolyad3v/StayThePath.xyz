const mongoose = require('mongoose')

const NoblePathGymSchema = mongoose.Schema({
	ronin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ronins',
	},
	name: {
		type: String,
		required: true,
	},
	// an entry represents an exercise session
	entries: [
		{
			ronin: {
				type: mongoose.Schema.Types.ObjectId,
			},
			time: {
				type: Number,
			},
			exercises: [
				{
					name: {
						type: String,
						required: true,
					},

					sets: [
						{
							reps: {
								type: Number,
								required: true,
							},
							weight: {
								type: Number,
								required: true,
							},
							quality: {
								type: String,
							},
						},
					],
					// notes on how the specific exercise performed
					notes: {
						type: String,
					},
				},
			],
			// notes on how the whole session was
			notes: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('noblePathGym', NoblePathGymSchema)
