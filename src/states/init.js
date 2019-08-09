import { Zombie } from '../entities/zombie.js';
import { Base } from './base-class.js';
import { StartScreen } from './start-screen.js';
export class Init extends Base {
    constructor() {
        super(...arguments);
        this.runAsyncInitFunctionOnce = false; // HACK?
    }
    static async init(context) {
        /**
         * ==========================================================================
         * Load images assets
         * ==========================================================================
         */
        async function loadImage(filePath) {
            const imageElement = new Image();
            const promise = new Promise((resolve, reject) => {
                imageElement.onload = () => resolve(imageElement);
                imageElement.onerror = () => reject(new Error(`Problem with image file: ${filePath}`));
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
        async function loadAudio(filePath) {
            const audioElement = new Audio();
            const promise = new Promise((resolve, reject) => {
                audioElement.oncanplaythrough = () => resolve(audioElement);
                audioElement.onerror = () => reject(new Error(`Problem with audio file: ${filePath}`));
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
    transition(context) {
        context.State = new StartScreen(context);
    }
    update(context) {
        if (!this.runAsyncInitFunctionOnce) {
            this.runAsyncInitFunctionOnce = true;
            Init.init(context).catch(() => { }); // it transitions at end of this async
        }
    }
}
//# sourceMappingURL=init.js.map