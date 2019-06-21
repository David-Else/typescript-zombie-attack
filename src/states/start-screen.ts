import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { LevelOne } from './level-one.js';
import { ScreenText } from '../entities/text.js';
import { UV_UDP_REUSEADDR } from 'constants';

export class StartScreen extends Base implements State {
  public transition(context: GameContext): void {
    context.State = new LevelOne();
  }

  public keyHandler(event: KeyboardEvent, context: GameContext): void {
    if (event.code === 'KeyS') {
      context.inGameKeys.startPressed = event.type === 'keydown';
    }
  }

  public update(context: GameContext): void {
    // this.startScreenText.draw(context.ctx); // refactor!
    // console.log('hello');
    // NOTHING RENDERED! this.renderAll(context);
    if (context.inGameKeys.startPressed) {
      context.transition();
    }
  }

  constructor(context: GameContext) {
    super();
    context.entities.ScreenText = [
      new ScreenText(
        ['Welcome', 'To', 'Zombie Game', "('s' to start)", "('p' to pause)"],
        '80px Helvetica Neue',
        'red',
        [350, 150], // make centrered
      ),
    ];
  }
}
