import * as THREE from 'three'
import Experience from '../Experience'

export default class Greyfield {
	constructor() {
		console.log('Greyfield model instantiated!')
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.resources = this.experience.resources
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

		this.setTempTerrain()
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
		// this.model = this.resource.scene

		// // this.model.children[1].material = this.bakedMaterial
		// this.scene.add(this.model)

		/// add portal material to portals of scene

		if (this.debug.active) {
			this.debugFolder.addColor(this.debugObject, 'floorColor').onChange(() => {
				this.floorMaterial.color.set(new THREE.Color(this.debugObject.floorColor))
			})
		}
	}

	update() {
		// this.testCharacter.animate()
	}
}
