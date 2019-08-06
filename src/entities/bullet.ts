import { vectors, Vector2 } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';

export class Bullet extends VectorCharacter {
  public widthHeight: Vector2 = [6, 25];
  public color = 'black';

  // Add smoothstep
  public totalFrames = 60;
  public frameCounter = 0;
  public startValue = this.y;
  public endValue = 400;
  public smoothstep = (x: number) => x * x * (3 - 2 * x);

  public constructor(public position: Vector2, public rotation: number) {
    super();
  }

  public updatePosition(): void {
    // Add smoothstep
    // Run the animation while `frameCounter` is less than `totalFrames`
    // if (this.frameCounter < this.totalFrames) {
    //   // Find the normalized time value
    //   let normalizedTime = this.frameCounter / this.totalFrames;
    //   // Apply the easing function
    //   let curvedTime = this.smoothstep(normalizedTime);
    //   // Interpolate the sprite's x position based on the curved time
    //   this.position[1] =
    //     this.endValue * curvedTime + this.startValue * (1 - curvedTime);
    //   console.log(
    //     this.endValue * curvedTime + this.startValue * (1 - curvedTime),
    //   );

    //   // Add 1 to the frame counter
    //   this.frameCounter += 1;
    // }

    this.position = vectors.add(this.position, [
      1 * Math.sin(this.rotation * (Math.PI / 180)),
      -1 * Math.cos(this.rotation * (Math.PI / 180)),
    ]);
  }
}
