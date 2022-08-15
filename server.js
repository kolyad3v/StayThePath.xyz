const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const app = express()

// Connect Database
connectDB()

//init middleware
app.use(express.json({ extended: false }))

//Define routes
app.use('/api/ronin', require('./routes/ronin'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/paths', require('./routes/paths'))
app.use('/api/noblePathFood', require('./routes/noblePathFood'))
app.use('/api/Journal', require('./routes/journal'))

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on ${PORT}`))
