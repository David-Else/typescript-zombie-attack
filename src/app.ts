import { GameContext } from './states/context.js';
import { Init } from './states/init.js';
import { checkCollision } from './collision-detection.js';
import { Vector2 } from './vectors.js';
import { LevelOne } from './states/level-one.js';

// eslint-disable-next-line no-unused-expressions
// ({
//   plugins: ['jsdom-quokka-plugin'],
//   jsdom: { file: './index.html' },
// });

function toFixedScreenRatio(
  currentWidth: number,
  currentHeight: number,
  targetWidthToHeight: number,
): Vector2 {
  const currentWidthToHeight = currentWidth / currentHeight;

  if (currentWidthToHeight > targetWidthToHeight) {
    // window width is too wide relative to desired game width
    return [currentHeight * targetWidthToHeight, currentHeight];
  }
  // window height is too high relative to desired game height
  return [currentWidth, currentWidth / targetWidthToHeight];
}

// Globals
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
[canvas.width, canvas.height] = toFixedScreenRatio(
  window.innerWidth,
  window.innerHeight,
  4 / 3,
);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const gameContext = new GameContext(new Init(), ctx); // is this the place for infamous ctx?!

// Event Listeners
document.addEventListener('keydown', gameContext.keyHandler.bind(gameContext));
document.addEventListener('keyup', gameContext.keyHandler.bind(gameContext));

// Detect collision
function detectCollision(context: GameContext): void {
  // outer loop for zombies
  context.entities.zombies.forEach((zombie, index) => {
    if (checkCollision(context.entities.hero, zombie)) {
      // hero killed by zombie, loose life, start level again
      context.entities.hero.lives -= 1;
      // massive zombie spawn bug!
      context.State = new LevelOne(context);
    }

    // inner loop for bullets
    context.entities.bullets.forEach((bullet, innerIndex) => {
      if (checkCollision(zombie, bullet)) {
        // zombie hit by bullet, delete zombie and bullet
        context.entities.zombies.splice(index, 1);
        context.entities.bullets.splice(innerIndex, 1);
      }
      //  else if (!state.boundaries.intersects(bullet)) {
      //   //   state.deleteBullet = innerIndex;
      // }
    });
  });
}

// Main loop
function gameLoop(): void {
  //   while (GameContext.running) {
  gameContext.updateCurrentState();
  detectCollision(gameContext);
  //   gameContext.updateAndDrawCharacters();
  //   }

  requestAnimationFrame(gameLoop);
}

gameLoop();
