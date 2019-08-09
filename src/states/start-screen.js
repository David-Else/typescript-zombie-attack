import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { LevelOne } from './level-one.js';
export class StartScreen extends Base {
    constructor(context) {
        super();
        context.entities.screenText = [
            new ScreenText(['Welcome', 'To', 'Zombie Game', "('s' to start)", "('p' to pause)"], '80px Helvetica Neue', 'red', [350, 150]),
        ];
    }
    transition(context) {
        console.log('context.State = new LevelOne(context);');
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