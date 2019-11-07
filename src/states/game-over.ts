import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { GlobalState, StatePattern } from './global-state.js';
import { Init } from './init.js';

export class GameOver extends Base implements StatePattern {
  public constructor(globalState: GlobalState) {
    super();
    globalState.entities.screenText = [
      new ScreenText({
        linesOfText: ['Game Over!'],
        textStyle: '25px Arial',
        fontColor: 'black',
        position: [161, 30],
        textAlignment: 'right',
      }),
    ];
  }

  public transition(context: GlobalState): void {
    console.log('context.State = new Init();');
    context.State = new Init();
  }
}
