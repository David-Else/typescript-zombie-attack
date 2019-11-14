({
  plugins: ['jsdom-quokka-plugin'],
  jsdom: { file: './index.html' },
});

import { GlobalState } from './states/global-state.js';
import { Init } from './states/init.js';
import { assert } from './utilities/assert.js';
import { detectAndActOnCollisions3 } from './utilities/collision-detection.js';
import { Vector2 } from './utilities/vectors.js';

/**
 * ============================================================================
 * Calculate the maximum screen size available within a fixed ratio
 * ============================================================================
 */
function toFixedScreenRatio(
  currentWidth: number,
  currentHeight: number,
  targetWidthToHeight: number,
): Vector2 {
  const currentWidthToHeight = currentWidth / currentHeight;
  return currentWidthToHeight > targetWidthToHeight
    ? // window width is too wide relative to desired game width
      [currentHeight * targetWidthToHeight, currentHeight]
    : // window height is too high relative to desired game height
      [currentWidth, currentWidth / targetWidthToHeight];
}

/**
 * ============================================================================
 * Global variables
 * ============================================================================
 */
const canvas = document.getElementById('game-canvas');
assert(
  canvas instanceof HTMLCanvasElement,
  `Element is null/undefined or not a HTMLCanvasElement.`,
);
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const globalState = new GlobalState(new Init(), ctx); // is this place for ctx?!

[canvas.width, canvas.height] = toFixedScreenRatio(
  window.innerWidth,
  window.innerHeight,
  4 / 3,
);

/**
 * ============================================================================
 * Event Listeners
 * ============================================================================
 */
document.addEventListener('keydown', globalState.keyHandler.bind(globalState));
document.addEventListener('keyup', globalState.keyHandler.bind(globalState));

/**
 * ============================================================================
 * Main Loop
 * ============================================================================
 */
function gameLoop(): void {
  //   while (GameContext.running) {
  globalState.updateCurrentState();
  detectAndActOnCollisions3(globalState);
  requestAnimationFrame(gameLoop);
}

// testFetch();
gameLoop();
