import { GameContext } from '../states/context.js';
import { Vector2, vectors } from '../utilities/vectors.js';
import { EntityBaseClass } from './base-class.js';

/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * =============================================================================
 */
export abstract class Character extends EntityBaseClass {
  protected lives: number = 1;
  protected velocity: Vector2 = [0, 0];
  public updatePosition(context?: GameContext): void {
    this.position = vectors.add(this.position, this.velocity);
  }
  protected directTowards(targetPosition: Vector2): void {
    const [targetX, targetY] = [targetPosition[0], targetPosition[1]];
    let targetVelocity: Vector2 = [0, 0];
    if (this.x > targetX) {
      targetVelocity = vectors.add(targetVelocity, vectors.left);
    } else {
      targetVelocity = vectors.add(targetVelocity, vectors.right);
    }
    if (this.y > targetY) {
      targetVelocity = vectors.add(targetVelocity, vectors.down);
    } else {
      targetVelocity = vectors.add(targetVelocity, vectors.up);
    }
    this.velocity = targetVelocity;
  }
}
