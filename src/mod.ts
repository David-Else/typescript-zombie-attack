// import { GlobalState } from "./states/global-state.js";
// import { Init } from "./states/init.js";
import { assert } from "./utilities/assert.js";
// import { detectAndActOnCollisions4 } from "./utilities/collision-detection.js";
import { Vector2 } from "./utilities/vectors.js";

// /**
//  * ============================================================================
//  * Calculate the maximum screen size available within a fixed ratio
//  * ============================================================================
//  */
export function toFixedScreenRatio(
  currentWidth: number,
  currentHeight: number,
  targetWidthToHeight: number
): Vector2 {
  const currentWidthToHeight = currentWidth / currentHeight;
  return currentWidthToHeight > targetWidthToHeight
    ? // window width is too wide relative to desired game width
      [currentHeight * targetWidthToHeight, currentHeight]
    : // window height is too high relative to desired game height
      [currentWidth, currentWidth / targetWidthToHeight];
}

// /**
//  * ============================================================================
//  * Global variables
//  * ============================================================================
//  */
const canvas = document.getElementById("game-canvas");
assert(
  canvas instanceof HTMLCanvasElement,
  `Element is null/undefined or not a HTMLCanvasElement.`
);
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

// const globalState = new GlobalState(new Init(), ctx); // is this place for ctx?!

// [canvas.width, canvas.height] = toFixedScreenRatio(
//   window.innerWidth,
//   window.innerHeight,
//   4 / 3
// );

// /**
//  * ============================================================================
//  * Event Listeners
//  * ============================================================================
//  */
// document.addEventListener("keydown", globalState.keyHandler.bind(globalState));
// document.addEventListener("keyup", globalState.keyHandler.bind(globalState));

// /**
//  * ============================================================================
//  * Main Loop
//  * ============================================================================
//  */
// function gameLoop(): void {
//   //   while (GameContext.running) {
//   globalState.updateCurrentState();
//   detectAndActOnCollisions4(globalState);
//   requestAnimationFrame(gameLoop);
// }

// // testFetch();
// gameLoop();

/**
 * ============================================================================
 * NEW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

import {
  GameObject,
  HeroGraphicsComponent,
  HeroInputComponent,
  HeroPhysicsComponent,
  ZombieGraphicsComponent,
  ZombiePhysicsComponent
} from "./components";
import { createPerson, createZombie } from "./new-test-pattern";
import { random } from "./utilities/random";
import { vectors } from "./utilities/vectors.js";
import { World } from "./world";

// async function game(): Promise<void> {
//   /**
//    * ============================================================================
//    * Init
//    * ============================================================================
//    */
//   const canvas = document.getElementById("game-canvas");
//   assert(
//     canvas instanceof HTMLCanvasElement,
//     `Element is null/undefined or not a HTMLCanvasElement.`
//   );
//   const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

//   [canvas.width, canvas.height] = toFixedScreenRatio(
//     window.innerWidth,
//     window.innerHeight,
//     4 / 3
//   );

//   const world = new World();
//   World.loadAssets(world).catch(message => console.error(message));

//   /**
//    * ============================================================================
//    * Create entities in the world using its built in factory
//    * ============================================================================
//    */
//   const middleOfCanvas = () =>
//     vectors.divide([canvas.width, canvas.height], [2, 2]);
//   const randomPositionAroundMiddle = () =>
//     random.positionAroundPoint(middleOfCanvas());

//   world.entityFactory(GameObject, "hero", 1, {
//     startPosition: middleOfCanvas,
//     startVelocity: [0, 0],
//     startRotation: 0,
//     Physics: HeroPhysicsComponent,
//     Graphics: HeroGraphicsComponent,
//     Input: HeroInputComponent
//   });

//   world.entityFactory(GameObject, "zombies", 50, {
//     startPosition: randomPositionAroundMiddle,
//     startVelocity: [0, 0],
//     startRotation: 0,
//     Physics: ZombiePhysicsComponent,
//     Graphics: ZombieGraphicsComponent
//   });

//   /**
//    * ============================================================================
//    * Game loop
//    * ============================================================================
//    */
//   function gameLoop(): void {
//     requestAnimationFrame(gameLoop);
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//     Object.values(world.entities).forEach(entityArray =>
//       entityArray.forEach(entity => {
//         entity.update(world, ctx);
//       })
//     );
//   }
//   gameLoop();
// }
// game();

const person = createPerson(ctx, [100, 20]);
const zombie = createZombie(ctx, [80, 20]);
const zombie2 = createZombie(ctx, [80, 20]);

zombie.update();
person.update();

console.log(zombie.update === person.update);
console.log(zombie.update === zombie2.update);

function gameLoop(): void {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  zombie.update();
  person.update();
}
gameLoop();
