import { GlobalState } from '../states/global-state.js';
import { Vector2, vectors } from '../utilities/vectors.js';
import { EntityBaseClass } from './base-class.js';

/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * ============================================================================
 */
export abstract class Character extends EntityBaseClass {
  protected lives = 1;
  protected velocity: Vector2 = [0, 0];
  public updatePosition(context?: GlobalState): void {
    this.position = vectors.add(this.position, this.velocity);
  }

  protected directTowards(targetPosition: Vector2): void {
    this.velocity = this.moveTowardsEntity(this.position, targetPosition);
  }

  private moveTowardsEntity(
    currentPosition: Vector2,
    targetPosition: Vector2,
  ): Vector2 {
    let velocity: Vector2;
    let targetVelocity: Vector2 = [0, 0];

    velocity =
      currentPosition[0] > targetPosition[0]
        ? (targetVelocity = vectors.add(targetVelocity, vectors.left))
        : (targetVelocity = vectors.add(targetVelocity, vectors.right));
    velocity =
      currentPosition[1] > targetPosition[1]
        ? (targetVelocity = vectors.add(targetVelocity, vectors.down))
        : (targetVelocity = vectors.add(targetVelocity, vectors.up));

    return velocity;
  }
}
