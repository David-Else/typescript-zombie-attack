import { vectors } from '../utilities/vectors.js';
import { EntityBaseClass } from './base-class.js';
/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * ============================================================================
 */
export class Character extends EntityBaseClass {
    constructor() {
        super(...arguments);
        this.lives = 1;
        this.velocity = [0, 0];
    }
    updatePosition(context) {
        this.position = vectors.add(this.position, this.velocity);
    }
    directTowards(targetPosition) {
        this.velocity = this.moveTowardsEntity(this.position, targetPosition);
    }
    moveTowardsEntity(currentPosition, targetPosition) {
        let velocity;
        let targetVelocity = [0, 0];
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
//# sourceMappingURL=character.js.map