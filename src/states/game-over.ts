import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { GlobalState, StatePattern } from './global-state.js';
import { Init } from './init.js';

export class GameOver extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText(['Game Over!'], '25px Arial', 'black', [161, 30], 'right'),
    ];
  }

  public transition(context: GlobalState): void {
    console.log('context.State = new Init();');
    context.State = new Init();
  }
}
