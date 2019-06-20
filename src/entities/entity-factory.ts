import { Vector2 } from '../vectors.js';
import { Bullet } from './bullet.js';
import { Hero } from './hero.js';
import { Zombie } from './zombie.js';

interface HeroOptions {
  position: Vector2;
}

interface ZombieOptions {
  widthHeight: Vector2;
  image: HTMLImageElement;
  position: Vector2;
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
): Hero[];
export function instantiate(
  ClassToInstantiate: typeof Bullet,
  numberOf: number,
  options: BulletOptions,
): Bullet[];
export function instantiate(
  ClassToInstantiate: typeof Zombie | typeof Hero | typeof Bullet,
  numberOf: number,
  options?: any,
): any[] {
  const characters: any[] = [];
  for (let index = 0; index < numberOf; index += 1) {
    switch (ClassToInstantiate) {
      case Zombie:
        characters.push(
          new ClassToInstantiate(
            options.widthHeight,
            options.image,
            options.position,
          ),
        );
        break;
      case Hero:
        characters.push(new ClassToInstantiate(options.position));
        break;
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
