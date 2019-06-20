import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { LevelOne } from './level-one.js';

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
    // NOTHING RENDERED! this.renderAll(context);

    if (context.inGameKeys.startPressed) {
      context.transition();
    }
  }
}
