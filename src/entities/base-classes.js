import { vectors } from '../vectors.js';
/**
 * =============================================================================
 * Top level GameObject abstract class all others inherit from
 * =============================================================================
 */
export class GameObject {
    constructor() {
        this.rotation = 0;
        //   protected scale: Vector2 = [0, 0];
        this.position = [0, 0];
    }
    get x() {
        return this.position[0];
    }
    get y() {
        return this.position[1];
    }
}
/**
 * =============================================================================
 * Second level base character abstract class all other characters inherit from
 * =============================================================================
 */
class BaseCharacter extends GameObject {
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
/**
 * =============================================================================
 * Characters drawn using vectors
 * =============================================================================
 */
// cx.scale(3, .5); <<< scale method exits, add it so we don't have to make another scale thing!
export class VectorCharacter extends BaseCharacter {
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.translate(this.x + this.widthHeight[0] / 2, this.y + this.widthHeight[1] / 2);
        ctx.rotate(this.rotation * (Math.PI / 180));
        ctx.fillRect(this.widthHeight[0] / -2, this.widthHeight[1] / -2, this.widthHeight[0], this.widthHeight[1]);
        ctx.restore();
    }
}
/**
 * =============================================================================
 * Characters drawn using bitmap
 * =============================================================================
 */
export class BitmapCharacter extends BaseCharacter {
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}
//# sourceMappingURL=base-classes.js.map