import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { LevelOne } from './level-one.js';

export class StartScreen extends Base implements State {
  public transition(context: GameContext): void {
    context.State = new LevelOne();
  }

  public keyHandler(event: KeyboardEvent): void {
    if (event.code === 'KeyS') {
      this.inGameKeys.startPressed = event.type === 'keydown';
    }
  }

  public update(context: GameContext): void {
    // NOTHING RENDERED! this.renderAll(context);

    if (this.inGameKeys.startPressed) {
      context.transition();
    }
  }
}
