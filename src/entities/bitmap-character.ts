import { Vector2 } from "../utilities/vectors.js";
import { Drawable } from "./base-class";
import { Character } from "./character.js";

/**
 * =============================================================================
 * Characters drawn using bitmap
 * =============================================================================
 */
export abstract class BitmapCharacter extends Character implements Drawable {
  protected abstract image: HTMLImageElement;
  protected abstract widthHeight: Vector2;
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y);
  }
}
