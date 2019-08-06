import { vectors } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';
export class Bullet extends VectorCharacter {
    constructor(position, rotation) {
        super();
        this.position = position;
        this.rotation = rotation;
        this.widthHeight = [6, 25];
        this.color = 'black';
        // Add smoothstep
        this.totalFrames = 60;
        this.frameCounter = 0;
        this.startValue = this.y;
        this.endValue = 200;
        this.smoothstep = (x) => x * x * (3 - 2 * x);
    }
    updatePosition() {
        // Add smoothstep
        // Run the animation while `frameCounter` is less than `totalFrames`
        if (this.frameCounter < this.totalFrames) {
            // Find the normalized time value
            let normalizedTime = this.frameCounter / this.totalFrames;
            // Apply the easing function
            let curvedTime = this.smoothstep(normalizedTime);
            // Interpolate the sprite's x position based on the curved time
            this.position[1] =
                this.endValue * curvedTime + this.startValue * (1 - curvedTime);
            // Add 1 to the frame counter
            this.frameCounter += 1;
        }
        this.position = vectors.add(this.position, [
            1 * Math.sin(this.rotation * (Math.PI / 180)),
            -1 * Math.cos(this.rotation * (Math.PI / 180)),
        ]);
    }
}
//# sourceMappingURL=bullet.js.map