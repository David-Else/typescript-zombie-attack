import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { StartScreen } from './start-screen.js';
export class LevelTwo extends Base {
    constructor(globalState) {
        super();
        globalState.entities.screenText = [
            new ScreenText({
                linesOfText: [],
                textStyle: '25px Arial',
                fontColor: 'black',
                position: [161, 30],
                textAlignment: 'right',
            }),
        ];
        // const middleOfScreen = (ctx: CanvasRenderingContext2D): Vector2 => [
        //   ctx.canvas.width / 2,
        //   ctx.canvas.height / 2,
        // ];
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
    transition(context) {
        console.log('context.State = new Init();');
        context.State = new StartScreen(context);
    }
    update(context) {
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
//# sourceMappingURL=level-two.js.map