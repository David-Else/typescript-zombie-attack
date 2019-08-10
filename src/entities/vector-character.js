import { Character } from './character';
/**
 * =============================================================================
 * Characters drawn using vectors
 * =============================================================================
 */
// cx.scale(3, .5); <<< scale method exits, add it so we don't have to make another scale thing!
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