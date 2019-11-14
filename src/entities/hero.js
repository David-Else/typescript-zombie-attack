import { vectors } from '../utilities/vectors.js';
import { Bullet } from './bullet.js';
import { entityFactory } from './factory.js';
// import { instantiate } from './factory.js';
import { VectorCharacter } from './vector-character.js';
export class Hero extends VectorCharacter {
    constructor(position) {
        super();
        this.position = position;
        this.kind = 'hero';
        this.widthHeight = [25, 50];
        this.color = 'red';
        this.lives = 3;
        this.firePaused = false;
        this.numberOfBullets = 100;
    }
    updatePosition(context) {
        function centerOfEntityScreenPosition(entity) {
            const middleOfEntity = vectors.divide(entity.widthHeight, [2, 2]);
            return vectors.add(entity.position, middleOfEntity);
        }
        if (context.inGameKeys.rightPressed) {
            this.rotation += 1;
        }
        if (context.inGameKeys.leftPressed) {
            this.rotation -= 1;
        }
        if (!context.inGameKeys.firePressed) {
            this.firePaused = false;
        }
        if (context.inGameKeys.firePressed &&
            this.numberOfBullets > 0 &&
            !this.firePaused) {
            //   context.inGameKeys.firePressed = false; WATCH OUT RACE BUG
            this.firePaused = true;
            context.entities.bullets.push(...entityFactory(Bullet, 1, centerOfEntityScreenPosition(this), this.rotation));
            this.numberOfBullets -= 1;
        }
    }
}
//# sourceMappingURL=hero.js.map