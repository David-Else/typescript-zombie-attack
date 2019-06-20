import { GameContext } from './context.js';
import { Hero } from '../entities/hero.js';
import { Zombie } from '../entities/zombie.js';
import { Bullet } from '../entities/bullet.js';
import { Drawable } from '../entities/base-classes.js';

export interface State {
  transition(context: GameContext): void;
  keyHandler(event: KeyboardEvent): void;
  update(context: GameContext): void;
  renderAll(context: GameContext): void;

  //   draw(): void;
  // levelDate
}

export interface InGameKeys {
  startPressed: boolean;
  firePressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
  pausePressed: boolean;
}

export abstract class Base {
  public entities: {
    [key: string]: Drawable[];
  } = {
    hero: [] as Hero[],
    zombies: [] as Zombie[],
    bullets: [] as Bullet[],
    // screenText: [] as ScreenText[],
  };

  protected inGameKeys: InGameKeys = {
    startPressed: false,
    firePressed: false,
    leftPressed: false,
    rightPressed: false,
    pausePressed: false,
  };

  public renderAll(context: GameContext): void {
    Object.keys(this.entities).forEach(characterGroup =>
      this.entities[characterGroup].forEach(character => {
        //   update(character);
        character.draw(context.ctx);
      }),
    );
  }

  public keyHandler(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyF':
        this.inGameKeys.firePressed = event.type === 'keydown';
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.inGameKeys.leftPressed = event.type === 'keydown';
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.inGameKeys.rightPressed = event.type === 'keydown';
        break;
      case 'KeyP':
        if (event.type === 'keydown' && !event.repeat) {
          this.inGameKeys.pausePressed = !this.inGameKeys.pausePressed;
        }
        break;
      // no default
    }
  }
}
