import { vectors } from '../utilities/vectors.js';
import { velocityTowards } from '../utilities/velocity-towards.js';
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
        // The velocity of an object is the rate of change of its position with
        // respect to a frame of reference
        this.velocity = [0, 0];
    }
    updatePosition(context) {
        this.position = vectors.add(this.position, this.velocity);
    }
    directTowards(targetPosition) {
        this.velocity = velocityTowards(this.position, targetPosition, 1);
    }
}
//# sourceMappingURL=character.js.map