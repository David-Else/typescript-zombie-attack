import { Vector2 } from "../utilities/vectors";

/**
 * this is not a delegate... it is shared state that can be pushed inside a delegate
 */
export class Positionable {
  constructor(
    public position: Vector2,
    public width: number,
    public height: number,
    public rotation: number,
    public velocity: Vector2
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.velocity = velocity;
  }
}
