import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';

export class LevelOne extends Base implements State {
  public transition(context: GameContext): void {
    context.State = new StartScreen();
  }
  public update(context: GameContext): void {
    if (this.inGameKeys.firePressed) {
      console.log('fire');
    }
    if (this.inGameKeys.leftPressed) {
      console.log('left');
    }
    if (this.inGameKeys.rightPressed) {
      console.log('right');
    }
    if (this.inGameKeys.pausePressed) {
      console.log('pause');
    }

    if (this.inGameKeys.firePressed) {
      context.transition();
    }
  }
}
