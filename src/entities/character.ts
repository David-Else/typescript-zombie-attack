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
  // The velocity of an object is the rate of change of its position with respect
  // to a frame of reference
  protected velocity: Vector2 = [0, 0];
  public updatePosition(context?: GlobalState): void {
    this.position = vectors.add(this.position, this.velocity);
  }

  protected directTowards(targetPosition: Vector2): void {
    this.velocity = this.moveTowardsEntity(this.position, targetPosition, 1);
  }

  // this needs to move out into utilities, get better name, and have test!
  private moveTowardsEntity(
    currentPosition: Vector2,
    targetPosition: Vector2,
    speed: number,
  ): Vector2 {
    // compute delta between the source point and the destination point
    let dx = targetPosition[0] - currentPosition[0];
    let dy = targetPosition[1] - currentPosition[1];

    // compute the angle between the two points
    let angle = Math.atan2(dy, dx);

    // return the velocity vector through magnitude (speed) and the angle
    return [speed * Math.cos(angle), speed * Math.sin(angle)];
  }
}
