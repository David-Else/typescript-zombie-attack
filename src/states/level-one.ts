import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';

export class LevelOne extends Base implements State {
  public transition(context: GameContext): void {
    context.State = new StartScreen();
  }
  public update(context: GameContext): void {
    if (context.inGameKeys.firePressed) {
      console.log('fire');
    }
    if (context.inGameKeys.leftPressed) {
      console.log('left');
    }
    if (context.inGameKeys.rightPressed) {
      console.log('right');
    }
    if (context.inGameKeys.pausePressed) {
      console.log('pause');
    }

    if (context.inGameKeys.firePressed) {
      context.transition();
    }
  }
}
