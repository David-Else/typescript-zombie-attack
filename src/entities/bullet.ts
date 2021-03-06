import { tween } from "../utilities/tween.js";
import { Vector2, vectors } from "../utilities/vectors.js";
import { VectorCharacter } from "./vector-character.js";

export class Bullet extends VectorCharacter {
  public readonly kind = "bullet";
  public readonly color = "black";

  public readonly widthHeight: Vector2 = [6, 25];
  public readonly velocity: Vector2 = [2, -2];

  // Add smoothstep
  public readonly totalFrames = 120;
  public frameCounter = 0;
  public tweenVelocity: Vector2 = [0, 0];

  public constructor(public position: Vector2, public rotation: number) {
    super();
  }

  public updatePosition(): void {
    // Run the animation while `frameCounter` is less than `totalFrames`
    if (this.frameCounter < this.totalFrames) {
      // Find the normalized time value
      this.tween();
    }
    this.position = vectors.add(this.position, [
      this.tweenVelocity[0] * Math.sin(this.rotation * (Math.PI / 180)),
      this.tweenVelocity[1] * Math.cos(this.rotation * (Math.PI / 180))
    ]);
  }

  private tween(): void {
    const normalizedTime = this.frameCounter / this.totalFrames;
    // Apply the easing function
    const curvedTime = tween.smoothStepSquared(normalizedTime);
    this.tweenVelocity = vectors.add(
      this.velocity,
      vectors.multiply([curvedTime, curvedTime], this.velocity)
    );
    // Add 1 to the frame counter
    this.frameCounter += 1;
  }
}
