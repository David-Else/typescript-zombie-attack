import { Vector2 } from '../vectors.js';
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

const randomSpawnPoint = (pointToSpawnAround: Vector2): Vector2 => {
  const variationInR = 400;
  const minimumR = 200;
  const theta = Math.random() * (2 * Math.PI);
  const r = Math.random() * variationInR + minimumR;
  return [
    Math.cos(theta) * r + pointToSpawnAround[0],
    Math.sin(theta) * r + pointToSpawnAround[1],
  ];
};

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
            options.image,
            randomSpawnPoint(options.pointToSpawnAround),
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
