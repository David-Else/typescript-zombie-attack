import { vectors, Vector2 } from '../vectors.js';
import { Zombie } from './zombie.js';
import { Hero } from './hero.js';
import { Bullet } from './bullet.js';

export type Character = Hero | Zombie | Bullet;
export interface Drawable {
  update(state?: any): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * =============================================================================
 * Top level GameObject abstract class all others inherit from
 * =============================================================================
 */
export abstract class GameObject {
  public rotation = 0;
  public scale: Vector2 = [0, 0];
  abstract position: Vector2 = [0, 0];

  public get x(): number {
    return this.position[0];
  }
  public get y(): number {
    return this.position[1];
  }
}

/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * =============================================================================
 */
abstract class BaseCharacter extends GameObject implements Drawable {
  public lives: number = 1;
  public velocity: Vector2 = [0, 0];

  public update(state?: any): void {
    this.position = vectors.add(this.position, this.velocity);
  }

  public directTowards(targetPosition: Vector2): void {
    const [targetX, targetY] = [targetPosition[0], targetPosition[1]];
    let targetVelocity: Vector2 = [0, 0];

    if (this.x > targetX) {
      targetVelocity = vectors.add(targetVelocity, vectors.left);
    } else if (this.x < targetX) {
      targetVelocity = vectors.add(targetVelocity, vectors.right);
    }
    if (this.y > targetY) {
      targetVelocity = vectors.add(targetVelocity, vectors.down);
    } else if (this.y < targetY) {
      targetVelocity = vectors.add(targetVelocity, vectors.up);
    }

    this.velocity = targetVelocity;
  }
  abstract draw(ctx: CanvasRenderingContext2D): void;
}

/**
 * =============================================================================
 * Characters drawn using vectors
 * =============================================================================
 */

// cx.scale(3, .5); <<< scale method exits, add it so we don't have to make another scale thing!
export abstract class VectorCharacter extends BaseCharacter {
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(
      this.x + this.widthHeight[0] / 2,
      this.y + this.widthHeight[1] / 2,
    );
    ctx.rotate(this.rotation * (Math.PI / 180));
    ctx.fillRect(
      this.widthHeight[0] / -2,
      this.widthHeight[1] / -2,
      this.widthHeight[0],
      this.widthHeight[1],
    );
    ctx.restore();
  }

  abstract color: string;
  abstract widthHeight: Vector2;
}

/**
 * =============================================================================
 * Characters drawn using bitmap
 * =============================================================================
 */
export abstract class BitmapCharacter extends BaseCharacter {
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(this.image, this.x, this.y);
  }

  abstract image: HTMLImageElement;
  abstract widthHeight: Vector2;
}
