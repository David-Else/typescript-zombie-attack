import { Base, State } from './base-class.js';
import { Init } from './init.js';
import { GameContext } from './context.js';
import { ScreenText } from '../entities/text.js';

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
