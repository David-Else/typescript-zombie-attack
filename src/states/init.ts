import { Zombie } from '../entities/zombie.js';
import { Base } from './base-class.js';
import { GameContext, State } from './context.js';
import { StartScreen } from './start-screen.js';

export class Init extends Base implements State {
  private runAsyncInitFunctionOnce = false; // HACK?

  public static async init(context: GameContext): Promise<void> {
    /**
     * ==========================================================================
     * Load images assets
     * ==========================================================================
     */
    async function loadImage(filePath: string): Promise<HTMLImageElement> {
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
    async function loadAudio(filePath: string): Promise<HTMLAudioElement> {
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
    context.State = new StartScreen(context);
  }

  public update(context: GameContext): void {
    if (!this.runAsyncInitFunctionOnce) {
      this.runAsyncInitFunctionOnce = true;
      Init.init(context).catch(() => {}); // it transitions at end of this async
    }
  }
}
