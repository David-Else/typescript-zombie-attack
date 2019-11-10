import { Entity } from '../states/global-state.js';
import { random } from '../utilities/random.js';
import { Vector2 } from '../utilities/vectors.js';
import { Bullet } from './bullet.js';
import { Grave } from './graves.js';
import { Hero } from './hero.js';
import { Zombie } from './zombie.js';

interface HeroOptions {
  position: Vector2;
}

interface ZombieOptions {
  image: HTMLImageElement;
  pointToSpawnAround: Vector2;
}

interface BulletOptions {
  position: Vector2;
  rotation: number;
}

interface GraveOptions {
  position: Vector2;
}

// FUNCTION OVERLOADS
export function instantiate(
  ClassToInstantiate: typeof Grave,
  numberOf: number,
  options: GraveOptions,
): Grave[];
export function instantiate(
  ClassToInstantiate: typeof Zombie,
  numberOf: number,
  options: ZombieOptions,
): Zombie[];
export function instantiate(
  ClassToInstantiate: typeof Hero,
  numberOf: number,
  options: HeroOptions,
): Hero;
export function instantiate(
  ClassToInstantiate: typeof Bullet,
  numberOf: number,
  options: BulletOptions,
): Bullet[];

export function instantiate(
  ClassToInstantiate:
    | typeof Zombie
    | typeof Hero
    | typeof Bullet
    | typeof Grave,
  numberOf: number,
  options?: any,
): any[] | any {
  const characters: Entity[] = [];

  // return [...Array(numberOf)].map(() => new Hero([10,10]))

  for (let index = 0; index < numberOf; index += 1) {
    switch (ClassToInstantiate) {
      case Zombie:
        characters.push(
          new ClassToInstantiate(
            options.image,
            random.positionAroundPoint(options.pointToSpawnAround),
          ),
        );
        break;
      case Hero:
        return new ClassToInstantiate(options.position);
      case Bullet:
        characters.push(
          new ClassToInstantiate(options.position, options.rotation),
        );
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

export const OLDsimpleFactory = <
  T extends {
    new (...args: any[]): any;
  }
>(
  classToCreate: T,
  numberOf: number,
  ...args: ConstructorParameters<T>
): T[] => [...Array(numberOf)].map(() => new classToCreate(...args));

// type Constructor<T> = new (...args: any[]) => T;

// export const simpleFactory = <T>(
//   classToCreate: Constructor<T>,
//   numberOf: number,
//   ...args: ConstructorParameters<typeof classToCreate>
// ): T[] => [...Array<T>(numberOf)].map(() => new classToCreate(...args));

// Strangely deleted from reddit but working
export const simpleFactory = <I, T extends new (...args: any[]) => I>(
  classToCreate: T,
  numberOf: number,
  ...args: ConstructorParameters<T>
): I[] => [...Array<I>(numberOf)].map(() => new classToCreate(...args));

// T only implements the constructor interface so it doesn't have a property 'position'.
// To get the instance type, you can use InstanceType. Use InstanceType in simpleFactory's type signature to obtain the instance type from T.
// InstanceType<T> Constructs a type consisting of the instance type of a constructor function type T
const LATESTsimpleFactory = <
  T extends {
    new (...args: any[]): any;
  }
>(
  classToCreate: T,
  numberOf: number,
  ...args: ConstructorParameters<T>
): InstanceType<T>[] =>
  [...Array(numberOf)].map(() => new classToCreate(...args));
