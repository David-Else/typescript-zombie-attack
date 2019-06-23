import { State } from './base-class.js';
import { Drawable } from '../entities/base-classes.js';
import { Hero } from '../entities/hero.js';
import { Zombie } from '../entities/zombie.js';
import { Bullet } from '../entities/bullet.js';
import { ScreenText } from '../entities/text.js';

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export class GameContext {
  public entities: {
    hero: Hero[];
    zombies: Zombie[];
    bullets: Bullet[];
    screenText: ScreenText[];
    [key: string]: Drawable[];
  } = {
    hero: [],
    zombies: [],
    bullets: [],
    screenText: [],
  };

  public inGameKeys: InGameKeys = {
    startPressed: false,
    firePressed: false,
    leftPressed: false,
    rightPressed: false,
    pausePressed: false,
  };

  public constructor(
    private state: State,
    public ctx: CanvasRenderingContext2D,
  ) {}

  public get State(): State {
    return this.state;
  }

  public set State(state: State) {
    this.state = state;
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
