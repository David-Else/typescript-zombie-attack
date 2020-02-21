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
// const canvas = document.getElementById("game-canvas");
// assert(
//   canvas instanceof HTMLCanvasElement,
//   `Element is null/undefined or not a HTMLCanvasElement.`
// );
// const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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

// import {
//   GameObject,
//   HeroGraphicsComponent,
//   HeroInputComponent,
//   HeroPhysicsComponent,
//   ZombieGraphicsComponent,
//   ZombiePhysicsComponent
// } from "./components";
// import { createHero, createZombie, createBullet } from "./new-test-pattern";
import { random } from "./utilities/random";
import { vectors } from "./utilities/vectors.js";
import { World, Entity } from "./new-entities/entity";
import { Zombie } from "./entities/zombie.js";
import { loadImage } from "./utilities/loader.js";
import { createHero } from "./new-entities/hero";
import { createBullet } from "./new-entities/bullet";
import { createZombie } from "./new-entities/zombie";
// import { GameObject } from "./components";
import { createText } from "./new-entities/text";

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
  const canvas = document.getElementById("game-canvas");
  assert(
    canvas instanceof HTMLCanvasElement,
    `Element is null/undefined or not a HTMLCanvasElement.`
  );
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  /**
   * ============================================================================
   * Create entities in the world using its built in factory
   * ============================================================================
   */

  const world = new World();
  const middleOfCanvas = () =>
    vectors.divide([canvas.width, canvas.height], [2, 2]);
  const randomPositionAroundMiddle = () =>
    random.positionAroundPoint(middleOfCanvas());

  // world.entityFactory(GameObject, "hero", 1, { ctx, position: [100, 20] });
  [testZombie] = await Promise.all([loadImage("./assets/zombie64-final.png")]);

  function pushToWorld(
    entity: Entity,
    homeArray: keyof World["entities"], // not working!
    numberOf: number
  ) {
    world.entities[homeArray].push(...[...Array(numberOf)].map(() => entity));
  }

  pushToWorld(createHero({ ctx, position: [100, 20] }), "hero", 1);
  pushToWorld(
    createZombie({
      ctx,
      image: testZombie,
      position: [10, 10]
    }),
    "zombies",
    50
  );
  pushToWorld(createBullet({ ctx, position: [10, 10] }), "bullets", 1);
  pushToWorld(
    createText({
      ctx,
      position: [25, 15],
      text: `hello!!
new line`
    }),
    "screenText",
    1
  );

  function gameLoop(): void {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // test to check there is one in the array :)
    Object.entries(world.entities).forEach(([key, value]) => value[0].update());
  }
  gameLoop();
}
tz();
