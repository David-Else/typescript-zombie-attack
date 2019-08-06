import { Bullet } from './bullet.js';
import { Hero } from './hero.js';
import { Zombie } from './zombie.js';
const randomSpawnPoint = (pointToSpawnAround) => {
    const variationInR = 400;
    const minimumR = 200;
    const theta = Math.random() * (2 * Math.PI);
    const r = Math.random() * variationInR + minimumR;
    return [
        Math.cos(theta) * r + pointToSpawnAround[0],
        Math.sin(theta) * r + pointToSpawnAround[1],
    ];
};
export function instantiate(ClassToInstantiate, numberOf, options) {
    const characters = [];
    for (let index = 0; index < numberOf; index += 1) {
        switch (ClassToInstantiate) {
            case Zombie:
                characters.push(new ClassToInstantiate(options.image, randomSpawnPoint(options.pointToSpawnAround)));
                break;
            case Hero:
                return new ClassToInstantiate(options.position);
            case Bullet:
                characters.push(new ClassToInstantiate(options.position, options.rotation));
                break;
            default:
                break;
        }
    }
    return characters;
}
//# sourceMappingURL=entity-factory.js.map