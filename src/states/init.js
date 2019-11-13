import { Base } from './base-class.js';
import { GlobalState } from './global-state.js';
import { StartScreen } from './start-screen.js';
export class Init extends Base {
    constructor() {
        super(...arguments);
        this.runAsyncInitFunctionOnce = false; // HACK?
    }
    transition(globalState) {
        globalState.State = new StartScreen(globalState);
    }
    update(context) {
        if (!this.runAsyncInitFunctionOnce) {
            this.runAsyncInitFunctionOnce = true;
            // it transitions at end of this async
            GlobalState.loadAssets(context).catch(message => console.error(message));
        }
    }
}
//# sourceMappingURL=init.js.map