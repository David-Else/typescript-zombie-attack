import { Vector2 } from '../vectors.js';
import { Drawable } from './base-class';
import { Character } from './character';

/**
 * =============================================================================
 * Characters drawn using bitmap
 * =============================================================================
 */
export abstract class BitmapCharacter extends Character implements Drawable {
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y);
  }
  protected abstract image: HTMLImageElement;
  protected abstract widthHeight: Vector2;
}
