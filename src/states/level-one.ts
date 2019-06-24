import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';
import { ScreenText } from '../entities/text.js';
import { Init } from './init.js';
import { instantiate } from '../entities/entity-factory.js';
import { Bullet } from '../entities/bullet.js';
import { Vector2 } from '../vectors.js';

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
    console.log('context.State = new Init();');
    context.State = new StartScreen(context);
  }

  public update(context: GameContext): void {
    super.update(context);

    // // DANGER duplicated function WRONG PLACE
    // const middleOfScreen = (ctx: CanvasRenderingContext2D): Vector2 => [
    //   ctx.canvas.width / 2,
    //   ctx.canvas.height / 2,
    // ];

    // if (context.inGameKeys.firePressed) {
    //   context.inGameKeys.firePressed = false;
    //   context.entities.bullets.push(
    //     ...instantiate(Bullet, 10, {
    //       position: middleOfScreen(context.ctx),
    //       rotation: context.entities.hero[0].rotation,
    //     }),
    //   );
    //   //   context.transition();
    // }
  }
}
