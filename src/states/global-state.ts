import { Drawable } from "../entities/base-class.js";
import { Bullet } from "../entities/bullet.js";
import { Grave } from "../entities/graves.js";
import { Hero } from "../entities/hero.js";
import { ScreenText } from "../entities/text.js";
import { Zombie } from "../entities/zombie.js";
import { GameData } from "../game-data-interface.js";
import { load } from "../utilities/loader.js";

/**
 * ==========================================================================
 * Interfaces
 * ==========================================================================
 */
export interface StatePattern {
  transition(context: GlobalState): void;
  keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void;
  update(context: GlobalState): void;
}

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export interface EntitiesContainer {
  hero: Hero;
  zombies: Zombie[];
  bullets: Bullet[];
  graves: Grave[];
  screenText: ScreenText[];
  [key: string]: Drawable[] | Drawable;
}

export type Entity = Hero | Zombie | Bullet | Grave;

/**
 * ==========================================================================
 * Global state
 * ==========================================================================
 */
export class GlobalState {
  public gameData = {} as GameData;

  public sounds = {
    explosionSound: {} as HTMLAudioElement,
    invaderkilledSound: {} as HTMLAudioElement,
    shootSound: {} as HTMLAudioElement
  };

  public entities: EntitiesContainer = {
    hero: {} as Hero,
    zombies: [],
    bullets: [],
    graves: [],
    screenText: []
  };

  public score = 0;

  public inGameKeys: InGameKeys = {
    startPressed: false,
    firePressed: false,
    leftPressed: false,
    rightPressed: false,
    pausePressed: false
  };
  /**
   * ==========================================================================
   * Create state pattern with level states inside levelState
   * ==========================================================================
   */
  public constructor(
    private levelState: StatePattern,
    public ctx: CanvasRenderingContext2D
  ) {}

  /**
   * =========================================================================
   * Asset loader
   * =========================================================================
   */
  public static async loadAssets(context: GlobalState): Promise<void> {
    [
      context.sounds.explosionSound,
      context.sounds.invaderkilledSound,
      context.sounds.shootSound,
      Zombie.imagesToLoad[0],
      context.gameData
    ] = await Promise.all([
      load.loadAudio("./assets/explosion.wav"),
      load.loadAudio("./assets/invaderkilled.wav"),
      load.loadAudio("./assets/shoot.wav"),
      load.loadImage("./assets/zombie64-final.png"),
      load.loadJSON<GameData>("./game-data.json")
    ]);

    context.transition();
  }

  public get State(): StatePattern {
    return this.levelState;
  }

  public set State(state: StatePattern) {
    this.levelState = state;
  }

  public transition(): void {
    this.levelState.transition(this);
  }

  public keyHandler(event: KeyboardEvent): void {
    this.levelState.keyHandler(event, this.inGameKeys);
  }

  public updateCurrentState(): void {
    this.levelState.update(this);
  }
}
