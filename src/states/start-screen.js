import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { LevelOne } from './level-one.js';
export class StartScreen extends Base {
    constructor(globalState) {
        super();
        globalState.entities.screenText = [
            new ScreenText({
                ctx: globalState.ctx,
                text: 'Welcome\nTo\nZombie Game\ns to start\np to pause',
                position: [
                    globalState.ctx.canvas.width / 2,
                    globalState.ctx.canvas.height / 2,
                ],
                textColor: 'red',
                font: 'Helvetica Neue',
                fontSize: 80,
            }),
        ];
    }
    transition(context) {
        context.State = new LevelOne(context);
    }
    keyHandler(event, inGameKeys) {
        if (event.code === 'KeyS') {
            inGameKeys.startPressed = event.type === 'keydown';
        }
    }
    update(context) {
        context.entities.screenText[0].draw(context.ctx);
        if (context.inGameKeys.startPressed) {
            context.inGameKeys.startPressed = false;
            context.transition();
        }
    }
}
//# sourceMappingURL=start-screen.js.map