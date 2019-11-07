import { ScreenText } from '../entities/text.js';
import { Base } from './base-class.js';
import { Init } from './init.js';
export class GameOver extends Base {
    constructor(globalState) {
        super();
        globalState.entities.screenText = [
            new ScreenText({
                linesOfText: ['Game Over!'],
                textStyle: '25px Arial',
                fontColor: 'black',
                position: [161, 30],
                textAlignment: 'right',
            }),
        ];
    }
    transition(context) {
        console.log('context.State = new Init();');
        context.State = new Init();
    }
}
//# sourceMappingURL=game-over.js.map