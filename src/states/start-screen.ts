import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { GlobalState, InGameKeys, StatePattern } from './global-state.js';
import { LevelOne } from './level-one.js';

export class StartScreen extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText(
        ['Welcome', 'To', 'Zombie Game', "('s' to start)", "('p' to pause)"],
        '80px Helvetica Neue',
        'red',
        [350, 150], // make centrered
      ),
    ];
  }

  public transition(context: GlobalState): void {
    context.State = new LevelOne(context);
  }

  public keyHandler(event: KeyboardEvent, inGameKeys: InGameKeys): void {
    if (event.code === 'KeyS') {
      inGameKeys.startPressed = event.type === 'keydown';
    }
  }

  public update(context: GlobalState): void {
    context.entities.screenText[0].draw(context.ctx);

    if (context.inGameKeys.startPressed) {
      context.inGameKeys.startPressed = false;
      context.transition();
    }
  }
}
