import BoxCreator from "./BoxCreator";
import generateColor from '../helpers/generateColors';

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
    }

    update() {
        if(!this.isStopped){
            this.position[this.currentAxis] += this.direction * this.speed;
            if(Math.abs(this.position[this.currentAxis]) >= this.maxPosition){
                this.direction *= -1;
            }
        }
    }
}
export default Box;