import { Scene, Color, DirectionalLight, HemisphereLight, Group, AxesHelper } from 'three';
import Box from '../objects/Box';
import BoxCreator from '../objects/BoxCreator';
import Observer, { EVENTS } from '../Observer';
class Scene1 extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();
		this.create();
		this.events();
	}

	create() {
		this.baseCube = new BoxCreator({
			width: 200,
			height: 200,
			alt: 200,
			color: 0x2c3e50,
		});
		this.add(this.baseCube);

		// boxes group
		this.boxesGroup = new Group();
		this.add(this.boxesGroup);

		this.newBox({
			width: 200,
			height: 200,
			last: this.baseCube
		});

		// Helpers
		this.add(new AxesHelper(800));

		// Lights
		const ambientLight = new HemisphereLight(0xffffbb, 0x080820, .5);
		const light = new DirectionalLight(0xffffff, 1.0);
		this.add(light, ambientLight);
	}

	getLastBox() {
		return this.boxesGroup.children[this.boxesGroup.children.length - 1];
	}

	events() {
		Observer.on(EVENTS.CLICK, () => {
			this.newBox({
				width: 200,
				height: 200,
				last: this.getLastBox()
			});
		});

		Observer.on(EVENTS.STACK, () => {

		});

		Observer.on(EVENTS.GAME_OVER, () => {
			console.log('game over');
		});
	}

	newBox({ width, height, last }) {
		const currentBox = new Box({
			width,
			height,
			last
		});
		this.boxesGroup.add(currentBox);
	}

	update() {
		this.getLastBox().update();
	}
}

export default Scene1;