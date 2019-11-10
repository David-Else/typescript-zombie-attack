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
export const OLDsimpleFactory = (classToCreate, numberOf, ...args) => [...Array(numberOf)].map(() => new classToCreate(...args));
// type Constructor<T> = new (...args: any[]) => T;
// export const simpleFactory = <T>(
//   classToCreate: Constructor<T>,
//   numberOf: number,
//   ...args: ConstructorParameters<typeof classToCreate>
// ): T[] => [...Array<T>(numberOf)].map(() => new classToCreate(...args));
// Strangely deleted from reddit but working
export const simpleFactory = (classToCreate, numberOf, ...args) => [...Array(numberOf)].map(() => new classToCreate(...args));
// T only implements the constructor interface so it doesn't have a property 'position'.
// To get the instance type, you can use InstanceType. Use InstanceType in simpleFactory's type signature to obtain the instance type from T.
// InstanceType<T> Constructs a type consisting of the instance type of a constructor function type T
const LATESTsimpleFactory = (classToCreate, numberOf, ...args) => [...Array(numberOf)].map(() => new classToCreate(...args));
//# sourceMappingURL=factory.js.map