import { Vector2, vectors } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';

export class Bullet extends VectorCharacter {
  public widthHeight: Vector2 = [6, 25];
  public color = 'black';
  public velocity: Vector2 = [2, -2];
  public tweenVelocity: Vector2 = [0, 0];

  // Add smoothstep
  public totalFrames = 120;
  public frameCounter = 0;
  // public startValue = this.y;
  // public endValue = 200;
  // public i = 0;
  // public counter = 0;

  public linear = (x: number) => x;

  public acceleration = (x: number) => Math.pow(x, 2);
  public accelerationCubed = (x: number) => Math.pow(x, 3);

  public deceleration = (x: number) => 1 - Math.pow(1 - x, 2);
  public decelerationCubed = (x: number) => 1 - Math.pow(1 - x, 3);

  public smoothStep = (x: number) => x * x * (3 - 2 * x);
  public smoothStepSquared = (x: number) => Math.pow(x * x * (3 - 2 * x), 2);
  public smoothStepCubed = (x: number) => Math.pow(x * x * (3 - 2 * x), 3);

  public weightedAverage = (p: number, d: number, w: number) =>
    (p * (w - 1) + d) / w;

  // https://github.com/sole/tween.js/blob/master/src/Tween.js
  public quartic = (k: number) => 1 - --k * k * k * k;

  // public v: number = (this.v * (N - 1) + w) / N;

  public constructor(public position: Vector2, public rotation: number) {
    super();
  }

  public updatePosition(): void {
    // Add smoothstep
    // Run the animation while `frameCounter` is less than `totalFrames`
    if (this.frameCounter < this.totalFrames) {
      // Find the normalized time value
      const normalizedTime = this.frameCounter / this.totalFrames;
      // Apply the easing function
      const curvedTime = this.smoothStepSquared(normalizedTime);
      // Interpolate the sprite's x position based on the curved time
      // let tween =
      //   this.endValue * curvedTime + this.startValue * (1 - curvedTime);

      // 100 iterations

      // this.position[0] = this.i += 0.01;
      // this.position[1] = Math.sin(this.counter);
      // this.counter += Math.PI / 100;

      this.tweenVelocity = vectors.add(
        this.velocity,
        vectors.multiply([curvedTime, curvedTime], this.velocity),
      );
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
