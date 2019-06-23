import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';
import { ScreenText } from '../entities/text.js';
import { Init } from './init.js';

export class LevelOne extends Base implements State {
  public constructor(context: GameContext) {
    super();
    context.entities.ScreenText = [
      new ScreenText(
        [
          //   `Lives = ${this.lives}`,
          //   `Score = ${this.score}`,
          //   `Zombies = ${this.numberOfZombies}`,
          //   `Bullets = ${this.numberOfBullets}`,
          `Lives = `,
          `Score = `,
          `Zombies = `,
          `Bullets = `,
        ],
        '25px Arial',
        'black',
        [161, 30],
        'right',
      ),
    ];
  }

  public transition(context: GameContext): void {
    context.State = new Init();
  }

  public update(context: GameContext): void {
    super.update(context);

    // this.gameScreenText.draw(context.ctx); // refactor!

    if (context.inGameKeys.firePressed) {
      context.transition();
    }
  }
}
