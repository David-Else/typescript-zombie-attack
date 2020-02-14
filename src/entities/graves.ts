import { Vector2 } from "../utilities/vectors.js";
import { VectorCharacter } from "./vector-character.js";

export class Grave extends VectorCharacter {
  public readonly kind = "grave";
  public readonly widthHeight: Vector2 = [125, 50];
  public readonly color = "grey";

  public readonly lives = 3;

  public constructor(public position: Vector2) {
    super();
  }

  // public updatePosition(context: GameContext): void {
  //   // do nothing, it does not move
  // }
}
