import { vectors } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';
export class Bullet extends VectorCharacter {
    // public v: number = (this.v * (N - 1) + w) / N;
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.widthHeight = [6, 25];
        this.color = 'black';
        this.velocity = [2, -2];
        this.tweenVelocity = [0, 0];
        // Add smoothstep
        this.totalFrames = 120;
        this.frameCounter = 0;
        // public startValue = this.y;
        // public endValue = 200;
        // public i = 0;
        // public counter = 0;
        this.linear = (x) => x;
        this.acceleration = (x) => Math.pow(x, 2);
        this.accelerationCubed = (x) => Math.pow(x, 3);
        this.deceleration = (x) => 1 - Math.pow(1 - x, 2);
        this.decelerationCubed = (x) => 1 - Math.pow(1 - x, 3);
        this.smoothStep = (x) => x * x * (3 - 2 * x);
        this.smoothStepSquared = (x) => Math.pow(x * x * (3 - 2 * x), 2);
        this.smoothStepCubed = (x) => Math.pow(x * x * (3 - 2 * x), 3);
        this.weightedAverage = (p, d, w) => (p * (w - 1) + d) / w;
        // https://github.com/sole/tween.js/blob/master/src/Tween.js
        this.quartic = (k) => 1 - --k * k * k * k;
    }
    updatePosition() {
        // Add smoothstep
        // Run the animation while `frameCounter` is less than `totalFrames`
        if (this.frameCounter < this.totalFrames) {
            // Find the normalized time value
            let normalizedTime = this.frameCounter / this.totalFrames;
            // Apply the easing function
            let curvedTime = this.smoothStepSquared(normalizedTime);
            // Interpolate the sprite's x position based on the curved time
            // let tween =
            //   this.endValue * curvedTime + this.startValue * (1 - curvedTime);
            // 100 iterations
            // this.position[0] = this.i += 0.01;
            // this.position[1] = Math.sin(this.counter);
            // this.counter += Math.PI / 100;
            this.tweenVelocity = vectors.add(this.velocity, vectors.multiply([curvedTime, curvedTime], this.velocity));
            // console.log(this.tweenVelocity);
            // Add 1 to the frame counter
            this.frameCounter += 1;
            console.log(this.frameCounter);
        }
        this.position = vectors.add(this.position, [
            this.tweenVelocity[0] * Math.sin(this.rotation * (Math.PI / 180)),
            this.tweenVelocity[1] * Math.cos(this.rotation * (Math.PI / 180)),
        ]);
    }
}
//# sourceMappingURL=bullet.js.map