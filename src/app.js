import { GameContext } from './states/context.js';
import { Init } from './states/init.js';
import { LevelOne } from './states/level-one.js';
import { checkCollision } from './utilities/collision-detection.js';
// eslint-disable-next-line no-unused-expressions
// ({
//   plugins: ['jsdom-quokka-plugin'],
//   jsdom: { file: './index.html' },
// });
function toFixedScreenRatio(currentWidth, currentHeight, targetWidthToHeight) {
    const currentWidthToHeight = currentWidth / currentHeight;
    if (currentWidthToHeight > targetWidthToHeight) {
        // window width is too wide relative to desired game width
        return [currentHeight * targetWidthToHeight, currentHeight];
    }
    // window height is too high relative to desired game height
    return [currentWidth, currentWidth / targetWidthToHeight];
}
// Globals
const canvas = document.getElementById('game-canvas');
[canvas.width, canvas.height] = toFixedScreenRatio(window.innerWidth, window.innerHeight, 4 / 3);
const ctx = canvas.getContext('2d');
const gameContext = new GameContext(new Init(), ctx); // is this the place for infamous ctx?!
// Event Listeners
document.addEventListener('keydown', gameContext.keyHandler.bind(gameContext));
document.addEventListener('keyup', gameContext.keyHandler.bind(gameContext));
//
// NEW MEGA Detect collision!!!!
//
// check collision between all objects in these two arrays
function megaDetect(context) {
    const entityCollisionDetections = new Map();
    entityCollisionDetections
        .set([context.entities.hero], context.entities.zombies)
        .set(context.entities.zombies, context.entities.bullets);
    for (const [key, value] of entityCollisionDetections) {
        key.forEach((entityOne, index) => value.forEach((entityTwo, indexTwo) => {
            if (checkCollision(entityOne, entityTwo)) {
                actOnCollision(context, entityOne, entityTwo, index, indexTwo);
            }
        }));
    }
}
function actOnCollision(context, entityOne, entityTwo, index, indexTwo) {
    switch (entityOne.kind) {
        case 'hero':
            switch (entityTwo.kind) {
                case 'zombie':
                    // hero killed by zombie, loose life, start level again
                    context.entities.hero.lives -= 1;
                    // massive zombie spawn bug!
                    context.State = new LevelOne(context);
                    break;
                default:
                    break;
            }
        case 'zombie':
            switch (entityTwo.kind) {
                case 'bullet':
                    // zombie hit by bullet, delete zombie and bullet
                    context.entities.zombies.splice(index, 1);
                    context.entities.bullets.splice(indexTwo, 1);
                    break;
                default:
                    break;
            }
        default:
            break;
    }
}
// Main loop
function gameLoop() {
    //   while (GameContext.running) {
    gameContext.updateCurrentState();
    megaDetect(gameContext);
    requestAnimationFrame(gameLoop);
}
// testFetch();
gameLoop();
//# sourceMappingURL=app.js.map