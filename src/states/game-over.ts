import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { GameContext, State } from './context.js';
import { Init } from './init.js';

export class GameOver extends Base implements State {
  public constructor(context: GameContext) {
    super();
    context.entities.screenText = [
      new ScreenText(['Game Over!'], '25px Arial', 'black', [161, 30], 'right'),
    ];
  }

  public transition(context: GameContext): void {
    console.log('context.State = new Init();');
    context.State = new Init();
  }
}
