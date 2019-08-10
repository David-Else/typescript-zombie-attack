import { Drawable } from '../entities/base-class.js';
import { Bullet } from '../entities/bullet.js';
import { Hero } from '../entities/hero.js';
import { ScreenText } from '../entities/text.js';
import { Zombie } from '../entities/zombie.js';

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export class GlobalState {
  public entities: {
    hero: Hero;
    zombies: Zombie[];
    bullets: Bullet[];
    screenText: ScreenText[];
    [key: string]: Drawable[] | Drawable;
  } = {
    hero: {} as Hero,
    zombies: [],
    bullets: [],
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

  // levelState

  public constructor(public ctx: CanvasRenderingContext2D) {}
}
