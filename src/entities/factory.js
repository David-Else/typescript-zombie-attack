import { random } from '../utilities/random.js';
import { Bullet } from './bullet.js';
import { Grave } from './graves.js';
import { Hero } from './hero.js';
import { Zombie } from './zombie.js';
export function instantiate(ClassToInstantiate, numberOf, options) {
    const characters = [];
    // return [...Array(numberOf)].map(() => new Hero([10,10]))
    for (let index = 0; index < numberOf; index += 1) {
        switch (ClassToInstantiate) {
            case Zombie:
                characters.push(new ClassToInstantiate(options.image, random.positionAroundPoint(options.pointToSpawnAround)));
                break;
            case Hero:
                return new ClassToInstantiate(options.position);
            case Bullet:
                characters.push(new ClassToInstantiate(options.position, options.rotation));
                break;
            case Grave:
                characters.push(new ClassToInstantiate(options.position));
                break;
            default:
                break;
        }
    }
    return characters;
}
//# sourceMappingURL=factory.js.map