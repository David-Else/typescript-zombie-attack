import { vectors } from '../utilities/vectors.js';
import { EntityBaseClass } from './base-class.js';
/**
 * ============================================================================
 * Second level base character abstract class all other characters inherit from
 * ============================================================================
 */
export class Character extends EntityBaseClass {
    constructor() {
        super(...arguments);
        this.lives = 1;
        // The velocity of an object is the rate of change of its position with respect
        // to a frame of reference
        this.velocity = [0, 0];
    }
    updatePosition(context) {
        this.position = vectors.add(this.position, this.velocity);
    }
    directTowards(targetPosition) {
        this.velocity = this.velocityTowards(this.position, targetPosition, 1);
    }
    /**
     * ==========================================================================
     * Returns the velocity for an entity to move towards a target position
     * ==========================================================================
     */
    velocityTowards(currentPosition, targetPosition, speed) {
        // compute delta between the source point and the destination point
        let dx = targetPosition[0] - currentPosition[0];
        let dy = targetPosition[1] - currentPosition[1];
        // compute the angle between the two points
        let angle = Math.atan2(dy, dx);
        // return the velocity vector through magnitude (speed) and the angle
        return [speed * Math.cos(angle), speed * Math.sin(angle)];
    }
}
//# sourceMappingURL=character.js.map