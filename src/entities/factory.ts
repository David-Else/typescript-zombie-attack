import { random } from '../utilities/random.js';
import { Vector2 } from '../utilities/vectors.js';
import { Bullet } from './bullet.js';
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

// FUNCTION OVERLOADS AND MAIN FUNCTION
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
  ClassToInstantiate: typeof Zombie | typeof Hero | typeof Bullet,
  numberOf: number,
  options?: any,
): any[] | any {
  const characters: any[] = [];

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
      default:
        break;
    }
  }

  return characters;
}
