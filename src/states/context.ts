import { Drawable } from '../entities/base-class.js';
import { Bullet } from '../entities/bullet.js';
import { Grave } from '../entities/graves.js';
import { Hero } from '../entities/hero.js';
import { ScreenText } from '../entities/text.js';
import { Zombie } from '../entities/zombie.js';

export interface State {
  transition(context: GameContext): void;
  keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void;
  update(context: GameContext): void;
  //   draw(): void;
}

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}
// ???!! implements State
export class GameContext {
  public entities: {
    hero: Hero;
    zombies: Zombie[];
    bullets: Bullet[];
    graves: Grave[];
    screenText: ScreenText[];
    [key: string]: Drawable[] | Drawable;
  } = {
    hero: {} as Hero,
    zombies: [],
    bullets: [],
    graves: [],
    screenText: [],
  };

  public score = 0;

  public inGameKeys: InGameKeys = {
    startPressed: false,
    firePressed: false,
    leftPressed: false,
    rightPressed: false,
    pausePressed: false,
  };
  // ? gameState? rename context to state
  public constructor(
    private state: State,
    public ctx: CanvasRenderingContext2D,
  ) {}

  public get State(): State {
    return this.state;
  }

  public set State(state: State) {
    this.state = state;
    // this.pause = false;
  }

  public transition(): void {
    console.log(`Transitioning`);
    this.state.transition(this);
  }

  public keyHandler(event: KeyboardEvent): void {
    this.state.keyHandler(event, this.inGameKeys);
  }

  public updateCurrentState(): void {
    this.state.update(this);
  }
}
