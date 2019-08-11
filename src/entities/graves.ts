import { Vector2 } from '../utilities/vectors.js';
import { VectorCharacter } from './vector-character.js';

export class Grave extends VectorCharacter {
  public kind = 'grave';
  public lives = 3;
  public widthHeight: Vector2 = [125, 50];
  public color = 'grey';

  public constructor(public position: Vector2) {
    super();
  }

  // public updatePosition(context: GameContext): void {
  //   // do nothing, it does not move
  // }
}
