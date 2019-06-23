import { State, InGameKeys } from './base-class.js';
import { Drawable } from '../entities/base-classes.js';
import { Hero } from '../entities/hero.js';
import { Zombie } from '../entities/zombie.js';
import { Bullet } from '../entities/bullet.js';
import { ScreenText } from '../entities/text.js';

export class GameContext {
  public entities: {
    hero: Hero[];
    zombies: Zombie[];
    bullets: Bullet[];
    screenText: ScreenText[];
    [key: string]: Drawable[];
  } = {
    hero: [] as Hero[],
    zombies: [] as Zombie[],
    bullets: [] as Bullet[],
    screenText: [] as ScreenText[],
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
  ) {
    // this.state = state;
  }

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

  public keyHandler(ev: KeyboardEvent): void {
    this.state.keyHandler(ev, this);
  }

  public updateCurrentState(): void {
    this.state.update(this);
  }

  //   public updateAndDrawCharacters(): void {
  //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //     Object.keys(this.entities).forEach(characterGroup =>
  //       this.entities[characterGroup].forEach(character => {
  //         character.update(this);
  //         character.draw(this.ctx);
  //       }),
  //     );
  //   }
}
