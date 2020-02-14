import { GlobalState } from "../states/global-state.js";
import { Vector2, vectors } from "../utilities/vectors.js";
import { velocityTowards } from "../utilities/velocity-towards.js";
import { EntityBaseClass } from "./base-class.js";

/**
 * ============================================================================
 * Second level base character abstract class all other characters inherit from
 * ============================================================================
 */
export abstract class Character extends EntityBaseClass {
  protected lives = 1;
  // The velocity of an object is the rate of change of its position with
  // respect to a frame of reference
  protected velocity: Vector2 = [0, 0];

  public updatePosition(context?: GlobalState): void {
    this.position = vectors.add(this.position, this.velocity);
  }

  protected directTowards(targetPosition: Vector2): void {
    this.velocity = velocityTowards(this.position, targetPosition, 1);
  }
}
