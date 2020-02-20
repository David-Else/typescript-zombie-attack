import { GlobalState } from "./states/global-state";
import { Init } from "./states/init";
import { assert } from "./utilities/assert";
// import { detectAndActOnCollisions4 } from "./utilities/collision-detection.js";
import { Vector2 } from "./utilities/vectors";

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

const globalState = new GlobalState(new Init(), ctx); // is this place for ctx?!

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

// import {
//   GameObject,
//   HeroGraphicsComponent,
//   HeroInputComponent,
//   HeroPhysicsComponent,
//   ZombieGraphicsComponent,
//   ZombiePhysicsComponent
// } from "./components";
import { createHero, createZombie, createBullet } from "./new-test-pattern";
import { random } from "./utilities/random";
import { vectors } from "./utilities/vectors.js";
import { World } from "./world";
import { Zombie } from "./entities/zombie.js";
import { loadImage } from "./utilities/loader.js";

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

let testZombie: HTMLImageElement;

async function tz() {
  [testZombie] = await Promise.all([loadImage("./assets/zombie64-final.png")]);

  const hero = createHero({ ctx, position: [100, 20] });
  const bullet = createBullet({ ctx, position: [10, 10] });
  const zombie = createZombie({ ctx, image: testZombie, position: [120, 50] });
  // console.log(JSON.stringify(hero, null, 2));
  //

  // serialize.js

  let replacer = (key: any, value: { toString: () => any }) => {
    // if we get a function give us the code for that function
    if (typeof value === "function") {
      return value.toString();
    }
    return value;
  }; // get a stringified version of our object
  // and indent the keys at 2 spaces
  const serialized = JSON.stringify(hero, replacer, 2);

  console.log(serialized);

  //
  function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    hero.update();
    bullet.update();
    zombie.update();
  }
  gameLoop();
}
tz();
