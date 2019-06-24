import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';
import { ScreenText } from '../entities/text.js';
import { instantiate } from '../entities/entity-factory.js';
import { Hero } from '../entities/hero.js';
import { Zombie } from '../entities/zombie.js';
import { Vector2 } from '../vectors.js';

export class LevelOne extends Base implements State {
  public constructor(context: GameContext) {
    super();
    context.entities.screenText = [
      new ScreenText([], '25px Arial', 'black', [161, 30], 'right'),
    ];

    const middleOfScreen = (ctx: CanvasRenderingContext2D): Vector2 => [
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
    ];

    context.entities.hero.push(
      ...instantiate(Hero, 1, {
        position: middleOfScreen(context.ctx),
      }),
    );

    context.entities.zombies.push(
      ...instantiate(Zombie, 50, {
        image: Zombie.imagesToLoad[0],
        pointToSpawnAround: middleOfScreen(context.ctx),
      }),
    );
  }

  public transition(context: GameContext): void {
    console.log('context.State = new Init();');
    context.State = new StartScreen(context);
  }

  public update(context: GameContext): void {
    super.update(context);
    context.entities.screenText[0].linesOfText = [
      `Lives = ${context.entities.hero[0].lives} `,
      `Score = ${context.score}`,
      `Zombies = ${context.entities.zombies.length} `,
      `Bullets = ${context.entities.hero[0].numberOfBullets}`,
    ];
  }
}
