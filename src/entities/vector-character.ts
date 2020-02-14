import { Vector2 } from "../utilities/vectors.js";
import { Drawable } from "./base-class";
import { Character } from "./character.js";

/**
 * =============================================================================
 * Characters drawn using vectors
 * =============================================================================
 */
export abstract class VectorCharacter extends Character implements Drawable {
  public abstract widthHeight: Vector2;
  protected abstract color: string;

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(
      this.x + this.widthHeight[0] / 2,
      this.y + this.widthHeight[1] / 2
    );
    ctx.rotate(this.rotation * (Math.PI / 180));
    ctx.fillRect(
      this.widthHeight[0] / -2,
      this.widthHeight[1] / -2,
      this.widthHeight[0],
      this.widthHeight[1]
    );
    ctx.restore();
  }
}
