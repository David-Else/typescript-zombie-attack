import { Base, State, InGameKeys } from './base-class.js';
import { GameContext } from './context.js';
import { LevelOne } from './level-one.js';
import { ScreenText } from '../entities/text.js';

export class StartScreen extends Base implements State {
  public constructor(context: GameContext) {
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

  public transition(context: GameContext): void {
    context.State = new LevelOne(context);
  }

  public keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void {
    if (event.code === 'KeyS') {
      inGameKeys.startPressed = event.type === 'keydown';
    }
  }

  public update(context: GameContext): void {
    context.entities.ScreenText[0].draw(context.ctx);

    if (context.inGameKeys.startPressed) {
      context.transition();
    }
  }
}
