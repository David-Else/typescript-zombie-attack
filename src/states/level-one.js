import { instantiate } from '../entities/factory.js';
import { Grave } from '../entities/graves.js';
import { Hero } from '../entities/hero.js';
import { ScreenText } from '../entities/text.js';
import { Zombie } from '../entities/zombie.js';
import { Base } from './base-class.js';
import { LevelTwo } from './level-two.js';
export class LevelOne extends Base {
    constructor(globalState) {
        super();
        const numberOfZombies = 50;
        globalState.entities.screenText = [
            new ScreenText([], '25px Arial', 'black', [161, 30], 'right'),
        ];
        // if the hero does not exist, or has live === 0,  make him
        if (!globalState.entities.hero.lives) {
            globalState.entities.hero = instantiate(Hero, 1, {
                position: [
                    globalState.ctx.canvas.width / 2,
                    globalState.ctx.canvas.height / 2,
                ],
            }); /// NIGHTMARE HACK!!!! FIX
        }
        globalState.entities.zombies = []; // stop megaspawn, kill remaining zombies if restart level
        globalState.entities.zombies.push(...instantiate(Zombie, numberOfZombies, {
            image: Zombie.imagesToLoad[0],
            pointToSpawnAround: [
                globalState.ctx.canvas.width / 2,
                globalState.ctx.canvas.height / 2,
            ],
        }));
        const gravesPos = globalState.gameData.level1.graves[0].position;
        // there is ERROR here, delete it and it thinks it not assignable
        // like the other weird error!
        if (gravesPos) {
            globalState.entities.graves.push(...instantiate(Grave, 1, { position: gravesPos }));
        }
    }
    transition(context) {
        console.log('context.State = new Level 2;');
        context.State = new LevelTwo(context);
    }
    update(context) {
        super.update(context);
        if (context.entities.hero.lives === 3) {
            // console.log(context.entities.hero.lives);
            // why does this just keep running?!
            //   context.State = new GameOver(context);
        }
        context.entities.screenText[0].linesOfText = [
            'Level 1',
            `Lives = ${context.entities.hero.lives} `,
            `Score = ${context.score}`,
            `Zombies = ${context.entities.zombies.length} `,
            `Bullets = ${context.entities.hero.numberOfBullets}`,
        ];
    }
}
//# sourceMappingURL=level-one.js.map