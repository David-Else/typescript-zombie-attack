({
    plugins: ['jsdom-quokka-plugin'],
    jsdom: { file: './index.html' },
});
import { GlobalState } from './states/global-state.js';
import { Init } from './states/init.js';
import { detectAndActOnCollisions3 } from './utilities/collision-detection.js';
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
const globalState = new GlobalState(new Init(), ctx); // is this place for ctx?!
// Event Listeners
document.addEventListener('keydown', globalState.keyHandler.bind(globalState));
document.addEventListener('keyup', globalState.keyHandler.bind(globalState));
// Main loop
function gameLoop() {
    //   while (GameContext.running) {
    globalState.updateCurrentState();
    detectAndActOnCollisions3(globalState);
    requestAnimationFrame(gameLoop);
}
// testFetch();
gameLoop();
//# sourceMappingURL=app.js.map