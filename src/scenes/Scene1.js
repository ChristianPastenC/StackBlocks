import { Scene, Color, DirectionalLight, HemisphereLight, Group, AxesHelper } from 'three';
import Box from '../objects/Box';
import BoxCreator from '../objects/BoxCreator';
import SliceBox from '../objects/SliceBox';
import Observer, { EVENTS } from '../Observer';
class Scene1 extends Scene {
	constructor() {
		super();
		this.background = new Color('skyblue').convertSRGBToLinear();

		this.stackPoints = 0;
		this.gameOver = true;

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

	events() {
		Observer.on(EVENTS.CLICK, () => {
			// this.newBox({
			// 	width: 200,
			// 	height: 200,
			// 	last: this.getLastBox()
			// });
			this.getLastBox().place();
		});

		Observer.on(EVENTS.STACK, (newBox) => {
			this.stackPoints++;

			// Remove main box
			this.boxesGroup.remove(this.getLastBox());

			// Cut current box
			const currentBaseCut = new SliceBox(newBox);
			this.boxesGroup.add(currentBaseCut.getBase());
			this.add(currentBaseCut.getCut());

			// new box
			this.newBox({
				width: newBox.base.width,
				height: newBox.base.height,
				last: this.getLastBox(),
			});
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

	getLastBox() {
		return this.boxesGroup.children[this.boxesGroup.children.length - 1];
	}

	update() {
		this.getLastBox().update();
	}
}

export default Scene1;