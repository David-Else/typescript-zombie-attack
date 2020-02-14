function printLevel(level: number) {
  const levelData = gameData[`level${level}`];
  console.log(levelData.boxes);
  console.log(levelData.stars);
  console.log(levelData.player_position);
}
printLevel(1);

// fetch('/home/david/sites/typescript-zombie-attack-GITHUB/src/game-data.json')
//   .then(response => response.json())
//   .then(json => console.log(json));

// async function hello() {
//   let url1 =
//     '/home/david/sites/typescript-zombie-attack-GITHUB/src/game-data.json';
//   let response = await fetch(url1);

//   let commits = await response.json(); // read response body and parse as JSON

//   console.log(commits);
// }
// hello();
// export function loadJSON(url: string) {
//   return fetch(url).then(r => r.json());
// }

// const x = loadJSON(`/game-data.json`).then(console.log(x));
// // meth meth method way

// export function createLevelLoader(entityFactory) {
//   return function loadLevel(name) {
//       return loadJSON(`/levels/${name}.json`)
//       .then(levelSpec => Promise.all([
//           levelSpec,
//           loadSpriteSheet(levelSpec.spriteSheet),
//       ]))
//       .then(([levelSpec, backgroundSprites]) => {
//           const level = new Level();

//           setupCollision(levelSpec, level);
//           setupBackgrounds(levelSpec, level, backgroundSprites);
//           setupEntities(levelSpec, level, entityFactory);

//           return level;
//       });
//   }
// }

//   }
//   // other bloke way
//   // var gdata = json.game_data['level' + levelNr];
//   // //check if next level exists in game_data object
//   // if (!gdata) {
//   //   finishGame();
//   //   return false;
//   // }

//   //next level data exists, so build whats in it
//   //clear level from previous stuff
//   clearLevel(); //perhaps replace canvas with new one

//   createBoxes(gdata.boxes);
//   createStars(gdata.stars);
//   createPlayer(gdata.player_position);

//   //everything is ready, add listeners / timers etc, and start the game
// }
