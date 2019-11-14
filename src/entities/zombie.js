import { random } from '../utilities/random.js';
import { vectors } from '../utilities/vectors.js';
import { BitmapCharacter } from './bitmap-character.js';
export class Zombie extends BitmapCharacter {
    constructor(image, positionToSpawnAround) {
        super();
        this.kind = 'zombie';
        this.widthHeight = [image.width, image.height];
        this.image = image;
        this.position = random.positionAroundPoint(positionToSpawnAround);
    }
    updatePosition(context) {
        const slowDownFactor = [0.1, 0.1];
        this.directTowards(context.entities.hero.position);
        // this.randomStumble();
        this.position = vectors.add(this.position, vectors.multiply(this.velocity, slowDownFactor));
    }
}
Zombie.imagesToLoad = [];
//# sourceMappingURL=zombie.js.map