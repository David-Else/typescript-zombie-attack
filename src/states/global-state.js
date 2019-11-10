import { Zombie } from '../entities/zombie.js';
import { load } from '../utilities/loader.js';
/**
 * ==========================================================================
 * Global state
 * ==========================================================================
 */
export class GlobalState {
    /**
     * ==========================================================================
     * Create state pattern with level states inside levelState
     * ==========================================================================
     */
    constructor(levelState, ctx) {
        this.levelState = levelState;
        this.ctx = ctx;
        this.gameData = {};
        this.sounds = {
            explosionSound: {},
            invaderkilledSound: {},
            shootSound: {},
        };
        this.entities = {
            hero: {},
            zombies: [],
            bullets: [],
            graves: [],
            screenText: [],
        };
        this.score = 0;
        this.inGameKeys = {
            startPressed: false,
            firePressed: false,
            leftPressed: false,
            rightPressed: false,
            pausePressed: false,
        };
    }
    /**
     * =========================================================================
     * Asset loader
     * =========================================================================
     */
    static async loadAssets(context) {
        [
            context.sounds.explosionSound,
            context.sounds.invaderkilledSound,
            context.sounds.shootSound,
            Zombie.imagesToLoad[0],
            context.gameData,
        ] = await Promise.all([
            load.loadAudio('./assets/explosion.wav'),
            load.loadAudio('./assets/invaderkilled.wav'),
            load.loadAudio('./assets/shoot.wav'),
            load.loadImage('./assets/zombie64-final.png'),
            load.loadJSON('src/game-data.json'),
        ]);
        context.transition();
    }
    get State() {
        return this.levelState;
    }
    set State(state) {
        this.levelState = state;
    }
    transition() {
        this.levelState.transition(this);
    }
    keyHandler(event) {
        this.levelState.keyHandler(event, this.inGameKeys);
    }
    updateCurrentState() {
        this.levelState.update(this);
    }
}
//# sourceMappingURL=global-state.js.map