import { ScreenText } from '../entities/text.js';
import { Vector2 } from '../utilities/vectors.js';
import { Base } from './base-class.js';
import { GameContext, State } from './context.js';
import { StartScreen } from './start-screen.js';

export class LevelTwo extends Base implements State {
  public constructor(context: GameContext) {
    super();
    context.entities.screenText = [
      new ScreenText([], '25px Arial', 'black', [161, 30], 'right'),
    ];

    const middleOfScreen = (ctx: CanvasRenderingContext2D): Vector2 => [
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
    ];

    // context.entities.hero = instantiate(Hero, 1, {
    //   position: middleOfScreen(context.ctx),
    // });

    // context.entities.zombies.push(
    //   ...instantiate(Zombie, 50, {
    //     image: Zombie.imagesToLoad[0],
    //     pointToSpawnAround: middleOfScreen(context.ctx),
    //   }),
    // );
  }

  public transition(context: GameContext): void {
    console.log('context.State = new Init();');
    context.State = new StartScreen(context);
  }

  public update(context: GameContext): void {
    super.update(context);
    context.entities.screenText[0].linesOfText = [
      'Level 2',
      `Lives = ${context.entities.hero.lives} `,
      `Score = ${context.score}`,
      `Zombies = ${context.entities.zombies.length} `,
      `Bullets = ${context.entities.hero.numberOfBullets}`,
    ];
  }
}
