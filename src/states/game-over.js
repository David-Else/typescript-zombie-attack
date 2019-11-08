import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { Init } from './init.js';
export class GameOver extends Base {
    constructor(globalState) {
        super();
        globalState.entities.screenText = [
            new ScreenText({
                ctx: globalState.ctx,
                text: 'Game Over!',
                position: [
                    globalState.ctx.canvas.width / 2,
                    globalState.ctx.canvas.height / 2,
                ],
                textColor: 'black',
                font: 'Helvetica Neue',
                fontSize: 80,
            }),
        ];
    }
    transition(context) {
        console.log('context.State = new Init();');
        context.State = new Init();
    }
}
//# sourceMappingURL=game-over.js.map