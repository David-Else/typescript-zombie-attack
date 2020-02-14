// interface Updateable {
//   update(): void;
// }

// const test1 = {
//   hero: {
//     update() {
//       console.log('updated hero in object');
//     },
//   },
//   zombies: [
//     {
//       update() {
//         console.log('updated zombie 1 in array of objects');
//       },
//     },
//     {
//       update() {
//         console.log('updated zombie 2 in array of objects');
//       },
//     },
//   ],
// };

// Object.entries(test1)
//   .flatMap(keyValueArray => {
//     const [key, objOrArrayValue] = keyValueArray;
//     if (objOrArrayValue instanceof Array) {
//       return objOrArrayValue;
//     }
//     return [objOrArrayValue];
//   })
//   .forEach((obj: Updateable) => obj.update());

// let arr1 = [1, 2, 3, 4];

// arr1.map(x => [x * 3]);
// // [[2], [4], [6], [8]]

// arr1.flatMap(x => [x * 2]);
// // [2, 4, 6, 8]
