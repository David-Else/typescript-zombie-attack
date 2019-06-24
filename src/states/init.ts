import { Base, State } from './base-class.js';
import { GameContext, InGameKeys } from './context.js';
import { StartScreen } from './start-screen.js';
import { Zombie } from '../entities/zombie.js';

export class Init extends Base implements State {
  private runAsyncInitFunctionOnce = false; // HACK?

  public static async init(context: GameContext): Promise<void> {
    /**
     * ==========================================================================
     * Load images assets
     * ==========================================================================
     */
    function loadImage(filePath: string): Promise<HTMLImageElement> {
      const imageElement = new Image();

      const promise = new Promise<HTMLImageElement>((resolve, reject) => {
        imageElement.onload = () => resolve(imageElement);
        imageElement.onerror = () =>
          reject(new Error(`Problem with image file: ${filePath}`));
      });

      imageElement.src = filePath;
      return promise;
    }

    const [zombieImg] = await Promise.all([
      loadImage('./assets/zombie64-final.png'),
    ]);
    /**
     * ==========================================================================
     * Load audio assets
     * ==========================================================================
     */
    function loadAudio(filePath: string): Promise<HTMLAudioElement> {
      const audioElement = new Audio();

      const promise = new Promise<HTMLAudioElement>((resolve, reject) => {
        audioElement.oncanplaythrough = () => resolve(audioElement);
        audioElement.onerror = () =>
          reject(new Error(`Problem with audio file: ${filePath}`));
      });

      audioElement.src = filePath;
      return promise;
    }

    const [explosionSound, invaderkilledSound, shootSound] = await Promise.all([
      loadAudio('./assets/explosion.wav'),
      loadAudio('./assets/invaderkilled.wav'),
      loadAudio('./assets/shoot.wav'),
    ]);

    Zombie.imagesToLoad.push(zombieImg);
    context.transition();
  }

  public transition(context: GameContext): void {
    console.log('context.State = new StartScreen(context);');
    context.State = new StartScreen(context);
  }

  public update(context: GameContext): void {
    if (!this.runAsyncInitFunctionOnce) {
      this.runAsyncInitFunctionOnce = true;
      Init.init(context); // it transitions at end of this async
    }
  }

  public keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void {
    // do nothing, overide base class
  }
}

/**
 * ==========================================================================
 * Set sscreen size dependin on window size
 * ==========================================================================
 */
// function toFixedScreenRatio(
//   currentWidth: number,
//   currentHeight: number,
//   targetWidthToHeight: number,
// ): Vector2 {
//   const currentWidthToHeight = currentWidth / currentHeight;

//   if (currentWidthToHeight > targetWidthToHeight) {
//     // window width is too wide relative to desired game width
//     return [currentHeight * targetWidthToHeight, currentHeight];
//   }
//   // window height is too high relative to desired game height
//   return [currentWidth, currentWidth / targetWidthToHeight];
// }

// const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
// [canvas.width, canvas.height] = toFixedScreenRatio(
//   window.innerWidth,
//   window.innerHeight,
//   4 / 3,
// );

// const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// init(ctx);
