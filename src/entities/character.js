import { vectors } from '../utilities/vectors.js';
import { EntityBaseClass } from './base-class.js';
/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * =============================================================================
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
        const [targetX, targetY] = [targetPosition[0], targetPosition[1]];
        let targetVelocity = [0, 0];
        if (this.x > targetX) {
            targetVelocity = vectors.add(targetVelocity, vectors.left);
        }
        else {
            targetVelocity = vectors.add(targetVelocity, vectors.right);
        }
        if (this.y > targetY) {
            targetVelocity = vectors.add(targetVelocity, vectors.down);
        }
        else {
            targetVelocity = vectors.add(targetVelocity, vectors.up);
        }
        this.velocity = targetVelocity;
    }
}
//# sourceMappingURL=character.js.map