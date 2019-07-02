import { Base, State } from './base-class.js';
import { GameContext } from './context.js';
import { StartScreen } from './start-screen.js';
import { ScreenText } from '../entities/text.js';
import { instantiate } from '../entities/entity-factory.js';
import { Hero } from '../entities/hero.js';
import { Zombie } from '../entities/zombie.js';
import { Vector2 } from '../vectors.js';
import { LevelTwo } from './level-two.js';

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

    // if the hero does not exist, or has live === 0,  make him
    if (!context.entities.hero.lives) {
      context.entities.hero = instantiate(Hero, 1, {
        position: middleOfScreen(context.ctx),
      });
    }
    context.entities.zombies = []; // stop megaspawn, kill remaining zombies
    context.entities.zombies.push(
      ...instantiate(Zombie, 50, {
        image: Zombie.imagesToLoad[0],
        pointToSpawnAround: middleOfScreen(context.ctx),
      }),
    );
  }

  public transition(context: GameContext): void {
    console.log('context.State = new Level 2;');
    context.State = new LevelTwo(context);
  }

  public update(context: GameContext): void {
    super.update(context);
    context.entities.screenText[0].linesOfText = [
      'Level 1',
      `Lives = ${context.entities.hero.lives} `,
      `Score = ${context.score}`,
      `Zombies = ${context.entities.zombies.length} `,
      `Bullets = ${context.entities.hero.numberOfBullets}`,
    ];
  }
}
