import { vectors } from '../vectors.js';
import { VectorCharacter } from './base-classes.js';
import { instantiate } from './entity-factory.js';
import { Bullet } from './bullet.js';
export class Hero extends VectorCharacter {
    constructor(position) {
        super();
        this.position = position;
        this.lives = 3;
        this.widthHeight = [25, 50];
        this.color = 'red';
        this.firePaused = false;
        this.numberOfBullets = 100;
    }
    updatePosition(context) {
        function centerOfEntityScreenPosition(entity) {
            let middleOfEntity = vectors.divide(entity.widthHeight, [2, 2]);
            return vectors.add(entity.position, middleOfEntity);
        }
        if (context.inGameKeys.rightPressed) {
            this.rotation = this.rotation + 1;
        }
        if (context.inGameKeys.leftPressed) {
            this.rotation = this.rotation - 1;
        }
        if (!context.inGameKeys.firePressed) {
            this.firePaused = false;
        }
        if (context.inGameKeys.firePressed &&
            this.numberOfBullets > 0 &&
            !this.firePaused) {
            //   context.inGameKeys.firePressed = false; WATCH OUT RACE BUG
            this.firePaused = true;
            context.entities.bullets.push(...instantiate(Bullet, 1, {
                position: centerOfEntityScreenPosition(this),
                rotation: this.rotation,
            }));
            this.numberOfBullets -= 1;
        }
    }
}
//# sourceMappingURL=hero.js.map