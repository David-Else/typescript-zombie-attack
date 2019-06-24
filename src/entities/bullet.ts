import { vectors, Vector2 } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';

export class Bullet extends VectorCharacter {
  public widthHeight: Vector2 = [6, 25];
  public color = 'black';

  public constructor(public position: Vector2, rotation: number) {
    super();
    this.rotation = rotation;
  }

  public updatePosition(): void {
    const rotationInRadians = this.rotation * (Math.PI / 180);

    this.position = vectors.add(this.position, [
      1 * Math.sin(rotationInRadians),
      -1 * Math.cos(rotationInRadians),
    ]);
  }
}
