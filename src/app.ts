import { GameContext } from './states/context.js';
import { Init } from './states/init.js';

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

/**
 * ==========================================================================
 * Loop over characters and update/render
 * ==========================================================================
 */
// function update(character: Character): void {
//   if (character.kind === 'zombie') {
//     // FIX ME!
//     character.directTowards(state.characters.hero[0].position);
//   }
//   character.update(state);
// }

// function render(character: Character): void {
//   character.draw(ctx);
// }

// function loopOverCharacters(): void {
//   Object.keys(state.characters).forEach(characterGroup =>
//     state.characters[characterGroup].forEach(character => {
//       update(character);
//       render(character);
//     }),
//   );
// }

// Main loop 1
function gameLoop(): void {
  gameContext.update();
  gameContext.renderAll(); // for now every update is only seeing change to keys object and switching state if needed
  requestAnimationFrame(gameLoop);
}

gameLoop();
