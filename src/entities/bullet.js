import { tween } from '../utilities/tween.js';
import { vectors } from '../utilities/vectors.js';
import { VectorCharacter } from './vector-character.js';
export class Bullet extends VectorCharacter {
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.kind = 'bullet';
        this.color = 'black';
        this.widthHeight = [6, 25];
        this.velocity = [2, -2];
        // Add smoothstep
        this.totalFrames = 120;
        this.frameCounter = 0;
        this.tweenVelocity = [0, 0];
    }
    updatePosition() {
        // Run the animation while `frameCounter` is less than `totalFrames`
        if (this.frameCounter < this.totalFrames) {
            // Find the normalized time value
            this.tween();
        }
        this.position = vectors.add(this.position, [
            this.tweenVelocity[0] * Math.sin(this.rotation * (Math.PI / 180)),
            this.tweenVelocity[1] * Math.cos(this.rotation * (Math.PI / 180)),
        ]);
    }
    tween() {
        const normalizedTime = this.frameCounter / this.totalFrames;
        // Apply the easing function
        const curvedTime = tween.smoothStepSquared(normalizedTime);
        this.tweenVelocity = vectors.add(this.velocity, vectors.multiply([curvedTime, curvedTime], this.velocity));
        // Add 1 to the frame counter
        this.frameCounter += 1;
    }
}
//# sourceMappingURL=bullet.js.map