import { GameContext } from '../states/context.js';
import { Vector2 } from '../vectors.js';

export interface Drawable {
  updatePosition(context?: GameContext): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * =============================================================================
 * Top level abstract class all others inherit from
 * =============================================================================
 */
export abstract class EntityBaseClass {
  public rotation = 0;
  protected scale: Vector2 = [0, 0];
  protected abstract position: Vector2 = [0, 0];

  public get x(): number {
    return this.position[0];
  }
  public get y(): number {
    return this.position[1];
  }
}
