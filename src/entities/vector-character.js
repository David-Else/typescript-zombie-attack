import { Character } from './character.js';
/**
 * =============================================================================
 * Characters drawn using vectors
 * =============================================================================
 */
export class VectorCharacter extends Character {
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
//# sourceMappingURL=vector-character.js.map