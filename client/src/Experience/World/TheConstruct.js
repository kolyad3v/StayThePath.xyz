import * as THREE from 'three'
import Experience from '../Experience'
// import Box from '../Utils/Box'

export default class TheConstruct {
	constructor() {
		console.log('TheConstruct model instantiated!')
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
		this.resource = this.resources.items.mountain
		this.time = this.experience.time
		this.camera = this.experience.camera

		// debug
		this.debug = this.experience.debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder('TheConstruct')
			this.debugObject = {
				floorColor: '#ffffff',
			}
		}
		// Methods

		// this.setTempTerrain()
		this.setModel()
	}

	setTempTerrain() {
		// add temporary setting to scene
		this.floorMaterial = new THREE.MeshBasicMaterial({
			color: '#ffffff',
			depthWrite: false,
		})
		this.floor = new THREE.Mesh(
			new THREE.PlaneGeometry(20, 20, 10, 10),
			this.floorMaterial
		)
		this.floor.rotation.x = -Math.PI / 2
		this.floor.receiveShadow = true
		this.scene.add(this.floor)
	}

	setModel() {
		this.model = this.resource.scene
		console.log(this.model)

		// // this.model.children[1].material = this.bakedMaterial
		this.scene.add(this.model)

		/// add portal material to portals of scene

		// this.box = new Box()

		if (this.debug.active) {
			this.debugFolder.addColor(this.debugObject, 'floorColor').onChange(() => {
				this.floorMaterial.color.set(new THREE.Color(this.debugObject.floorColor))
			})
		}
	}

	update() {
		// this.model.rotation.y = this.time.elapsed * 0.00001
	}
}
