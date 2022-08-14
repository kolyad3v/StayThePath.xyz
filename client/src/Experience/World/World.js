import Experience from '../Experience.js'
import Environment from './Environment.js'
import TheConstruct from './TheConstruct.js'

export default class World {
	constructor() {
		console.log('world instantiated!')

		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources

		// Wait for resources
		this.resources.on('ready', () => {
			// Setup
			this.theConstruct = new TheConstruct()
			this.environment = new Environment()
		})
	}

	update() {
		if (this.theConstruct) {
			this.theConstruct.update()
		}
	}

	resize() {}
}
