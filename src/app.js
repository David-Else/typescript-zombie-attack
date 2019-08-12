import { GameContext } from './states/context.js';
import { Init } from './states/init.js';
import { detectAndActOnCollisions2 } from './utilities/collision-detection.js';
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
// Main loop
function gameLoop() {
    //   while (GameContext.running) {
    gameContext.updateCurrentState();
    detectAndActOnCollisions2(gameContext);
    requestAnimationFrame(gameLoop);
}
// testFetch();
gameLoop();
//# sourceMappingURL=app.js.map