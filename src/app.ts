import { GameContext } from './states/context.js';
import { Init } from './states/init.js';
import { checkCollision } from './collision-detection.js';

// Enable the Quokka.js jsdom plugin and parse index.html

// eslint-disable-next-line no-unused-expressions
// ({
//   plugins: ['jsdom-quokka-plugin'],
//   jsdom: { file: './index.html' },
// });

/**
 * TEST
 */

// Globals
const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
canvas.width = 600;
canvas.height = 600;
const gameContext = new GameContext(new Init(), ctx); // is this the place for infamous ctx?!

// Event Listeners
document.addEventListener('keydown', gameContext.keyHandler.bind(gameContext));
document.addEventListener('keyup', gameContext.keyHandler.bind(gameContext));

// Detect collision
function detectCollision(context: GameContext): void {
  // outer loop for zombies
  context.entities.zombies.forEach((zombie, index) => {
    if (checkCollision(context.entities.hero[0], zombie)) {
      // hero killed by zombie, loose life, start level again
      context.entities.hero[0].lives -= 1;
      console.log('now we need new reset level code!');
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
  gameContext.updateCurrentState();
  detectCollision(gameContext);
  //   gameContext.updateAndDrawCharacters();
  requestAnimationFrame(gameLoop);
}

gameLoop();
