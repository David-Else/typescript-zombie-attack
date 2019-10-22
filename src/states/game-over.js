import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { Init } from './init.js';
export class GameOver extends Base {
    constructor(globalState) {
        super();
        globalState.entities.screenText = [
            new ScreenText(['Game Over!'], '25px Arial', 'black', [161, 30], 'right'),
        ];
    }
    transition(context) {
        console.log('context.State = new Init();');
        context.State = new Init();
    }
}
//# sourceMappingURL=game-over.js.map