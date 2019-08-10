import { vectors } from '../utilities/vectors.js';
import { BitmapCharacter } from './bitmap-character.js';
export class Zombie extends BitmapCharacter {
    constructor(image, position) {
        super();
        this.widthHeight = [image.width, image.height];
        this.image = image;
        this.position = position;
    }
    updatePosition(context) {
        const slowDownFactor = [0.1, 0.1];
        this.directTowards(context.entities.hero.position);
        this.randomStumble();
        this.position = vectors.add(this.position, vectors.multiply(this.velocity, slowDownFactor));
    }
    // doesn't do much!
    randomStumble() {
        if (Math.random() >= 0.5) {
            if (Math.random() >= 0.5) {
                this.velocity = vectors.add(this.velocity, vectors.left);
            }
            else
                this.velocity = vectors.add(this.velocity, vectors.right);
        }
    }
}
Zombie.imagesToLoad = [];
//# sourceMappingURL=zombie.js.map