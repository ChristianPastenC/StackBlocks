import BoxCreator from "./BoxCreator";
import generateColor from '../helpers/generateColors';
import Observer, { EVENTS } from "../Observer";

class Box extends BoxCreator {
    constructor({ width, height, last }) {
        super({ width, height, color: generateColor() });
        this.last = last;

        this.position.y = last.position.y + last.geometry.parameters.height / 2 + this.geometry.parameters.height / 2;

        this.maxPosition = 360;
        this.isStopped = false;
        this.direction = 1;
        this.speed = 4;
        this.currentAxis = (Math.random() >= 0.5) ? 'x' : 'z';
        this.reverseAxis = (this.currentAxis === 'x') ? 'x' : 'z';

        this.position[this.currentAxis] -= this.maxPosition * this.direction;
        this.position[this.reverseAxis] = last.position[this.reverseAxis];
    }

    place() {
        const plane = (this.currentAxis === 'x') ? 'width' : 'height';
        const distanceCenter = this.position[this.currentAxis] - this.last.position[this.currentAxis];
        const overlay = this.last.dimension[plane] - Math.abs(distanceCenter);

        if (overlay > 0) {

            const cut = this.last.dimension[plane] - overlay;

            const newBox = {
                base: {
                    width: (plane === 'width') ? overlay : this.dimension.width,
                    height: (plane === 'height') ? overlay : this.dimension.height,
                },
                cut: {
                    width: (plane === 'width') ? cut : this.dimension.width,
                    height: (plane === 'height') ? cut : this.dimension.height,
                },
                color: this.color,
                axis: this.currentAxis,
                last_position: this.position,
                direction: distanceCenter / Math.abs(distanceCenter) | 1,
            }
            Observer.emit(EVENTS.STACK, newBox);
        } else {
            Observer.emit(EVENTS.GAME_OVER);
        }
    }

    update() {
        if (!this.isStopped) {
            this.position[this.currentAxis] += this.direction * this.speed;
            if (Math.abs(this.position[this.currentAxis]) >= this.maxPosition) {
                this.direction *= -1;
            }
        }
    }
}
export default Box;