import { Character } from './character.js';
/**
 * =============================================================================
 * Characters drawn using bitmap
 * =============================================================================
 */
export class BitmapCharacter extends Character {
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}
//# sourceMappingURL=bitmap-character.js.map