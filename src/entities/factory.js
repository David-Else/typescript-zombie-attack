// interface HeroOptions {
//   position: Vector2;
// }
// interface ZombieOptions {
//   image: HTMLImageElement;
//   pointToSpawnAround: Vector2;
// }
// interface BulletOptions {
//   position: Vector2;
//   rotation: number;
// }
// interface GraveOptions {
//   position: Vector2;
// }
// // FUNCTION OVERLOADS
// export function instantiate(
//   ClassToInstantiate: typeof Grave,
//   numberOf: number,
//   options: GraveOptions,
// ): Grave[];
// export function instantiate(
//   ClassToInstantiate: typeof Zombie,
//   numberOf: number,
//   options: ZombieOptions,
// ): Zombie[];
// export function instantiate(
//   ClassToInstantiate: typeof Hero,
//   numberOf: number,
//   options: HeroOptions,
// ): Hero;
// export function instantiate(
//   ClassToInstantiate: typeof Bullet,
//   numberOf: number,
//   options: BulletOptions,
// ): Bullet[];
// export function instantiate(
//   ClassToInstantiate:
//     | typeof Zombie
//     | typeof Hero
//     | typeof Bullet
//     | typeof Grave,
//   numberOf: number,
//   options?: any,
// ): any[] | any {
//   const characters: Entity[] = [];
//   // return [...Array(numberOf)].map(() => new Hero([10,10]))
//   for (let index = 0; index < numberOf; index += 1) {
//     switch (ClassToInstantiate) {
//       case Zombie:
//         characters.push(
//           new ClassToInstantiate(
//             options.image,
//             random.positionAroundPoint(options.pointToSpawnAround),
//           ),
//         );
//         break;
//       case Hero:
//         return new ClassToInstantiate(options.position);
//       case Bullet:
//         characters.push(
//           new ClassToInstantiate(options.position, options.rotation),
//         );
//         break;
//       case Grave:
//         characters.push(new ClassToInstantiate(options.position));
//         break;
//       default:
//         break;
//     }
//   }
//   return characters;
// }
export const entityFactory = (classToCreate, numberOf, ...args) => [...Array(numberOf)].map(() => new classToCreate(...args));
//# sourceMappingURL=factory.js.map