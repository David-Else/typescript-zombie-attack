// export function checkCollision(
//   character1: Drawable,
//   character2: Drawable,
// ): boolean {
//   const left = character1.x;
//   const right = character1.x + character1.widthHeight[0];
//   const top = character1.y;
//   const bottom = character1.y + character1.widthHeight[1];

//   const otherLeft = character2.x;
//   const otherRight = character2.x + character2.widthHeight[0];
//   const otherTop = character2.y;
//   const otherBottom = character2.y + character2.widthHeight[1];

//   return !(
//     left > otherRight ||
//     right <= otherLeft ||
//     top >= otherBottom ||
//     bottom <= otherTop
//   );
// }

// interface Drawable {
//   name: string;
//   widthHeight: [number, number];
//   x: number;
//   y: number;
// }
// const hero: Drawable[] = [
//   { name: 'hero', widthHeight: [10, 10], x: 100, y: 100 },
// ];
// const zombies: Drawable[] = [
//   { name: 'zombie1', widthHeight: [10, 10], x: 100, y: 100 },
//   { name: 'zombie2', widthHeight: [10, 10], x: 10, y: 10 },
// ];
// const bullets: Drawable[] = [
//   { name: 'bullet1', widthHeight: [10, 10], x: 10, y: 10 },
//   { name: 'bullet2', widthHeight: [10, 10], x: 10, y: 10 },
// ];

// let entityCollisionActions = new Map<Drawable[], Drawable[]>();

// // check collision between all objects in these two arrays
// // prettier-ignore
// entityCollisionActions.set(zombies, bullets)
//                       .set(hero, zombies);

// for (const [key, value] of entityCollisionActions) {
//   key.forEach((entityOne, indexEntityOne) =>
//     value.forEach(entityTwo => {
//       console.log(
//         `checking index:${indexEntityOne} entityOne:${
//           entityOne.name
//         } entityTwo:${entityTwo.name} collision:` +
//           checkCollision(entityOne, entityTwo),
//       );
//     }),
//   );
// }
